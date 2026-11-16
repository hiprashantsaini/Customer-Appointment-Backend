const express = require("express");

const { getAppointments, createAppointment, updateAppointmentStatus } = require("../controllers/appointmentController");
const router = express.Router();

// GET all appointments or filter by status
router.get("/", getAppointments);

// POST create appointment
router.post("/", createAppointment);

// PATCH update appointment status
router.patch("/:id/status", updateAppointmentStatus);

module.exports = router;