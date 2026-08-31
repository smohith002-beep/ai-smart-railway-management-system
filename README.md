# AI SMART RAILWAY MANAGEMENT SYSTEM
### Real-Time Railway Operations & AI Intelligence Platform

> **"Real-Time Railway Intelligence. Smarter Operations. Safer Journeys."**

**Lead Developer**: **MOHITH S**  
**Email**: [smohith002@gmail.com](mailto:smohith002@gmail.com)  
**Repository**: [https://github.com/smohith002-beep/ai-smart-railway-management-system](https://github.com/smohith002-beep/ai-smart-railway-management-system)

---

## 🚄 Overview

The **AI Smart Railway Management System** is a mission-critical, enterprise-grade Railway Operations and Real-Time Train Intelligence Platform designed for high-density railway networks. It combines **authoritative real-time train tracking (Zero-Fabrication Rule)**, **23-Role Role-Based Access Control (RBAC)**, **biometric geofenced staff attendance**, **automated crew duty rostering with 12-hour rest conflict detection (HOER)**, **network-wide emergency incident command**, and an **AI Railway Operations Copilot** guarded by strict Rule 42 safety protocols.

---

## 🌟 Core Features

- **Documentary-Grade Realistic Cinematic Intro**:
  - 6-shot atmospheric sequence featuring authentic high-speed electric locomotives (Vande Bharat / WAP-7), wet steel tracks, catenary wires, volumetric headlights, and audio ambience.
  - Skip Intro and Reduced Motion accessibility controls.

- **Monochrome Industrial Command Center**:
  - Luxury Black (`#000000`) & White (`#FFFFFF`) aesthetic with clean typography powered by **Inter**.
  - Subtle operational status indicators (`● LIVE`, `▲ WARNING`, `■ CRITICAL`).

- **Interactive GIS Live Railway Map**:
  - Dark-mode CartoDB map with live train beacons, heading vectors, speed gauges, white corridor track vectors, station nodes, and slide-out telemetry HUD inspector.

- **23-Role RBAC & Custom Command Consoles**:
  - Custom operations desks for Super Admin, Railway Admin, Zonal Admin, DRM, Station Master, Assistant Station Master, Train Controller, Loco Pilot, Assistant Loco Pilot (ALP), Train Manager / Guard, TTE, TE, RPF Security, Maintenance (S&T, OHE, P-Way, C&W), Emergency Medical, HR Staff Admin, Contractor, and Passenger.

- **Database-Backed Staff Attendance Ledger**:
  - Geofenced GPS punch verification, status tracking (`PRESENT`, `ON_DUTY`, `OFF_DUTY`, `LEAVE`, `SICK_LEAVE`), and supervisor adjustment ledger with permanent audit records.

- **Duty Roster & Automated Conflict Detection**:
  - Enforces statutory 12-hour mandatory rest (HOER), medical fitness categories (A-1), and rolling-stock qualifications with replacement audit trails.

- **AI Railway Operations Copilot**:
  - Conversational natural language assistant querying live train telemetry, delays, crew rosters, and incident triage. Enforces Rule 42 safety guardrails refusing autonomous signal or route dispatch.

- **Emergency Incident Command & TSR Broadcaster**:
  - Full incident lifecycle (`Reported` → `Acknowledged` → `Assigned` → `Responding` → `Resolved`), ARMV trauma bed triage, and Temporary Speed Restriction (TSR) broadcaster.

- **Sandboxed Simulation Lab & Data Health Diagnostics**:
  - Dedicated training room with persistent `⚠ SIMULATION MODE` banner for drill injections.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Typography**: Inter (100–900 weights)
- **Styling**: Tailwind CSS (Monochrome Industrial Design Tokens)
- **Mapping**: Leaflet, React-Leaflet, CartoDB Dark Matter
- **Icons**: Lucide React
- **Database & Realtime**: Supabase PostgreSQL (30+ tables, RLS policies, Realtime pub/sub)
- **Audio Engine**: Web Audio API Procedural Synthesizer (Locomotive Dual-tone Air Horn, Station Chimes)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/smohith002-beep/ai-smart-railway-management-system.git

# Navigate to directory
cd ai-smart-railway-management-system

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Build for Production
```bash
npm run build
```

---

## 📱 USB ANDROID SETUP (One-Click Installation)

Deploy and run the authentic **Smart Railway Live Android App** on your physical phone over USB with a single command.

### First-Time Phone Setup (Only 1 Minute):
1. **Enable Developer Options**: Go to `Settings` -> `About Phone` -> Tap `Build Number` **7 times**.
2. **Enable USB Debugging**: Go to `Settings` -> `Developer Options` -> Turn ON **USB Debugging**.
3. **Connect to Laptop**: Connect your phone to your laptop using a standard USB data cable.
4. **Authorize Connection**: Unlock your phone and tap **"Allow"** when the *"Allow USB debugging?"* prompt appears.

### One-Click USB Build & Launch:
Run either of the following commands in your terminal:
```bash
npm run android:usb
```
*or:*
```bash
npm run device:run
```

*(Windows users can also double-click `scripts\run-android-usb.bat`)*

### What the Automated Script Does:
1. Detects your connected Android device and checks authorization.
2. Automatically sets up USB reverse port forwarding (`adb reverse tcp:5173 tcp:5173`).
3. Compiles the web bundle and synchronizes Capacitor native plugins.
4. Builds the native Android APK (`app-debug.apk`) via Gradle.
5. Installs/updates the APK on your phone without losing data.
6. Automatically launches **Smart Railway Live** directly on your phone's screen!

---

## 📂 Project Structure

```text
├── public/
│   └── assets/images/         # Realistic cinematic railway photographic assets
├── src/
│   ├── components/
│   │   ├── admin/             # Data Source Health & Audit Log viewers
│   │   ├── analytics/         # Punctuality & MTTR Analytics Suite
│   │   ├── cinematic/         # Documentary photographic intro sequence
│   │   ├── common/            # Minimalist Railway AI Logo
│   │   ├── copilot/           # AI Railway Operations Copilot
│   │   ├── dashboards/        # 23-Role Command Center dashboards
│   │   ├── duty/              # Duty Roster & Crew Conflict Matrix
│   │   ├── emergency/         # Crisis triage & TSR broadcaster
│   │   ├── landing/           # Enterprise Landing Hero Page
│   │   ├── layout/            # Header, Sidebar, Footer
│   │   ├── map/               # Dark GIS Live Railway Map
│   │   ├── modals/            # Auth & Info Dialogs
│   │   ├── roles/             # 23-Role Switcher Modal
│   │   ├── simulation/        # Sandboxed Simulation Lab
│   │   ├── staff/             # Permanent Staff Attendance Ledger
│   │   └── trains/            # Train Registry & Details Inspector
│   ├── config/                # 23-Role metadata & permissions configuration
│   ├── context/               # AuthContext & RailwayContext state engines
│   ├── services/
│   │   ├── ai/                # Railway Copilot Rule 42 Guardrails Service
│   │   ├── crew/              # Conflict Detection Engine
│   │   ├── provider/          # Data Validation, Normalization & Freshness Checker
│   │   ├── sound/             # Web Audio API Sound Synthesizer
│   │   └── supabase/          # Supabase Client & Realtime Sync
│   ├── types/                 # TypeScript Data Models
│   ├── App.tsx                # Master View Orchestrator
│   ├── index.css              # Global Black & White Inter Typography
│   └── main.tsx               # Application Entry Point
├── supabase/
│   └── schema.sql             # PostgreSQL Schema with 30+ tables & RLS
└── package.json
```

---

## 📄 License & Attribution

Developed by **MOHITH S** ([smohith002@gmail.com](mailto:smohith002@gmail.com)).  
All rights reserved © 2026.
