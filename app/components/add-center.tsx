"use client";

import { API_URL, Center, PropertyColours, toTitleCase } from "@/common";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function AddCenter() {
  const slug = "center";
  const slugWithS = `${slug}s`;
  const colour = PropertyColours[slugWithS];
  const router = useRouter();

  const [data, setData] = useState<Center>({
    cid: "",
    name: "",
    capacity: 0,
    location: "",
  });

  const goBack = () => router.back();

  const submitHandler = async () => {
    await axios.post(`${API_URL}/api/add/${slug}`, data);
    router.replace(`/home/view/${slugWithS}`);
  };

  const updateData =
    (prop: keyof Center) => (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setData((data) => ({
        ...data,
        [prop]: prop === "capacity" ? Number(value) : value,
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
          <label className="text-lg font-semibold">CID</label>
          <input
            type="text"
            name="cid"
            onChange={updateData("cid")}
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
          <label className="text-lg font-semibold">Location</label>
          <input
            type="text"
            name="location"
            onChange={updateData("location")}
            className="rounded-lg text-xl p-3 mt-2"
            minLength={3}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Capacity</label>
          <input
            type="number"
            name="capacity"
            onChange={updateData("capacity")}
            className="rounded-lg text-xl p-3 mt-2"
            min={1}
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
