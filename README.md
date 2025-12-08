# Solana Message Program

A simple Solana program that stores and updates a message on-chain using the Anchor framework.

## Prerequisites

- Rust and Solana CLI installed
- Anchor CLI version 0.31.1
- Node.js and Yarn

## Build Instructions

```bash
# Install dependencies
yarn install

# Build the program
anchor build

# Deploy to local validator
anchor deploy
```

## Running Local Validator

Start the local Solana test validator in a separate terminal:

```bash
solana-test-validator
```

Keep this running while interacting with the program.

## Interacting with the Program

### Initialize a Message Account

Creates a new account with the default message "Hello, Solana":

```bash
node app/initialize.js
```

This will output a message account public key. Copy this public key.

### Update Scripts with Your Public Key

Before using get_message.js and update_message.js, you need to update them with your generated public key:

1. Open `app/get_message.js`
2. Find this line:
```javascript
const messageAccountPubkey = new anchor.web3.PublicKey(
    "PAST_YOUR_GENERATE_PUB_KEY_HERE"
);
```
3. Replace the public key string with your generated public key from initialize.js

4. Repeat the same steps for `app/update_message.js`

### Get Message

Reads and displays the stored message:

```bash
node app/get_message.js
```

### Update Message

Updates the stored message with a new value:

```bash
node app/update_message.js "Your new message here"
```

## Program Instructions

- `initialize`: Creates a message account with default message
- `update_message`: Updates the message in an existing account

## Configuration

The scripts connect to:
- Local cluster: http://127.0.0.1:8899
- Wallet: ~/.config/solana/id.json