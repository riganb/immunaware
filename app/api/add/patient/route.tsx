import { Patient } from "@/common";
import { loadDB } from "@/lib";

export async function POST(req: Request) {
  const db = await loadDB();

  const data: Patient = await req.json();

  await db.run(
    "INSERT INTO patient (aadhar, name, email, yob) VALUES (?, ?, ?, ?, ?)",
    [data.aadhar, data.name, data.email, data.yob]
  );

  return new Response("Data successfully inserted!", { status: 200 });
}
