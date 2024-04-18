import {
  API_URL,
  PropsList,
  toTitleCase,
  UserHistoryData,
  VaccinationRecord,
} from "@/common";
import axios from "axios";
import Link from "next/link";

export default async function Wrong({
  searchParams,
}: {
  searchParams: { aadhar: string };
}) {
  const userData: UserHistoryData = (
    await axios.get(`${API_URL}/api/userdata/${searchParams.aadhar}`)
  ).data.data;
  return (
    <>
      <Link href={"/patient/login"}>
        <div className={`h-fit text-2xl hover:text-black`}>
          {"\u2190"} Go Back
        </div>
      </Link>
      <div className="text-2xl font-semibold mt-3">
        Hey{" "}
        <span className="drop-shadow-[0_25px_25px_#0097a7] font-bold text-cyan-700 text-3xl">
          {userData.name}
        </span>
        , here is your vaccination history:
      </div>
      <div className={`flex-1 w-full border-4 border-black rounded-lg mt-4`}>
        <table className={`w-full`}>
          <thead>
            <tr>
              {(PropsList["records"] as (keyof VaccinationRecord)[]).map(
                (centerProp) => (
                  <td
                    key={centerProp}
                    className={`text-white font-semibold bg-black text-center text-lg py-2`}
                  >
                    {toTitleCase(centerProp)}
                  </td>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {userData.history.map((item) => (
              <tr key={`${item.cid}-${item.did}-${item.vid}`}>
                {(PropsList["records"] as (keyof VaccinationRecord)[]).map(
                  (centerProp) => (
                    <td
                      className={`py-2 text-center text-lg border-2 border-black`}
                    >
                      {item[centerProp]}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
