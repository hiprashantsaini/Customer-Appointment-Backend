const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: [true, "Customer name is required"],
            trim: true,
        },

        service: {
            type: String,
            required: [true, "Service is required"],
            trim: true,
        },

        dateTime: {
            type: Date,
            required: [true, "Appointment date and time are required"],
        },

        status: {
            type: String,
            enum: {
                values: ["Pending", "Confirmed", "Cancelled"],
                message: "Status must be Pending, Confirmed or Cancelled",
            },
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;