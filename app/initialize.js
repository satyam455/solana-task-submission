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
