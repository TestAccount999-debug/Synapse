# Synapse ⚡

[![Next.js](https://img.shields.io/badge/Next.js-16.2.0-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-black?logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.2.0-black?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.45.2-black?logo=drizzle&logoColor=white)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-black?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Supabase](https://img.shields.io/badge/Supabase-v2.107-black?logo=supabase&logoColor=white)](https://supabase.com/)

**Synapse** is a modern, high-performance social networking platform built with **Next.js 16 (App Router)** and **React 19**. It features a custom **minimalist monochrome (black-and-white) UI design system** without hard borders, relying on spacing, grid systems, and subtle background shades to build high-contrast interfaces. 

---

## 🎨 Minimalist Monochrome UI Design System

Synapse incorporates a custom styling framework built with **Tailwind CSS v4**. Key principles include:

1. **Grayscale Theme Overrides**: The default Tailwind color utilities (e.g., `indigo`, `purple`, `slate`, `gray`) are mapped directly to grayscale values inside the Tailwind `@theme` configuration. This forces elements to automatically render in monochrome without requiring codebase-wide refactoring.
2. **Zero Border Policy**: Hard visual borders are avoided (`border-color: transparent !important`). Structure is achieved through clean layouts, subtle padding changes, responsive grid frameworks, and shadow levels.
3. **Fluid Layouts**: The dashboard and main feed stretch to use 100% of the screen dynamically, providing a modern, developer-tool-like layout.
4. **Contrast Controls**: High-readability solid black text `#000000` is contrasted with soft gray `#f3f4f6` accents and a solid white `#ffffff` background. Focus outlines default to high-contrast solid black.

---

## 🚀 Features

- **Interactive Feed**: Post sharing, including optional image uploads.
- **Engagement Mechanics**: Real-time interactions including **Likes**, **Reposts**, and **Bookmarks** for saving relevant posts.
- **Social Graph**: Full follow/unfollow capabilities to build standard user connections.
- **Real-Time Notification Hub**: In-app notifications alerting users to comments, likes, reposts, and new followers.
- **Advanced Commenting System**: Contextual discussion boxes on posts.
- **Profile Customization**: Detailed profiles supporting customizable banners, avatars (with preview mechanics), bios, external links, and locations.
- **Security & Validation**: Zod-based inputs, Next-auth / JWT tokens, and secure password hashing via `bcrypt`.
- **Feedback & Moderation**: Built-in reporting system for content moderation and dedicated user feedback forms.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16.2.0 (App Router)](https://nextjs.org/)
- **Core Library**: [React 19.2.4](https://react.dev/)
- **Styling**: [Tailwind CSS v4.2.0](https://tailwindcss.com/), [Lucide React Icons](https://lucide.dev/), [tw-animate-css](https://www.npmjs.com/package/tw-animate-css)
- **Database & ORM**: [Drizzle ORM v0.45.2](https://orm.drizzle.team/) with PostgreSQL (`pg` driver)
- **Authentication**: JWT-based secure session management and hashing (`bcrypt`, `jsonwebtoken`)
- **Storage / Backend**: [Supabase JS Client SDK](https://supabase.com/) for media storage
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) validation schemas
- **Primitives**: Radix UI primitive accessible components (Avatar, Dialog, Accordion, Dropdown Menu, etc.)

---

## 🗄️ Database Architecture

The Postgres schema is mapped out using Drizzle ORM inside the `/db/schema.ts` file, featuring the following relational tables:

```mermaid
erDiagram
    USERS {
        serial id PK
        text name UNIQUE
        text email UNIQUE
        text password
        text role
        text bio
        text website
        text location
        text avatar
        text banner
    }
    POSTS {
        serial id PK
        integer author_id FK
        text content
        timestamp created_at
        integer likes
        integer reposts
        text image
    }
    COMMENTS {
        serial id PK
        integer userId FK
        integer postId FK
        text content
        timestamp created_at
    }
    NOTIFICATIONS {
        serial id PK
        integer recipient_id FK
        integer sender_id FK
        text type
        integer post_id FK
        boolean is_read
        timestamp created_at
    }
    LIKES {
        integer userID FK
        integer postID FK
    }
    REPOSTS {
        integer userID FK
        integer postID FK
    }
    BOOKMARKS {
        integer userID FK
        integer postID FK
    }
    FOLLOWS {
        integer followerID FK
        integer followingID FK
        timestamp created_at
    }
    REPORTS {
        serial id PK
        integer reporterId FK
        integer postId FK
        text reason
        timestamp created_at
    }
    FEEDBACK {
        serial id PK
        integer user_id FK
        text email
        text content
        timestamp created_at
    }

    USERS ||--o{ POSTS : "author"
    USERS ||--o{ COMMENTS : "writes"
    POSTS ||--o{ COMMENTS : "has"
    USERS ||--o{ NOTIFICATIONS : "receives/sends"
    POSTS ||--o{ NOTIFICATIONS : "referenced"
    USERS ||--o{ LIKES : "likes"
    POSTS ||--o{ LIKES : "liked-by"
    USERS ||--o{ REPOSTS : "reposts"
    POSTS ||--o{ REPOSTS : "reposted-by"
    USERS ||--o{ BOOKMARKS : "saves"
    POSTS ||--o{ BOOKMARKS : "saved-in"
    USERS ||--o{ FOLLOWS : "follows/followed-by"
    USERS ||--o{ REPORTS : "reports"
    POSTS ||--o{ REPORTS : "reported"
    USERS ||--o{ FEEDBACK : "submits"
```

---

## 📂 Project Structure

```bash
Synapse/
├── app/                  # Next.js App Router folders and page entrypoints
│   ├── api/              # API Route Handlers (Feed, Comments, Profiles, Likes, Reports, etc.)
│   ├── feed/             # Feed layout page
│   ├── edit-profile/     # User settings dashboard
│   ├── profile/          # User profiles
│   ├── login/ / signup/  # Authentication views
│   ├── layout.tsx        # Base template layout
│   └── page.tsx          # Landing/Marketing page
├── components/           # Reusable React components
│   ├── social/           # Feature components (sidebar, post-card, comment-box, stories)
│   ├── ui/               # Radix UI primitives & styled components
│   └── theme-provider    # Next-themes implementation
├── db/                   # Drizzle ORM configurations and schemas
├── drizzle/              # Generated DB migrations
├── lib/                  # Library configurations (Supabase connection, image uploads, validators)
├── public/               # Static assets & illustrations
├── styles/               # Main CSS files
├── Dockerfile            # Container build specification
└── docker-compose.yaml   # Docker environment setup
```

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** (v18+ recommended)
- **pnpm** (Recommended) or npm/yarn
- **Docker & Docker Compose** (For running database and full app inside containers)

### 💻 Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/synapse.git
   cd synapse
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory by copying the `.env.example` template:
   ```bash
   cp .env.example .env
   ```
   Provide your local credentials:
   ```env
   DATABASE_URL=postgresql://abhipatel:0089@localhost:5432/synapse
   JWT_SECRET=your_secure_jwt_signing_key
   ```

4. **Start PostgreSQL Database (Docker)**:
   If you have Docker installed, you can spin up the alpine Postgres instance configured in `docker-compose.yaml`:
   ```bash
   docker compose up -d db
   ```

5. **Run Drizzle Migrations**:
   Push the Drizzle schemas into your local PostgreSQL database instance:
   ```bash
   pnpm drizzle-kit push
   ```

6. **Start the Development Server**:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to see your app running locally!

### 🐳 Run Entire App via Docker Compose

To spin up both the database and the web application in a fully isolated container setup, run:
```bash
docker compose up --build
```
The application will bundle, build, and run automatically. Connect via `http://localhost:3000`.

---

## 📝 License

This project is open-source and licensed under the [MIT License](LICENSE).
