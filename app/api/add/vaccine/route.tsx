import { Vaccine } from "@/common";
import { loadDB } from "@/lib";

export async function POST(req: Request) {
  const db = await loadDB();

  const data: Vaccine = await req.json();

  await db.run(
    "INSERT INTO vaccine (vid, name, type, manufacturer, dosage) VALUES (?, ?, ?, ?, ?)",
    [data.vid, data.name, data.type, data.manufacturer, data.dosage]
  );

  return new Response("Data successfully inserted!", { status: 200 });
}
