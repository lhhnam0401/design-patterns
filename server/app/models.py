from pydantic import BaseModel
from typing import Literal, Optional


class LocalizedText(BaseModel):
    en: str
    vi: str


class CodeExample(BaseModel):
    language: str
    code: str
    label: Optional[str] = None


class VietnameseExample(BaseModel):
    title: LocalizedText
    description: LocalizedText
    illustration: str


class Pattern(BaseModel):
    id: str
    name: LocalizedText
    category: Literal["creational", "structural", "behavioral"]
    slug: str
    complexity: Literal[1, 2, 3]
    popularity: Literal[1, 2, 3]
    also_known_as: list[LocalizedText] = []
    intent: LocalizedText
    problem: LocalizedText
    solution: LocalizedText
    applicability: LocalizedText
    vietnamese_example: VietnameseExample
    code_examples: list[CodeExample]
    structure_notes: LocalizedText
