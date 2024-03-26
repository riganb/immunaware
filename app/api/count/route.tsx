import { loadDB } from "@/lib";
import { Counts } from "@/common";

export async function GET() {
  const db = await loadDB();
  const count: Counts = {};

  count.centers = (await db.get("SELECT COUNT(*) FROM center"))["COUNT(*)"];
  count.doctors = (await db.get("SELECT COUNT(*) FROM doctor"))["COUNT(*)"];
  count.patients = (await db.get("SELECT COUNT(*) FROM patient"))["COUNT(*)"];
  count.records = (await db.get("SELECT COUNT(*) FROM record"))["COUNT(*)"];
  count.vaccines = (await db.get("SELECT COUNT(*) FROM vaccine"))["COUNT(*)"];

  return Response.json({ count });
}
