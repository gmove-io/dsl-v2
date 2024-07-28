import { Transaction } from '@mysten/sui/transactions';
import { client, keypair, getId } from './utils.js';
import * as dlab from "./.gen/desuilabs2/dlab/functions.js";

(async () => {
	try {
		console.log("calling...")

		const tx = new Transaction();
		tx.setGasBudget(100000000);

		dlab.createBorrowPolicy(
			tx, 
			getId("package::Publisher"),
		);

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