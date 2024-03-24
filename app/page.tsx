import { redirect, RedirectType } from "next/navigation";
import { getSession, login, logout } from "@/lib";

export default async function Page() {
  const session = await getSession();
  if (session) {
    redirect("/home", RedirectType.replace);
  }
  return (
    <section>
      <form
        action={async (formData) => {
          "use server";
          const isCorrect = await login(formData);
          if (isCorrect) {
            redirect("/home", RedirectType.replace);
          } else {
            redirect("/wrong", RedirectType.replace);
          }
        }}
      >
        <input type="email" placeholder="Email" name="email" />
        <br />
        <button type="submit">Login</button>
      </form>
      <form
        action={async () => {
          "use server";
          await logout();
          redirect("/");
        }}
      >
        <button type="submit">Logout</button>
      </form>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  );
}
