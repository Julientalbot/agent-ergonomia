#!/usr/bin/env python3
"""Score the audit pre-agent v0 tunnel from data/growth_events.jsonl."""

from __future__ import annotations

import argparse
import json
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
EVENTS_FILE = ROOT / "data" / "growth_events.jsonl"
REPORT_FILE = ROOT / "reports" / "audit-pre-agent-score.md"
FUNNEL = [
    "post_published",
    "cta_click",
    "cal_booking",
    "call_done",
    "proposal_sent",
    "proposal_won",
]
WEIGHTS = {
    "post_published": 1,
    "cta_click": 2,
    "cal_booking": 5,
    "call_done": 8,
    "proposal_sent": 13,
    "proposal_won": 34,
    "proposal_lost": -3,
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Score growth events.")
    parser.add_argument("--campaign", default="audit_pre_agent_v0")
    parser.add_argument("--events", default=str(EVENTS_FILE))
    parser.add_argument("--write-report", action="store_true")
    return parser.parse_args()


def load_events(path: Path, campaign: str) -> list[dict[str, Any]]:
    if not path.exists():
        return []
    events: list[dict[str, Any]] = []
    for line_no, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
        if not line.strip():
            continue
        try:
            event = json.loads(line)
        except json.JSONDecodeError as exc:
            raise SystemExit(f"Invalid JSON on {path}:{line_no}: {exc}") from exc
        if event.get("campaign") == campaign:
            events.append(event)
    return events


def pct(numerator: int, denominator: int) -> str:
    if denominator <= 0:
        return "n/a"
    return f"{(numerator / denominator) * 100:.1f}%"


def recommendation(counts: Counter[str]) -> str:
    posts = counts["post_published"]
    bookings = counts["cal_booking"]
    calls = counts["call_done"]
    proposals = counts["proposal_sent"]
    won = counts["proposal_won"]

    if not posts:
        return "publier ou relier le premier post : aucun signal d’entrée n’existe encore."
    if not bookings:
        return "ne rien automatiser : tester le CTA/offre jusqu’au premier booking qualifié."
    if bookings and not calls:
        return "préparer les appels : le tunnel attire, mais la qualification réelle n’est pas encore visible."
    if calls and not proposals:
        return "clarifier livrable/prix : les appels n’aboutissent pas encore à une proposition."
    if proposals and not won:
        return "attaquer proposition/prix/urgence : l’intérêt existe mais ne convertit pas."
    if won:
        return "documenter le cas gagné avant d’ajouter une couche marketing."
    return "continuer le test sans ajouter de complexité."


def render_report(events: list[dict[str, Any]], campaign: str) -> str:
    counts: Counter[str] = Counter(event.get("event", "unknown") for event in events)
    score = sum(WEIGHTS.get(event.get("event"), 0) for event in events)
    now = datetime.now(timezone.utc).isoformat(timespec="seconds")

    lines = [
        "# score tunnel — audit pré-agent v0",
        "",
        f"généré : {now}",
        f"campagne : `{campaign}`",
        f"événements : {len(events)}",
        f"score pondéré : **{score}**",
        "",
        "## funnel",
        "",
        "| étape | volume | conversion depuis étape précédente |",
        "|---|---:|---:|",
    ]
    previous = 0
    for step in FUNNEL:
        count = counts[step]
        conversion = "n/a" if previous == 0 else pct(count, previous)
        lines.append(f"| `{step}` | {count} | {conversion} |")
        previous = count

    if counts["proposal_lost"]:
        lines.append(f"| `proposal_lost` | {counts['proposal_lost']} | n/a |")

    lines.extend([
        "",
        "## sources",
        "",
    ])
    by_channel = Counter(event.get("channel", "unknown") for event in events)
    if by_channel:
        for channel, count in sorted(by_channel.items()):
            lines.append(f"- {channel}: {count}")
    else:
        lines.append("- aucun événement")

    lines.extend([
        "",
        "## décision recommandée",
        "",
        recommendation(counts),
        "",
    ])
    return "\n".join(lines)


def main() -> None:
    args = parse_args()
    events = load_events(Path(args.events), args.campaign)
    report = render_report(events, args.campaign)
    print(report)
    if args.write_report:
        REPORT_FILE.parent.mkdir(parents=True, exist_ok=True)
        REPORT_FILE.write_text(report + "\n", encoding="utf-8")
        print(f"\nwritten: {REPORT_FILE}")


if __name__ == "__main__":
    main()
