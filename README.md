# Ride Booking System

A full-stack ride booking system (like Uber/Pathao) with **role-based access**, driver management, ride tracking, analytics, and an admin dashboard. Built with **Node.js (Express)**, **TypeScript**, **MongoDB (Mongoose)**, **React**, **RTK Query**, and **TailwindCSS**.

---

## 🌐 Live Deployment

- **Frontend (Admin & Driver dashboards):** [https://ride-booking-frontend-showorv-showorvs-projects.vercel.app](https://ride-booking-frontend-showorv-showorvs-projects.vercel.app)  
- **Backend API:** [https://ride-booking-api-backend.vercel.app](https://ride-booking-api-backend.vercel.app)

---

## 🎯 Project Overview

This project implements a scalable ride booking system that supports three roles: **Rider**, **Driver**, and **Admin**.  
It allows riders to book rides, drivers to manage rides and availability, and admins to oversee all system operations, including analytics.

---

## 🚀 Features

### General Features
- The system uses role-based access to secure routes.
- Pagination & search is supported for users, drivers, and rides.
- Analytics visualizations use Recharts, and charts automatically update with API data.

### Rider Features
- Request rides with pickup & drop locations.
- Cancel rides before pickup.
- View ride history.
- Check ride status & fare.

### Driver Features
- Accept/reject ride requests.
- Toggle online/offline availability.
- Update ride status: PickedUp → InTransit → Completed.
- View earnings history with detailed timestamps.
- View ride history with filters.

### Admin Features
- User Management: block/unblock riders.
- Driver Management: approve/suspend drivers.
- Ride Oversight: view all rides with filtering by date, status, driver, or rider.
- Analytics Dashboard:
  - Total rides, total users, total drivers.
  - Data visualizations for ride volume, revenue, and driver activity (Recharts).
- Search, pagination, and filter support across all dashboards.

---

## 🛠 Technology Stack

- **React** (Vite/CRA)
- **TypeScript**
- **TailwindCSS** for UI styling
- **Framer Motion** for animations
- **ShadCN UI components**
- **RTK Query** for API data fetching
- **Recharts** for analytics visualization

---

## ⚙️ Setup Instructions

1. Clone the repo and navigate to the frontend folder:

```bash
git clone https://github.com/showorv/Ride_Booking_Frontend.git

cd ../ride-booking-frontend

npm install

```
2. Create a .env file (if needed):

```bash
VITE_API_BASE_URL=https://yourbackendlink.com
```
3. Start development server:

```bash
npm run dev
```
---

## Credentials

```bash

## Super Admin
SUPER_ADMIN_EMAIL=yousufshowrov994@gmail.com
SUPER_ADMIN_PASSWORD=yousuf12

## Rider

RIDER_EMAIL=yousufshowrov101@gmail.com
RIDER_PASSWORD=Hello12

## Driver

DRIVER_EMAIL=yshowrov7@gmail.com
DRIVER_PASSWORD=Hello23

```
## 🧑‍💻 Author

**Yousuf Showrov**

Feel free to reach out on `GitHub` or `LinkedIn` for suggestions or contributions.