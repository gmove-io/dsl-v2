import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../../../_framework/util";
import {ID, UID} from "../../0x2/object/structs";
import {VecMap} from "../../0x2/vec-map/structs";
import {VecSet} from "../../0x2/vec-set/structs";
import {PKG_V1} from "../index";
import {bcs, fromB64, fromHEX, toHEX} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== Witness =============================== */

export function isWitness(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::royalty::Witness`; }

export interface WitnessFields { dummyField: ToField<"bool"> }

export type WitnessReified = Reified< Witness, WitnessFields >;

export class Witness implements StructClass { static readonly $typeName = `${PKG_V1}::royalty::Witness`; static readonly $numTypeParams = 0;

 readonly $typeName = Witness.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::royalty::Witness`;

 readonly $typeArgs: [];

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: WitnessFields, ) { this.$fullTypeName = composeSuiType( Witness.$typeName, ...typeArgs ) as `${typeof PKG_V1}::royalty::Witness`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): WitnessReified { return { typeName: Witness.$typeName, fullTypeName: composeSuiType( Witness.$typeName, ...[] ) as `${typeof PKG_V1}::royalty::Witness`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Witness.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Witness.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Witness.fromBcs( data, ), bcs: Witness.bcs, fromJSONField: (field: any) => Witness.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Witness.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Witness.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Witness.fetch( client, id, ), new: ( fields: WitnessFields, ) => { return new Witness( [], fields ) }, kind: "StructClassReified", } }

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

/* ============================== RoyaltyDomain =============================== */

export function isRoyaltyDomain(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::royalty::RoyaltyDomain`; }

export interface RoyaltyDomainFields { strategies: ToField<VecSet<ID>>; aggregations: ToField<UID>; royaltySharesBps: ToField<VecMap<"address", "u16">> }

export type RoyaltyDomainReified = Reified< RoyaltyDomain, RoyaltyDomainFields >;

export class RoyaltyDomain implements StructClass { static readonly $typeName = `${PKG_V1}::royalty::RoyaltyDomain`; static readonly $numTypeParams = 0;

 readonly $typeName = RoyaltyDomain.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::royalty::RoyaltyDomain`;

 readonly $typeArgs: [];

 readonly strategies: ToField<VecSet<ID>>; readonly aggregations: ToField<UID>; readonly royaltySharesBps: ToField<VecMap<"address", "u16">>

 private constructor(typeArgs: [], fields: RoyaltyDomainFields, ) { this.$fullTypeName = composeSuiType( RoyaltyDomain.$typeName, ...typeArgs ) as `${typeof PKG_V1}::royalty::RoyaltyDomain`; this.$typeArgs = typeArgs;

 this.strategies = fields.strategies;; this.aggregations = fields.aggregations;; this.royaltySharesBps = fields.royaltySharesBps; }

 static reified( ): RoyaltyDomainReified { return { typeName: RoyaltyDomain.$typeName, fullTypeName: composeSuiType( RoyaltyDomain.$typeName, ...[] ) as `${typeof PKG_V1}::royalty::RoyaltyDomain`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => RoyaltyDomain.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => RoyaltyDomain.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => RoyaltyDomain.fromBcs( data, ), bcs: RoyaltyDomain.bcs, fromJSONField: (field: any) => RoyaltyDomain.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => RoyaltyDomain.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => RoyaltyDomain.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => RoyaltyDomain.fetch( client, id, ), new: ( fields: RoyaltyDomainFields, ) => { return new RoyaltyDomain( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return RoyaltyDomain.reified() }

 static phantom( ): PhantomReified<ToTypeStr<RoyaltyDomain>> { return phantom(RoyaltyDomain.reified( )); } static get p() { return RoyaltyDomain.phantom() }

 static get bcs() { return bcs.struct("RoyaltyDomain", {

 strategies: VecSet.bcs(ID.bcs), aggregations: UID.bcs, royalty_shares_bps: VecMap.bcs(bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), bcs.u16())

}) };

 static fromFields( fields: Record<string, any> ): RoyaltyDomain { return RoyaltyDomain.reified( ).new( { strategies: decodeFromFields(VecSet.reified(ID.reified()), fields.strategies), aggregations: decodeFromFields(UID.reified(), fields.aggregations), royaltySharesBps: decodeFromFields(VecMap.reified("address", "u16"), fields.royalty_shares_bps) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): RoyaltyDomain { if (!isRoyaltyDomain(item.type)) { throw new Error("not a RoyaltyDomain type");

 }

 return RoyaltyDomain.reified( ).new( { strategies: decodeFromFieldsWithTypes(VecSet.reified(ID.reified()), item.fields.strategies), aggregations: decodeFromFieldsWithTypes(UID.reified(), item.fields.aggregations), royaltySharesBps: decodeFromFieldsWithTypes(VecMap.reified("address", "u16"), item.fields.royalty_shares_bps) } ) }

 static fromBcs( data: Uint8Array ): RoyaltyDomain { return RoyaltyDomain.fromFields( RoyaltyDomain.bcs.parse(data) ) }

 toJSONField() { return {

 strategies: this.strategies.toJSONField(),aggregations: this.aggregations,royaltySharesBps: this.royaltySharesBps.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): RoyaltyDomain { return RoyaltyDomain.reified( ).new( { strategies: decodeFromJSONField(VecSet.reified(ID.reified()), field.strategies), aggregations: decodeFromJSONField(UID.reified(), field.aggregations), royaltySharesBps: decodeFromJSONField(VecMap.reified("address", "u16"), field.royaltySharesBps) } ) }

 static fromJSON( json: Record<string, any> ): RoyaltyDomain { if (json.$typeName !== RoyaltyDomain.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return RoyaltyDomain.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): RoyaltyDomain { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRoyaltyDomain(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a RoyaltyDomain object`); } return RoyaltyDomain.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<RoyaltyDomain> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching RoyaltyDomain object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRoyaltyDomain(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a RoyaltyDomain object`); }
 return RoyaltyDomain.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
