import { loadDB } from "@/lib";
import { Counts, Doctor } from "@/common";

export async function GET() {
  const db = await loadDB();

  const data: Doctor[] = await db.all("SELECT * FROM doctor");

  return Response.json({ data });
}
