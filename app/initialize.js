const anchor = require("@coral-xyz/anchor");

async function main() {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.SolanaTaskSubmission;

    const messageAccount = anchor.web3.Keypair.generate();

    console.log("Message Account Public Key:", messageAccount.publicKey.toString());

    try {
        const tx = await program.methods
            .initialize()
            .accounts({
                messageAccount: messageAccount.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([messageAccount])
            .rpc();

        console.log("Tx signature:", tx);
        console.log(messageAccount.publicKey.toString());

        const account = await program.account.messageAccount.fetch(
            messageAccount.publicKey
        );
        console.log("\nStored message:", account.message);
    } catch (error) {
        console.error("Error initializing message:", error);
    }
}

main();