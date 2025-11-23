const db = require('../config/db');

// Register Patient
exports.registerPatient = async (req, res) => {
    try {
        const { full_name, age, gender, phone } = req.body;

        const [result] = await db.execute(
            "INSERT INTO patients (full_name, age, gender, phone) VALUES (?,?,?,?)",
            [full_name, age, gender, phone]
        );

        res.status(201).json({
            message: "Patient registered successfully",
            id: result.insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
};

// Get All Patients
exports.getAllPatients = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM patients");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// Get Patient by ID
exports.getPatientById = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM patients WHERE id = ?", [
            req.params.id
        ]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// Update Patient
exports.updatePatient = async (req, res) => {
    try {
        const { full_name, age, gender, phone } = req.body;

        await db.execute(
            "UPDATE patients SET full_name=?, age=?, gender=?, phone=? WHERE id=?",
            [full_name, age, gender, phone, req.params.id]
        );

        res.json({ message: "Patient updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// Delete Patient
exports.deletePatient = async (req, res) => {
    try {
        await db.execute("DELETE FROM patients WHERE id=?", [req.params.id]);

        res.json({ message: "Patient deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};
