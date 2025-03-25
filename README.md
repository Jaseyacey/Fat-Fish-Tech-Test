# Fat-Fish-Tech-Test
A Full Stack tech test for Fat Fish Digital Agency

## Project Overview
This is a CRUD (Create, Read, Update, Delete) application demonstrating modern full-stack development practices. The project showcases expertise in building scalable, maintainable, and performant applications using industry-standard technologies.

## Tech Stack

### Frontend
- **React Native (Expo)**: For cross-platform mobile application development
- **Redux**: State management
- **TanStack Query**: Server state management and data fetching
- **Styled Components**: Styling and theming
- **TypeScript**: Type-safe development
- **React Testing Library**: Testing utilities

### Backend
- **NodeJS**: Runtime environment
- **TypeScript**: Type-safe development
- **Serverless**: Cloud-native architecture
- **AWS**: Cloud infrastructure and services

## Project Structure
This project follows a monorepo structure, which is ideal for this small-scale application. The monorepo approach offers several benefits:
- Simplified dependency management
- Easier code sharing between frontend and backend
- Streamlined development workflow
- Unified versioning

For larger-scale applications, separate repositories would be recommended to allow for:
- Independent deployment cycles
- Separate team management
- Independent scaling
- More granular access control

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- AWS CLI (for backend deployment)
- Expo CLI

### Installation
1. Clone the repository
```bash
git clone [repository-url]
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

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

## Features
- User authentication and authorisation
- CRUD operations for resources
- Real-time updates
- Responsive design
- Type-safe development
- Comprehensive testing

## Architecture
The application follows a clean architecture pattern with:
- Clear separation of concerns
- Modular components
- Scalable folder structure
- Type-safe interfaces
- Comprehensive error handling

## Testing
- Unit tests with Jest
- Integration tests with React Testing Library
- E2E tests with Detox

## License
This project is licensed under the MIT License - see the LICENSE file for details.

