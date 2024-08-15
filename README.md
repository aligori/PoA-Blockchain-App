# Blockchain Application using Ethereum Proof of Authority - Voting Application

The purpose of this project is the realization of a demo blockchain application using PoA that serves as a voting platform for the board members of an organization.

## Tech Stack
1. Private Blockchain Network
    - Ethereum Client: `Geth`
    - Consensus Mechanism: `Clique` (PoA)
2. D-App
    - Smart Contracts Development: `Solidity`
    - Deployment: `Hardhat`, `Node.js`
3. Front-end
    - `React.js`
    - `Ethers.js`
    - `TailwindCss`

## Prerequisites
    Docker

## Project setup
1. Navigate to the project source code directory: `cd /code`
2. Build and start the containers: `docker-compose up --build` (or `docker-compose build` then `docker-compose up`). 
    
    This command will automatically build the images and spin up the containers, network, and volumes defined for the services:
    - `Bootnode` - Used for initial peer discovery
    - `Validators` - Three network nodes serving as signers.
    - `JSON RPC Node` - Exposes HTTP RPC API on port 8545 on the host machine.
    - `Deployer` - This container will start once the JSON RPC Endpoint is available, and after it deploys the smart contract to the network it will exit successfully
    - `Frontend` - Maps port 3000 to the host to connect with the frontend

2. Visit http://localhost:3000 to open the front end.

3. Connecting the Frontend to the Blockchain:
    - Download and install the Metamask browser extension from https://metamask.io/download/.
    - Add the private network manually in Metamask and switch to that network:
        - Network Name: Private PoA
        - New RPC URL: http://localhost:8545
        - Chain Id: 281099
        - Currency Symbol: ETH
    - Import signer accounts into Metamask
        - Select JSON file type for the account
        - The Keystore files for the validator accounts are located at the relative path `/code/ethereum/validator/keystore`.
