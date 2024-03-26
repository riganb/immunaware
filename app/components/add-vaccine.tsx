"use client";

import { PropertyColours, toTitleCase, Vaccine } from "@/common";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function AddVaccine() {
  const slug = "vaccine";
  const slugWithS = `${slug}s`;
  const colour = PropertyColours[slugWithS];
  const router = useRouter();

  const [data, setData] = useState<Vaccine>({
    vid: "",
    name: "",
    type: "",
    dosage: "",
    manufacturer: "",
  });

  const goBack = () => router.back();

  const submitHandler = async () => {
    await axios.post(`http://localhost:3000/api/add/${slug}`, data);
    router.replace(`/home/view/${slugWithS}`);
  };

  const updateData =
    (prop: keyof Vaccine) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setData((data) => ({
        ...data,
        [prop]: value,
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
      <form className="grid grid-flow-row grid-cols-2 gap-3 items-end mt-5">
        <div className="flex flex-col">
          <label className="text-lg font-semibold">VID</label>
          <input
            type="text"
            name="vid"
            onChange={updateData("vid")}
            className="rounded-lg text-xl p-3 mt-2"
            minLength={3}
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
          <label className="text-lg font-semibold">Type</label>
          <input
            type="text"
            name="type"
            onChange={updateData("type")}
            className="rounded-lg text-xl p-3 mt-2"
            minLength={3}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Manufacturer</label>
          <input
            type="text"
            name="manufacturer"
            onChange={updateData("manufacturer")}
            className="rounded-lg text-xl p-3 mt-2"
            minLength={3}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Dosage</label>
          <input
            type="text"
            name="dosage"
            onChange={updateData("dosage")}
            className="rounded-lg text-xl p-3 mt-2"
            minLength={3}
          />
        </div>
        <div />
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
