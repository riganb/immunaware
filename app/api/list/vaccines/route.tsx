import { loadDB } from "@/lib";
import { Counts, VaccinationRecord, Vaccine } from "@/common";

export async function GET() {
  const db = await loadDB();

  const data: Vaccine[] = await db.all("SELECT * FROM vaccine");

  return Response.json({ data });
}
