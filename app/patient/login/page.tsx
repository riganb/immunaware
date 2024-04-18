"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function Page() {
  const [aadhar, setAadhar] = useState("");

  const updateAadhar = (e: ChangeEvent<HTMLInputElement>) => {
    setAadhar(e.target.value);
    console.log(e.target.value);
  };

  return (
    <section className="flex-1 flex flex-row p-5 gap-10">
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
        <form className="flex flex-col gap-5 text-xl w-full items-start justify-center">
          <input
            type="text"
            placeholder="12-digit Aadhar Number"
            name="aadhar"
            className="rounded-full p-5 focus:border-blue-700 focus:ring-blue-700 text-xl w-2/3"
            minLength={12}
            maxLength={12}
            onChange={updateAadhar}
          />
          <br />
        </form>
        <div className="flex flex-col items-start w-full">
          <Link href={`/patient/history?aadhar=${aadhar}`}>
            <button className="text-xl mt-5 bg-black text-white hover:bg-white hover:text-black shadow-2xl hover:shadow-black rounded-full p-3 px-20">
              View Vaccination History
            </button>
          </Link>
          <Link href={`/`}>
            <button className="text-xl mt-5 bg-blue-700 text-white hover:bg-white hover:text-blue-700 shadow-2xl hover:shadow-blue-700 rounded-full p-3 px-20">
              Login as Admin
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
