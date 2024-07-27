
#[test_only]
module desuilabs::dlab_tests {

    use sui::{
        test_utils::destroy,
        clock::{Self, Clock},
        kiosk::Kiosk,
        test_scenario::{Self as ts, Scenario},
    };
    use ob_kiosk::ob_kiosk;
    use ob_request::{
        withdraw_request::WITHDRAW_REQ,
        request::{WithNft, Policy},
    };
    use nft_protocol::{
        mint_cap::MintCap,
        collection::Collection,
    };
    use desuilabs::dlab::{Self, Dlab};

    const OWNER: address = @0xBABE;

    // hot potato holding the state
    public struct World {
        scenario: Scenario,
        clock: Clock,
        kiosk: Kiosk,
        policy: Policy<WithNft<Dlab, WITHDRAW_REQ>>,
        collection: Collection<Dlab>,
        mint_cap: MintCap<Dlab>,
    }

    // === Utils ===

    public fun start_world(): World {
        let mut scenario = ts::begin(OWNER);
        let clock = clock::create_for_testing(scenario.ctx());
        dlab::init_for_testing(scenario.ctx());
        let (kiosk, _) = ob_kiosk::new_for_address(OWNER, scenario.ctx());

        scenario.next_tx(OWNER);
        let mint_cap = scenario.take_from_sender<MintCap<Dlab>>();
        let collection = scenario.take_shared<Collection<Dlab>>();
        let policy = scenario.take_shared<Policy<WithNft<Dlab, WITHDRAW_REQ>>>();

        World { scenario, clock, kiosk, policy, collection, mint_cap }
    }

    public fun end(world: World) {
        let World { 
            scenario, 
            clock, 
            kiosk,
            policy,
            collection,
            mint_cap
        } = world;

        destroy(clock);
        destroy(kiosk);
        destroy(policy);
        destroy(collection);
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
            &world.collection,
            &world.policy,
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

