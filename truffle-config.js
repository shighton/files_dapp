const HDWalletProvider = require('@truffle/hdwallet-provider');
require("dotenv").config

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 8545
    },
    sepolia: {
      provider: () => new HDWalletProvider({
      mnemonic: {
      phrase: "divide bulb around abstract lab wrap purchase praise divide apple brother hole" //process.env.mnemonic
      },
      providerOrUrl: "https://sepolia.infura.io/v3/78c9fc8809974c878d8026a6103c7408" //process.env.infura_url
      }),
      network_id: 11155111, // Sepolia's network ID
      gas: 4000000, // Adjust the gas limit as per your requirements
      gasPrice: 10000000000, // Set the gas price to an appropriate value
      confirmations: 2, // Set the number of confirmations needed for a transaction
      timeoutBlocks: 200, // Set the timeout for transactions
      skipDryRun: true // Skip the dry run option
      }
  }
};
