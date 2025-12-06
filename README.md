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

Save the message account public key from the output. Update this key in `get_message.js` and `update_message.js`.

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