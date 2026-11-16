# Appointment Management Backend

A REST API built using Node.js, Express.js, and MongoDB to manage customer appointments.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS

## Project Structure

```text
Backend/
├── controllers/
│   └── appointmentController.js
├── models/
│   └── appointment.js
├── routes/
│   └── appointmentRoutes.js
├── .env
├── server.js
└── package.json
```

## API Base URL

`/api/appointments`

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/appointments` | Get all appointments |
| GET | `/api/appointments?status=Pending` | Filter appointments by status |
| POST | `/api/appointments` | Create a new appointment |
| PATCH | `/api/appointments/:id/status` | Update appointment status |

## Appointment Status

- Pending
- Confirmed
- Cancelled

## Appointment Data

| Field | Description |
|---|---|
| customerName | Customer's name |
| service | Requested service |
| dateTime | Appointment date and time |
| status | Current appointment status |

## Features

- Create customer appointments.
- View all appointments.
- Filter appointments by status.
- Update appointment status.
- Validate appointment details.
- Handle API errors.
- MongoDB database integration.
- Frontend integration through REST APIs.

## Environment Variables

- `PORT` – Backend server port.
- `MONGO_URI` – MongoDB connection string.
- `CLIENT_URL` – Frontend URL for CORS configuration.

## Deployment

Backend deployed on Vercel.

---

**Built with Node.js, Express.js & MongoDB.**