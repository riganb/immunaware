"use client";

import { Patient, PropertyColours, toTitleCase } from "@/common";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function AddPatient() {
  const slug = "patient";
  const slugWithS = `${slug}s`;
  const colour = PropertyColours[slugWithS];
  const router = useRouter();

  const [data, setData] = useState<Patient>({
    aadhar: "",
    name: "",
    email: "",
    yob: 1900,
  });

  const goBack = () => router.back();

  const submitHandler = async () => {
    console.log(slug, data);
    await axios.post(`http://localhost:3000/api/add/${slug}`, data);
    router.replace(`/home/view/${slugWithS}`);
  };

  const updateData =
    (prop: keyof Patient) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setData((data) => ({
        ...data,
        [prop]: prop === "yob" ? Number(value) : value,
      }));
      console.log(data);
    };

  return (
    <>
      <div
        className={`h-fit text-2xl hover:text-${colour}-700`}
        onClick={goBack}
      >
        {"\u2190"} Go Back
      </div>
      <div className="mt-5 text-3xl">
        Enter new{" "}
        <span className={`text-${colour}-700 font-semibold`}>{`${toTitleCase(
          slug
        )}'s`}</span>{" "}
        data:
      </div>
      <form className="grid grid-flow-row grid-cols-2 gap-3 items-end mt-2">
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Aadhar</label>
          <input
            type="text"
            name="aadhar"
            onChange={updateData("aadhar")}
            className="rounded-lg text-xl p-3 mt-2"
            minLength={12}
            maxLength={12}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Name</label>
          <input
            type="text"
            name="name"
            onChange={updateData("name")}
            className="rounded-lg text-xl p-3 mt-2"
            minLength={3}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Email</label>
          <input
            type="email"
            name="email"
            onChange={updateData("email")}
            className="rounded-lg text-xl p-3 mt-2"
            minLength={3}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Year of birth</label>
          <input
            type="number"
            name="yob"
            onChange={updateData("yob")}
            className="rounded-lg text-xl p-3 mt-2"
            min={1900}
          />
        </div>
      </form>
      <button
        className={`bg-${colour}-700 py-3 rounded-lg text-white hover:bg-white hover:text-${colour}-700 font-semibold text-lg max-h-10 flex items-center justify-center max-w-[100px] mt-4`}
        onClick={submitHandler}
      >
        Submit
      </button>
    </>
  );
}
