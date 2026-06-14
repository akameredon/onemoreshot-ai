# OneMoreShot.ai - AI Music Video Generator MVP

Transform your audio songs into stunning AI-generated music videos with customizable AI artists and multiple video styles.

## 🎯 Features

- 🎬 Multiple video types (Performance, Lyrics, Cinematic)
- 🎨 AI Artist generation from reference photos
- 🎵 Automatic lip-sync and face animation
- 💳 Credit/token-based system
- 📱 Mobile-first responsive design
- 🔐 User authentication & JWT tokens
- 📊 Artist library management
- ⚡ Real-time video processing queue

## 🛠 Tech Stack

### Frontend
- React 18+ with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Zustand for state management
- Axios for API calls

### Backend
- Node.js + Express
- PostgreSQL for data persistence
- Redis for caching & queues
- JWT Authentication
- Bull Queue for async video processing

### Infrastructure
- Docker & Docker Compose
- Containerized services
- Multi-stage builds

## 📁 Project Structure

```
onemoreshot-ai/
├── backend/
│   ├── src/
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth, error handling
│   │   └── index.ts         # Server entry
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Route pages
│   │   ├── services/        # API calls
│   │   ├── store/           # Zustand state
│   │   └── App.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── index.html
├── docker-compose.yml
└── .gitignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Using Docker Compose (Recommended)

```bash
# Clone repository
git clone https://github.com/akameredon/onemoreshot-ai.git
cd onemoreshot-ai

# Start all services
docker-compose up

# Wait for services to be ready (~30 seconds)
```

### Access Points
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Docs**: http://localhost:3000/api
- **Database**: postgres://localhost:5432
- **Redis**: localhost:6379

### Local Development (Without Docker)

#### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📝 API Endpoints

### Authentication (`/api/auth`)
```
POST   /register          - Create new user account
POST   /login             - Login with email & password
GET    /me                - Get current user (requires auth)
```

### Artists (`/api/artists`)
```
GET    /                  - List all public artists
GET    /my-artists        - List user's private artists
GET    /:id               - Get artist details
POST   /                  - Create new AI artist
PUT    /:id               - Update artist
DELETE /:id               - Delete artist
```

### Videos (`/api/videos`)
```
GET    /                  - List user's videos
GET    /:id               - Get video details
POST   /generate          - Start video generation
DELETE /:id               - Delete video
```

### Credits (`/api/credits`)
```
GET    /balance           - Get user's credit balance
POST   /purchase          - Purchase credits
```

## 🔐 Authentication

Uses JWT (JSON Web Tokens):

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in Zustand state (persists in localStorage)
4. Token sent in `Authorization: Bearer <token>` header
5. Backend validates token for protected routes

## 💾 Environment Variables

### Backend (`backend/.env`)
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/onemoreshot_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRY=7d
```

### Frontend (`frontend/.env.local`)
```env
VITE_API_URL=http://localhost:3000/api
```

## 📊 Data Models

### User
- id (UUID)
- email (unique)
- name
- password (hashed)
- credits (starting: 10)
- createdAt

### Artist
- id (UUID)
- userId (owner)
- name
- style (Realistic/Illustrated)
- description
- bio
- referencePhotos (URLs)
- isPublic (boolean)
- createdAt, updatedAt

### Video
- id (UUID)
- userId (owner)
- artistId
- videoType (performance/lyrics)
- audioFile (URL)
- status (processing/completed/failed)
- creditsUsed (10 or 25)
- createdAt, updatedAt

## 🎬 Video Creation Flow

1. **Step 1**: Select video type (Performance or Lyrics)
2. **Step 2**: Choose or create AI artist
3. **Step 3**: Upload audio file
4. **Step 4**: Customize video settings
5. **Generate**: Submit to processing queue
6. **Output**: Download completed video

## 💳 Credits System

- New users get **10 free credits**
- Performance videos: **10 credits**
- Lyrics videos: **25 credits**
- Users can purchase more credits
- Stripe integration ready (placeholder)

## 🔄 State Management

Using Zustand for global state:
- User authentication
- Token storage
- User profile data
- Credits balance

Persists to localStorage automatically.

## 🚧 Next Steps for Production

1. **Database**: Migrate from in-memory to PostgreSQL
2. **Video Generation API**: Integrate Runway, Synthesia, or Pika
3. **File Storage**: AWS S3 for audio/video files
4. **Payment**: Stripe integration for credit purchases
5. **Email**: SendGrid/Mailgun notifications
6. **Monitoring**: Sentry for error tracking
7. **Analytics**: PostHog or Mixpanel
8. **CDN**: CloudFront for fast video delivery
9. **Authentication**: OAuth providers (Google, GitHub)
10. **Deployment**: AWS ECS, Railway, or Vercel

## 📚 Documentation

- [Backend Setup](./backend/README.md) - Coming soon
- [Frontend Setup](./frontend/README.md) - Coming soon
- [API Documentation](./docs/API.md) - Coming soon

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

Created for OneMoreShot.ai project

## 🆘 Support

For issues and questions:
- Open a GitHub issue
- Check existing documentation
- Review API examples

---

**Happy Video Creating! 🎬✨**
