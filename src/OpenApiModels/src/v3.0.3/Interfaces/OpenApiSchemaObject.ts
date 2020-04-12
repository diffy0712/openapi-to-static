import {OpenApiReferenceObject} from './OpenApiReferenceObject';
import {OpenApiExternalDocumentationObject} from './OpenApiExternalDocumentationObject';
import {OpenApiDiscriminatorObject} from './OpenApiDiscriminatorObject';
import {OpenApiXmlObject} from './OpenApiXmlObject';

/**
 * The Schema Object allows the definition of input and output data types.
 * These types can be objects, but also primitives and arrays.
 * This object is an extended subset of the JSON Schema Specification Wright Draft 00.
 *
 * For more information about the properties, see JSON Schema Core and JSON Schema Validation. Unless stated otherwise, the property definitions follow the JSON Schema.
 *
 * @source https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#schemaObject
 */
export interface OpenApiSchemaObject {
	/**
	 * A true value adds "null" to the allowed type specified by the type keyword,
	 * only if type is explicitly defined within the same Schema Object.
	 * Other Schema Object constraints retain their defined behavior, and therefore may disallow the use of null as a value.
	 * A false value leaves the specified or default type unmodified. The default value is false.
	 */
	nullable?: boolean;

	/**
	 * Adds support for polymorphism.
	 * The discriminator is an object name that is used to differentiate between other schemas which may satisfy the payload description.
	 * See Composition and Inheritance for more details.
	 */
	discriminator?: OpenApiDiscriminatorObject;

	/**
	 * Relevant only for Schema "properties" definitions.
	 * Declares the property as "read only".
	 * This means that it MAY be sent as part of a response but SHOULD NOT be sent as part of the request.
	 * If the property is marked as readOnly being true and is in the required list, the required will take effect on the response only.
	 * A property MUST NOT be marked as both readOnly and writeOnly being true. Default value is false.
	 */
	readOnly?: boolean;

	/**
	 * Relevant only for Schema "properties" definitions. Declares the property as "write only".
	 * Therefore, it MAY be sent as part of a request but SHOULD NOT be sent as part of the response.
	 * If the property is marked as writeOnly being true and is in the required list, the required will take effect on the request only.
	 * A property MUST NOT be marked as both readOnly and writeOnly being true. Default value is false.
	 */
	writeOnly?: boolean;

	/**
	 * This MAY be used only on properties schemas. It has no effect on root schemas. Adds additional metadata to describe the XML representation of this property.
	 */
	xml?: OpenApiXmlObject;

	/**
	 * Additional external documentation for this schema.
	 */
	externalDocs?: OpenApiExternalDocumentationObject;

	/**
	 * A free-form property to include an example of an instance for this schema.
	 * To represent examples that cannot be naturally represented in JSON or YAML,
	 * a string value can be used to contain the example with escaping where necessary.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	example?: any;

	/**
	 * Specifies that a schema is deprecated and SHOULD be transitioned out of usage. Default value is false.
	 */
	deprecated?: boolean;

	/**
	 * The following properties are taken from the JSON Schema definition but their definitions were adjusted to the OpenAPI Specification.
	 */

	/**
	 * Value MUST be a string. Multiple types via an array are not supported.
	 */
	type?: string;

	/**
	 * Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema.
	 */
	allOf?: (OpenApiSchemaObject | OpenApiReferenceObject)[];

	/**
	 * Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema.
	 */
	oneOf?: (OpenApiSchemaObject | OpenApiReferenceObject)[];

	/**
	 * Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema.
	 */
	anyOf?: (OpenApiSchemaObject | OpenApiReferenceObject)[];

	/**
	 * Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema.
	 */
	not?: OpenApiSchemaObject | OpenApiReferenceObject;

	/**
	 * Value MUST be an object and not an array.
	 * Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema.
	 * items MUST be present if the type is array.
	 */
	items?: OpenApiSchemaObject | OpenApiReferenceObject;

	/**
	 * Property definitions MUST be a Schema Object and not a standard JSON Schema (inline or referenced).
	 */
	properties?: {[propertyName: string]: (OpenApiSchemaObject | OpenApiReferenceObject)};

	/**
	 * Value can be boolean or object.
	 * Inline or referenced schema MUST be of a Schema Object and not a standard JSON Schema.
	 * Consistent with JSON Schema, additionalProperties defaults to true.
	 */
	additionalProperties?: (OpenApiSchemaObject | OpenApiReferenceObject | boolean);

	/**
	 * CommonMark syntax MAY be used for rich text representation.
	 */
	description?: string;

	/**
	 * See Data Type Formats for further details.
	 * While relying on JSON Schema's defined formats, the OAS offers a few additional predefined formats.
	 */
	format?: string;

	/**
	 * The default value represents what would be assumed by the consumer of the input as the value of the schema if one is not provided.
	 * Unlike JSON Schema, the value MUST conform to the defined type for the Schema Object defined at the same level.
	 * For example, if type is string, then default can be "foo" but cannot be 1.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	default?: any;

	/**
	 * The following properties are taken directly from the JSON Schema definition and follow the same specifications:
	 */
	title?: string;
	multipleOf?: number;
	maximum?: number;
	exclusiveMaximum?: boolean;
	minimum?: number;
	exclusiveMinimum?: boolean;
	maxLength?: number;
	minLength?: number;
	pattern?: string;
	maxItems?: number;
	minItems?: number;
	uniqueItems?: boolean;
	maxProperties?: number;
	minProperties?: number;
	required?: string[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	enum?: any[];
}
