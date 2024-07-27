import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../../../_framework/util";
import {Option} from "../../0x1/option/structs";
import {ID, UID} from "../../0x2/object/structs";
import {Supply} from "../../0xcdbd730f422a89174ee4717e97a3db1c48b008f969eec00846a0d685b2437f8a/utils-supply/structs";
import {PKG_V1} from "../index";
import {bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== Witness =============================== */

export function isWitness(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::mint_cap::Witness`; }

export interface WitnessFields { dummyField: ToField<"bool"> }

export type WitnessReified = Reified< Witness, WitnessFields >;

export class Witness implements StructClass { static readonly $typeName = `${PKG_V1}::mint_cap::Witness`; static readonly $numTypeParams = 0;

 readonly $typeName = Witness.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::mint_cap::Witness`;

 readonly $typeArgs: [];

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: WitnessFields, ) { this.$fullTypeName = composeSuiType( Witness.$typeName, ...typeArgs ) as `${typeof PKG_V1}::mint_cap::Witness`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): WitnessReified { return { typeName: Witness.$typeName, fullTypeName: composeSuiType( Witness.$typeName, ...[] ) as `${typeof PKG_V1}::mint_cap::Witness`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Witness.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Witness.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Witness.fromBcs( data, ), bcs: Witness.bcs, fromJSONField: (field: any) => Witness.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Witness.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Witness.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Witness.fetch( client, id, ), new: ( fields: WitnessFields, ) => { return new Witness( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Witness.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Witness>> { return phantom(Witness.reified( )); } static get p() { return Witness.phantom() }

 static get bcs() { return bcs.struct("Witness", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): Witness { return Witness.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Witness { if (!isWitness(item.type)) { throw new Error("not a Witness type");

 }

 return Witness.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): Witness { return Witness.fromFields( Witness.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Witness { return Witness.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): Witness { if (json.$typeName !== Witness.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Witness.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Witness { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isWitness(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Witness object`); } return Witness.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Witness> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Witness object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isWitness(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Witness object`); }
 return Witness.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== MintCap =============================== */

export function isMintCap(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::mint_cap::MintCap` + '<'); }

export interface MintCapFields<T extends PhantomTypeArgument> { id: ToField<UID>; collectionId: ToField<ID>; supply: ToField<Option<Supply>> }

export type MintCapReified<T extends PhantomTypeArgument> = Reified< MintCap<T>, MintCapFields<T> >;

export class MintCap<T extends PhantomTypeArgument> implements StructClass { static readonly $typeName = `${PKG_V1}::mint_cap::MintCap`; static readonly $numTypeParams = 1;

 readonly $typeName = MintCap.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::mint_cap::MintCap<${PhantomToTypeStr<T>}>`;

 readonly $typeArgs: [PhantomToTypeStr<T>];

 readonly id: ToField<UID>; readonly collectionId: ToField<ID>; readonly supply: ToField<Option<Supply>>

 private constructor(typeArgs: [PhantomToTypeStr<T>], fields: MintCapFields<T>, ) { this.$fullTypeName = composeSuiType( MintCap.$typeName, ...typeArgs ) as `${typeof PKG_V1}::mint_cap::MintCap<${PhantomToTypeStr<T>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.collectionId = fields.collectionId;; this.supply = fields.supply; }

 static reified<T extends PhantomReified<PhantomTypeArgument>>( T: T ): MintCapReified<ToPhantomTypeArgument<T>> { return { typeName: MintCap.$typeName, fullTypeName: composeSuiType( MintCap.$typeName, ...[extractType(T)] ) as `${typeof PKG_V1}::mint_cap::MintCap<${PhantomToTypeStr<ToPhantomTypeArgument<T>>}>`, typeArgs: [ extractType(T) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T>>], reifiedTypeArgs: [T], fromFields: (fields: Record<string, any>) => MintCap.fromFields( T, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MintCap.fromFieldsWithTypes( T, item, ), fromBcs: (data: Uint8Array) => MintCap.fromBcs( T, data, ), bcs: MintCap.bcs, fromJSONField: (field: any) => MintCap.fromJSONField( T, field, ), fromJSON: (json: Record<string, any>) => MintCap.fromJSON( T, json, ), fromSuiParsedData: (content: SuiParsedData) => MintCap.fromSuiParsedData( T, content, ), fetch: async (client: SuiClient, id: string) => MintCap.fetch( client, T, id, ), new: ( fields: MintCapFields<ToPhantomTypeArgument<T>>, ) => { return new MintCap( [extractType(T)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MintCap.reified }

 static phantom<T extends PhantomReified<PhantomTypeArgument>>( T: T ): PhantomReified<ToTypeStr<MintCap<ToPhantomTypeArgument<T>>>> { return phantom(MintCap.reified( T )); } static get p() { return MintCap.phantom }

 static get bcs() { return bcs.struct("MintCap", {

 id: UID.bcs, collection_id: ID.bcs, supply: Option.bcs(Supply.bcs)

}) };

 static fromFields<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, fields: Record<string, any> ): MintCap<ToPhantomTypeArgument<T>> { return MintCap.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id), collectionId: decodeFromFields(ID.reified(), fields.collection_id), supply: decodeFromFields(Option.reified(Supply.reified()), fields.supply) } ) }

 static fromFieldsWithTypes<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, item: FieldsWithTypes ): MintCap<ToPhantomTypeArgument<T>> { if (!isMintCap(item.type)) { throw new Error("not a MintCap type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MintCap.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), collectionId: decodeFromFieldsWithTypes(ID.reified(), item.fields.collection_id), supply: decodeFromFieldsWithTypes(Option.reified(Supply.reified()), item.fields.supply) } ) }

 static fromBcs<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, data: Uint8Array ): MintCap<ToPhantomTypeArgument<T>> { return MintCap.fromFields( typeArg, MintCap.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,collectionId: this.collectionId,supply: fieldToJSON<Option<Supply>>(`${Option.$typeName}<${Supply.$typeName}>`, this.supply),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, field: any ): MintCap<ToPhantomTypeArgument<T>> { return MintCap.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id), collectionId: decodeFromJSONField(ID.reified(), field.collectionId), supply: decodeFromJSONField(Option.reified(Supply.reified()), field.supply) } ) }

 static fromJSON<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, json: Record<string, any> ): MintCap<ToPhantomTypeArgument<T>> { if (json.$typeName !== MintCap.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MintCap.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MintCap.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T extends PhantomReified<PhantomTypeArgument>>( typeArg: T, content: SuiParsedData ): MintCap<ToPhantomTypeArgument<T>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMintCap(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MintCap object`); } return MintCap.fromFieldsWithTypes( typeArg, content ); }

 static async fetch<T extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T, id: string ): Promise<MintCap<ToPhantomTypeArgument<T>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MintCap object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMintCap(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MintCap object`); }
 return MintCap.fromBcs( typeArg, fromB64(res.data.bcs.bcsBytes) ); }

 }
