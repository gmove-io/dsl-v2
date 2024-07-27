import {PUBLISHED_AT} from "..";
import {String as String1} from "../../_dependencies/source/0x1/ascii/structs";
import {String} from "../../_dependencies/source/0x1/string/structs";
import {ID} from "../../_dependencies/source/0x2/object/structs";
import {obj, pure} from "../../_framework/util";
import {Transaction, TransactionArgument, TransactionObjectInput} from "@mysten/sui/transactions";

export interface MintArgs { name: string | TransactionArgument; description: string | TransactionArgument; url: Array<number | TransactionArgument> | TransactionArgument; attributesKeys: Array<string | TransactionArgument> | TransactionArgument; attributesValues: Array<string | TransactionArgument> | TransactionArgument; mintCap: TransactionObjectInput }

export function mint( tx: Transaction, args: MintArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::dlab::mint`, arguments: [ pure(tx, args.name, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.url, `vector<u8>`), pure(tx, args.attributesKeys, `vector<${String1.$typeName}>`), pure(tx, args.attributesValues, `vector<${String1.$typeName}>`), obj(tx, args.mintCap) ], }) }

export function init( tx: Transaction, witness: TransactionObjectInput ) { return tx.moveCall({ target: `${PUBLISHED_AT}::dlab::init`, arguments: [ obj(tx, witness) ], }) }

export interface BurnNftArgs { collection: TransactionObjectInput; nft: TransactionObjectInput }

export function burnNft( tx: Transaction, args: BurnNftArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::dlab::burn_nft`, arguments: [ obj(tx, args.collection), obj(tx, args.nft) ], }) }

export interface BurnNftInKioskArgs { collection: TransactionObjectInput; kiosk: TransactionObjectInput; nftId: string | TransactionArgument; policy: TransactionObjectInput }

export function burnNftInKiosk( tx: Transaction, args: BurnNftInKioskArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::dlab::burn_nft_in_kiosk`, arguments: [ obj(tx, args.collection), obj(tx, args.kiosk), pure(tx, args.nftId, `${ID.$typeName}`), obj(tx, args.policy) ], }) }

export interface BurnNftInListingArgs { collection: TransactionObjectInput; listing: TransactionObjectInput; inventoryId: string | TransactionArgument }

export function burnNftInListing( tx: Transaction, args: BurnNftInListingArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::dlab::burn_nft_in_listing`, arguments: [ obj(tx, args.collection), obj(tx, args.listing), pure(tx, args.inventoryId, `${ID.$typeName}`) ], }) }

export interface BurnNftInListingWithIdArgs { collection: TransactionObjectInput; listing: TransactionObjectInput; inventoryId: string | TransactionArgument; nftId: string | TransactionArgument }

export function burnNftInListingWithId( tx: Transaction, args: BurnNftInListingWithIdArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::dlab::burn_nft_in_listing_with_id`, arguments: [ obj(tx, args.collection), obj(tx, args.listing), pure(tx, args.inventoryId, `${ID.$typeName}`), pure(tx, args.nftId, `${ID.$typeName}`) ], }) }

export interface EmitUpgradeArgs { collection: TransactionObjectInput; nft: TransactionObjectInput }

export function emitUpgrade( tx: Transaction, args: EmitUpgradeArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::dlab::emit_upgrade`, arguments: [ obj(tx, args.collection), obj(tx, args.nft) ], }) }

export interface MintNftToKioskArgs { name: string | TransactionArgument; description: string | TransactionArgument; url: Array<number | TransactionArgument> | TransactionArgument; attributesKeys: Array<string | TransactionArgument> | TransactionArgument; attributesValues: Array<string | TransactionArgument> | TransactionArgument; mintCap: TransactionObjectInput; receiver: TransactionObjectInput }

export function mintNftToKiosk( tx: Transaction, args: MintNftToKioskArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::dlab::mint_nft_to_kiosk`, arguments: [ pure(tx, args.name, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.url, `vector<u8>`), pure(tx, args.attributesKeys, `vector<${String1.$typeName}>`), pure(tx, args.attributesValues, `vector<${String1.$typeName}>`), obj(tx, args.mintCap), obj(tx, args.receiver) ], }) }

export interface MintNftToNewKioskArgs { name: string | TransactionArgument; description: string | TransactionArgument; url: Array<number | TransactionArgument> | TransactionArgument; attributesKeys: Array<string | TransactionArgument> | TransactionArgument; attributesValues: Array<string | TransactionArgument> | TransactionArgument; mintCap: TransactionObjectInput; receiver: string | TransactionArgument }

export function mintNftToNewKiosk( tx: Transaction, args: MintNftToNewKioskArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::dlab::mint_nft_to_new_kiosk`, arguments: [ pure(tx, args.name, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.url, `vector<u8>`), pure(tx, args.attributesKeys, `vector<${String1.$typeName}>`), pure(tx, args.attributesValues, `vector<${String1.$typeName}>`), obj(tx, args.mintCap), pure(tx, args.receiver, `address`) ], }) }

export interface MintNftToWarehouseArgs { name: string | TransactionArgument; description: string | TransactionArgument; url: Array<number | TransactionArgument> | TransactionArgument; attributesKeys: Array<string | TransactionArgument> | TransactionArgument; attributesValues: Array<string | TransactionArgument> | TransactionArgument; mintCap: TransactionObjectInput; warehouse: TransactionObjectInput }

export function mintNftToWarehouse( tx: Transaction, args: MintNftToWarehouseArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::dlab::mint_nft_to_warehouse`, arguments: [ pure(tx, args.name, `${String.$typeName}`), pure(tx, args.description, `${String.$typeName}`), pure(tx, args.url, `vector<u8>`), pure(tx, args.attributesKeys, `vector<${String1.$typeName}>`), pure(tx, args.attributesValues, `vector<${String1.$typeName}>`), obj(tx, args.mintCap), obj(tx, args.warehouse) ], }) }

export interface UpgradeNftArgs { collection: TransactionObjectInput; nft: TransactionObjectInput; url: string | TransactionArgument }

export function upgradeNft( tx: Transaction, args: UpgradeNftArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::dlab::upgrade_nft`, arguments: [ obj(tx, args.collection), obj(tx, args.nft), pure(tx, args.url, `${String1.$typeName}`) ], }) }

export interface UpgradeNftInKioskArgs { collection: TransactionObjectInput; policy: TransactionObjectInput; kiosk: TransactionObjectInput; nftId: string | TransactionArgument; url: string | TransactionArgument }

export function upgradeNftInKiosk( tx: Transaction, args: UpgradeNftInKioskArgs ) { return tx.moveCall({ target: `${PUBLISHED_AT}::dlab::upgrade_nft_in_kiosk`, arguments: [ obj(tx, args.collection), obj(tx, args.policy), obj(tx, args.kiosk), pure(tx, args.nftId, `${ID.$typeName}`), pure(tx, args.url, `${String1.$typeName}`) ], }) }

export interface UpgradeToV2Args { nft: TransactionObjectInput; url: string | TransactionArgument }

export function upgradeToV2( tx: Transaction, args: UpgradeToV2Args ) { return tx.moveCall({ target: `${PUBLISHED_AT}::dlab::upgrade_to_v2`, arguments: [ obj(tx, args.nft), pure(tx, args.url, `${String1.$typeName}`) ], }) }
