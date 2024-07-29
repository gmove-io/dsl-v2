module desuilabs::staking {

    use sui::{
        kiosk::Kiosk,
    };
    use ob_request::{
        request::{WithNft, Policy},
        withdraw_request::WITHDRAW_REQ,
    };
    use ob_kiosk::ob_kiosk;
    use desuilabs::dlab::{Self, Dlab};

    // === Errors ===

    const ERewardsToBeClaimed: u64 = 1;
    const ENotFound: u64 = 2;

    // === Structs ===

    public struct StakedDsl has key {
        id: UID,
        to_claim: u64,
        last_time: u64,
        nfts: vector<Dlab>,
    }

    // === Public Functions ===

    public fun new(ctx: &mut TxContext): StakedDsl {
        StakedDsl {
            id: object::new(ctx),
            to_claim: 0,
            last_time: 0,
            nfts: vector::empty(),
        }
    }

    public fun keep(staked: StakedDsl, ctx: &TxContext) {
        transfer::transfer(staked, ctx.sender());
    }

    public fun destroy_empty(staked: StakedDsl) {
        let StakedDsl {
            id,
            to_claim,
            last_time: _,
            nfts,
        } = staked;

        id.delete();
        nfts.destroy_empty();
        assert!(to_claim == 0, ERewardsToBeClaimed);
    }

    public fun stake(
        staked: &mut StakedDsl, 
        policy: &Policy<WithNft<Dlab, WITHDRAW_REQ>>,
        kiosk: &mut Kiosk,
        nft_id: ID,
        ctx: &mut TxContext,
    ) {
        let nft = dlab::withdraw_from_kiosk(policy, kiosk, nft_id, ctx);
        staked.nfts.push_back(nft);
        if (!staked.nfts.is_empty())
            staked.to_claim = staked.to_claim + (ctx.epoch() - staked.last_time);
    }

    public fun unstake(staked: &mut StakedDsl, kiosk: &mut Kiosk, nft_id: ID, ctx: &mut TxContext) {
        let len = staked.nfts.length();
        let mut i = 0;
        let idx = loop {
            if (i == len) break len;
            let nft = staked.nfts.borrow(i);
            if (object::id(nft) == nft_id) break i;
            i = i + 1;
        };

        assert!(idx != len, ENotFound);
        
        let nft = staked.nfts.remove(idx);
        ob_kiosk::deposit(kiosk, nft, ctx);
    }

    // claiming is done in gem package

    public fun reset(staked: &mut StakedDsl, ctx: &mut TxContext) {
        staked.to_claim = 0;
        staked.last_time = ctx.epoch();
    }

    public fun to_claim(staked: &StakedDsl): u64 {
        staked.to_claim
    }

    public fun last_time(staked: &StakedDsl): u64 {
        staked.last_time
    }

}