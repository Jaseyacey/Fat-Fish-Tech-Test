# Fat-Fish-Tech-Test
A Full Stack tech test for the Fat Fish Digital Agency

## Project Overview
This is a CRUD (Create, Read, Update, Delete) application demonstrating modern full-stack development practices. The project showcases expertise in building scalable, maintainable, and performant applications using industry-standard technologies.

## Tech Stack

### Frontend
- **React Native (Expo)**: For cross-platform mobile application development
- **Redux**: For local state management
- **TanStack Query**: Server state management and data fetching
- **TypeScript**: Type-safe development
- **React Testing Library**: Testing utilities

### Backend
- **NodeJS**: Runtime environment
- **TypeScript**: Type-safe development
- **Serverless Framework**: Cloud-native architecture
- **AWS Lambda**: Serverless compute
- **DynamoDB**: NoSQL database
- **API Gateway**: REST API management

## Project Structure
```
Fat-Fish-Tech-Test/
├── apps/
│   ├── mobile/           # React Native mobile app
│   │   ├── src/
│   │   │   ├── api/     # API integration
│   │   │   ├── hooks/   # Custom React hooks
│   │   │   ├── screens/ # App screens
│   │   │   └── types/   # TypeScript types
│   │   └── tests/       # Frontend tests
│   └── backend/         # Serverless backend
│       ├── todo-api/    # Todo API Lambda functions
│       └── tests/       # Backend tests
└── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- AWS CLI (for backend deployment)
- Expo CLI

### Installation

1. Clone the repository
```bash
git clone [https://github.com/Jaseyacey/Fat-Fish-Tech-Test]
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
```
The API endpoint will be provided separately.

4. Start the development server
```bash
# Start the mobile app
cd apps/mobile
npm run ios     # For iOS
npm run android # For Android
```

## Features
- Create, read, update, and delete todos
- Real-time updates using TanStack Query
- Optimistic updates for better UX
- Type-safe development with TypeScript
- Comprehensive test coverage
- Clean and modern UI design

## Testing

### Running Tests
```bash
# Run all tests
npm run tests:all

# Run frontend tests only
cd apps/mobile
npm test

# Run backend tests only
cd apps/backend
npm test
```
### Screenshots

## Application Screenshots

### Mobile App Screenshots
<div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
  <img src="images/Simulator Screenshot - iPhone 16 - 2025-03-28 at 09.03.14.png" alt="Todo List Screen" width="300" />
  <img src="images/Simulator Screenshot - iPhone 16 - 2025-03-28 at 09.03.30.png" alt="Add Todo Screen" width="300" />
  <img src="images/Simulator Screenshot - iPhone 16 - 2025-03-28 at 09.03.44.png" alt="Edit Todo Screen" width="300" />
  <img src="images/Simulator Screenshot - iPhone 16 - 2025-03-28 at 09.03.55.png" alt="Delete Todo Screen" width="300" />
</div>

### Tests Passing Screenshots
<img src="images/Screenshot 2025-03-27 at 15.54.36.png" alt="Application Architecture" style="max-width: 100%; height: auto;" />

### Test Coverage
- Unit tests for API functions
- Integration tests for React components
- End-to-end tests for critical user flows

## Architecture

### Frontend Architecture
- Clean component structure
- Custom hooks for data fetching
- Type-safe API integration
- Responsive design patterns

### Backend Architecture
- Serverless functions for each operation
- DynamoDB for data storage
- API Gateway for REST endpoints
- TypeScript for type safety

## License
This project is licensed under the MIT License - see the LICENSE file for details.
