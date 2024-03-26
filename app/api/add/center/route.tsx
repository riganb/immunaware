import { Center } from "@/common";
import { loadDB } from "@/lib";

export async function POST(req: Request) {
  const db = await loadDB();

  const data: Center = await req.json();

  await db.run(
    "INSERT INTO center (cid, name, location, capacity) VALUES (?, ?, ?, ?)",
    [data.cid, data.name, data.location, data.capacity]
  );

  return new Response("Data successfully inserted!", { status: 200 });
}
