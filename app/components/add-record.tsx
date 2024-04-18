"use client";

import {
  API_URL,
  Center,
  OptionsDataForRecord,
  PropertyColours,
  toTitleCase,
  VaccinationRecord,
} from "@/common";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function AddRecord() {
  const slug = "record";
  const slugWithS = `${slug}s`;
  const colour = PropertyColours[slugWithS];
  const router = useRouter();

  const [data, setData] = useState<VaccinationRecord>({
    cid: "",
    vid: "",
    did: "",
    date: "",
    aadhar: "",
  });

  const [optionsData, setOptionsData] = useState<OptionsDataForRecord>({
    centers: [],
    doctors: [],
    patients: [],
    vaccines: [],
  });

  useEffect(() => {
    const fn = async () => {
      const requestData: OptionsDataForRecord = (
        await axios.get(`${API_URL}/api/options/records`)
      ).data.data;
      console.log(requestData);
      setOptionsData(requestData);
      setData({
        cid: requestData.centers?.[0].cid,
        aadhar: requestData.patients?.[0].aadhar,
        did: requestData.doctors?.[0].did,
        vid: requestData.vaccines?.[0].vid,
        date: new Date().toISOString().split("T")[0],
      });
    };
    fn();
  }, []);

  const goBack = () => router.back();

  const submitHandler = async () => {
    await axios.post(`${API_URL}/api/add/${slug}`, data);
    router.replace(`/home/view/${slugWithS}`);
  };

  const updateData =
    (prop: keyof VaccinationRecord) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setData((data) => ({
        ...data,
        [prop]: value,
      }));
    };

  useEffect(() => console.log(data), [data]);

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
          <select
            name="aadhar"
            onChange={updateData("aadhar")}
            className="rounded-lg text-xl p-3 mt-2"
          >
            {optionsData.patients.map((patient) => (
              <option
                key={patient.aadhar}
                value={patient.aadhar}
              >{`${patient.name} [${patient.aadhar}]`}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Vaccine</label>
          <select
            name="vid"
            onChange={updateData("vid")}
            className="rounded-lg text-xl p-3 mt-2"
          >
            {optionsData.vaccines.map((vaccine) => (
              <option
                key={vaccine.vid}
                value={vaccine.vid}
              >{`${vaccine.vid} - ${vaccine.name} by ${vaccine.manufacturer}`}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Doctor</label>
          <select
            name="did"
            onChange={updateData("did")}
            className="rounded-lg text-xl p-3 mt-2"
          >
            {optionsData.doctors.map((doctor) => (
              <option
                key={doctor.did}
                value={doctor.did}
              >{`${doctor.did} - ${doctor.name}, (${doctor.specialization})`}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Center</label>
          <select
            name="cid"
            onChange={updateData("cid")}
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
        <div className="flex flex-col">
          <label className="text-lg font-semibold">Date</label>
          <input
            type="date"
            name="date"
            onChange={updateData("date")}
            className="rounded-lg text-xl p-3 mt-2"
          />
        </div>
        <div />
      </form>
      <button
        className={`bg-${colour}-700 py-3 rounded-lg text-white hover:bg-white hover:text-${colour}-700 font-semibold text-lg max-h-10 flex items-center justify-center max-w-[100px] mt-7`}
        onClick={submitHandler}
      >
        Submit
      </button>
    </>
  );
}
