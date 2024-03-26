"use client";

import {
  Doctor,
  OptionsDataForDoctor,
  PropertyColours,
  toTitleCase,
} from "@/common";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function AddDoctor() {
  const slug = "doctor";
  const slugWithS = `${slug}s`;
  const colour = PropertyColours[slugWithS];
  const router = useRouter();

  const [data, setData] = useState<Doctor>({
    did: "",
    name: "",
    email: "",
    specialization: "",
    center_id: "",
  });

  const [optionsData, setOptionsData] = useState<OptionsDataForDoctor>({
    centers: [],
  });

  useEffect(() => {
    const fn = async () => {
      const requestData: OptionsDataForDoctor = (
        await axios.get("http://localhost:3000/api/options/doctors")
      ).data.data;
      console.log(requestData);
      setOptionsData(requestData);
      setData((oldData) => ({
        ...oldData,
        center_id: requestData.centers?.[0].cid,
      }));
    };
    fn();
  }, []);

  const goBack = () => router.back();

  const submitHandler = async () => {
    await axios.post(`http://localhost:3000/api/add/${slug}`, data);
    router.replace(`/home/view/${slugWithS}`);
  };

  const updateData =
    (prop: keyof Doctor) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      <form className="grid grid-flow-row grid-cols-2 gap-3 items-end mt-2">
        <div className="flex flex-col">
          <label className="text-lg font-semibold">DID</label>
          <input
            type="text"
            name="did"
            onChange={updateData("did")}
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
          <label className="text-lg font-semibold">Specialization</label>
          <input
            type="text"
            name="specialization"
            onChange={updateData("specialization")}
            className="rounded-lg text-xl p-3 mt-2"
            minLength={3}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Center</label>
          <select
            name="center_id"
            onChange={updateData("center_id")}
            className="rounded-lg text-xl p-3 mt-2"
          >
            {optionsData.centers.map((center) => (
              <option
                key={center.cid}
                value={center.cid}
              >{`${center.cid} - ${center.name}, ${center.location}`}</option>
            ))}
          </select>
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
