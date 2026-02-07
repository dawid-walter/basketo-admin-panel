# Basketo Admin Panel

Admin panel for managing orders in the Basketo e-commerce platform.

## Features

- Admin authentication (email + password)
- Dashboard with statistics
- Orders management (view, filter, refresh)
- Responsive design
- Mobile-friendly

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- React Router DOM
- Axios
- React Hook Form + Zod
- date-fns
- Recharts

## Prerequisites

- Node.js 18+ and npm
- Backend API running at `http://localhost:8080`

## Environment Variables

Create a `.env.development` file:

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (default Vite port)

## Build

```bash
npm run build
```

## Default Admin Credentials

- **Email:** `admin@basketo.com`
- **Password:** `admin123`

(These are set in the backend. Change them after first login using the admin panel)

## Project Structure

```
src/
├── components/
│   ├── common/         # Reusable UI components (Button, Input, Card, etc.)
│   ├── layout/         # Layout components (Header, Navigation)
│   ├── auth/           # Authentication components (LoginForm)
│   ├── dashboard/      # Dashboard components (StatsCard, DashboardStats)
│   └── orders/         # Orders components (OrdersTable)
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   └── OrdersPage.tsx
├── services/
│   ├── api.ts          # Axios instance with interceptors
│   ├── auth.ts         # Authentication service
│   └── orders.ts       # Orders service
├── hooks/
│   ├── useAuth.ts      # Authentication hook
│   └── useOrders.ts    # Orders data fetching hook
├── types/
│   └── index.ts        # TypeScript types/interfaces
├── utils/
│   └── format.ts       # Formatting utilities
├── App.tsx             # Main app component with routing
└── main.tsx            # Entry point
```

## API Integration

The panel integrates with the following backend endpoints:

- `POST /api/admin/login` - Admin login
- `GET /api/admin/orders` - Get all orders (requires auth)
- `POST /api/admin/change-password` - Change admin password

## Features Details

### Dashboard
- Total orders count
- Total revenue (paid + shipped orders)
- Orders by status (created, paid, shipped, cancelled)
- Recent orders table (last 10)

### Orders Page
- View all orders
- Filter by status (All, Created, Paid, Shipped, Cancelled)
- Refresh data
- Sortable table with:
  - Order ID
  - Customer email
  - Items summary
  - Amount
  - Status badge
  - Date

### Authentication
- JWT token-based authentication
- Auto-redirect to login on 401
- Token stored in localStorage
- Protected routes

## Color Scheme

- Primary: Blue (#3B82F6)
- Success: Green (#10B981)
- Warning: Orange (Yellow for Created status)
- Error: Red (#EF4444)

## Future Enhancements

- Order details modal/page
- Export orders to CSV
- Date range filter
- Search by email or order ID
- Charts for revenue trends (Recharts)
- Admin user management
- Password change functionality
- Notifications/toasts for actions
