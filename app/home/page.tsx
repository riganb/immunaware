import { getSession } from "@/lib";
import { redirect, RedirectType } from "next/navigation";
import axios from "axios";
import { Counts, PROPERTIES, Property } from "@/common";
import DataCard from "../components/data-card";

export default async function Home() {
  const session = await getSession();
  if (!session) {
    redirect("/", RedirectType.replace);
  } else {
    const count: Counts = (await axios.get("http://localhost:3000/api/count"))
      .data.count;
    console.log("counts::", count);
    return (
      <>
        <div className="text-2xl font-semibold">
          Hey{" "}
          <span className="drop-shadow-[0_25px_25px_#0097a7] font-bold text-cyan-700 text-3xl">
            Admin
          </span>
          , welcome to{" "}
          <span className="drop-shadow-[0_25px_25px_#3b82f6] font-bold text-blue-500 text-3xl">
            ImmunAWARE
          </span>{" "}
          Dashboard.
        </div>
        <div className="text-2xl mt-3">How would you like to proceed?</div>
        <div className="flex-1 mt-3 grid grid-flow-row grid-cols-3 gap-5 p-3 items-center">
          {PROPERTIES.map((property) => (
            <DataCard
              key={property}
              property={property}
              value={`${count[property] ?? "Loading.."}`}
            />
          ))}
        </div>
      </>
    );
  }
}
