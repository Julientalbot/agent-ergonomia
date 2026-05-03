import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import * as path from "path";

const LEADS_DIR = process.env.LEADS_DIR ?? path.join("/tmp", "agent-ergonomia-leads");
const LEADS_FILE = path.join(LEADS_DIR, "leads.json");

type Lead = {
  email: string;
  source: string;
  captured_at?: string;
  resubmitted_at?: string;
  sequence_sent?: number;
  last_email_at?: string | null;
  status?: string;
};

/* ─── Load or create leads DB ─── */
async function loadLeads(): Promise<Lead[]> {
  try {
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    const parsed: unknown = JSON.parse(data);
    return Array.isArray(parsed) ? (parsed as Lead[]) : [];
  } catch {
    await fs.mkdir(LEADS_DIR, { recursive: true });
    return [];
  }
}

async function saveLeads(leads: Lead[]) {
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, source = "website" } = body;

    if (!email || !/^.+@.+\..+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Email invalide" },
        { status: 400 }
      );
    }

    const leads = await loadLeads();
    const now = new Date().toISOString();

    /* Check if already exists */
    const existing = leads.find((l) => l.email === email);
    if (existing) {
      existing.resubmitted_at = now;
      existing.source = source;
      await saveLeads(leads);
      return NextResponse.json({
        success: true,
        message: "Déjà inscrit — vos emails reprennent."
      });
    }

    /* Add new lead */
    leads.push({
      email,
      source,
      captured_at: now,
      sequence_sent: 0,
      last_email_at: null,
      status: "active"
    });

    await saveLeads(leads);

    return NextResponse.json({
      success: true,
      message: "Inscription confirmée — vérifiez votre boîte mail."
    });

  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, message: "Lead capture API" });
}
