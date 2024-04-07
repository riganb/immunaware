const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Define the file path for the SQLite database
const dbPath = path.join(__dirname, "data.db");

// Create a new database instance in a file
const db = new sqlite3.Database(dbPath);

// Create tables
db.serialize(() => {
	// Create enum tables
	db.run(`CREATE TABLE IF NOT EXISTS v_type_enum (
        type TEXT PRIMARY KEY
    )`);

	db.run(`CREATE TABLE IF NOT EXISTS d_specialization_enum (
        specialization TEXT PRIMARY KEY
    )`);

	// Populate enum tables
	const vTypeValues = ["Inactivated", "mRNA", "Subunit", "Live", "Vector"];
	const vTypeInsertSql = `INSERT INTO v_type_enum(type) VALUES (?)`;
	vTypeValues.forEach((value) => {
		db.run(vTypeInsertSql, value, (err) => {
			if (err) {
				console.error("Error inserting vaccine type:", err);
			}
		});
	});

	const dSpecializationValues = ["Immunology", "Infectious Disease", "Public Health", "Travel Medicine", "Allergy"];
	const dSpecializationInsertSql = `INSERT INTO d_specialization_enum(specialization) VALUES (?)`;
	dSpecializationValues.forEach((value) => {
		db.run(dSpecializationInsertSql, value, (err) => {
			if (err) {
				console.error("Error inserting doctor specialization:", err);
			}
		});
	});

	// Create patient table
	db.run(`CREATE TABLE IF NOT EXISTS patient (
        aadhar TEXT PRIMARY KEY,
        name TEXT,
        yob INTEGER,
        email TEXT
    )`);

	// Create vaccine table
	db.run(`CREATE TABLE IF NOT EXISTS vaccine (
        vid TEXT PRIMARY KEY,
        name TEXT,
        manufacturer TEXT,
        type TEXT,
        dosage TEXT,
        FOREIGN KEY (type) REFERENCES v_type_enum(type)
    )`);

	// Create center table
	db.run(`CREATE TABLE IF NOT EXISTS center (
        cid TEXT PRIMARY KEY,
        name TEXT,
        location TEXT,
        capacity INTEGER
    )`);

	// Create doctor table
	db.run(`CREATE TABLE IF NOT EXISTS doctor (
        did TEXT PRIMARY KEY,
        name TEXT,
        center_id TEXT,
        email TEXT,
        specialization TEXT,
        FOREIGN KEY (center_id) REFERENCES center(cid),
        FOREIGN KEY (specialization) REFERENCES d_specialization_enum(specialization)
    )`);

	// Create record table
	db.run(`CREATE TABLE IF NOT EXISTS record (
        aadhar TEXT,
        vid TEXT,
        cid TEXT,
        did TEXT,
        date TEXT,
        FOREIGN KEY (aadhar) REFERENCES patient(aadhar),
        FOREIGN KEY (vid) REFERENCES vaccine(vid),
        FOREIGN KEY (cid) REFERENCES center(cid),
        FOREIGN KEY (did) REFERENCES doctor(did)
    )`);
});

// Insert sample data
db.serialize(() => {
	// Insert sample data for vaccines
	const vaccineValues = [
		["V001", "Covaxin", "Bharat Biotech", "Inactivated", "2 doses, 28 days apart"],
		["V002", "Covishield", "Serum Institute of India", "Viral vector", "2 doses, 28 days apart"],
		["V003", "Sputnik V", "Gamaleya Research Institute", "Viral vector", "2 doses, 21 days apart"],
		["V004", "Pfizer-BioNTech", "Pfizer, BioNTech", "mRNA", "2 doses, 21 days apart"],
		["V005", "Moderna", "Moderna, Inc.", "mRNA", "2 doses, 28 days apart"]
	];

	const vaccineInsertSql = `INSERT INTO vaccine(vid, name, manufacturer, type, dosage) VALUES (?, ?, ?, ?, ?)`;
	vaccineValues.forEach((values) => {
		db.run(vaccineInsertSql, values, (err) => {
			if (err) {
				console.error("Error inserting vaccine:", err);
			}
		});
	});

	// Insert sample data for centers
	const centerValues = [
		["C001", "Apollo Hospitals", "Chennai", 1000],
		["C002", "AIIMS", "Delhi", 1500],
		["C003", "Fortis Hospital", "Mumbai", 800],
		["C004", "Manipal Hospital", "Bangalore", 1200],
		["C005", "Ruby Hall Clinic", "Pune", 700]
	];

	const centerInsertSql = `INSERT INTO center(cid, name, location, capacity) VALUES (?, ?, ?, ?)`;
	centerValues.forEach((values) => {
		db.run(centerInsertSql, values, (err) => {
			if (err) {
				console.error("Error inserting center:", err);
			}
		});
	});

	// Insert sample data for doctors
	const doctorValues = [
		["D001", "Dr. Rajesh Gupta", "C001", "rajesh@example.com", "Immunology"],
		["D002", "Dr. Priya Sharma", "C002", "priya@example.com", "Infectious Disease"],
		["D003", "Dr. Sameer Patel", "C003", "sameer@example.com", "Public Health"],
		["D004", "Dr. Neha Singh", "C004", "neha@example.com", "Travel Medicine"],
		["D005", "Dr. Rahul Verma", "C005", "rahul@example.com", "Allergy"]
	];

	const doctorInsertSql = `INSERT INTO doctor(did, name, center_id, email, specialization) VALUES (?, ?, ?, ?, ?)`;
	doctorValues.forEach((values) => {
		db.run(doctorInsertSql, values, (err) => {
			if (err) {
				console.error("Error inserting doctor:", err);
			}
		});
	});

	// Insert sample data for patients with Indian names
	const patientValues = [
		["123456789012", "Arjun Kumar", 1985, "arjun@example.com"],
		["234567890123", "Ananya Patel", 1990, "ananya@example.com"],
		["345678901234", "Neha Sharma", 1978, "neha@example.com"],
		["456789012345", "Rohan Gupta", 1982, "rohan@example.com"],
		["567890123456", "Pooja Singh", 1987, "pooja@example.com"]
	];

	const patientInsertSql = `INSERT INTO patient(aadhar, name, yob, email) VALUES (?, ?, ?, ?)`;
	patientValues.forEach((values) => {
		db.run(patientInsertSql, values, (err) => {
			if (err) {
				console.error("Error inserting patient:", err);
			}
		});
	});

	// Insert sample data for records
	const recordValues = [
		["123456789012", "V001", "C001", "D001", "2023-01-15"],
		["234567890123", "V002", "C002", "D002", "2023-02-28"],
		["345678901234", "V003", "C003", "D003", "2023-03-12"],
		["456789012345", "V004", "C004", "D004", "2023-04-20"],
		["567890123456", "V005", "C005", "D005", "2023-05-05"]
	];

	const recordInsertSql = `INSERT INTO record(aadhar, vid, cid, did, date) VALUES (?, ?, ?, ?, ?)`;
	recordValues.forEach((values) => {
		db.run(recordInsertSql, values, (err) => {
			if (err) {
				console.error("Error inserting record:", err);
			}
		});
	});

	const createTriggerSql = `
    CREATE TRIGGER IF NOT EXISTS delete_doctor_trigger
    AFTER DELETE ON doctor
    FOR EACH ROW
    BEGIN
        UPDATE record
        SET did = NULL
        WHERE did = OLD.did;
    END;`;

	db.run(createTriggerSql, (err) => {
		if (err) {
			console.error("Error creating trigger:", err);
		} else {
			console.log("Trigger created successfully.");
		}
	});
});

// Close the database connection
db.close((err) => {
	if (err) {
		return console.error("Error closing database connection:", err.message);
	}
	console.log("Closed the database connection.");
});
