import { loadDB } from "@/lib";
import { Patient, UserHistoryData, VaccinationRecord } from "@/common";

export async function GET(
  req: Request,
  { params }: { params: { did: string } }
) {
  const db = await loadDB();

  const did = params.did;

  await db.run("UPDATE record SET did = NULL WHERE did = ?", did);

  await db.run("DELETE FROM doctor WHERE did = ?", did);

  return Response.json({});
}
