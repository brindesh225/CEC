-- 1. Create DB
CREATE DATABASE IF NOT EXISTS mediassist CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mediassist;

-- 2. Patients
CREATE TABLE patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  age INT,
  gender ENUM('Male','Female','Other') DEFAULT 'Other',
  phone VARCHAR(30),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Doctors
CREATE TABLE doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  specialization VARCHAR(100),
  working_hours VARCHAR(100), -- simple text like "Mon-Fri 9:00-17:00"
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Appointments (also used for tokens for walk-ins)
CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,
  appointment_date DATE NOT NULL,
  time_slot VARCHAR(20), -- e.g. "09:30-09:45" or null for token
  token INT DEFAULT NULL, -- clinic token number for walk-ins
  status ENUM('waiting','in_consultation','completed','cancelled') DEFAULT 'waiting',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE
);

-- 5. Visit / EMR basics
CREATE TABLE visits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  appointment_id INT NOT NULL,
  symptoms TEXT,
  notes TEXT,
  prescription TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE
);

-- 6. Optional: indexes for performance
CREATE INDEX idx_appointments_doctor_date ON appointments (doctor_id, appointment_date);
