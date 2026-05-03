# 📌 Workspace Pro

A real-time collaborative workspace platform for managing goals, action items, announcements, and team productivity — built with a modern full-stack architecture.

---

## 🚀 Overview

Workspace Pro is a **Trello + Notion-style collaboration system** that allows teams to:

* Create and manage **goals and action items**
* Track progress using a **Kanban board**
* Collaborate through **real-time comments and announcements**
* See **live online users in a workspace**
* Analyze productivity with a **dashboard and charts**
* Export workspace data for reporting

Built for scalability, real-time collaboration, and clean separation of concerns.

---

## 🧠 Key Features

### 📋 Action Items (Kanban System)

* Create tasks with:

  * Assignee
  * Priority (Low / Medium / High)
  * Due date
  * Status (Todo / In Progress / Done)
* Link tasks to goals
* Drag-and-drop Kanban interface
* Real-time task updates across users

---

### ⚡ Real-Time Collaboration

* Live online users in workspace
* Socket-based updates for:

  * Action item changes
  * Comments
  * Announcements
* @Mention teammates in comments
* Instant notifications for mentions

---

### 📢 Announcements System

* Create workspace-wide announcements
* Pin important updates
* React with emojis
* Comment on posts
* Fully real-time updates via Socket.IO

---

### 📊 Analytics Dashboard

* Total goals in workspace
* Completed goals this week
* Overdue goals tracking
* Goal status distribution chart (Recharts)
* Export workspace data as CSV

---

### 👥 Workspace Management

* Multi-user workspace system
* Role-based access (Admin / Member)
* Invitations system
* Workspace-level isolation

---

## 🏗️ Tech Stack

### Frontend

* React / Next.js
* Zustand (state management)
* Axios (API calls)
* Socket.IO Client
* Recharts (data visualization)
* Tailwind CSS

---

### Backend

* Node.js + Express
* Prisma ORM
* PostgreSQL
* Socket.IO (real-time engine)
* JWT Authentication

---

## 🗄️ Database (Prisma)

Core models:

* User
* Workspace
* Goal
* ActionItem
* Announcement
* Comment
* Reaction
* Notification
* WorkspaceMember

---

## ⚙️ Real-Time Architecture

The system uses **Socket.IO rooms per workspace**:

```
workspace:{workspaceId}
```

Events:

* `action-moved`
* `action-updated`
* `comment-created`
* `announcement-created`
* `online-users`

---

## 📁 Project Structure

### Backend

```
/modules
  /actionItems
  /announcements
  /analytics
  /workspaces
/sockets
/prisma
```

### Frontend

```
/app
  /workspace
    /[id]
      /actions
      /analytics
/components
  /kanban
  /analytics
  /realtime
/store
```

---

## 🔥 Core Workflows

### 1. Task Flow

1. User creates action item
2. Stored in PostgreSQL via Prisma
3. Emitted via Socket.IO
4. Kanban board updates instantly

---

### 2. Real-Time Presence

1. User joins workspace
2. Socket joins workspace room
3. Server tracks online users
4. UI updates live user list

---

### 3. Analytics Flow

1. API aggregates goal + action data
2. Frontend renders charts via Recharts
3. CSV export available for reporting

---

## 📊 API Endpoints

### Action Items

```
POST   /action-items
GET    /action-items/:workspaceId
PATCH  /action-items/status/:id
PATCH  /action-items/assign/:id
PATCH  /action-items/move/:id
```

### Analytics

```
GET /analytics/stats/:workspaceId
GET /analytics/chart/:workspaceId
GET /analytics/export/:workspaceId
```

### Announcements

```
POST   /announcements
GET    /announcements/:workspaceId
PATCH  /announcements/pin/:id
POST   /announcements/comment
POST   /announcements/react
```

---

## 📦 Installation

### Backend

```bash
npm install
npx prisma generate
npm run dev
```

### Frontend

```bash
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend

```
DATABASE_URL=
JWT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 🌟 Highlights

* Real-time collaboration system
* Scalable workspace-based architecture
* Clean separation of server/client state
* Production-ready Prisma schema design
* Socket-driven UI updates
* Analytics + export system

---

## 🚀 Future Improvements

* Optimistic UI updates for Kanban
* Advanced role permissions (granular access control)
* Activity timeline (GitHub-style feed)
* File attachments in action items
* Email notifications system
* Mobile app (React Native)

---

## 🧑‍💻 Author

Built as a full-stack SaaS learning project focusing on:

* Real-time systems
* Scalable backend design
* Modern React architecture
* Production-level API design

---
