import { Doctor } from "@/common";
import { loadDB } from "@/lib";

export async function POST(req: Request) {
  const db = await loadDB();

  const data: Doctor = await req.json();

  await db.run(
    "INSERT INTO doctor (did, name, email, specialization, center_id) VALUES (?, ?, ?, ?, ?)",
    [data.did, data.name, data.email, data.specialization, data.center_id]
  );

  return new Response("Data successfully inserted!", { status: 200 });
}
