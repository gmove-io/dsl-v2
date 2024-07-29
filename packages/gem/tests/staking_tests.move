
#[test_only]
module gem::staking_tests {

    use std::debug::print;
    use sui::{
        test_utils::destroy,
        clock::{Self, Clock},
        kiosk::Kiosk,
        test_scenario::{Self as ts, Scenario},
        package::Publisher,
        token::Token,
    };
    use ob_kiosk::ob_kiosk;
    use ob_request::{
        withdraw_request::WITHDRAW_REQ,
        request::{WithNft, Policy},
    };
    use nft_protocol::{
        mint_cap::MintCap,
    };
    use desuilabs::{
        dlab::{Self, Dlab},
        staking::{Self, StakedDsl},
    };
    use gem::gem::{Self, GemManager, GEM};

    const OWNER: address = @0xBABE;

    // hot potato holding the state
    public struct World {
        scenario: Scenario,
        clock: Clock,
        kiosk: Kiosk,
        policy: Policy<WithNft<Dlab, WITHDRAW_REQ>>,
        mint_cap: MintCap<Dlab>,
        manager: GemManager,
    }

    // === Utils ===

    public fun start_world(): World {
        let mut scenario = ts::begin(OWNER);
        let clock = clock::create_for_testing(scenario.ctx());
        dlab::init_for_testing(scenario.ctx());
        gem::init_for_testing(scenario.ctx());
        let (kiosk, _) = ob_kiosk::new_for_address(OWNER, scenario.ctx());

        scenario.next_tx(OWNER);
        let publisher = scenario.take_from_sender<Publisher>();
        dlab::create_borrow_policy(&publisher, scenario.ctx());
        destroy(publisher);
        
        scenario.next_tx(OWNER);
        let mint_cap = scenario.take_from_sender<MintCap<Dlab>>();
        let policy = scenario.take_shared<Policy<WithNft<Dlab, WITHDRAW_REQ>>>();
        let manager = scenario.take_shared<GemManager>();

        World { scenario, clock, kiosk, policy, mint_cap, manager }
    }

    public fun end(world: World) {
        let World { 
            scenario, 
            clock, 
            kiosk,
            policy,
            mint_cap,
            manager
        } = world;

        destroy(clock);
        destroy(kiosk);
        destroy(policy);
        destroy(mint_cap);
        destroy(manager);
        scenario.end();
    }

    #[test]
    public fun stake_end_to_end() {
        let mut world = start_world();

        world.scenario.next_tx(OWNER);
        let nft = dlab::mint_for_testing(
            b"DeSuiLab".to_string(),
            b"Original".to_string(),
            b"pixel art",
            vector[b"1 face".to_ascii_string()],
            vector[b"red".to_ascii_string()],
            &mut world.mint_cap,
            world.scenario.ctx()
        );
        let id = object::id(&nft);

        world.scenario.next_tx(OWNER); 
        let (mut kiosk, _) = ob_kiosk::new_for_address(OWNER, world.scenario.ctx());
        ob_kiosk::deposit(&mut kiosk, nft, world.scenario.ctx());

        world.scenario.next_tx(OWNER); 
        let mut staked = staking::new(world.scenario.ctx());
        staked.stake(&world.policy, &mut kiosk, id, world.scenario.ctx());

        world.scenario.next_tx(OWNER); 
        world.scenario.next_epoch(OWNER);
        world.scenario.next_epoch(OWNER);
        world.scenario.next_epoch(OWNER);
        world.manager.claim_staking_rewards(&mut staked, world.scenario.ctx());

        world.scenario.next_tx(OWNER); 
        let token = world.scenario.take_from_sender<Token<GEM>>();
        assert!(token.value() == 3);
        staked.unstake(&mut kiosk, id, world.scenario.ctx());

        world.scenario.next_tx(OWNER); 
        let (nft, req) = ob_kiosk::withdraw_nft_signed<Dlab>(&mut kiosk, id, world.scenario.ctx());
        staked.destroy_empty();

        destroy(req);
        destroy(nft);
        destroy(token);
        destroy(kiosk);
        end(world);
    }

}

