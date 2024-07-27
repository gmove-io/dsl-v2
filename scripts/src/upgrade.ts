import { Transaction } from '@mysten/sui/transactions';
import { client, keypair, getId } from './utils.js';

(async () => {
	console.log("building package...")
	
	const { execSync } = require('child_process');
	const { modules, dependencies, digest } = JSON.parse(
	execSync(
		`${process.env.CLI_PATH!} move build --dump-bytecode-as-base64 --path ${process.env.DLABV2_PACKAGE_PATH!}`, 
		{ encoding: 'utf-8' }
	));

	console.log("publishing...")

	try {		
		const tx = new Transaction();

		const ticket = tx.moveCall({
			target: '0x2::package::authorize_upgrade',
			arguments: [
				tx.object(getId(`package::UpgradeCap`)), 
				tx.pure.u8(0), 
				tx.pure.vector('u8', digest)
			],
		});

		const receipt = tx.upgrade({ modules,dependencies, package: getId("package_id"), ticket });

		tx.moveCall({
			target: '0x2::package::commit_upgrade',
			arguments: [tx.object(getId(`package::UpgradeCap`)), receipt],
		});

		const result = await client.signAndExecuteTransaction({
			signer: keypair,
			transaction: tx,
			options: {
				showEffects: true,
			},
			requestType: "WaitForLocalExecution"
		});
		
		console.log("result: ", JSON.stringify(result, null, 2));

		// return if the tx hasn't succeed
		if (result.effects?.status?.status !== "success") {
			console.log("\n\nUpgrade failed");
            return;
        }
		
	} catch (e) {
		console.log(e);
	}
})()