export const ADMIN_EMAIL = "admin@immunaware.com";
export const ADMIN_PASSWORD = "admin"

export type Counts = {
	centers?: Number;
	doctors?: Number;
	patients?: Number;
	records?: Number;
	vaccines?: Number;
};

export type Property = (keyof Counts);

export const PROPERTIES: Property[] = ["records", "patients", "doctors", "centers", "vaccines"];

export const PropertyColours: Record<Property | "about", string> = {
	centers: "green",
	doctors: "blue",
	patients: "purple",
	records: "red",
	vaccines: "amber",
	about: "black"
};

export function toTitleCase(text: string): string {
	return text.charAt(0).toUpperCase() + text.slice(1);
};

export type Center = {
	cid: string;
	name: string;
	location: string;
	capacity: number;
};

export const CenterPropsList: (keyof Center)[] = ["cid", "name", "location", "capacity"];

export type Doctor = {
	did: string;
	name: string;
	center_id: string;
	email: string;
	specialization: string;
};

export const DoctorPropsList: (keyof Doctor)[] = ["did", "name", "center_id", "email", "specialization"];

export type Patient = {
	aadhar: string;
	name: string;
	yob: number;
	email: string;
};

export const PatientPropsList: (keyof Patient)[] = ["aadhar", "name", "yob", "email"];

export type VaccinationRecord = {
	aadhar: string;
	vid: string;
	cid: string;
	did: string;
	date: string;
};

export const VaccinationRecordPropsList: (keyof VaccinationRecord)[] = ["aadhar", "vid", "cid", "did", "date"];

export type Vaccine = {
	vid: string;
	name: string;
	manufacturer: string;
	type: string;
	dosage: string;
};

export const VaccinePropsList: (keyof Vaccine)[] = ["vid", "name", "manufacturer", "type", "dosage"];

export const PropsList: Record<Property, string[]> = {
	"centers": CenterPropsList,
	"doctors": DoctorPropsList,
	"patients": PatientPropsList,
	"records": VaccinationRecordPropsList,
	"vaccines": VaccinePropsList
}

export type OptionsDataForRecord = {
	centers: Center[]
	doctors: Doctor[],
	patients: Patient[],
	vaccines: Vaccine[],
}

export type OptionsDataForDoctor = {
	centers: Center[]
}

export type UserHistoryData = {
	name: string;
	history: VaccinationRecord[];
}
