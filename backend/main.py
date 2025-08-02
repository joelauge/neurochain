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
    category: str

class DecisionResponse(BaseModel):
    decision: Decision
    message: str

# AI Decision Engine
class AIDecisionEngine:
    def __init__(self):
        self.ethical_guidelines = [
            "Ensure decisions align with human values and well-being",
            "Consider potential harm to stakeholders and society",
            "Maintain transparency in reasoning and decision process",
            "Respect privacy and data protection principles",
            "Promote fairness and non-discrimination",
            "Consider long-term consequences and sustainability",
            "Prioritize safety and risk mitigation",
            "Ensure accountability and traceability"
        ]
        
        # Decision categories and their specific considerations
        self.decision_categories = {
            "financial": {
                "keywords": ["loan", "credit", "investment", "financial", "money", "payment", "transaction"],
                "considerations": ["Risk assessment", "Regulatory compliance", "Creditworthiness", "Market conditions"],
                "confidence_factors": ["Data completeness", "Historical patterns", "Regulatory clarity"]
            },
            "medical": {
                "keywords": ["medical", "diagnosis", "treatment", "health", "patient", "symptom", "disease"],
                "considerations": ["Medical evidence", "Patient safety", "Treatment efficacy", "Ethical guidelines"],
                "confidence_factors": ["Test results", "Medical history", "Expert consensus"]
            },
            "legal": {
                "keywords": ["legal", "contract", "law", "compliance", "regulation", "court", "judgment"],
                "considerations": ["Legal precedent", "Regulatory requirements", "Risk assessment", "Due diligence"],
                "confidence_factors": ["Legal clarity", "Precedent strength", "Regulatory certainty"]
            },
            "content": {
                "keywords": ["content", "media", "video", "text", "image", "appropriate", "moderation"],
                "considerations": ["Community guidelines", "Safety standards", "Cultural sensitivity", "Age appropriateness"],
                "confidence_factors": ["Content clarity", "Guideline specificity", "Context availability"]
            },
            "hiring": {
                "keywords": ["hiring", "recruitment", "candidate", "job", "employment", "interview"],
                "considerations": ["Qualifications match", "Cultural fit", "Legal compliance", "Diversity goals"],
                "confidence_factors": ["Resume completeness", "Interview quality", "Reference checks"]
            },
            "safety": {
                "keywords": ["safety", "security", "risk", "danger", "hazard", "protection"],
                "considerations": ["Risk assessment", "Safety protocols", "Emergency procedures", "Compliance standards"],
                "confidence_factors": ["Risk data quality", "Protocol clarity", "Compliance status"]
            }
        }
    
    def categorize_question(self, question: str) -> str:
        """Categorize the question based on keywords"""
        question_lower = question.lower()
        
        for category, config in self.decision_categories.items():
            if any(keyword in question_lower for keyword in config["keywords"]):
                return category
        
        return "general"
    
    def analyze_question(self, question: str, context: str = "") -> dict:
        """Analyze a question and provide a decision with reasoning"""
        
        category = self.categorize_question(question)
        question_lower = question.lower()
        
        # Decision patterns with more nuanced analysis
        approval_keywords = ["approve", "accept", "recommend", "allow", "grant", "positive", "proceed", "continue"]
        rejection_keywords = ["reject", "deny", "refuse", "block", "negative", "suspicious", "stop", "halt"]
        conditional_keywords = ["condition", "review", "additional", "further", "pending"]
        
        approval_score = sum(1 for keyword in approval_keywords if keyword in question_lower)
        rejection_score = sum(1 for keyword in rejection_keywords if keyword in question_lower)
        conditional_score = sum(1 for keyword in conditional_keywords if keyword in question_lower)
        
        # Category-specific decision logic
        if category in self.decision_categories:
            config = self.decision_categories[category]
            considerations = config["considerations"]
            confidence_factors = config["confidence_factors"]
            
            # Enhanced decision logic based on category
            if category == "financial":
                decision, reasoning = self._analyze_financial_decision(question, approval_score, rejection_score, conditional_score)
            elif category == "medical":
                decision, reasoning = self._analyze_medical_decision(question, approval_score, rejection_score, conditional_score)
            elif category == "legal":
                decision, reasoning = self._analyze_legal_decision(question, approval_score, rejection_score, conditional_score)
            elif category == "content":
                decision, reasoning = self._analyze_content_decision(question, approval_score, rejection_score, conditional_score)
            elif category == "hiring":
                decision, reasoning = self._analyze_hiring_decision(question, approval_score, rejection_score, conditional_score)
            elif category == "safety":
                decision, reasoning = self._analyze_safety_decision(question, approval_score, rejection_score, conditional_score)
            else:
                decision, reasoning = self._analyze_general_decision(question, approval_score, rejection_score, conditional_score)
        else:
            decision, reasoning = self._analyze_general_decision(question, approval_score, rejection_score, conditional_score)
            considerations = ["General best practices", "Risk assessment", "Stakeholder impact"]
            confidence_factors = ["Information completeness", "Decision clarity", "Context availability"]
        
        # Add ethical considerations
        ethical_considerations = self._get_ethical_considerations(category)
        reasoning += f" Ethical considerations: {', '.join(ethical_considerations)}."
        
        # Calculate confidence based on multiple factors
        confidence = self._calculate_confidence(approval_score, rejection_score, conditional_score, category, question)
        
        return {
            "decision": decision,
            "reasoning": reasoning,
            "confidence": confidence,
            "category": category
        }
    
    def _analyze_financial_decision(self, question: str, approval_score: int, rejection_score: int, conditional_score: int) -> tuple:
        if conditional_score > 0 or abs(approval_score - rejection_score) <= 1:
            decision = "APPROVE WITH CONDITIONS"
            reasoning = f"Financial decision analysis: {question}. Requires additional documentation or risk mitigation measures."
        elif approval_score > rejection_score:
            decision = "APPROVED"
            reasoning = f"Financial decision analysis: {question}. All criteria met with acceptable risk profile."
        else:
            decision = "REJECTED"
            reasoning = f"Financial decision analysis: {question}. Risk factors exceed acceptable thresholds."
        return decision, reasoning
    
    def _analyze_medical_decision(self, question: str, approval_score: int, rejection_score: int, conditional_score: int) -> tuple:
        if conditional_score > 0:
            decision = "REQUIRE ADDITIONAL TESTING"
            reasoning = f"Medical decision analysis: {question}. Insufficient information for confident diagnosis."
        elif approval_score > rejection_score:
            decision = "APPROVED"
            reasoning = f"Medical decision analysis: {question}. Evidence supports the proposed course of action."
        else:
            decision = "REJECTED"
            reasoning = f"Medical decision analysis: {question}. Evidence does not support the proposed course of action."
        return decision, reasoning
    
    def _analyze_legal_decision(self, question: str, approval_score: int, rejection_score: int, conditional_score: int) -> tuple:
        if conditional_score > 0:
            decision = "REQUIRE LEGAL REVIEW"
            reasoning = f"Legal decision analysis: {question}. Complex legal considerations require expert review."
        elif approval_score > rejection_score:
            decision = "APPROVED"
            reasoning = f"Legal decision analysis: {question}. Complies with applicable laws and regulations."
        else:
            decision = "REJECTED"
            reasoning = f"Legal decision analysis: {question}. Does not comply with applicable laws and regulations."
        return decision, reasoning
    
    def _analyze_content_decision(self, question: str, approval_score: int, rejection_score: int, conditional_score: int) -> tuple:
        if conditional_score > 0:
            decision = "FLAG FOR MANUAL REVIEW"
            reasoning = f"Content decision analysis: {question}. Content requires human review for context."
        elif approval_score > rejection_score:
            decision = "APPROVED"
            reasoning = f"Content decision analysis: {question}. Content meets community guidelines."
        else:
            decision = "REJECTED"
            reasoning = f"Content decision analysis: {question}. Content violates community guidelines."
        return decision, reasoning
    
    def _analyze_hiring_decision(self, question: str, approval_score: int, rejection_score: int, conditional_score: int) -> tuple:
        if conditional_score > 0:
            decision = "REQUIRE ADDITIONAL INTERVIEWS"
            reasoning = f"Hiring decision analysis: {question}. Candidate shows potential but needs further evaluation."
        elif approval_score > rejection_score:
            decision = "APPROVED"
            reasoning = f"Hiring decision analysis: {question}. Candidate meets all requirements and is a good fit."
        else:
            decision = "REJECTED"
            reasoning = f"Hiring decision analysis: {question}. Candidate does not meet requirements or is not a good fit."
        return decision, reasoning
    
    def _analyze_safety_decision(self, question: str, approval_score: int, rejection_score: int, conditional_score: int) -> tuple:
        if conditional_score > 0:
            decision = "IMPLEMENT SAFETY MEASURES"
            reasoning = f"Safety decision analysis: {question}. Proceed with additional safety protocols."
        elif approval_score > rejection_score:
            decision = "APPROVED"
            reasoning = f"Safety decision analysis: {question}. Safety requirements are met."
        else:
            decision = "REJECTED"
            reasoning = f"Safety decision analysis: {question}. Safety requirements are not met."
        return decision, reasoning
    
    def _analyze_general_decision(self, question: str, approval_score: int, rejection_score: int, conditional_score: int) -> tuple:
        if conditional_score > 0:
            decision = "REQUIRE ADDITIONAL INFORMATION"
            reasoning = f"General decision analysis: {question}. More information needed for confident decision."
        elif approval_score > rejection_score:
            decision = "APPROVED"
            reasoning = f"General decision analysis: {question}. Decision aligns with best practices and objectives."
        else:
            decision = "REJECTED"
            reasoning = f"General decision analysis: {question}. Decision does not align with best practices or objectives."
        return decision, reasoning
    
    def _get_ethical_considerations(self, category: str) -> list:
        """Get relevant ethical considerations for the decision category"""
        if category == "financial":
            return [self.ethical_guidelines[0], self.ethical_guidelines[1], self.ethical_guidelines[4]]
        elif category == "medical":
            return [self.ethical_guidelines[0], self.ethical_guidelines[1], self.ethical_guidelines[3]]
        elif category == "legal":
            return [self.ethical_guidelines[4], self.ethical_guidelines[6], self.ethical_guidelines[7]]
        elif category == "content":
            return [self.ethical_guidelines[1], self.ethical_guidelines[3], self.ethical_guidelines[4]]
        elif category == "hiring":
            return [self.ethical_guidelines[4], self.ethical_guidelines[5], self.ethical_guidelines[7]]
        elif category == "safety":
            return [self.ethical_guidelines[1], self.ethical_guidelines[6], self.ethical_guidelines[7]]
        else:
            return self.ethical_guidelines[:3]
    
    def _calculate_confidence(self, approval_score: int, rejection_score: int, conditional_score: int, category: str, question: str) -> float:
        """Calculate confidence score based on multiple factors"""
        base_confidence = 70
        
        # Decision clarity factor
        decision_clarity = abs(approval_score - rejection_score) * 5
        base_confidence += decision_clarity
        
        # Category-specific confidence adjustments
        category_confidence = {
            "financial": 5,  # Financial decisions often have clear criteria
            "medical": -5,   # Medical decisions can be complex
            "legal": 0,      # Legal decisions vary in complexity
            "content": 10,   # Content decisions often have clear guidelines
            "hiring": -3,    # Hiring decisions can be subjective
            "safety": 8,     # Safety decisions often have clear standards
            "general": 0
        }
        
        base_confidence += category_confidence.get(category, 0)
        
        # Conditional factor (reduces confidence)
        if conditional_score > 0:
            base_confidence -= conditional_score * 10
        
        # Question complexity factor
        question_length = len(question.split())
        if question_length > 20:
            base_confidence -= 5
        elif question_length < 5:
            base_confidence -= 3
        
        # Ensure confidence is within bounds
        return max(50, min(95, base_confidence))
    
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
            "confidence": analysis["confidence"],
            "category": analysis["category"]
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