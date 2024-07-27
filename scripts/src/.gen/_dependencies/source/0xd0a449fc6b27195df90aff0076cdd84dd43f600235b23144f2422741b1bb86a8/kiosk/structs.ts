import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../../../_framework/util";
import {PKG_V1} from "../index";
import {bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== KIOSK =============================== */

export function isKIOSK(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::kiosk::KIOSK`; }

export interface KIOSKFields { dummyField: ToField<"bool"> }

export type KIOSKReified = Reified< KIOSK, KIOSKFields >;

export class KIOSK implements StructClass { static readonly $typeName = `${PKG_V1}::kiosk::KIOSK`; static readonly $numTypeParams = 0;

 readonly $typeName = KIOSK.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::kiosk::KIOSK`;

 readonly $typeArgs: [];

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: KIOSKFields, ) { this.$fullTypeName = composeSuiType( KIOSK.$typeName, ...typeArgs ) as `${typeof PKG_V1}::kiosk::KIOSK`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): KIOSKReified { return { typeName: KIOSK.$typeName, fullTypeName: composeSuiType( KIOSK.$typeName, ...[] ) as `${typeof PKG_V1}::kiosk::KIOSK`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => KIOSK.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => KIOSK.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => KIOSK.fromBcs( data, ), bcs: KIOSK.bcs, fromJSONField: (field: any) => KIOSK.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => KIOSK.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => KIOSK.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => KIOSK.fetch( client, id, ), new: ( fields: KIOSKFields, ) => { return new KIOSK( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return KIOSK.reified() }

 static phantom( ): PhantomReified<ToTypeStr<KIOSK>> { return phantom(KIOSK.reified( )); } static get p() { return KIOSK.phantom() }

 static get bcs() { return bcs.struct("KIOSK", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): KIOSK { return KIOSK.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): KIOSK { if (!isKIOSK(item.type)) { throw new Error("not a KIOSK type");

 }

 return KIOSK.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): KIOSK { return KIOSK.fromFields( KIOSK.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): KIOSK { return KIOSK.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): KIOSK { if (json.$typeName !== KIOSK.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return KIOSK.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): KIOSK { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isKIOSK(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a KIOSK object`); } return KIOSK.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<KIOSK> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching KIOSK object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isKIOSK(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a KIOSK object`); }
 return KIOSK.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
