import {PhantomReified, Reified, StructClass, ToField, ToTypeStr, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType} from "../../../../_framework/util";
import {PKG_V1} from "../index";
import {bcs, fromB64} from "@mysten/bcs";
import {SuiClient, SuiParsedData} from "@mysten/sui/client";

/* ============================== AllowlistRule =============================== */

export function isAllowlistRule(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::transfer_allowlist::AllowlistRule`; }

export interface AllowlistRuleFields { dummyField: ToField<"bool"> }

export type AllowlistRuleReified = Reified< AllowlistRule, AllowlistRuleFields >;

export class AllowlistRule implements StructClass { static readonly $typeName = `${PKG_V1}::transfer_allowlist::AllowlistRule`; static readonly $numTypeParams = 0;

 readonly $typeName = AllowlistRule.$typeName;

 readonly $fullTypeName: `${typeof PKG_V1}::transfer_allowlist::AllowlistRule`;

 readonly $typeArgs: [];

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: AllowlistRuleFields, ) { this.$fullTypeName = composeSuiType( AllowlistRule.$typeName, ...typeArgs ) as `${typeof PKG_V1}::transfer_allowlist::AllowlistRule`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): AllowlistRuleReified { return { typeName: AllowlistRule.$typeName, fullTypeName: composeSuiType( AllowlistRule.$typeName, ...[] ) as `${typeof PKG_V1}::transfer_allowlist::AllowlistRule`, typeArgs: [ ] as [], reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => AllowlistRule.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AllowlistRule.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => AllowlistRule.fromBcs( data, ), bcs: AllowlistRule.bcs, fromJSONField: (field: any) => AllowlistRule.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => AllowlistRule.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => AllowlistRule.fromSuiParsedData( content, ), fetch: async (client: SuiClient, id: string) => AllowlistRule.fetch( client, id, ), new: ( fields: AllowlistRuleFields, ) => { return new AllowlistRule( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return AllowlistRule.reified() }

 static phantom( ): PhantomReified<ToTypeStr<AllowlistRule>> { return phantom(AllowlistRule.reified( )); } static get p() { return AllowlistRule.phantom() }

 static get bcs() { return bcs.struct("AllowlistRule", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): AllowlistRule { return AllowlistRule.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): AllowlistRule { if (!isAllowlistRule(item.type)) { throw new Error("not a AllowlistRule type");

 }

 return AllowlistRule.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): AllowlistRule { return AllowlistRule.fromFields( AllowlistRule.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): AllowlistRule { return AllowlistRule.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): AllowlistRule { if (json.$typeName !== AllowlistRule.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return AllowlistRule.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): AllowlistRule { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAllowlistRule(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AllowlistRule object`); } return AllowlistRule.fromFieldsWithTypes( content ); }

 static async fetch( client: SuiClient, id: string ): Promise<AllowlistRule> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AllowlistRule object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAllowlistRule(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AllowlistRule object`); }
 return AllowlistRule.fromBcs( fromB64(res.data.bcs.bcsBytes) ); }

 }
