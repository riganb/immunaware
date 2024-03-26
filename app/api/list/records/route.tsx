import { loadDB } from "@/lib";
import { Counts, VaccinationRecord } from "@/common";

export async function GET() {
  const db = await loadDB();

  const data: VaccinationRecord[] = await db.all("SELECT * FROM record");

  return Response.json({ data });
}
