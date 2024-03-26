import { VaccinationRecord } from "@/common";
import { loadDB } from "@/lib";

export async function POST(req: Request) {
  const db = await loadDB();

  const data: VaccinationRecord = await req.json();

  await db.run(
    "INSERT INTO record (aadhar, vid, cid, did, date) VALUES (?, ?, ?, ?, ?)",
    [data.aadhar, data.vid, data.cid, data.did, data.date]
  );

  return new Response("Data successfully inserted!", { status: 200 });
}
