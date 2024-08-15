const hre = require("hardhat");
const fs = require('fs');
const path = require('path');
const ProposalContract = require("../ignition/modules/ProposalContractModule");

async function exportContract(contract, artifactName, outputDir) {
    // 1. Getting the address and ABI from the deployed contract artifact
    const deployedAddress = contract.target

    const artifact = await hre.artifacts.readArtifact(artifactName);
    const abi = artifact.abi;

    // 2. Exporting the address and ABI to the frontend - Defining the paths
    const addressOutputPath = path.join(outputDir, 'deployedAddress.json');
    const abiOutputPath = path.join(outputDir, 'contractAbi.json');

    // 3. Creating the output directory if it doesn't exist
    fs.mkdirSync(outputDir, { recursive: true });
    
    // 4. Copying the address and ABI to the frontend
    fs.writeFileSync(addressOutputPath, JSON.stringify({ address: deployedAddress }, null, 2));
    fs.writeFileSync(abiOutputPath, JSON.stringify(abi, null, 2));
}

async function main() {
    // 1. Check if contract is already deployed (if directory exists it is already deployed)
    const ignitionDirDeployments = path.join(__dirname, '../ignition/deployments');
    const outputDir = path.join(__dirname, '../deployed/proposalContract');
 
    if (fs.existsSync(outputDir) || fs.existsSync(ignitionDirDeployments)) {
        console.log('Proposal Contract already deployed.');
        console.log('Ignition dir exists.', fs.existsSync(ignitionDirDeployments));
        console.log('Proposal Contract Frontend replica exists.', fs.existsSync(outputDir));
        return;
    } else {
        console.log('Starting Proposal Contract Deployment ...')
    }
 
    // 2. Deploying the Proposal Contract using the ignition module
    const { contract: proposalContract } = await hre.ignition.deploy(ProposalContract);
    console.log('Finalizing Proposal Contract Deployment...');
    console.log(`Proposal Contract deployed successfully to address: ${proposalContract.target}`);

    // 3. Exporting deployed contract
    await exportContract(proposalContract, "ProposalContract", outputDir);
    console.log(`Deployed addresses and ABI have been exported to the frontend.`);
}

main().catch(console.error);