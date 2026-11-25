from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Pattern content lives in the client (client/src/data). This app is kept as a
# skeleton for future API work and currently only reports its health.
app = FastAPI(
    title="Design Patterns API",
    description="Backend skeleton for the Vietnamese-themed design patterns site",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}
