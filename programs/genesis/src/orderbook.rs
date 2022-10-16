
#[account]
pub struct OrderBook {
    players: [Pubkey; 2],          // (32 * 2)
    turn: u8,                      // 1
    board: [Option<Sign>], // 9 * (1 + 1) = 18
    state: GameState,              // 32 + 1
}

impl OrderBook {



}
