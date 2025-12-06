const anchor = require("@coral-xyz/anchor");
const fs = require("fs");
const os = require("os");
const path = require("path");

async function main() {
    const connection = new anchor.web3.Connection(
        "http://127.0.0.1:8899",
        "confirmed"
    );

    const walletPath = path.join(os.homedir(), ".config", "solana", "id.json");
    const walletKeypair = anchor.web3.Keypair.fromSecretKey(
        new Uint8Array(JSON.parse(fs.readFileSync(walletPath, "utf-8")))
    );
    const wallet = new anchor.Wallet(walletKeypair);

    const provider = new anchor.AnchorProvider(connection, wallet, {
        commitment: "confirmed",
    });
    anchor.setProvider(provider);

    const program = anchor.workspace.SolanaTaskSubmission;

    const messageAccountPubkey = new anchor.web3.PublicKey(
        "7dBkghE9byyYiGxrukmfhNRCQazYKXDV5FJQv1wiFUCw"
    );

    try {
        const account = await program.account.messageAccount.fetch(
            messageAccountPubkey
        );
        console.log("Stored message:", account.message);
    } catch (error) {
        console.error("Error fetching message:", error.message);

    }
}

main();