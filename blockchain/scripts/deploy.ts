import { ethers } from "hardhat";

async function main() {
  console.log("Deploying NeurochainDecision contract...");

  const NeurochainDecision = await ethers.getContractFactory("NeurochainDecision");
  const neurochainDecision = await NeurochainDecision.deploy();

  await neurochainDecision.waitForDeployment();

  const address = await neurochainDecision.getAddress();
  console.log("NeurochainDecision deployed to:", address);

  // Get deployment info
  const [deployer] = await ethers.getSigners();
  console.log("Deployed by:", deployer.address);

  // Verify deployment
  const totalDecisions = await neurochainDecision.totalDecisions();
  const totalValidations = await neurochainDecision.totalValidations();
  const requiredValidations = await neurochainDecision.requiredValidations();

  console.log("Initial contract state:");
  console.log("- Total decisions:", totalDecisions.toString());
  console.log("- Total validations:", totalValidations.toString());
  console.log("- Required validations:", requiredValidations.toString());

  console.log("\nDeployment successful! 🎉");
  console.log("Contract address:", address);
  console.log("Network:", (await ethers.provider.getNetwork()).name);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 