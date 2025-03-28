# Fat-Fish-Tech-Test

A full-stack CRUD app showcasing modern development practices using a scalable and maintainable architecture.

## Tech Stack

### Frontend
- **React Native (Expo)** – Cross-platform mobile development  
- **Redux** – Local state management  
- **TanStack Query** – Server state + data fetching  
- **TypeScript** – Type-safe development  
- **React Testing Library** – Frontend testing  

### Backend
- **Node.js + TypeScript** – Serverless backend  
- **Serverless Framework** – Cloud-native deployment  
- **AWS Lambda + API Gateway** – Compute + routing  
- **DynamoDB** – NoSQL data storage  

## Project Structure
```
Fat-Fish-Tech-Test/
├── apps/
│   ├── mobile/        # Expo app
│   │   ├── src/       # API, hooks, screens, types
│   │   └── tests/     # Frontend tests
│   └── backend/       # Serverless API
│       └── tests/     # Backend tests
└── package.json
```

## Features
- CRUD operations for todos  
- Real-time updates with redux and tanstack query  
- Clean, responsive design  
- Type-safe, modular architecture  
- Comprehensive test coverage  

## Testing

Run tests:
```bash
npm run tests:all         # All tests
cd apps/mobile && npm test # Frontend only
cd apps/backend && npm test # Backend only
```

## 📸 Screenshots

**All Tests Passing**  
<img src="images/Screenshot 2025-03-27 at 15.54.36.png" width="500" />

**Mobile App**  
<img src="images/Simulator Screenshot - iPhone 16 - 2025-03-28 at 09.03.14.png" width="300" />
<img src="images/Simulator Screenshot - iPhone 16 - 2025-03-28 at 09.03.30.png" width="300" />
<img src="images/Simulator Screenshot - iPhone 16 - 2025-03-28 at 09.03.44.png" width="300" />
<img src="images/Simulator Screenshot - iPhone 16 - 2025-03-28 at 09.03.55.png" width="300" />

## Getting Started

### Prerequisites
- Node.js (v18+), AWS CLI, Expo CLI

### Setup
```bash
git clone https://github.com/Jaseyacey/Fat-Fish-Tech-Test
cd Fat-Fish-Tech-Test
yarn install
cd apps/mobile
yarn install
cp .env.example .env

The API_URL can be retreived by running serverlessdeploy in backend/todo-api
```

Start mobile app:
```bash
cd apps/mobile
yarn run ios     # or yarn run android
```

## Improvements (if time allowed)
- Add pagination to `handler.ts`
- Search functionality in `TodoScreen`
- JWT authentication layer

## Architecture

### Frontend
- Custom hooks for clean data access  
- Type-safe APIs and reusable components  

### Backend
- Separate functions for each API operation  
- DynamoDB schema with efficient access patterns  

## License
MIT – See `LICENSE` file

## AWS Serverless Deployment

### Prerequisites
- AWS CLI installed and configured
- Serverless Framework CLI installed (`npm install -g serverless`)
- AWS credentials configured

### Deployment Steps

1. Navigate to the backend directory:
```bash
cd apps/backend/todo-api
```

2. Deploy the API:
```bash
serverless deploy
```

3. After deployment, you'll receive an API endpoint URL. Add this to your mobile app's environment variables:
```bash
API_URL_ENDPOINT=https://your-api-endpoint.execute-api.eu-north-1.amazonaws.com/dev
```

### AWS Resources Created
- Lambda Functions for CRUD operations
- DynamoDB Table for todo storage
- API Gateway endpoints
- IAM roles and policies

### Environment Variables
The following environment variables are required:
- `AWS_REGION`: eu-north-1 (default)
- `DYNAMODB_TABLE`: Todos (default)
