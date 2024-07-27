import { Transaction } from '@mysten/sui/transactions';
import { client, keypair, getId } from './utils.js';
import * as dlab from "./.gen/desuilabs1/dlab/functions.js";

(async () => {
	try {
		console.log("calling...")

		const tx = new Transaction();
		tx.setGasBudget(100000000);

		dlab.mintNftToNewKiosk(tx, {
			name: "Test NFT",
			description: "Test NFT",
			url: Array.from("ipfs://bafybeictvrpb2vdek7i3gmfihnwrl4j6egoht6em36slnbghq7jqdl7ul4/415.png").map(char => char.charCodeAt(0)),
			attributesKeys: ["hair", "eyes"],
			attributesValues: ["bald", "none"],
			mintCap: getId("mint_cap::MintCap"),
			receiver: keypair.toSuiAddress()
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