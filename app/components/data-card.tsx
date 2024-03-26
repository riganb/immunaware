"use client";

import { Property, PropertyColours, toTitleCase } from "@/common";
import { redirect, useRouter } from "next/navigation";

const DataCard = ({
  property,
  value,
}: {
  property: Property;
  value: string;
}) => {
  const router = useRouter();
  const colour = PropertyColours[property];
  const viewList = () => {
    router.push(`/home/view/${property}`);
  };
  const addNew = () => {
    router.push(`/home/add/${property}`);
  };
  return (
    <div
      className={`group h-[177px] border-2 border-${colour}-700 hover:bg-${colour}-700 p-3 rounded-xl shadow-lg shadow-${colour}-700 hover:shadow-gray-500 flex flex-row gap-3 m-2 items-center`}
    >
      <div
        className={`text-${colour}-700 h-full group-hover:text-white flex items-end text-[180px] font-extrabold`}
      >
        {value}
      </div>
      <div className="flex flex-col justify-between h-full">
        <div
          className={`text-2xl text text-${colour}-700 group-hover:text-white font-bold`}
        >
          {toTitleCase(property)}
        </div>
        <div className="flex flex-row justify-start gap-7">
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
        </div>
      </div>
    </div>
  );
};

export default DataCard;
