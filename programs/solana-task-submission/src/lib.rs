use anchor_lang::prelude::*;

declare_id!("F47b1mMwMPHNe4eVd4keGt9GSpFUfbTH3oUMewSpFAu5");

#[program]
pub mod solana_task_submission {
    use super::*;

    // Initializing the account with default message
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let account = &mut ctx.accounts.message_account;
        account.message = "Hello, Solana".to_string();
        Ok(())
    }

    // Updating message in the account
    pub fn update_message(ctx: Context<UpdateMessage>, new_message: String) -> Result<()> {
        let account = &mut ctx.accounts.message_account;
        account.message = new_message;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 4 + 280,
    )]
    pub message_account: Account<'info, MessageAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateMessage<'info> {
    #[account(mut)]
    pub message_account: Account<'info, MessageAccount>,
    pub user: Signer<'info>,
}

#[account]
pub struct MessageAccount {
    pub message: String,
}
