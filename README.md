#  HelpDesk System

A **HelpDesk ticket management system** built with **Next.js and TypeScript**, designed to simulate a real-world technical support platform with **role-based access control**.

The application allows **Clients** and **Agents** to interact with tickets in a controlled and structured way, including authentication, ticket management, comments, and status tracking.

---

##  Preview

* Login screen with role-based access
* Client dashboard
* Agent dashboard
* Ticket creation and management
* Modern and responsive UI

---

##  Features

###  Authentication

* Login with email and password
* Role-based access control
* Automatic redirection based on user role
* Protected routes

### 👤 Client

* Create support tickets
* View own tickets
* Check ticket status and priority
* Add comments to tickets

### 🧑‍💼 Agent

* View all tickets
* Update ticket status (open / in_progress / closed)
* View ticket priority
* Add comments
* Access ticket history

---

## 🧰 Tech Stack

* **Next.js 14** (App Router)
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Zustand** (global state management)
* **Axios**
* **JSON Server** (mock backend)

---

## 🏗️ Project Architecture

* Uses **Next.js App Router**
* Views separated by user role:

  * `/login`
  * `/client`
  * `/agent`
* Authentication state managed with Zustand
* Reusable and modular components
* Modal-based UI for ticket creation and viewing
* Clean and scalable design

---

##  Project Structure

```bash
app/
├── login/
├── client/
├── agent/
├── api/
├── layout.tsx
├── page.tsx

components/
├── TicketCard.tsx
├── TicketCardAgent.tsx
├── CreateTicketModal.tsx
├── ViewTicketAgentModal.tsx
├── AddComment.tsx
├── ui/
│   ├── Badge.tsx
│   └── LogoutButton.tsx

store/
├── auth.ts

types/
├── ticket.ts
```

---

##  Authentication & Access Control

* Users are validated against a **JSON Server** mock database
* On successful login:

  * User data is stored in the global state (Zustand)
  * The user is redirected based on their role
* Route protection ensures:

  * Clients cannot access Agent routes
  * Agents cannot access Client routes

---

## 🗄️ Mock Database (JSON Server)

The project uses **JSON Server** as a simulated backend.

### Main entities:

* **users**
* **tickets**

### User example:

```json
{
  "id": "1",
  "email": "agent@example.com",
  "password": "agent1234",
  "role": "agent"
}
```

### Ticket example:

```json
{
  "id": 1,
  "title": "System access issue",
  "description": "I can't log into my account",
  "status": "open",
  "priority": "high",
  "comments": []
}
```

---

##  Test Credentials

###  Agent

* **Email:** [agent@example.com](mailto:agent@example.com)
* **Password:** agent1234

###  Client

* **Email:** [client@example.com](mailto:client@example.com)
* **Password:** client1234

---

##  Installation & Setup

1️⃣ Clone the repository:

```bash
git clone https://github.com/Nayib0/helpdesk.git
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Start JSON Server:

```bash
npx json-server --watch db.json --port 4000
```

4️⃣ Run the development server:

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

## 👨‍💻 Author

 **Nayib Obeso**
