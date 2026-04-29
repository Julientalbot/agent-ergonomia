#!/usr/bin/env python3
"""Append one growth event to data/growth_events.jsonl."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EVENTS_FILE = ROOT / "data" / "growth_events.jsonl"
ALLOWED_EVENTS = {
    "post_published",
    "cta_click",
    "cal_booking",
    "call_done",
    "proposal_sent",
    "proposal_won",
    "proposal_lost",
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Log a tunnel event.")
    parser.add_argument("event", choices=sorted(ALLOWED_EVENTS))
    parser.add_argument("--campaign", default="audit_pre_agent_v0")
    parser.add_argument("--channel", default="linkedin")
    parser.add_argument("--source", default="manual")
    parser.add_argument("--person", default="")
    parser.add_argument("--company", default="")
    parser.add_argument("--notes", default="")
    parser.add_argument("--value", type=float, default=0.0)
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    EVENTS_FILE.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "event": args.event,
        "campaign": args.campaign,
        "channel": args.channel,
        "source": args.source,
        "person": args.person,
        "company": args.company,
        "value": args.value,
        "notes": args.notes,
    }
    with EVENTS_FILE.open("a", encoding="utf-8") as handle:
        handle.write(json.dumps(payload, ensure_ascii=False, sort_keys=True) + "\n")
    print(json.dumps(payload, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
