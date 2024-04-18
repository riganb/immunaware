import { redirect, RedirectType } from "next/navigation";
import { getSession, login, logout } from "@/lib";
import Link from "next/link";

export default async function Page() {
  const session = await getSession();
  if (session) {
    redirect("/home", RedirectType.replace);
  }
  return (
    <section className="flex-1 flex flex-row p-5">
      <div className="px-10 flex flex-col items-start justify-center text-7xl font-semibold text-blue-950">
        <div>Welcome</div>
        <div>to</div>
        <div className="text-blue-700 drop-shadow-[0_25px_25px_#0097a7]">
          ImmunAWARE
        </div>
        <div className="text-xl mt-16">
          The 2024 Vaccination Management System
        </div>
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
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
          className="flex flex-col gap-5 text-xl w-full items-center justify-center"
        >
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="rounded-full p-5 focus:border-blue-700 focus:ring-blue-700 text-xl w-2/3"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="rounded-full p-5 focus:border-blue-700 focus:ring-blue-700 text-xl w-2/3"
          />
          <br />
          <button
            type="submit"
            className="bg-blue-700 text-white hover:bg-white hover:text-blue-700 shadow-2xl hover:shadow-blue-700 rounded-full p-3 px-20"
          >
            Login
          </button>
        </form>
        <Link href="/patient/login">
          <button className="text-xl mt-5 bg-black text-white hover:bg-white hover:text-black shadow-2xl hover:shadow-black rounded-full p-3 px-20">
            Login as User
          </button>
        </Link>
      </div>
    </section>
  );
}
