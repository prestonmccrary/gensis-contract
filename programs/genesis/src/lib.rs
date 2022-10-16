use anchor_lang::prelude::*;
use std::cmp::Ordering;
use anchor_spl::token::{Token, TokenAccount};
use genesis_mint::cpi::accounts::TransferToken;

use genesis_mint::program::GenesisMint;


declare_id!("Dyc7E1a2zVfRy3TUg5Ff3MJTnnkcXx8JT8dxWBaQioDf");

#[program]
pub mod genesis {
    use super::*;

    pub fn initialize_exchange(ctx: Context<InitializeExchange>) -> Result<()> {
        let exchange_data =  &mut ctx.accounts.exchange;
        exchange_data.next_id = 1;
        Ok(())
    }

    // pub fn create_token_account(ctx: )

    pub fn create_company_listing(ctx: Context<CreateCompany>, name: String, num_shares: u32, base_price: u32, days: u8) -> Result<()> {
        let company_data = &mut ctx.accounts.company_data;
        let user = &mut ctx.accounts.user;
        let exchange_data = &mut ctx.accounts.exchange;
        let company_data_orders = &mut ctx.accounts.company_data_orders;

        //company data init
        if name.as_bytes().len() > 40 {
            panic!();
        }
        company_data.name = name;
        company_data.shares = num_shares;
        company_data.id = exchange_data.next_id;
        let clock = Clock::get().unwrap();
        let seconds_to_pass : i64 = i64::from(days) * 60 * 60 * 24;
        company_data.end_date = clock.unix_timestamp + seconds_to_pass;
        company_data.belongs_to = user.key();
        exchange_data.next_id += 1;


        // order data init 
        company_data_orders.orders = Vec::new();
        company_data_orders.base_price = base_price;
        company_data_orders.current_shares_bought = 0;
        company_data_orders.total_shares = num_shares;

        company_data.bump = *ctx.bumps.get("company_data").unwrap();
        company_data_orders.bump = *ctx.bumps.get("company_data_orders").unwrap();
        Ok(())
    }

    pub fn trade(ctx: Context<TradeContext>, company: String, num_shares: u32, price_level: u32) -> Result<u32> {
        let order_book = &mut ctx.accounts.company_data_orders;
        let user_acct = &mut ctx.accounts.user;
        let token_program = &mut ctx.accounts.token_program;

        let clock = Clock::get().unwrap();

        
        let mut new_order = Order {
            quantity: num_shares,
            price: price_level,
            timestamp: clock.unix_timestamp,
            buyer: user_acct.key()
        };

        let cost = new_order.quantity * new_order.price;



        let active_acc = &mut ctx.accounts.main;
        let holding_acct = &mut ctx.accounts.holding;

        if active_acc.amount >= (cost as u64){

            match order_book.handle_order(&mut new_order) {
                Ok(price) => {
                    let instruction = TransferToken {
                        from_authority: user_acct.to_account_info(),
                        from: active_acc.to_account_info(),
                        to: holding_acct.to_account_info(),
                        token_program: token_program.to_account_info()
                    };

                    let cpi_program = ctx.accounts.mint_program.to_account_info();
                    // Create the Context for our Transfer request
                    let cpi_ctx = CpiContext::new(cpi_program, instruction);

                    genesis_mint::cpi::transfer(cpi_ctx, price as u64)?;
                    
                    return Ok(price)

                },
                _ => return Ok(0)
            }
        } 


        Ok(0)
    }
        

}


    



#[account]
pub struct ExchangeData {
    next_id: u32,
}



#[account]
pub struct CompanyData {
    belongs_to: Pubkey,
    name: String,
    id: u32,
    shares: u32,
    end_date: i64,
    bump: u8,
}


fn name_seed(name: &str) -> &[u8] {
    let b = name.as_bytes();
    if b.len() > 32 { &b[0..32] } else { b }
}




// validation struct
#[derive(Accounts)]
#[instruction(name: String, num_shares: u32, days: u8)]
pub struct CreateCompany<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    // space: 8 discriminator + 2 level + 4 name length + 200 name + 1 bump
    #[account(
        init,
        payer = user,
        space = 8 + 2 + 4 + 200 + 1, 
        seeds = [b"company-data", name_seed(&name)], 
        bump
    )]
    pub company_data: Account<'info, CompanyData>,

    #[account(
        init,
        payer = user,
        space = 8 + 2 + 4 + order_book_size(num_shares) + 1,
        seeds = [b"company-data-orders", name_seed(&name)], 
        bump
    )]
    pub company_data_orders: Account<'info, OrderBook>,

    #[account(mut)]
    pub exchange: Account<'info, ExchangeData>,

    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
#[instruction(company: String, num_shares: u32, price_level: u32)]
pub struct TradeContext<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    // space: 8 discriminator + 2 level + 4 name length + 200 name + 1 bump
    #[account(
        mut,
        seeds = [b"company-data", name_seed(&company)], 
        bump
    )]
    pub company_data: Account<'info, CompanyData>,

    #[account(
        mut, 
        seeds = [b"company-data-orders", name_seed(&company)], 
        bump
    )]
    pub company_data_orders: Account<'info, OrderBook>,


    #[account(mut)]
    pub main: Account<'info, TokenAccount>,
    #[account(mut)]
    pub holding: Account<'info, TokenAccount>,



    #[account(mut)]
    pub exchange: Account<'info, ExchangeData>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub mint_program: Program<'info, GenesisMint>,
}



#[derive(Accounts)]
pub struct InitializeExchange<'info> {
    // this is the exchange account
    #[account(init, payer = user, space = 16)]
    pub exchange: Account<'info, ExchangeData>,

    // this is the account who opens the exchange
    #[account(mut)]
    pub user: Signer<'info>,


    //system account
    pub system_program: Program<'info, System>
}



#[account]
pub struct OrderBook {
    total_shares: u32,
    current_shares_bought: u32,
    base_price: u32,
    orders: Vec<Order>,
    bump: u8,
}

fn order_size() -> usize {
    4 + 4 + 8 + 32
}

fn order_book_size(num_shares : u32) -> usize {
    ( (num_shares as usize) * order_size() + 4 + 4 + 4 + 1) as usize
}



#[derive(
    AnchorSerialize,
    AnchorDeserialize,
    Copy,
    Clone,
    PartialEq,
    Eq
)]
pub struct Order {
    buyer: Pubkey,
    price: u32,
    quantity: u32,
    timestamp: i64
}

impl Ord for Order {
    fn cmp(&self, other: &Self) -> Ordering {
        self.price.cmp(&other.price)
        .then(self.quantity.cmp(&other.quantity))
        .then(other.timestamp.cmp(&self.timestamp) )
    }
}

impl PartialOrd for Order {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl OrderBook {

    pub fn handle_order(&mut self, new_order : &mut Order) -> Result<u32> {

        if self.order_is_fillable(new_order.clone()) {
            let fill_amt = self.fill_ammount(&mut new_order.clone());

            new_order.quantity = fill_amt;

            self.clean_after_fill();

            match self.orders.binary_search(&new_order) {
                Ok(_) => {panic!()} // element already in vector @ `pos` 
                Err(pos) => self.orders.insert(pos, *new_order),
            }

            
            let new_shares_bought = std::cmp::min(self.get_remaining(), fill_amt);

            self.current_shares_bought += new_shares_bought;

            return Ok(fill_amt * new_order.price) 
        }

        Ok(0)
    }

    pub fn order_is_fillable(&mut self, new_order : Order) -> bool {
        return  new_order.price >= self.base_price && ( !self.is_full() || self.better_than_worst(new_order.clone()) )
    }

    pub fn is_full(&mut self) -> bool {
        return self.current_shares_bought == self.total_shares
    }

    pub fn better_than_worst(&mut self, new_order: Order) -> bool {
        let worst_order = self.orders.get(0).unwrap();
        &new_order > worst_order
    }

    pub fn fill_ammount(&mut self, new_order : &mut Order) -> u32 {

        let remaining = self.total_shares - self.current_shares_bought;

        if remaining > new_order.quantity {
            return new_order.quantity
        } else {
            return self.fill_from_back(new_order)
        }
    }

    pub fn get_remaining(&mut self) -> u32 {
        self.total_shares - self.current_shares_bought
    }

    pub fn fill_from_back(&mut self, new_order : &mut Order) -> u32 {

        let mut remaining_to_fill = new_order.quantity - self.get_remaining();

        for order in self.orders.iter_mut() {
            if new_order.quantity == 0 || order > new_order || remaining_to_fill == 0 {
                break
            } else {
               let to_fill = std::cmp::min(remaining_to_fill, new_order.quantity);
               remaining_to_fill -= to_fill;
               order.quantity -= to_fill;
            }
        }

        new_order.quantity - remaining_to_fill
    }

    pub fn clean_after_fill(&mut self) -> () {
        let idx = self.orders.partition_point(|&x| x.quantity <= 0);
        self.orders = Vec::from(&self.orders[idx..]);
        ()
    }

}
