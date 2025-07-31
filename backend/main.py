from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import json
import hashlib
import time
from datetime import datetime
import redis
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Neurochain AI API",
    description="AI decision-making system with blockchain transparency",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redis connection
redis_client = redis.Redis(
    host=os.getenv("REDIS_HOST", "localhost"),
    port=int(os.getenv("REDIS_PORT", 6379)),
    decode_responses=True
)

# Pydantic models
class DecisionRequest(BaseModel):
    question: str
    context: Optional[str] = None

class Decision(BaseModel):
    id: str
    timestamp: str
    question: str
    reasoning: str
    decision: str
    confidence: float
    block_hash: str
    status: str

class DecisionResponse(BaseModel):
    decision: Decision
    message: str

# AI Decision Engine
class AIDecisionEngine:
    def __init__(self):
        self.ethical_guidelines = [
            "Ensure decisions align with human values",
            "Consider potential harm to stakeholders",
            "Maintain transparency in reasoning",
            "Respect privacy and data protection",
            "Promote fairness and non-discrimination"
        ]
    
    def analyze_question(self, question: str, context: str = "") -> dict:
        """Analyze a question and provide a decision with reasoning"""
        
        # Simple decision logic (in production, this would use a more sophisticated AI model)
        question_lower = question.lower()
        
        # Decision patterns
        approval_keywords = ["approve", "accept", "recommend", "allow", "grant", "positive"]
        rejection_keywords = ["reject", "deny", "refuse", "block", "negative", "suspicious"]
        
        approval_score = sum(1 for keyword in approval_keywords if keyword in question_lower)
        rejection_score = sum(1 for keyword in rejection_keywords if keyword in question_lower)
        
        # Context-based decision making
        if "loan" in question_lower or "credit" in question_lower:
            decision = "APPROVED" if approval_score > rejection_score else "REJECTED"
            reasoning = f"Financial decision analysis: {question}. Considering creditworthiness, risk assessment, and regulatory compliance."
        elif "medical" in question_lower or "diagnosis" in question_lower:
            decision = "APPROVED" if approval_score > rejection_score else "REJECTED"
            reasoning = f"Medical decision analysis: {question}. Evaluating symptoms, medical history, and treatment protocols."
        elif "investment" in question_lower or "financial" in question_lower:
            decision = "APPROVED" if approval_score > rejection_score else "REJECTED"
            reasoning = f"Investment decision analysis: {question}. Assessing market conditions, risk factors, and client objectives."
        else:
            decision = "APPROVED" if approval_score > rejection_score else "REJECTED"
            reasoning = f"General decision analysis: {question}. Applying ethical guidelines and best practices."
        
        # Add ethical considerations
        reasoning += f" Ethical considerations: {', '.join(self.ethical_guidelines[:2])}."
        
        # Calculate confidence based on decision clarity
        confidence = 70 + (abs(approval_score - rejection_score) * 10)
        confidence = min(confidence, 95)
        
        return {
            "decision": decision,
            "reasoning": reasoning,
            "confidence": confidence
        }
    
    def generate_block_hash(self, decision_data: dict) -> str:
        """Generate a blockchain transaction hash"""
        data_string = json.dumps(decision_data, sort_keys=True)
        return hashlib.sha256(data_string.encode()).hexdigest()

# Initialize AI engine
ai_engine = AIDecisionEngine()

@app.get("/")
async def root():
    return {
        "message": "Neurochain AI API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    try:
        redis_client.ping()
        redis_status = "healthy"
    except:
        redis_status = "unhealthy"
    
    return {
        "status": "healthy",
        "redis": redis_status,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/api/decisions", response_model=DecisionResponse)
async def create_decision(request: DecisionRequest):
    """Create a new AI decision"""
    try:
        # Generate AI decision
        analysis = ai_engine.analyze_question(request.question, request.context or "")
        
        # Create decision object
        decision_id = f"decision_{int(time.time() * 1000)}"
        timestamp = datetime.now().isoformat()
        
        decision_data = {
            "id": decision_id,
            "timestamp": timestamp,
            "question": request.question,
            "reasoning": analysis["reasoning"],
            "decision": analysis["decision"],
            "confidence": analysis["confidence"]
        }
        
        # Generate blockchain hash
        block_hash = ai_engine.generate_block_hash(decision_data)
        decision_data["block_hash"] = block_hash
        decision_data["status"] = "pending"
        
        # Store in Redis
        redis_client.setex(
            f"decision:{decision_id}",
            3600,  # 1 hour TTL
            json.dumps(decision_data)
        )
        
        # Add to recent decisions list
        redis_client.lpush("recent_decisions", decision_id)
        redis_client.ltrim("recent_decisions", 0, 99)  # Keep last 100 decisions
        
        decision = Decision(**decision_data)
        
        return DecisionResponse(
            decision=decision,
            message="Decision created successfully and recorded on blockchain"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating decision: {str(e)}")

@app.get("/api/decisions", response_model=List[Decision])
async def get_decisions(limit: int = 10):
    """Get recent decisions"""
    try:
        # Get recent decision IDs
        decision_ids = redis_client.lrange("recent_decisions", 0, limit - 1)
        
        decisions = []
        for decision_id in decision_ids:
            decision_data = redis_client.get(f"decision:{decision_id}")
            if decision_data:
                decisions.append(Decision(**json.loads(decision_data)))
        
        return decisions
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving decisions: {str(e)}")

@app.get("/api/decisions/{decision_id}", response_model=Decision)
async def get_decision(decision_id: str):
    """Get a specific decision by ID"""
    try:
        decision_data = redis_client.get(f"decision:{decision_id}")
        if not decision_data:
            raise HTTPException(status_code=404, detail="Decision not found")
        
        return Decision(**json.loads(decision_data))
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving decision: {str(e)}")

@app.post("/api/decisions/{decision_id}/validate")
async def validate_decision(decision_id: str):
    """Validate a decision (simulate blockchain consensus)"""
    try:
        decision_data = redis_client.get(f"decision:{decision_id}")
        if not decision_data:
            raise HTTPException(status_code=404, detail="Decision not found")
        
        decision_dict = json.loads(decision_data)
        decision_dict["status"] = "validated"
        
        # Update in Redis
        redis_client.setex(
            f"decision:{decision_id}",
            3600,
            json.dumps(decision_dict)
        )
        
        return {
            "message": "Decision validated successfully",
            "decision_id": decision_id,
            "status": "validated"
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error validating decision: {str(e)}")

@app.get("/api/stats")
async def get_stats():
    """Get system statistics"""
    try:
        total_decisions = redis_client.llen("recent_decisions")
        
        # Get recent decisions for status counts
        decision_ids = redis_client.lrange("recent_decisions", 0, 99)
        validated_count = 0
        pending_count = 0
        total_confidence = 0
        confidence_count = 0
        
        for decision_id in decision_ids:
            decision_data = redis_client.get(f"decision:{decision_id}")
            if decision_data:
                decision_dict = json.loads(decision_data)
                if decision_dict["status"] == "validated":
                    validated_count += 1
                elif decision_dict["status"] == "pending":
                    pending_count += 1
                
                total_confidence += decision_dict["confidence"]
                confidence_count += 1
        
        avg_confidence = total_confidence / confidence_count if confidence_count > 0 else 0
        
        return {
            "total_decisions": total_decisions,
            "validated_decisions": validated_count,
            "pending_decisions": pending_count,
            "average_confidence": round(avg_confidence, 2),
            "system_status": "healthy"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving stats: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 