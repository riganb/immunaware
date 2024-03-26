import { loadDB } from "@/lib";
import { Center, OptionsDataForDoctor } from "@/common";

export async function GET() {
  const db = await loadDB();

  const centers: Center[] = await db.all("SELECT * FROM center");

  const data: OptionsDataForDoctor = { centers };

  return Response.json({ data });
}
