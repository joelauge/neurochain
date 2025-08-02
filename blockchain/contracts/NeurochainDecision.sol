// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title NeurochainDecision
 * @dev Smart contract for recording AI decisions on the blockchain
 * This contract ensures transparency and accountability for AI decision-making
 */
contract NeurochainDecision is Ownable, Pausable, ReentrancyGuard {
    
    // Events
    event DecisionRecorded(
        bytes32 indexed decisionId,
        address indexed aiOperator,
        string question,
        string reasoning,
        string decision,
        uint256 confidence,
        uint256 timestamp,
        bytes32 blockHash
    );
    
    event DecisionValidated(
        bytes32 indexed decisionId,
        address indexed validator,
        bool isValid,
        string reason,
        uint256 timestamp
    );
    
    event ValidatorAdded(address indexed validator);
    event ValidatorRemoved(address indexed validator);
    
    // Structs
    struct Decision {
        bytes32 decisionId;
        address aiOperator;
        string question;
        string reasoning;
        string decision;
        uint256 confidence;
        uint256 timestamp;
        bytes32 blockHash;
        bool exists;
    }
    
    struct Validation {
        address validator;
        bool isValid;
        string reason;
        uint256 timestamp;
    }
    
    // State variables
    mapping(bytes32 => Decision) public decisions;
    mapping(bytes32 => Validation[]) public validations;
    mapping(address => bool) public validators;
    mapping(bytes32 => bool) public decisionValidated;
    
    uint256 public totalDecisions;
    uint256 public totalValidations;
    uint256 public requiredValidations = 3; // Minimum validations needed
    
    // Modifiers
    modifier onlyValidator() {
        require(validators[msg.sender], "Not authorized validator");
        _;
    }
    
    modifier decisionExists(bytes32 decisionId) {
        require(decisions[decisionId].exists, "Decision does not exist");
        _;
    }
    
    modifier notAlreadyValidated(bytes32 decisionId) {
        require(!decisionValidated[decisionId], "Decision already validated");
        _;
    }
    
    constructor() Ownable(msg.sender) {
        validators[msg.sender] = true; // Owner is initial validator
        emit ValidatorAdded(msg.sender);
    }
    
    /**
     * @dev Record a new AI decision
     * @param question The question or context for the decision
     * @param reasoning The AI's reasoning process
     * @param decision The final decision made
     * @param confidence Confidence level (0-100)
     */
    function recordDecision(
        string memory question,
        string memory reasoning,
        string memory decision,
        uint256 confidence
    ) external whenNotPaused nonReentrant returns (bytes32) {
        require(bytes(question).length > 0, "Question cannot be empty");
        require(bytes(reasoning).length > 0, "Reasoning cannot be empty");
        require(bytes(decision).length > 0, "Decision cannot be empty");
        require(confidence <= 100, "Confidence must be <= 100");
        
        bytes32 decisionId = keccak256(
            abi.encodePacked(
                msg.sender,
                question,
                reasoning,
                decision,
                confidence,
                block.timestamp
            )
        );
        
        require(!decisions[decisionId].exists, "Decision already exists");
        
        bytes32 blockHash = blockhash(block.number - 1);
        
        Decision memory newDecision = Decision({
            decisionId: decisionId,
            aiOperator: msg.sender,
            question: question,
            reasoning: reasoning,
            decision: decision,
            confidence: confidence,
            timestamp: block.timestamp,
            blockHash: blockHash,
            exists: true
        });
        
        decisions[decisionId] = newDecision;
        totalDecisions++;
        
        emit DecisionRecorded(
            decisionId,
            msg.sender,
            question,
            reasoning,
            decision,
            confidence,
            block.timestamp,
            blockHash
        );
        
        return decisionId;
    }
    
    /**
     * @dev Validate an AI decision
     * @param decisionId The ID of the decision to validate
     * @param isValid Whether the decision is valid
     * @param reason Reason for validation
     */
    function validateDecision(
        bytes32 decisionId,
        bool isValid,
        string memory reason
    ) external onlyValidator decisionExists(decisionId) notAlreadyValidated(decisionId) {
        require(bytes(reason).length > 0, "Reason cannot be empty");
        
        Validation memory validation = Validation({
            validator: msg.sender,
            isValid: isValid,
            reason: reason,
            timestamp: block.timestamp
        });
        
        validations[decisionId].push(validation);
        totalValidations++;
        
        emit DecisionValidated(
            decisionId,
            msg.sender,
            isValid,
            reason,
            block.timestamp
        );
        
        // Check if enough validations have been received
        if (validations[decisionId].length >= requiredValidations) {
            decisionValidated[decisionId] = true;
        }
    }
    
    /**
     * @dev Get a decision by ID
     * @param decisionId The ID of the decision
     * @return The decision struct
     */
    function getDecision(bytes32 decisionId) external view returns (Decision memory) {
        require(decisions[decisionId].exists, "Decision does not exist");
        return decisions[decisionId];
    }
    
    /**
     * @dev Get all validations for a decision
     * @param decisionId The ID of the decision
     * @return Array of validations
     */
    function getValidations(bytes32 decisionId) external view returns (Validation[] memory) {
        require(decisions[decisionId].exists, "Decision does not exist");
        return validations[decisionId];
    }
    
    /**
     * @dev Add a new validator
     * @param validator Address of the new validator
     */
    function addValidator(address validator) external onlyOwner {
        require(validator != address(0), "Invalid validator address");
        require(!validators[validator], "Validator already exists");
        
        validators[validator] = true;
        emit ValidatorAdded(validator);
    }
    
    /**
     * @dev Remove a validator
     * @param validator Address of the validator to remove
     */
    function removeValidator(address validator) external onlyOwner {
        require(validators[validator], "Validator does not exist");
        require(validator != owner(), "Cannot remove owner as validator");
        
        validators[validator] = false;
        emit ValidatorRemoved(validator);
    }
    
    /**
     * @dev Set the required number of validations
     * @param _requiredValidations New required number of validations
     */
    function setRequiredValidations(uint256 _requiredValidations) external onlyOwner {
        require(_requiredValidations > 0, "Required validations must be > 0");
        requiredValidations = _requiredValidations;
    }
    
    /**
     * @dev Pause the contract
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause the contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Get decision statistics
     * @return _totalDecisions Total number of decisions
     * @return _totalValidations Total number of validations
     * @return _requiredValidations Required number of validations
     */
    function getStats() external view returns (
        uint256 _totalDecisions,
        uint256 _totalValidations,
        uint256 _requiredValidations
    ) {
        return (totalDecisions, totalValidations, requiredValidations);
    }
} 