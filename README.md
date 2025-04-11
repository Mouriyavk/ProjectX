# 🛠️ Project X Backend Team Tasks (Node.js + Express + PostgreSQL)

Welcome to the backend task breakdown for **Project X** — the daily college app that's more than just events. It's a vibe engine. This file outlines responsibilities, API goals, database logic, and who's doing what.

---

## 📦 Tech Stack

- **Language:** JavaScript (ES6+)
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (via Prisma ORM or Knex.js)
- **Authentication:** JWT + Sessions (optionally Passport.js)
- **File Uploads:** Cloudinary or S3 (optional)
- **Docs:** Swagger or Postman

---

## 👥 Team Roles & Responsibilities

### 1. 🔐 Auth & User Management (Dev A)

Handles everything related to user onboarding, authentication, and profile.

#### Tasks:
- User Registration (email/password or OTP)
- JWT-based login/logout
- Role system: user, organizer, admin
- Profile data: name, year, branch, interests, XP, etc.
- Session/token security & refresh

---

### 2. 📅 Event System (Dev B)

Responsible for the core event engine — CRUD, joining, and media.

#### Tasks:
- Create, Update, Delete events
- Join/Leave event endpoints
- Upload event images/media
- Filter/search events (date, type, location)
- Themed Event Templates (e.g., Broke Birthday Bash, etc.)

---

### 3. 💫 Hype Circle & Pulse Engine (Dev C)

Owns the logic for glow radius, dynamic pulse tracking, and Core/Orbit/Lurker zones.

#### Tasks:
- Real-time pulse tracking (attending, posting, scanning QR)
- Hype Circle zone classification (Core, Middle Orbit, Outer)
- XP → Glow Radius conversion (or Pulse Meter)
- Track movement within the Circle daily

---

### 4. 🏆 XP, Rewards, Streaks (Dev D)

Turns user activity into gamified rewards and unlockables.

#### Tasks:
- XP calculation engine (based on event actions)
- Event streak tracker (daily/weekly challenges)
- Reward unlocking system (food discounts, party perks)
- Secret event logic & “Black Mode” access
- "Top User" and clout logic

---

### 5. 🎭 Club & Collab Support (Dev E)

Builds tools to allow official college clubs to host or promote events.

#### Tasks:
- Club authentication + management
- Create/manage club events
- Invite-only club collab events
- Push collab updates to users
- Club perks & calendar sync

---

### 6. 📘 API Docs, Validation & Testing (Dev F)

Maintains clean, documented, and testable APIs for frontend integration.

#### Tasks:
- Swagger/Postman documentation
- Schema validation (Joi or Zod)
- Set up basic tests (Jest or Mocha)
- Endpoint response formatting
- API versioning & cleanup

---

## 🧱 PostgreSQL Schema Summary

- **Users**
  - id, name, email, passwordHash, xp, role, profilePic, year, branch, interests[]
- **Events**
  - id, title, description, hostId, date, location, tags[], media[], attendees[]
- **Pulse**
  - id, userId, eventId, type: ("host", "attend", "post", "react"), timestamp
- **Clubs**
  - id, name, type, members[], clubEvents[]
- **Rewards**
  - id, name, type, requiredXP, imageURL, unlockCode
- **Streaks**
  - id, userId, streakType, count, lastUpdated
- **SecretEvents**
  - id, name, clue, accessLevel, qrCode, rewardDrop

---

## 📌 Additional Notes

- All APIs should follow RESTful practices.
- Use PostgreSQL relationships for joins: `users ↔ events`, `users ↔ clubs`, etc.
- Consider caching Hype Circle zones with Redis for performance.

---

## ✅ Deployment Ready Checklist

- [ ] PostgreSQL schema migrations done
- [ ] Auth working securely
- [ ] Events endpoints CRUD-tested
- [ ] Hype Circle engine producing pulse scores
- [ ] XP & streaks correctly calculated
- [ ] All endpoints documented
- [ ] Ready for frontend consumption

---

Let’s build this hype machine. 🌀🔥

> _"Not just an app. A vibe. A lifestyle."_ – Project X
>
> Minor change for PR testing!
