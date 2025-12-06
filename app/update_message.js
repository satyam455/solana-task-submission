const anchor = require("@coral-xyz/anchor");

async function main() {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.SolanaTaskSubmission;

    const messageAccountPubkey = new anchor.web3.PublicKey(
        "7dBkghE9byyYiGxrukmfhNRCQazYKXDV5FJQv1wiFUCw"
    );

    const newMessage = process.argv[2];

    if (!newMessage) {
        console.error("node update_message.js");
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