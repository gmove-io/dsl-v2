module fluid::fluid {
    use sui::coin;

    public struct FLUID has drop {}

    #[lint_allow(share_owned)]
    fun init(witness: FLUID, ctx: &mut TxContext) {
        let (mut treasury_cap, metadata) = coin::create_currency<FLUID>(
            witness, 
            6, 
            b"FLUID",
            b"Fluid", 
            b"An alien substance powering the DSL Portal", 
            option::none(), 
            ctx
        );

        treasury_cap.mint_and_transfer(4_888_400_000, ctx.sender(), ctx);
        transfer::public_transfer(treasury_cap, @0x0);
        transfer::public_freeze_object(metadata);
    }

    #[test_only]
    public fun init_for_testing(ctx: &mut TxContext) {
        init(FLUID {}, ctx);
    }
}