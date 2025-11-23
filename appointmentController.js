const db = require('../config/db');

// Book Appointment
exports.bookAppointment = async (req, res) => {
    try {
        const { patient_id, doctor_id, appointment_time, status } = req.body;

        const [result] = await db.execute(
            "INSERT INTO appointments (patient_id, doctor_id, appointment_time, status) VALUES (?,?,?,?)",
            [patient_id, doctor_id, appointment_time, status || "Waiting"]
        );

        res.status(201).json({
            message: "Appointment booked successfully",
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// Get All Appointments
exports.getAllAppointments = async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT a.id, p.full_name AS patient, d.name AS doctor, 
                   a.appointment_time, a.status
            FROM appointments a
            JOIN patients p ON a.patient_id = p.id
            JOIN doctors d ON a.doctor_id = d.id
        `);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// Update Appointment Status
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        await db.execute(
            "UPDATE appointments SET status=? WHERE id=?",
            [status, req.params.id]
        );

        res.json({ message: "Appointment status updated" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};

// Cancel Appointment
exports.cancelAppointment = async (req, res) => {
    try {
        await db.execute("DELETE FROM appointments WHERE id=?", [
            req.params.id
        ]);

        res.json({ message: "Appointment cancelled" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
};
