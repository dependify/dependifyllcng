from mangum import Mangum
from server import app

# Vercel serverless handler
handler = Mangum(app, lifespan="off")
