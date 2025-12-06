const anchor = require("@coral-xyz/anchor");

async function main() {

    const provider = anchor.AnchorProvider.env();
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