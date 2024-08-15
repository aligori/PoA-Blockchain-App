require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const { RPC_HOST, RPC_PORT, NETWORK_ID } = process.env;

const chainId = parseInt(NETWORK_ID) || 281099

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    privateNet: {
      url: `${RPC_HOST}:${RPC_PORT}`,
      chainId,
      accounts: [
        '0xdd8898f6d0f0f73967dbf4c1f0dffd74a895eedab74c7e956d8bccf700f59cd1'
      ]
    }
  },
  ignition: {
    defaultAccount: 0
  }
};
