# Blockchain Lottery Application

This is a decentralized application for managing a lottery using Ethereum smart contracts. The application consists of three main modules: **Tokens**, **Lottery**, and **Winner**, each providing specific functionalities for lottery users and administrators.

---

## Table of Contents

```markdown
1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Installation and Setup](#installation-and-setup)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [Main Modules](#main-modules)
    - [Tokens](#tokens)
    - [Lottery](#lottery)
    - [Winner](#winner)
7. [Styling and Customization](#styling-and-customization)
```

---

## Features

```markdown
- **Token Purchase and Refund**: Users can purchase tokens to participate in the lottery and optionally refund them.
- **Lottery Ticket Purchase**: Users can buy tickets using their purchased tokens.
- **Winner Management**: Administrators can generate and query the lottery winner.
- **Modern Interface**: Intuitive and responsive design with custom styling.
- **Blockchain**: Interaction with a smart contract deployed on the Ethereum network.
```

---

## Prerequisites

```bash
# Ensure you have the following installed:
1. Node.js (version 16 or higher)
2. Yarn (package manager)
3. Truffle (framework for blockchain development)
4. Metamask (browser extension for Ethereum interaction)
5. An Ethereum local network like Ganache or a testnet such as Ropsten or Goerli.
```

---

## Installation and Setup

```bash
# Clone the repository to your local machine:
git clone Blockchain-Lottery
cd Blockchain-Lottery

# Install project dependencies:
yarn install

# Configure the smart contract with Truffle:
truffle compile

# Deploy the contract to the desired network:
truffle migrate --reset --compile all

# Configure Metamask:
# 1. Import the local network (or the testnet used).
# 2. Import the account used by Ganache or your private key.
```

---

## Running the Application

```bash
# To start the application:
yarn start

# This will launch the app at http://localhost:3000.
```

---

## Project Structure

```plaintext
├── abis/                  # Smart contract ABI
├── src/
│   ├── components/
│   │   ├── Tokens.js      # Token management
│   │   ├── Lottery.js     # Lottery ticket management
│   │   └── Winner.js      # Winner management
│   ├── styles/
│   │   └── Tokens.css     # Custom styles
│   ├── App.js             # React entry point
├── contracts/
│   └── Lottery.sol        # Lottery smart contract
└── truffle-config.js      # Truffle configuration
```

---

## Main Modules

### Tokens

```javascript
// This module allows users to buy tokens, check their balance, and refund tokens to the contract.

// Features:
// - Purchase tokens using Ether.
// - Check token balance for the user and contract.
// - Refund tokens and receive Ether back.

// Relevant Code
_buyTokens = async (_numTokens) => {
  const ethers = window.web3.utils.toWei(_numTokens, "ether");
  await this.state.contract.methods.buyTokens(_numTokens).send({
    from: this.state.account,
    value: ethers,
  });
};
```

---

### Lottery

```javascript
// This module enables users to buy lottery tickets and check their purchased tickets.

// Features:
// - Buy tickets using tokens.
// - Check tickets associated with the user account.

// Relevant Code
_buyTicket = async (_numTickets) => {
  await this.state.contract.methods.buyTicket(_numTickets).send({
    from: this.state.account,
  });
};
```

---

### Winner

```javascript
// This module is used by the administrator to generate and query the lottery winner.

// Features:
// - Generate a winner using the smart contract.
// - Query the winner's address and winning ticket number.

// Relevant Code
_generateWinner = async () => {
  await this.state.contract.methods.generateWinner().send({
    from: this.state.account,
  });
};

_winner = async () => {
  const winnerAddress = await this.state.contract.methods.winner().call();
  const winningTicket = await this.state.contract.methods
    .viewTickets(winnerAddress)
    .call();
  this.setState({ winnerAddress, winningTicket: winningTicket[0] });
};
```

---

## Styling and Customization

```css
/* Tokens.css contains custom styles for a modern and attractive design. */
/* Dark colors (#1a1a2e) with bright accents (#00d2ff) are used for emphasis. */

.tokens-container {
  background-color: #1a1a2e;
  color: #00d2ff;
}
```

---

## Additional Notes

```markdown
- The contract must be deployed on the same network configured in Metamask.
- Ensure your account has sufficient balance to perform Ethereum transactions.
- If you have any questions, consult the contract documentation or open an issue in the repository.
```
