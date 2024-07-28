import { Transaction } from '@mysten/sui/transactions';
import { client, keypair, getId } from './utils.js';
import * as dlab from "./.gen/desuilabs2/dlab/functions.js";

(async () => {
	try {
		console.log("calling...")

		const tx = new Transaction();
		tx.setGasBudget(100000000);

		dlab.airUpgradeNft(tx, {
			policy: "0x7944805558105f6ce4121fcb697154b24c357add66e4d9cf22739b23ae208c4f", // borrow policy
			kiosk: "0x4ec9d6e7f9335e33968111444659bd0a42cb237b8168c44937e254d591a5266a",
			nftId: "0x4840d6bd4e90e8cf6cf6e74e17fb9b612be2fd046736f4078cc939b71c6628d2",
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