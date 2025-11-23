const db = require('../config/db');

// Add Doctor
exports.addDoctor = async (req, res) => {
    try {
        const { name, specialization, availability } = req.body;

        const [result] = await db.execute(
            "INSERT INTO doctors (name, specialization, availability) VALUES (?,?,?)",
            [name, specialization, availability]
        );

        res.status(201).json({
            message: "Doctor added successfully",
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// Get All Doctors
exports.getAllDoctors = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM doctors");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// Get Doctor by ID
exports.getDoctorById = async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM doctors WHERE id = ?",
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// Update Doctor
exports.updateDoctor = async (req, res) => {
    try {
        const { name, specialization, availability } = req.body;

        await db.execute(
            "UPDATE doctors SET name=?, specialization=?, availability=? WHERE id=?",
            [name, specialization, availability, req.params.id]
        );

        res.json({ message: "Doctor updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// Delete Doctor
exports.deleteDoctor = async (req, res) => {
    try {
        await db.execute("DELETE FROM doctors WHERE id=?", [req.params.id]);

        res.json({ message: "Doctor removed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};
