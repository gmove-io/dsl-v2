
#[test_only]
module desuilabs::dlab_tests {

    use sui::{
        test_utils::destroy,
        clock::{Self, Clock},
        kiosk::Kiosk,
        test_scenario::{Self as ts, Scenario},
        package::Publisher,
    };
    use ob_kiosk::ob_kiosk;
    use ob_request::{
        borrow_request::{Self, BORROW_REQ},
        withdraw_request::WITHDRAW_REQ,
        request::{WithNft, Policy},
    };
    use nft_protocol::{
        mint_cap::MintCap,
    };
    use desuilabs::dlab::{Self, Dlab};

    const OWNER: address = @0xBABE;

    // hot potato holding the state
    public struct World {
        scenario: Scenario,
        clock: Clock,
        kiosk: Kiosk,
        withdraw_policy: Policy<WithNft<Dlab, WITHDRAW_REQ>>,
        borrow_policy: Policy<WithNft<Dlab, BORROW_REQ>>,
        mint_cap: MintCap<Dlab>,
    }

    // === Utils ===

    public fun start_world(): World {
        let mut scenario = ts::begin(OWNER);
        let clock = clock::create_for_testing(scenario.ctx());
        dlab::init_for_testing(scenario.ctx());
        let (kiosk, _) = ob_kiosk::new_for_address(OWNER, scenario.ctx());

        scenario.next_tx(OWNER);
        let publisher = scenario.take_from_sender<Publisher>();
        dlab::create_borrow_policy(&publisher, scenario.ctx());
        destroy(publisher);
        
        scenario.next_tx(OWNER);
        let mint_cap = scenario.take_from_sender<MintCap<Dlab>>();
        let withdraw_policy = scenario.take_shared<Policy<WithNft<Dlab, WITHDRAW_REQ>>>();
        let borrow_policy = scenario.take_shared<Policy<WithNft<Dlab, BORROW_REQ>>>();

        World { scenario, clock, kiosk, withdraw_policy, borrow_policy, mint_cap }
    }

    public fun end(world: World) {
        let World { 
            scenario, 
            clock, 
            kiosk,
            withdraw_policy,
            borrow_policy,
            mint_cap
        } = world;

        destroy(clock);
        destroy(kiosk);
        destroy(withdraw_policy);
        destroy(borrow_policy);
        destroy(mint_cap);
        scenario.end();
    }

    #[test]
    public fun mint_and_upgrade_nft() {
        let mut world = start_world();

        world.scenario.next_tx(OWNER);
        let nft = dlab::mint_for_testing(
            b"DeSuiLab".to_string(),
            b"Original".to_string(),
            b"pixel art",
            vector[b"face".to_ascii_string()],
            vector[b"red".to_ascii_string()],
            &mut world.mint_cap,
            world.scenario.ctx()
        );
        let id = object::id(&nft);

        dlab::assert_nft_data(
            &nft,
            b"DeSuiLab".to_string(),
            b"Original".to_string(),
            b"pixel art".to_ascii_string(),
            vector[b"face".to_ascii_string()],
            vector[b"red".to_ascii_string()],
        );

        world.scenario.next_tx(OWNER); 
        let (mut kiosk, _) = ob_kiosk::new_for_address(OWNER, world.scenario.ctx());
        ob_kiosk::deposit(&mut kiosk, nft, world.scenario.ctx());

        world.scenario.next_tx(OWNER);
        dlab::upgrade_nft_in_kiosk(
            &world.withdraw_policy,
            &mut kiosk,
            id,
            b"next gen art".to_ascii_string(),
            world.scenario.ctx()
        );
        let (nft, req) = ob_kiosk::withdraw_nft_signed<Dlab>(&mut kiosk, id, world.scenario.ctx());
        dlab::assert_nft_data(
            &nft,
            b"DeSuiLab".to_string(),
            b"Original".to_string(),
            b"next gen art".to_ascii_string(),
            vector[b"face".to_ascii_string(), b"version".to_ascii_string()],
            vector[b"red".to_ascii_string(), b"2".to_ascii_string()],
        );

        destroy(req);
        destroy(nft);
        destroy(kiosk);
        end(world);
    }

    #[test]
    public fun mint_and_air_upgrade_nft() {
        let mut world = start_world();

        world.scenario.next_tx(OWNER);
        let nft = dlab::mint_for_testing(
            b"DeSuiLab".to_string(),
            b"Original".to_string(),
            b"pixel art",
            vector[b"face".to_ascii_string()],
            vector[b"red".to_ascii_string()],
            &mut world.mint_cap,
            world.scenario.ctx()
        );
        let id = object::id(&nft);

        dlab::assert_nft_data(
            &nft,
            b"DeSuiLab".to_string(),
            b"Original".to_string(),
            b"pixel art".to_ascii_string(),
            vector[b"face".to_ascii_string()],
            vector[b"red".to_ascii_string()],
        );

        world.scenario.next_tx(OWNER); 
        let (mut kiosk, _) = ob_kiosk::new_for_address(OWNER, world.scenario.ctx());
        ob_kiosk::deposit(&mut kiosk, nft, world.scenario.ctx());

        world.scenario.next_tx(OWNER);
        dlab::air_upgrade_nft(
            &world.borrow_policy,
            &mut kiosk,
            id,
            b"next gen art".to_ascii_string(),
            world.scenario.ctx()
        );
        let (nft, req) = ob_kiosk::withdraw_nft_signed<Dlab>(&mut kiosk, id, world.scenario.ctx());
        dlab::assert_nft_data(
            &nft,
            b"DeSuiLab".to_string(),
            b"Original".to_string(),
            b"next gen art".to_ascii_string(),
            vector[b"face".to_ascii_string(), b"version".to_ascii_string()],
            vector[b"red".to_ascii_string(), b"2".to_ascii_string()],
        );

        destroy(req);
        destroy(nft);
        destroy(kiosk);
        end(world);
    }

}

