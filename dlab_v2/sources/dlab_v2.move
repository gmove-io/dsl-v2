module dlab::dlab {

    // === Imports ===

    use std::{
        ascii,
        string::{String, utf8},
    };

    use sui::{
        event,
        display,
        vec_map,
        vec_set,
        package,
        sui::SUI,
        coin::Coin,
        kiosk::Kiosk,
        url::{Self, Url},
    };

    use nft_protocol::{
        symbol,
        creators,
        royalty,
        mint_event,
        display_info,
        transfer_allowlist,
        royalty_strategy_bps,
        mint_cap::{Self, MintCap},
        collection::{Self, Collection},
        attributes::{Self, Attributes},
    };

    use ob_request::{
        request,
        transfer_request,
        request::{WithNft, Policy},
        withdraw_request::{Self, WITHDRAW_REQ}
    };

    use ob_launchpad::{
        listing::Listing,
        warehouse::Warehouse,
    };

    use ob_kiosk::ob_kiosk;

    use ob_permissions::witness;

    use ob_utils::display as ob_display;

    use liquidity_layer_v1::orderbook;

    use fluid::fluid::FLUID;

    // === Constants ===
    
    // @dev 6 decimals, so the fee is 10_000
    const UPGRADE_FEE: u64 = 10_000_000_000;

    // === Errors ===

    const ENotEnoughFluid: u64 = 0;

    // === Structs ===

    public struct DLAB has drop {}
    
    public struct Witness has drop {}
    
    public struct Dlab has store, key {
        id: UID,
        name: String,
        description: String,
        url: Url,
        attributes: Attributes,
    }

    // === Events ===

    public struct Upgrade has store, copy, drop {
        collection: address,
        nft: address
    }

    // === Public Mutative ===

    #[lint_allow(share_owned)]
    fun init(witness: DLAB, ctx: &mut TxContext) {
        let delegated_witness = witness::from_witness(Witness {});

        let mut collection = collection::create<Dlab>(
            delegated_witness, 
            ctx
        );

        let collection_id = object::id(&collection);

        let creators = vec_set::singleton(@0x61028a4c388514000a7de787c3f7b8ec1eb88d1bd2dbc0d3dfab);

        collection::add_domain(
            delegated_witness,
            &mut collection,
            creators::new(creators),
        );

        collection::add_domain(
            delegated_witness,
            &mut collection,
            display_info::new(
                utf8(b"DeSuiLabs"),
                utf8(b"2222 Degenerates running experiments on the Blockchain."),
            ),
        );

        collection::add_domain(
            delegated_witness,
            &mut collection,
            symbol::new(utf8(b"DLAB")),
        );

        let mut royalty_map = vec_map::empty();
        royalty_map.insert(@0x61028a4c388514000a7de787c3f7b8ec1eb88d1bd2dbc0d3dfab37078e39630f, 1000);
        royalty_map.insert(@0xa6e6f36c9eab8e8bc2e4a82e225f25da703a55a2cbd4d3eefbd11b41e8888a24, 9000);

        royalty_strategy_bps::create_domain_and_add_strategy(
            delegated_witness,
            &mut collection,
            royalty::from_shares(royalty_map, ctx),
            1000,
            ctx,
        );

        transfer::public_share_object(collection);

        let mint_cap = mint_cap::new_limited<DLAB, Dlab>(
            &witness, 
            collection_id, 
            2222, 
            ctx
        );
        
        transfer::public_transfer(
            mint_cap, 
            ctx.sender()
        );

        let publisher = package::claim(
            witness, 
            ctx
        );

        let mut display = display::new<Dlab>(&publisher, ctx);
        display.add(utf8(b"name"), utf8(b"{name}"));
        display.add(utf8(b"description"), utf8(b"{description}"));
        display.add(utf8(b"image_url"), utf8(b"{url}"));
        display.add(utf8(b"attributes"), utf8(b"{attributes}"));

        let mut tags = std::vector::empty();
        tags.push_back(utf8(b"PFP"));
        tags.push_back(utf8(b"Utility"));
        tags.push_back(utf8(b"Gaming"));

        display.add(utf8(b"tags"), ob_display::from_vec(tags));
        display.update_version();

        transfer::public_transfer(display, ctx.sender());

        let (mut transfer_policy, transfer_policy_cap) = transfer_request::init_policy<Dlab>(
            &publisher, 
            ctx
        );

        royalty_strategy_bps::enforce(&mut transfer_policy, &transfer_policy_cap);
        transfer_allowlist::enforce(&mut transfer_policy, &transfer_policy_cap);

        let (mut withdraw_policy, withdraw_policy_cap) = withdraw_request::init_policy<Dlab>(
            &publisher, 
            ctx
        );

        request::enforce_rule_no_state<WithNft<Dlab, WITHDRAW_REQ>, Witness>(
            &mut withdraw_policy, 
            &withdraw_policy_cap
        );

        // Protected orderbook such that trading is not initially possible
        let orderbook = orderbook::new_with_protected_actions<Dlab, SUI>(
            delegated_witness,
            &transfer_policy, 
            orderbook::custom_protection(true, true, true), 
            ctx,
        );

        orderbook::share(orderbook);

        transfer::public_transfer(publisher, ctx.sender());

        transfer::public_transfer(transfer_policy_cap, ctx.sender());
        transfer::public_share_object(transfer_policy);

        transfer::public_transfer(withdraw_policy_cap, ctx.sender());
        transfer::public_share_object(withdraw_policy);
    }

    public entry fun mint_nft_to_warehouse(
        name: String,
        description: String,
        url: vector<u8>,
        attributes_keys: vector<ascii::String>,
        attributes_values: vector<ascii::String>,
        mint_cap: &mut MintCap<Dlab>,
        warehouse: &mut Warehouse<Dlab>,
        ctx: &mut TxContext,
    ) {
        let nft = mint(
            name,
            description,
            url,
            attributes_keys,
            attributes_values,
            mint_cap,
            ctx,
        );

        warehouse.deposit_nft(nft);
    }

    public entry fun mint_nft_to_kiosk(
        name: String,
        description: String,
        url: vector<u8>,
        attributes_keys: vector<ascii::String>,
        attributes_values: vector<ascii::String>,
        mint_cap: &mut MintCap<Dlab>,
        receiver: &mut Kiosk,
        ctx: &mut TxContext,
    ) {
        let nft = mint(
            name,
            description,
            url,
            attributes_keys,
            attributes_values,
            mint_cap,
            ctx,
        );

        ob_kiosk::deposit(receiver, nft, ctx);
    }

    #[lint_allow(share_owned)]
    public entry fun mint_nft_to_new_kiosk(
        name: String,
        description: String,
        url: vector<u8>,
        attributes_keys: vector<ascii::String>,
        attributes_values: vector<ascii::String>,
        mint_cap: &mut MintCap<Dlab>,
        receiver: address,
        ctx: &mut TxContext,
    ) {
        let nft = mint(
            name,
            description,
            url,
            attributes_keys,
            attributes_values,
            mint_cap,
            ctx,
        );

        let (mut kiosk, _) = ob_kiosk::new_for_address(receiver, ctx);
        
        ob_kiosk::deposit(&mut kiosk, nft, ctx);

        transfer::public_share_object(kiosk);
    }

    fun mint(
        name: String,
        description: String,
        url: vector<u8>,
        attributes_keys: vector<ascii::String>,
        attributes_values: vector<ascii::String>,
        mint_cap: &mut MintCap<Dlab>,
        ctx: &mut TxContext,
    ): Dlab {
        let delegated_witness = witness::from_witness(Witness {});

        let nft = Dlab {
            id: object::new(ctx),
            name,
            description,
            url: url::new_unsafe_from_bytes(url),
            attributes: attributes::from_vec(attributes_keys, attributes_values),
        };

        mint_event::emit_mint(
            delegated_witness,
            mint_cap.collection_id(),
            &nft,
        );

        mint_cap.increment_supply(1);

        nft
    }

    public fun burn_nft(
        collection: &Collection<Dlab>,
        nft: Dlab,
    ) {
        let delegated_witness = witness::from_witness(Witness {});
        
        let guard = mint_event::start_burn(
            delegated_witness, 
            &nft
        );
        
        let Dlab { id, name: _, description: _, url: _, attributes: _ } = nft;

        guard.emit_burn(object::id(collection), id);
    }

    public entry fun burn_nft_in_kiosk(
        collection: &Collection<Dlab>,
        kiosk: &mut Kiosk,
        nft_id: ID,
        policy: &Policy<WithNft<Dlab, WITHDRAW_REQ>>,
        ctx: &mut TxContext,
    ) {
        let (nft, mut withdraw_request) = ob_kiosk::withdraw_nft_signed(
            kiosk, 
            nft_id, 
            ctx
        );

        withdraw_request.add_receipt(&Witness {});

        withdraw_request.confirm(policy);

        burn_nft(collection, nft);
    }

    public entry fun burn_nft_in_listing(
        collection: &Collection<Dlab>,
        listing: &mut Listing,
        inventory_id: ID,
        ctx: &mut TxContext,
    ) {
        let nft = listing.admin_redeem_nft<Dlab>(inventory_id, ctx);

        burn_nft(collection, nft);
    }

    public entry fun burn_nft_in_listing_with_id(
        collection: &Collection<Dlab>,
        listing: &mut Listing,
        inventory_id: ID,
        nft_id: ID,
        ctx: &mut TxContext,
    ) {
        let nft = listing.admin_redeem_nft_with_id(inventory_id, nft_id, ctx);

        burn_nft(collection, nft);
    }

    // === V2 Upgrade === 

    public fun upgrade_nft(
        collection: &Collection<Dlab>,
        nft: &mut Dlab,
        fee: Coin<FLUID>,
    ) {       
        burn_fee(fee);

        nft.upgrade_to_v2();

        emit_upgrade(collection, nft);
    }

    public entry fun upgrade_nft_in_kiosk(
        collection: &Collection<Dlab>,
        kiosk: &mut Kiosk,
        nft_id: ID,
        policy: &Policy<WithNft<Dlab, WITHDRAW_REQ>>,
        receiver: &mut Kiosk,
        fee: Coin<FLUID>,
        ctx: &mut TxContext,
    ) {
        burn_fee(fee);

        let (mut nft, mut withdraw_request) = ob_kiosk::withdraw_nft_signed(
            kiosk, 
            nft_id, 
            ctx
        );

        withdraw_request.add_receipt(&Witness {});

        withdraw_request.confirm(policy);

        nft.upgrade_to_v2();

        emit_upgrade(collection, &nft);

        ob_kiosk::deposit(receiver, nft, ctx);
    }

    // === Errors ===

    fun upgrade_to_v2(nft: &mut Dlab) {
        nft.attributes.insert_attribute<Witness, Dlab>(ascii::string(b"version"), ascii::string(b"2"));
    }

    fun burn_fee(fee: Coin<FLUID>) {
        assert!(fee.value() >=UPGRADE_FEE, ENotEnoughFluid);
        transfer::public_transfer(fee, @0x0);
    }

    fun emit_upgrade(
        collection: &Collection<Dlab>,
        nft: &Dlab
    ) {
        event::emit(
            Upgrade { 
                collection: object::id(collection).id_to_address(), 
                nft: object::id(nft).id_to_address() 
            }
        );
    }
}

