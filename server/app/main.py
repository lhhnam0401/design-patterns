from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Literal, Optional

from .models import Pattern
from .data import PATTERNS, PATTERNS_BY_SLUG

app = FastAPI(
    title="Design Patterns API",
    description="Vietnamese-themed Gang of Four design patterns API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:4173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

Category = Literal["creational", "structural", "behavioral"]


@app.get("/api/patterns", response_model=list[Pattern])
def list_patterns(
    category: Optional[Category] = None,
    complexity: Optional[Literal[1, 2, 3]] = None,
):
    """List all patterns, optionally filtered by category or complexity."""
    result = PATTERNS
    if category:
        result = [p for p in result if p.category == category]
    if complexity:
        result = [p for p in result if p.complexity == complexity]
    return result


@app.get("/api/patterns/{slug}", response_model=Pattern)
def get_pattern(slug: str):
    """Get a single pattern by its slug."""
    pattern = PATTERNS_BY_SLUG.get(slug)
    if not pattern:
        raise HTTPException(status_code=404, detail=f"Pattern '{slug}' not found")
    return pattern


@app.get("/api/categories")
def list_categories():
    """Return pattern counts per category."""
    from collections import Counter
    counts = Counter(p.category for p in PATTERNS)
    return {
        "creational": counts.get("creational", 0),
        "structural": counts.get("structural", 0),
        "behavioral": counts.get("behavioral", 0),
        "total": len(PATTERNS),
    }


@app.get("/health")
def health():
    return {"status": "ok", "patterns": len(PATTERNS)}
