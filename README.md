# LearnToGive Website

## Purpose & Context

**What is LearnToGive?**
LearnToGive (LTG) is a student-founded tutoring organisation established in 2023. It offers affordable online tutoring (£10/hour) across subjects including Mathematics, English, Economics, Chemistry, Physics, Computer Science, SAT, IB, GCSE, and A-Level curricula. 100% of tutoring proceeds fund scholarships for underprivileged students in rural Thailand — specifically in Mae Hong Son and Sakon Nakhorn provinces, two of the lowest-income areas in the country. The founder, Xander Morrissey, grew up in rural Thailand and delivers scholarships in person.

**The Threefold Impact Model:**
1. **Tutees** receive high-quality academic support.
2. **Thai scholars** receive 500 THB scholarships for essentials (shoes, uniforms, stationery).
3. **Tutors** gain teaching experience through the Feynman technique.

## What is This Website?

This is LearnToGive's official website — a React + TypeScript single-page application built with Vite and styled with Tailwind CSS. It serves as the organisation's public-facing platform to attract tutees, recruit tutors, accept donations, and showcase impact.

## Why the Website Was Created

The website exists to give LearnToGive a professional, credible online presence that:
- Converts visitors into tutees by clearly presenting services, pricing, and a booking flow (via Google Forms).
- Recruits volunteer tutors through a dedicated registration page (via Google Forms).
- Drives donations through JustGiving integration.
- Showcases real, live impact statistics pulled dynamically from Google Sheets (money raised in USD/THB, tutoring sessions completed, students supported).
- Introduces the team (4 core members) and the organisation's chapters in Thailand.
- Provides an AI chatbot assistant ("Adam", powered by Google Gemini 2.5 Flash) to answer visitor questions instantly and guide them to the right actions.

## Pages & Structure

- **Home** (`/`): Hero section, impact stats, testimonials, call-to-action buttons.
- **About** (`/about`): Mission, founding story, why Thailand, live impact stats, and chapters section.
- **Meet the Team** (`/team`): Team member cards with photos, titles, and bios.
- **Book a Lesson** (`/book`): Subject list, pricing, how-it-works steps, booking form link.
- **Become a Tutor** (`/join`): Why join, what we look for, application form link.
- **Donate** (`/donate`): Impact framing, JustGiving link, transparency promise.

## Key Technical Features

- **Live Statistics**: Fetched from a published Google Sheets CSV. 5-minute localStorage cache with multi-level fallback (fresh fetch → cached → stale cache → hardcoded defaults). Displayed in dual currency (USD + THB).
- **AI Chatbot "Adam"**: Gemini-powered assistant with a detailed system prompt containing live stats, chapter info, team expertise, and response guidelines. Streams responses with markdown rendering. Has suggested starter questions.
- **Responsive Design**: Mobile-first with sticky header, hamburger menu, and Tailwind breakpoints.

## The Team

- **Xander Morrissey** — Founder & CEO (Economics, Maths, Spanish)
- **Shijia Fan** — Outreach Lead & CTO (Maths, Chemistry, Computer Science)
- **Jaden Ayodele** — Advertisement Lead & CMO (Spanish, English, Maths)
- **Max St. Matthew Daniels** — Tutor & Coordinator (Chemistry, Maths, Physics)

## Chapters

- **TeachtoReach** (Pattaya) — 7 members at Rugby School Thailand, led by Sarute Amnuayruangsri, ฿11,300 raised.
- **Gifted** (Bangkok) — 10 members at Wellington College Bangkok, led by Jerry Sintuphandacha, ฿9,500 raised.

## What to Highlight

- The **100% proceeds donated** model — every penny from tutoring goes to Thai scholarships.
- **Purchasing power parity** — small UK contributions (e.g., £5 for school shoes) create outsized impact in rural Thailand.
- **Student-led and grassroots** — founded and run entirely by high school students.
- **In-person scholarship delivery** — the founder personally delivers aid, ensuring transparency and direct impact.
- **Growing chapter network** — expanding through student-led chapters across Thailand.
- **Live, transparent statistics** — the website pulls real-time figures from Google Sheets so impact numbers are always current.

## Contact

- **Email:** learntogiveedu@gmail.com
- **Instagram:** [@learntogive_](https://instagram.com/learntogive_)
- **TikTok:** [@learntogive_](https://tiktok.com/@learntogive_)
- **YouTube:** [@LearnToGiveOfficial](https://youtube.com/@LearnToGiveOfficial)
- **JustGiving:** [Donate here](https://www.justgiving.com/crowdfunding/learn-to-give)

## External Integrations

- Google Forms (booking + tutor registration)
- Google Sheets CSV (live statistics)
- Google Gemini API (chatbot)
- JustGiving (donations)

## Development

**Prerequisites:** Node.js

```bash
npm install
npm run dev
```

**Environment variables** (`.env.local`):
- `GEMINI_API_KEY` — For the AI chatbot
- `VITE_SHEETS_CSV_URL` — For live statistics from Google Sheets
