import {OpenApiSchemaObject} from './OpenApiSchemaObject';
import {OpenApiReferenceObject} from './OpenApiReferenceObject';
import {OpenApiExampleObject} from './OpenApiExampleObject';
import {OpenApiEncodingObject} from './OpenApiEncodingObject';

/**
 * Each Media Type Object provides schema and examples for the media type identified by its key.
 *
 * @source https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#mediaTypeObject
 */
export interface OpenApiMediaTypeObject {
	/**
	 * The schema defining the content of the request, response, or parameter.
	 */
	schema?: OpenApiSchemaObject|OpenApiReferenceObject;

	/**
	 * Example of the media type.
	 * The example object SHOULD be in the correct format as specified by the media type.
	 * The example field is mutually exclusive of the examples field. Furthermore,
	 * if referencing a schema which contains an example,
	 * the example value SHALL override the example provided by the schema.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	example?: any;

	/**
	 * Examples of the media type.
	 * Each example object SHOULD match the media type and specified schema if present.
	 * The examples field is mutually exclusive of the example field. Furthermore,
	 * if referencing a schema which contains an example,
	 * the examples value SHALL override the example provided by the schema.
	 */
	examples?: { [v: string]: OpenApiExampleObject|OpenApiReferenceObject };

	/**
	 * A map between a property name and its encoding information.
	 * The key, being the property name, MUST exist in the schema as a property.
	 * The encoding object SHALL only apply to requestBody objects
	 * when the media type is multipart or application/x-www-form-urlencoded.
	 */
	encoding?: { [v: string]: OpenApiEncodingObject };
}
