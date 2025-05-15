# SpeerCheck - Interview Scheduler

SpeerCheck is an internal tool for recruiters at Speer to schedule interviews with candidates based on the availability of team members. The application provides a clean, intuitive interface for managing the interview scheduling process.

![SpeerCheck Screenshot](/public/image.png)

## Features

### Core Functionality

- **Candidate Selection**: Choose from a dropdown of candidates
- **Weekly Calendar View**: Display availability for Monday-Friday, 9 AM-6 PM in 30-minute slots
- **Availability Visualization**: Clearly see overlapping availability between candidates and engineers
- **Interview Scheduling**: Select and confirm interview slots with a simple click
- **Confirmation System**: Review and confirm interview details before finalizing

### Advanced Features

- **Engineer Filtering**: Filter the calendar view by specific engineers
- **Interview Duration**: Select between 15, 30, or 60-minute interview slots
- **Slot Locking**: Scheduled interview slots are locked to prevent double-booking
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/speercheck.git
   cd speercheck
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [https://tryspeercheck.vercel.app](https://tryspeercheck.vercel.app) in your browser to see the application.

## Usage Guide

1. **Select a Candidate**: Use the dropdown at the top of the page to select a candidate.
2. **View Availability**: The calendar will display the weekly availability, highlighting slots where both the candidate and at least one engineer are available.
3. **Filter Engineers (Optional)**: Use the engineer filter to focus on specific team members.
4. **Select Interview Duration (Optional)**: Choose between 15, 30, or 60-minute interview slots.
5. **Schedule an Interview**: Click the "Schedule" button on an available time slot.
6. **Confirm Details**: Review the candidate, engineer, and time details in the confirmation dialog.
7. **Finalize**: Click "Confirm Interview" to schedule the interview.

## Technologies Used

- **React**: Frontend library for building the user interface
- **TypeScript**: Type-safe JavaScript for improved developer experience
- **Next.js**: React framework for server-rendered applications
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn/ui**: Component library for UI elements
- **Vitest**: Testing framework for unit tests

## Project Structure

```
speercheck/
├── app/                      # Next.js app directory
├── components/               # React components
│   ├── interview-scheduler.tsx       # Main scheduler component
│   ├── candidate-selector.tsx       # Candidate dropdown
│   ├── weekly-calendar.tsx          # Calendar view
│   ├── engineer-filter.tsx          # Engineer filter
│   └── schedule-confirmation.tsx    # Confirmation dialog
├── lib/                      # Utility functions and data
│   ├── types.ts                      # TypeScript type definitions
│   ├── data.ts                       # Mock data for candidates and engineers
│   ├── date-utils.ts                # Date formatting utilities
│   └── availability-utils.ts        # Availability calculation logic
└── tests/                   # Test files
    └── availability-utils.test.tsx  # Tests for availability logic
```

## Testing

The project includes unit tests for the core availability calculation logic. To run the tests:

```bash
npm run test
```

## Future Enhancements

- **API Integration**: Replace mock data with real API endpoints
- **Drag-and-Drop Scheduling**: Implement intuitive drag-and-drop functionality
- **Calendar Export**: Add ability to export scheduled interviews to calendar apps
- **Email Notifications**: Send automated notifications to candidates and engineers
- **Dark Mode**: Implement theme switching for better user experience
