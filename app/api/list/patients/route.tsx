import { loadDB } from "@/lib";
import { Counts, Patient } from "@/common";

export async function GET() {
  const db = await loadDB();

  const data: Patient[] = await db.all("SELECT * FROM patient");

  return Response.json({ data });
}
