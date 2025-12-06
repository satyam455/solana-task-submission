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

    const newMessage = process.argv[2];

    if (!newMessage) {
        console.error("write updated message");
        process.exit(1);
    }

    try {
        console.log("Updating message:", newMessage);

        const tx = await program.methods
            .updateMessage(newMessage)
            .accounts({
                messageAccount: messageAccountPubkey,
                user: provider.wallet.publicKey,
            })
            .rpc();

        console.log("Tx signature:", tx);
        console.log("Message updated");

        const account = await program.account.messageAccount.fetch(
            messageAccountPubkey
        );
        console.log("New stored message:", account.message);
    } catch (error) {
        console.error("Error updating message:", error.message);
    }
}

main();