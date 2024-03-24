import { getSession } from "@/lib";
import UserData from "../components/user-data";

export default async function Home() {
  const session = await getSession();
  return <UserData name={session?.user.name} email={session?.user.email} />;
}
