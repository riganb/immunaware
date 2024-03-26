"use client";

import {
  Center,
  PropsList,
  Property,
  PropertyColours,
  toTitleCase,
} from "@/common";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { slug: Property } }) {
  const colour = PropertyColours[params.slug];
  const [data, setData] = useState<[]>([]);
  const router = useRouter();

  const goBack = () => router.back();

  const deleteDoctor = (did: string) => async () => {
    if (params.slug !== "doctors") return;
    await axios.get(`http://localhost:3000/api/deletedoc/${did}`);
    router.refresh();
  };

  useEffect(() => {
    const fn = async () => {
      const data = (
        await axios.get(`http://localhost:3000/api/list/${params.slug}`)
      ).data.data;
      console.log(data);
      setData(data);
    };
    fn();
  }, []);

  return (
    <>
      <div
        className={`h-fit text-2xl hover:text-${colour}-700`}
        onClick={goBack}
      >
        {"\u2190"} Go Back
      </div>
      <div
        className={`flex-1 w-full border-4 border-${colour}-700 rounded-lg mt-4`}
      >
        <table className={`w-full`}>
          <thead>
            <tr>
              {PropsList[params.slug].map((centerProp) => (
                <td
                  key={centerProp}
                  className={`text-white font-semibold bg-${colour}-700 text-center text-lg py-2`}
                >
                  {toTitleCase(centerProp)}
                </td>
              ))}
              {params.slug === "doctors" && (
                <td
                  className={`text-white font-semibold bg-${colour}-700 text-center text-lg py-2`}
                >
                  Action
                </td>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item}>
                {PropsList[params.slug].map((centerProp) => (
                  <td
                    className={`py-2 text-center text-lg border-2 border-${colour}-700`}
                  >
                    {item[centerProp]}
                  </td>
                ))}
                {params.slug === "doctors" && (
                  <td
                    className={`py-2 text-center text-lg border-2 border-${colour}-700`}
                  >
                    <button
                      className={`rounded-lg bg-red-700 p-2 font-semibold text-white hover:bg-white border-red-700 hover:text-red-700 border-2 hover:border-black`}
                      onClick={deleteDoctor(item["did"])}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
