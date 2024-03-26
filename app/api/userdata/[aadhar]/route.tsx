import { loadDB } from "@/lib";
import { Counts, Patient, UserHistoryData, VaccinationRecord } from "@/common";

export async function GET(
  req: Request,
  { params }: { params: { aadhar: string } }
) {
  const db = await loadDB();

  const aadhar = params.aadhar;

  console.log("aadhar::", aadhar);

  const patient: Patient | undefined = await db.get(
    "SELECT name FROM patient WHERE aadhar = ?",
    aadhar
  );
  const name: string = patient ? patient.name : "";

  const history: VaccinationRecord[] = await db.all(
    "SELECT * FROM record WHERE aadhar = ?",
    aadhar
  );

  const data: UserHistoryData = { name, history };

  return Response.json({ data });
}
