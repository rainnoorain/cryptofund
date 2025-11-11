const hre = require("hardhat");

async function main() {
  const CrowdHelp = await hre.ethers.getContractFactory("CrowdHelp");
  const crowdHelp = await CrowdHelp.deploy();

  await crowdHelp.deployed();

  // Dynamic deadline: current time + 24 hours (in seconds)
  const deadline = Math.floor(Date.now() / 1000) + 86400;

  await crowdHelp.createCampaign(
    "Project X",    // projectTitle
    "Desc",         // projectDesc
    100,            // minContribution
    1000,           // goal
    deadline,       // deadline (must be in future)
    "bannerUrl",    // bannerURL
    0               // schemeId
  );

  console.log("CrowdHelp deployed to:", crowdHelp.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });

