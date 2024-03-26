import AddCenter from "@/app/components/add-center";
import AddDoctor from "@/app/components/add-doctor";
import AddPatient from "@/app/components/add-patient";
import AddRecord from "@/app/components/add-record";
import AddVaccine from "@/app/components/add-vaccine";
import { Property } from "@/common";

export default async function AddPage({
  params,
}: {
  params: { slug: Property };
}) {
  const slug = params.slug;
  if (slug === "records") {
    return <AddRecord />;
  } else if (slug === "patients") {
    return <AddPatient />;
  } else if (slug === "doctors") {
    return <AddDoctor />;
  } else if (slug === "centers") {
    return <AddCenter />;
  } else if (slug === "vaccines") {
    return <AddVaccine />;
  }
}
