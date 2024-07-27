import { Transaction } from '@mysten/sui/transactions';
import { client, keypair, getId } from './utils.js';
import * as dlab from "./.gen/desuilabs2/dlab/functions.js";

(async () => {
	try {
		console.log("calling...")

		const tx = new Transaction();
		tx.setGasBudget(100000000);

		dlab.upgradeNftInKiosk(tx, {
			collection: getId("collection::Collection"),
			policy: getId("request::Policy"), // attention: PolicyCap could be taken instead (same string start)
			kiosk: "0x65d7909c74bfad4461840b4de11a5cf0ab6c87b7fa8a2d37d7e7b5c87650380f",
			nftId: "0xb17b22c7867209c954b18e37745668f71e9c3da3754d63787b93f653fafb2dcf",
			url: "ipfs://bafybeictvrpb2vdek7i3gmfihnwrl4j6egoht6em36slnbghq7jqdl7ul4/416.png"
		});

		const result = await client.signAndExecuteTransaction({
			signer: keypair,
			transaction: tx,
			options: {
				showObjectChanges: true,
				showEffects: true,
			},
			requestType: "WaitForLocalExecution"
		});

		console.log("result: ", JSON.stringify(result.objectChanges, null, 2));
		console.log("status: ", JSON.stringify(result.effects?.status, null, 2));

	} catch (e) {
		console.log(e)
	}
})()