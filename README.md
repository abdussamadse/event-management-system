🎉 Event Management System

A mini event management app built with Next.js.
Users can view, create, edit, delete, search, and RSVP to events.

🚀 Features

🏠 Home Page: View all events (system + user-created)

🔍 Search & Filter: Find events by title or category

📄 Event Details: View full event information

✏️ Create Event: Add new events (saved in localStorage)

🗂 My Events: Manage your created events (edit & delete)

🙋 RSVP System: Toggle RSVP (attend/cancel) with live attendee count

❤️ My RSVPs: See all events you RSVP’d to

🎨 Responsive design with Tailwind CSS

🛠 Tech Stack

Next.js
 – React framework for SSR & routing

React
 – UI components

Tailwind CSS
 – Styling

localStorage – Data persistence (events & RSVPs)

📂 Project Structure
event-management/
│── src/
│   ├── app/                        # Next.js App Router
│   │   ├── create-event/           # Create event page
│   │   │   └── page.tsx
│   │   ├── edit-event/[id]/        # Edit event page
│   │   │   └── page.tsx
│   │   ├── events/[id]/            # Event details page
│   │   │   └── page.tsx
│   │   ├── my-events/              # Manage created events
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css             # Global styles
│   │   └── page.tsx                # Home (all events + search/filter)
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── common/
│   │   │   └── Header.tsx
│   │   ├── createEvent/
│   │   │   └── EventForm.tsx
│   │   ├── editEvent/
│   │   │   └── EditEventForm.tsx
│   │   ├── home/
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventCardSkeleton.tsx
│   │   │   ├── EventList.tsx
│   │   │   └── SearchFilter.tsx
│   │   └── myEvents/
│   │       ├── MyEventCard.tsx
│   │       ├── MyEventCardSkeleton.tsx
│   │       └── MyEventList.tsx
│   │
│   ├── hooks/
│   │   └── useFilteredEvents.ts    # Custom hooks
│   │
│   ├── lib/
│   │   └── events.json             # Default system events
│   │
│   ├── stores/
│   │   └── eventStore.ts           # State management
│   │
│   ├── types/
│   │   └── event.ts                # Type definitions
│   │
│   └── utils/
│       └── localEvents.ts          # LocalStorage utilities
│
│── .gitignore
│── eslint.config.mjs
│── package.json
│── README.md

⚙️ Installation

Clone the repo and install dependencies:

git clone https://github.com/your-username/event-management.git
cd event-management
npm install

▶️ Running Locally

Start the development server:

npm run dev


By default, the app runs at:
👉 http://localhost:3000

🔧 Usage

View Events → Go to Home (/) to see all events.

Search/Filter → Use the search bar or category dropdown.

Create Event → Navigate to /create-event, fill the form, and save.

My Events → View, edit, or delete events you created.

RSVP → Click RSVP on any event to attend. Click again to cancel.

My RSVPs → View all events you RSVP’d to at /my-rsvps.

📦 Deployment

Deploy easily on Vercel
:

npm run build
npm start

📝 Evaluation Highlights

✅ Clean, modular code (components & hooks)

✅ Next.js features (routing, API, dynamic routes)

✅ State management via localStorage

✅ UI/UX with Tailwind CSS

✅ Full CRUD functionality

✅ RSVP system with persistence

✅ Bonus: “My RSVPs” page

👨‍💻 Author

Developed by Abdus Samad ✨
