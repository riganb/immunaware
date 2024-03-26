import { loadDB } from "@/lib";
import { Center, Counts } from "@/common";

export async function GET() {
  const db = await loadDB();

  const data: Center[] = await db.all("SELECT * FROM center");

  return Response.json({ data });
}
