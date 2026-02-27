# Setup Instructions for Tecobit Academy

## 1. Environment Setup

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` with your values:
- `DATABASE_URL`: Your MongoDB or PostgreSQL connection string
- `PAYLOAD_SECRET`: Generate a random secret (required for seeder)
- `NEXT_PUBLIC_SERVER_URL`: http://localhost:3000 (or your port)

## 2. Install Dependencies

```bash
pnpm install
```

## 3. Seed the Database

```bash
pnpm seed
```

## 4. Start Development Server

```bash
pnpm dev
```

## 5. Access the Application

- Frontend: http://localhost:3000 (or 3001 if 3000 is busy)
- Admin Panel: http://localhost:3000/admin

## Common UI Issues & Fixes

### Issue: Academy pages show no data
**Fix**: Run the seeder first to populate the database

### Issue: Navigation links don't work
**Fixed**: Updated component links to use `/academy/` prefix

### Issue: Missing styles or animations
**Fixed**: All CSS animations and utilities are included in globals.css

### Issue: Component errors
**Fixed**: All academy components exist and are properly typed

## Academy Routes

- `/academy` - Main academy page
- `/academy/courses` - Courses listing with filters
- `/academy/courses/[id]` - Individual course page
- `/academy/events` - Events listing
- `/academy/testimonials` - Testimonials
- `/academy/apply` - Application form

## Data Structure

The seeder creates:
- 4 Tracks (Programming, AI/ML, Web, Data Science)
- 10 Courses across all tracks
- 8 Batches for course enrollment
- 5 Lecturers with course assignments
- 6 Events (workshops, webinars, hackathons)
- 6 Student testimonials
- 3 Sample applications
