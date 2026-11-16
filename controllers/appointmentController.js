const Appointment = require("../models/Appointment");



// GET: Fetch all appointments / filter by status
const getAppointments = async (req, res) => {
    try {
        const { status } = req.query;

        const filter = {};

        if (status && status !== "All") {
            const allowedStatuses = [
                "Pending",
                "Confirmed",
                "Cancelled",
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid appointment status",
                });
            }

            filter.status = status;
        }

        const appointments = await Appointment.find(filter)
            .sort({ dateTime: 1 });

        return res.status(200).json({
            success: true,
            count: appointments.length,
            appointments,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch appointments",
            error: error.message,
        });
    }
};


// POST: Create new appointment
 const createAppointment = async (req, res) => {
    try {
        const { customerName, service, dateTime, status } = req.body;
        console.log("Received appointment data:", req.body);

        // Required field validation
        const errors = {};

        if (!customerName?.trim()) {
            errors.customerName = "Customer name is required";
        }

        if (!service?.trim()) {
            errors.service = "Service is required";
        }

        if (!dateTime) {
            errors.dateTime = "Appointment date and time is required";
        } else if (isNaN(new Date(dateTime).getTime())) {
            errors.dateTime = "Please enter a valid date and time";
        }

        if (
            status &&
            !["Pending", "Confirmed", "Cancelled"].includes(status)
        ) {
            errors.status = "Please select a valid appointment status";
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json({
                success: false,
                message: "Please fix the validation errors",
                errors,
            });
        }

        const appointment = await Appointment.create({
            customerName,
            service,
            dateTime,
            status: status || "Pending",
        });

        return res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            appointment,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create appointment",
            error: error.message,
        });
    }
};


// PATCH: Update appointment status
 const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Confirmed",
            "Cancelled",
        ];

        if (!status || !allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid status",
                errors: {
                    status: "Status must be Pending, Confirmed or Cancelled",
                },
            });
        }

        const appointment = await Appointment.findByIdAndUpdate(
            id,
            { status },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!appointment) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Appointment status updated successfully",
            appointment,
        });

    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment ID",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to update appointment status",
            error: error.message,
        });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    updateAppointmentStatus,
};
