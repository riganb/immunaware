"use client";

import { Property, PropertyColours, toTitleCase } from "@/common";
import axios from "axios";
import { useRouter } from "next/navigation";

const DataCard = ({
  property,
  value,
  isAbout = false,
  aboutText = "",
}: {
  property: Property | "about";
  value: string;
  isAbout?: boolean;
  aboutText?: string;
}) => {
  const router = useRouter();
  const colour = PropertyColours[property];
  const viewList = () => {
    router.push(`/home/view/${property}`);
  };
  const addNew = () => {
    router.push(`/home/add/${property}`);
  };
  const signOut = async () => {
    await axios.get("/api/logout");
    router.replace("/");
  };
  return (
    <div
      className={`group h-[177px] border-2 border-${colour}-700 hover:bg-${colour}-700 p-3 rounded-xl shadow-lg shadow-${colour}-700 hover:shadow-gray-500 flex flex-row gap-3 m-2 items-center ${
        isAbout && "shadow-black hover:bg-black border-black"
      }`}
    >
      <div
        className={`text-${colour}-700 h-full group-hover:text-white flex items-end text-[180px] font-extrabold`}
      >
        {value}
      </div>
      <div className="flex flex-col justify-between h-full">
        <div
          className={`text text-${colour}-700 group-hover:text-white font-semibold ${
            isAbout ? "text-md" : "font-bold"
          }`}
        >
          {isAbout ? aboutText : toTitleCase(property)}
        </div>
        <div className="flex flex-row justify-start gap-7">
          {isAbout ? (
            <div
              className={`bg-black text-white group-hover:bg-white text-lg px-5 py-2 rounded-lg hover:text-black shadow-md font-semibold hover:shadow-white group-hover:text-black`}
              onClick={signOut}
            >
              Sign Out
            </div>
          ) : (
            <>
              <div
                className={`bg-${colour}-700 group-hover:bg-white text-lg px-5 py-2 rounded-lg hover:text-${colour}-700 shadow-md font-semibold hover:shadow-white`}
                onClick={viewList}
              >
                View List
              </div>
              <div
                className={`bg-${colour}-700 group-hover:bg-white text-lg px-5 py-2 rounded-lg hover:text-${colour}-700 shadow-md font-semibold hover:shadow-white`}
                onClick={addNew}
              >
                Add New
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataCard;
