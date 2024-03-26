import { loadDB } from "@/lib";
import {
  Center,
  Doctor,
  OptionsDataForRecord,
  Patient,
  Vaccine,
} from "@/common";

export async function GET() {
  const db = await loadDB();

  const centers: Center[] = await db.all("SELECT * FROM center");
  const patients: Patient[] = await db.all("SELECT * FROM patient");
  const doctors: Doctor[] = await db.all("SELECT * FROM doctor");
  const vaccines: Vaccine[] = await db.all("SELECT * FROM vaccine");

  const data: OptionsDataForRecord = { centers, doctors, patients, vaccines };

  return Response.json({ data });
}
