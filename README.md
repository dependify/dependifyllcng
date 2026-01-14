# Dependify LLC Nigeria

Nigeria's #1 Digital Growth Partner - LinkedIn optimization, content creation, and church CRM solutions.

## Live Site

https://dependifyllc.com.ng

## Tech Stack

- **Frontend**: React 18 with React Router
- **Backend**: FastAPI (Python) on Vercel Serverless
- **Database**: MongoDB
- **Styling**: Tailwind CSS with Shadcn UI components

## Database Schema

**Database**: MongoDB (via environment variable `MONGO_URL`)  
**Database Name**: `dependify` (via `DB_NAME` environment variable)

### Collections

#### `form_submissions`

Stores all contact form submissions from the website.

| Field     | Type     | Required | Description                      |
|-----------|----------|----------|----------------------------------|
| id        | UUID     | Yes      | Unique submission identifier     |
| name      | String   | Yes      | Full name of submitter           |
| email     | String   | Yes      | Email address                    |
| phone     | String   | Yes      | Phone number                     |
| company   | String   | No       | Company/Organization name        |
| service   | String   | Yes      | Service interested in            |
| message   | String   | Yes      | Message/goals description        |
| timestamp | DateTime | Yes      | Submission timestamp (UTC)       |
| source    | String   | Yes      | Source of submission ("website") |

**API Endpoints**:
- `POST /api/contact` - Submit a new form
- `GET /api/contact` - Retrieve all submissions

#### `status_checks`

System health check records.

| Field       | Type     | Required | Description              |
|-------------|----------|----------|--------------------------|
| id          | UUID     | Yes      | Unique identifier        |
| client_name | String   | Yes      | Client name              |
| timestamp   | DateTime | Yes      | Check timestamp (UTC)    |

## Environment Variables

```bash
MONGO_URL=mongodb+srv://...
DB_NAME=dependify
CORS_ORIGINS=*
```

## Development

```bash
# Frontend
cd frontend
yarn install
yarn start

# API (local)
pip install -r api/requirements.txt
uvicorn api.server:app --reload
```

## Deployment

Deployed on Vercel. Push to main branch triggers automatic deployment.

## AI Search Optimization

The site is optimized for AI-based search engines (ChatGPT, Perplexity, etc.):

- `/llms.txt` - AI agent context file
- `/robots.txt` - AI crawler permissions (GPTBot, PerplexityBot, Claude-Web)
- `/sitemap.xml` - Full site structure
- Speakable schema for voice assistants
