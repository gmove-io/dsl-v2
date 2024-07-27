import {String} from "../../_dependencies/source/0x1/string/structs";
import {Attributes} from "../../_dependencies/source/0x1735f24294e55a988541e97db050903cf8a70ce38c77ad219c134344eda67ac/attributes/structs";
import {UID} from "../../_dependencies/source/0x2/object/structs";
import {Url} from "../../_dependencies/source/0x2/url/structs";
import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../_framework/util";
import {PKG_V1} from "../index";
import {bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== Witness =============================== */

export function isWitness(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::dlab::Witness`; }

export interface WitnessFields { dummyField: ToField<"bool"> }

export type WitnessReified = Reified< Witness, WitnessFields >;

export class Witness implements StructClass { static readonly $typeName = `${PKG_V1}::dlab::Witness`; static readonly $numTypeParams = 0;

 readonly $typeName = Witness.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::dlab::Witness`;

 readonly $typeArgs: [];

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: WitnessFields, ) { this.$fullTypeName = composeSuiType( Witness.$typeName, ...typeArgs ) as `${typeof PKG_V1}::dlab::Witness`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): WitnessReified { return { typeName: Witness.$typeName, fullTypeName: composeSuiType( Witness.$typeName, ...[] ) as `${typeof PKG_V1}::dlab::Witness`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Witness.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Witness.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Witness.fromBcs( data, ), bcs: Witness.bcs, fromJSONField: (field: any) => Witness.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Witness.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Witness.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Witness.fetch( client, id, ), new: ( fields: WitnessFields, ) => { return new Witness( [], fields ) }, kind: "StructClassReified", } }

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

/* ============================== DLAB =============================== */

export function isDLAB(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::dlab::DLAB`; }

export interface DLABFields { dummyField: ToField<"bool"> }

export type DLABReified = Reified< DLAB, DLABFields >;

export class DLAB implements StructClass { static readonly $typeName = `${PKG_V1}::dlab::DLAB`; static readonly $numTypeParams = 0;

 readonly $typeName = DLAB.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::dlab::DLAB`;

 readonly $typeArgs: [];

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: DLABFields, ) { this.$fullTypeName = composeSuiType( DLAB.$typeName, ...typeArgs ) as `${typeof PKG_V1}::dlab::DLAB`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): DLABReified { return { typeName: DLAB.$typeName, fullTypeName: composeSuiType( DLAB.$typeName, ...[] ) as `${typeof PKG_V1}::dlab::DLAB`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => DLAB.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => DLAB.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => DLAB.fromBcs( data, ), bcs: DLAB.bcs, fromJSONField: (field: any) => DLAB.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => DLAB.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => DLAB.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => DLAB.fetch( client, id, ), new: ( fields: DLABFields, ) => { return new DLAB( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return DLAB.reified() }

 static phantom( ): PhantomReified<ToTypeStr<DLAB>> { return phantom(DLAB.reified( )); } static get p() { return DLAB.phantom() }

 static get bcs() { return bcs.struct("DLAB", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): DLAB { return DLAB.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): DLAB { if (!isDLAB(item.type)) { throw new Error("not a DLAB type");

 }

 return DLAB.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): DLAB { return DLAB.fromFields( DLAB.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): DLAB { return DLAB.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): DLAB { if (json.$typeName !== DLAB.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return DLAB.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): DLAB { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDLAB(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a DLAB object`); } return DLAB.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<DLAB> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching DLAB object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDLAB(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a DLAB object`); }
 return DLAB.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }

/* ============================== Dlab =============================== */

export function isDlab(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::dlab::Dlab`; }

export interface DlabFields { id: ToField<UID>; name: ToField<String>; description: ToField<String>; url: ToField<Url>; attributes: ToField<Attributes> }

export type DlabReified = Reified< Dlab, DlabFields >;

export class Dlab implements StructClass { static readonly $typeName = `${PKG_V1}::dlab::Dlab`; static readonly $numTypeParams = 0;

 readonly $typeName = Dlab.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::dlab::Dlab`;

 readonly $typeArgs: [];

 readonly id: ToField<UID>; readonly name: ToField<String>; readonly description: ToField<String>; readonly url: ToField<Url>; readonly attributes: ToField<Attributes>

 private constructor(typeArgs: [], fields: DlabFields, ) { this.$fullTypeName = composeSuiType( Dlab.$typeName, ...typeArgs ) as `${typeof PKG_V1}::dlab::Dlab`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.name = fields.name;; this.description = fields.description;; this.url = fields.url;; this.attributes = fields.attributes; }

 static reified( ): DlabReified { return { typeName: Dlab.$typeName, fullTypeName: composeSuiType( Dlab.$typeName, ...[] ) as `${typeof PKG_V1}::dlab::Dlab`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => Dlab.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Dlab.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => Dlab.fromBcs( data, ), bcs: Dlab.bcs, fromJSONField: (field: any) => Dlab.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => Dlab.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => Dlab.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => Dlab.fetch( client, id, ), new: ( fields: DlabFields, ) => { return new Dlab( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return Dlab.reified() }

 static phantom( ): PhantomReified<ToTypeStr<Dlab>> { return phantom(Dlab.reified( )); } static get p() { return Dlab.phantom() }

 static get bcs() { return bcs.struct("Dlab", {

 id: UID.bcs, name: String.bcs, description: String.bcs, url: Url.bcs, attributes: Attributes.bcs

}) };

 static fromFields( fields: Record<string, any> ): Dlab { return Dlab.reified( ).new( { id: decodeFromFields(UID.reified(), fields.id), name: decodeFromFields(String.reified(), fields.name), description: decodeFromFields(String.reified(), fields.description), url: decodeFromFields(Url.reified(), fields.url), attributes: decodeFromFields(Attributes.reified(), fields.attributes) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): Dlab { if (!isDlab(item.type)) { throw new Error("not a Dlab type");

 }

 return Dlab.reified( ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), description: decodeFromFieldsWithTypes(String.reified(), item.fields.description), url: decodeFromFieldsWithTypes(Url.reified(), item.fields.url), attributes: decodeFromFieldsWithTypes(Attributes.reified(), item.fields.attributes) } ) }

 static fromBcs( data: Uint8Array ): Dlab { return Dlab.fromFields( Dlab.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,name: this.name,description: this.description,url: this.url,attributes: this.attributes.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): Dlab { return Dlab.reified( ).new( { id: decodeFromJSONField(UID.reified(), field.id), name: decodeFromJSONField(String.reified(), field.name), description: decodeFromJSONField(String.reified(), field.description), url: decodeFromJSONField(Url.reified(), field.url), attributes: decodeFromJSONField(Attributes.reified(), field.attributes) } ) }

 static fromJSON( json: Record<string, any> ): Dlab { if (json.$typeName !== Dlab.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return Dlab.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): Dlab { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDlab(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Dlab object`); } return Dlab.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<Dlab> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Dlab object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDlab(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Dlab object`); }
 return Dlab.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
