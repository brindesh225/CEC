/* ============================
   1️⃣ SIGNUP FORM
============================ */
document.getElementById("signupForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPass", pass);

    alert("Signup successful! Redirecting to login...");
    window.location.href = "login.html";
});

/* ============================
   2️⃣ LOGIN FORM
============================ */
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPassword").value;

    const savedEmail = localStorage.getItem("userEmail");
    const savedPass = localStorage.getItem("userPass");

    if (email === savedEmail && pass === savedPass) {
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid email or password!");
    }
});

/* ============================
   3️⃣ REGISTRATION → APPOINTMENT
============================ */
document.getElementById("registrationForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Registration successful! Redirecting to appointment page...");
    window.location.href = "appointment.html";
});

/* ============================
   4️⃣ SYMPTOMS CHECKER
============================ */
document.getElementById("symptomsForm")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const input = document.getElementById("symptomsInput").value.toLowerCase();
    const resultsBox = document.getElementById("resultsBox");

    const conditions = {
        "fever": "Possible causes: Viral infection, flu, heat exhaustion.",
        "headache": "Possible causes: Migraine, dehydration, stress.",
        "cough": "Possible causes: Common cold, infection, allergies.",
        "stomach pain": "Possible causes: Indigestion, acidity, food poisoning.",
        "chest pain": "Possible causes: Muscle strain, acidity. If severe—seek help!"
    };

    let result = "No exact match found. Please describe symptoms clearly.";

    for (let key in conditions) {
        if (input.includes(key)) {
            result = conditions[key];
            break;
        }
    }

    resultsBox.style.display = "block";
    resultsBox.innerHTML = `
        <div class="result-item">
            <h3>Prediction</h3>
            <p>${result}</p>
        </div>
    `;
});

/* ============================
   5️⃣ DOCTOR AVAILABILITY & APPOINTMENTS
============================ */
const doctorSchedules = {
    "Dr. Sunil Sharma": ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM"],
    "Dr. Neha Rao": ["9:00 AM", "1:00 PM", "3:00 PM"],
    "Dr. Ajay Kumar": ["10:30 AM", "12:30 PM", "4:00 PM"],
    "Dr. Meera Das": ["11:00 AM", "2:30 PM", "5:00 PM"]
};

const doctorSelect = document.getElementById("doctorSelect");
const timeSelect = document.getElementById("timeSelect");
const appointmentForm = document.getElementById("appointmentForm");
const tokenBox = document.getElementById("tokenBox");
const tokenDetails = document.getElementById("tokenDetails");
const cancelBtn = document.getElementById("cancelBtn");
const rescheduleBtn = document.getElementById("rescheduleBtn");

let currentAppointment = null;

// Populate available times based on selected doctor
doctorSelect?.addEventListener("change", () => {
    const doctor = doctorSelect.value;
    timeSelect.innerHTML = `<option value="">Select Time</option>`;
    if (doctorSchedules[doctor]) {
        doctorSchedules[doctor].forEach(time => {
            const option = document.createElement("option");
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        });
    }
});

// Book appointment
appointmentForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("patientName").value;
    const age = document.getElementById("patientAge").value;
    const doctor = doctorSelect.value;
    const date = document.getElementById("dateSelect").value;
    const time = timeSelect.value;

    if (!doctor || !time) {
        alert("Please select a doctor and time.");
        return;
    }

    const tokenNumber = Math.floor(Math.random() * 9000) + 1000;

    tokenDetails.innerHTML = `
        <strong>Token No:</strong> ${tokenNumber}<br>
        <strong>Name:</strong> ${name} (Age ${age})<br>
        <strong>Doctor:</strong> ${doctor}<br>
        <strong>Date:</strong> ${date}<br>
        <strong>Time:</strong> ${time}
    `;
    tokenBox.style.display = "block";

    currentAppointment = { name, age, doctor, date, time, tokenNumber };

    // Save visit history
    const history = JSON.parse(localStorage.getItem("visitHistory") || "[]");
    history.push(currentAppointment);
    localStorage.setItem("visitHistory", JSON.stringify(history));
});

/* ============================
   6️⃣ CANCEL & RESCHEDULE
============================ */
cancelBtn?.addEventListener("click", () => {
    if (!currentAppointment) return;
    let history = JSON.parse(localStorage.getItem("visitHistory") || "[]");
    history = history.filter(h => h.tokenNumber !== currentAppointment.tokenNumber);
    localStorage.setItem("visitHistory", JSON.stringify(history));
    tokenBox.style.display = "none";
    alert("Appointment canceled ❌");
    currentAppointment = null;
});

rescheduleBtn?.addEventListener("click", () => {
    if (!currentAppointment) return;
    const newDate = prompt("Enter new date (YYYY-MM-DD):", currentAppointment.date);
    const newTime = prompt("Enter new time:", currentAppointment.time);
    if (newDate && newTime) {
        let history = JSON.parse(localStorage.getItem("visitHistory") || "[]");
        history = history.map(h => {
            if (h.tokenNumber === currentAppointment.tokenNumber) {
                h.date = newDate;
                h.time = newTime;
            }
            return h;
        });
        currentAppointment.date = newDate;
        currentAppointment.time = newTime;
        localStorage.setItem("visitHistory", JSON.stringify(history));
        tokenDetails.innerHTML = `
            <strong>Token No:</strong> ${currentAppointment.tokenNumber}<br>
            <strong>Name:</strong> ${currentAppointment.name} (Age ${currentAppointment.age})<br>
            <strong>Doctor:</strong> ${currentAppointment.doctor}<br>
            <strong>Date:</strong> ${currentAppointment.date}<br>
            <strong>Time:</strong> ${currentAppointment.time}
        `;
        alert("Appointment rescheduled successfully!");
    }
});

/* ============================
   7️⃣ DARK MODE TOGGLE
============================ */
document.getElementById("themeToggle")?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});