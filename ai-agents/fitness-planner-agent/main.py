from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from groq import Groq
import os

load_dotenv()

app = FastAPI()

# ---------------- MODELS ----------------

class FitnessPlanRequest(BaseModel):
    age: int
    height: float
    weight: float
    sex: str
    activity_level: str
    dietary_preferences: str
    fitness_goals: str
    groq_api_key: str | None = None


class FitnessPlanResponse(BaseModel):
    dietary_plan: str
    fitness_plan: str


# ---------------- MAIN ENDPOINT ----------------

@app.post("/generate-plan", response_model=FitnessPlanResponse)
def generate_fitness_plan(payload: FitnessPlanRequest):

    groq_key = payload.groq_api_key or os.getenv("GROQ_API_KEY")
    if not groq_key:
        raise HTTPException(status_code=400, detail="Groq API key missing")

    client = Groq(api_key=groq_key)

    user_profile = f"""
Age: {payload.age}
Height: {payload.height} cm
Weight: {payload.weight} kg
Sex: {payload.sex}
Activity Level: {payload.activity_level}
Dietary Preferences: {payload.dietary_preferences}
Fitness Goals: {payload.fitness_goals}
"""

    # -------- DIET PLAN --------
    diet_prompt = f"""
You are a professional nutritionist.

Create a **1-day personalized dietary plan** based on the user profile below.
Explain briefly why this plan works.

User Profile:
{user_profile}
"""

    diet_response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": diet_prompt}],
    )

    dietary_plan = diet_response.choices[0].message.content

    # -------- FITNESS PLAN --------
    fitness_prompt = f"""
You are a certified fitness trainer.

Create a **weekly workout routine** based on the user profile below.
Include warm-up, main workout, and cooldown.
Explain benefits clearly.

User Profile:
{user_profile}
"""

    fitness_response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": fitness_prompt}],
    )

    fitness_plan = fitness_response.choices[0].message.content

    return {
        "dietary_plan": dietary_plan,
        "fitness_plan": fitness_plan
    }


# ---------------- HEALTH CHECK ----------------

@app.get("/")
def root():
    return {"status": "Fitness Planner Agent (Groq) running"}
