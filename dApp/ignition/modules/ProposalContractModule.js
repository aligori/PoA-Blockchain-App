const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ProposalContractModule", (m) => {
  const deployer = m.getAccount(0);

  const contract = m.contract("ProposalContract", [], {
    from: deployer,
  });
  
  return { contract };
});