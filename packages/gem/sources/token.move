module gem::gem {
    use sui::{
        token::{Self, Token},
        coin::{Self, TreasuryCap},
    };
    use desuilabs::staking::{Self, StakedDsl};

    public struct GemManager has key {
        id: UID,
        cap: TreasuryCap<GEM>,
    }

    public struct GEM has drop {}

    fun init(otw: GEM, ctx: &mut TxContext) {
        let (treasury_cap, coin_metadata) = coin::create_currency(
            otw, 0, b"GEM", b"Gems", // otw, decimal, symbol, name
            b"Rewards for staking DeSuiLabs", option::none(), // description, url
            ctx
        );

        let (mut policy, cap) = token::new_policy(&treasury_cap, ctx);

        // token::allow(&mut policy, &cap, buy_action(), ctx);
        // token::allow(&mut policy, &cap, token::spend_action(), ctx);

        transfer::share_object(GemManager {
            id: object::new(ctx),
            cap: treasury_cap,
        });

        // deal with `TokenPolicy`, `CoinMetadata` and `TokenPolicyCap`
        transfer::public_freeze_object(coin_metadata);
        transfer::public_transfer(cap, ctx.sender());
        token::share_policy(policy);
    }

    public fun claim_staking_rewards(manager: &mut GemManager, staked: &mut StakedDsl, ctx: &mut TxContext) {
        let amount = staked.to_claim() + (ctx.epoch() - staked.last_time()) * staked.nfts().length();
        let token = token::mint(&mut manager.cap, amount, ctx);
        token.keep(ctx);
        staked.reset(ctx);
    }

    public fun join(token: &mut Token<GEM>, other: Token<GEM>) {
        token::join(token, other);
    }

    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(GEM {}, ctx);
    }
}