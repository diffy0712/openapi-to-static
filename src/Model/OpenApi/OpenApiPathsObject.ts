import {OpenApiServerObject} from './OpenApiServerObject';
import {OpenApiParameterObject} from './OpenApiParameterObject';
import {OpenApiReferenceObject} from './OpenApiReferenceObject';
import {OpenApiExternalDocumentationObject} from './OpenApiExternalDocumentationObject';
import {OpenApiRequestBodyObject} from './OpenApiRequestBodyObject';
import {OpenApiResponsesObject} from './OpenApiResponseObject';
import {OpenApiCallbackObject} from './OpenApiCallbackObject';
import {OpenApiSecurityRequirementObject} from './OpenApiSecurityObject';

/**
 * Holds the relative paths to the individual endpoints and their operations.
 * The path is appended to the URL from the Server Object in order to construct the full URL.
 * The Paths MAY be empty, due to ACL constraints.
 *
 * @source https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#pathsObject
 */
export interface OpenApiPathsObject extends Iterable<string>{
	/**
	 * A relative path to an individual endpoint.
	 * The field name MUST begin with a forward slash (/).
	 * The path is appended (no relative URL resolution) to the expanded
	 * URL from the Server Object's url field in order to construct the full URL.
	 * Path templating is allowed.
	 * When matching URLs, concrete (non-templated) paths would be matched before their templated counterparts.
	 * Templated paths with the same hierarchy but different templated names MUST NOT exist as they are identical.
	 * In case of ambiguous matching, it's up to the tooling to decide which one to use.
	 */
	[route: string]: OpenApiPathItemObject;
}

/**
 * Describes the operations available on a single path.
 * A Path Item MAY be empty, due to ACL constraints.
 * The path itself is still exposed to the documentation viewer but they will not know which operations and parameters are available.
 *
 * @source https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#pathItemObject
 */
export interface OpenApiPathItemObject {
	/**
	 * Allows for an external definition of this path item.
	 * The referenced structure MUST be in the format of a Path Item Object.
	 * In case a Path Item Object field appears both in the defined object and the referenced object,
	 * the behavior is undefined.
	 */
	$ref?: string;

	/**
	 * An optional, string summary, intended to apply to all operations in this path.
	 */
	summary?: string;

	/**
	 * An optional, string description, intended to apply to all operations in this path.
	 * CommonMark syntax MAY be used for rich text representation.
	 */
	description?: string;

	/**
	 * A definition of a GET operation on this path.
	 */
	get?: OpenApiOperationObject;

	/**
	 * A definition of a PUT operation on this path.
	 */
	put?: OpenApiOperationObject;

	/**
	 * A definition of a POST operation on this path.
	 */
	post?: OpenApiOperationObject;

	/**
	 * A definition of a DELETE operation on this path.
	 */
	delete?: OpenApiOperationObject;

	/**
	 * A definition of a OPTIONS operation on this path.
	 */
	options?: OpenApiOperationObject;

	/**
	 * A definition of a HEAD operation on this path.
	 */
	head?: OpenApiOperationObject;

	/**
	 * A definition of a PATCH operation on this path.
	 */
	patch?: OpenApiOperationObject;

	/**
	 * A definition of a TRACE operation on this path.
	 */
	trace?: OpenApiOperationObject;

	/**
	 * An alternative server array to service all operations in this path.
	 */
	servers?: OpenApiServerObject[];

	/**
	 * A list of parameters that are applicable for all the operations described under this path.
	 * These parameters can be overridden at the operation level, but cannot be removed there.
	 * The list MUST NOT include duplicated parameters.
	 * A unique parameter is defined by a combination of a name and location.
	 * The list can use the Reference Object to link to parameters that
	 * are defined at the OpenAPI Object's components/parameters.
	 */
	parameters?: (OpenApiParameterObject|OpenApiReferenceObject)[];
}


/**
 * @source https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#operationObject
 */
export interface OpenApiOperationObject {
	/**
	 * A list of tags for API documentation control.
	 * Tags can be used for logical grouping of operations by resources or any other qualifier.
	 */
	tags?: string[];

	/**
	 * A short summary of what the operation does.
	 */
	summary?: string;

	/**
	 * A verbose explanation of the operation behavior. CommonMark syntax MAY be used for rich text representation.
	 */
	description?: string[];

	/**
	 * Additional external documentation for this operation.
	 */
	externalDocs?: OpenApiExternalDocumentationObject;

	/**
	 * Unique string used to identify the operation.
	 * The id MUST be unique among all operations described in the API.
	 * The operationId value is case-sensitive.
	 * Tools and libraries MAY use the operationId to uniquely identify an operation,
	 * therefore, it is RECOMMENDED to follow common programming naming conventions.
	 */
	operationId?: string;

	/**
	 * A list of parameters that are applicable for this operation.
	 * If a parameter is already defined at the Path Item,
	 * the new definition will override it but can never remove it.
	 *
	 * The list MUST NOT include duplicated parameters.
	 * A unique parameter is defined by a combination of a name and location.
	 * The list can use the Reference Object to link to parameters
	 * that are defined at the OpenAPI Object's components/parameters.
	 */
	parameters?: (OpenApiParameterObject|OpenApiReferenceObject)[];

	/**
	 * The request body applicable for this operation.
	 * The requestBody is only supported in HTTP methods where the HTTP 1.1 specification RFC7231
	 * has explicitly defined semantics for request bodies.
	 * In other cases where the HTTP spec is vague, requestBody SHALL be ignored by consumers.
	 */
	requestBody?: OpenApiRequestBodyObject|OpenApiReferenceObject;

	/**
	 * REQUIRED. The list of possible responses as they are returned from executing this operation.
	 */
	responses: OpenApiResponsesObject;

	/**
	 * A map of possible out-of band callbacks related to the parent operation.
	 * The key is a unique identifier for the Callback Object.
	 * Each value in the map is a Callback Object that describes a request
	 * that may be initiated by the API provider and the expected responses.
	 */
	callbacks?: { [v: string]: OpenApiCallbackObject|OpenApiReferenceObject };

	/**
	 * Declares this operation to be deprecated.
	 * Consumers SHOULD refrain from usage of the declared operation.
	 *
	 * Default value is false.
	 */
	deprecated?: boolean;

	/**
	 * A declaration of which security mechanisms can be used for this operation.
	 * The list of values includes alternative security requirement objects that can be used.
	 * Only one of the security requirement objects need to be satisfied to authorize a request.
	 * To make security optional, an empty security requirement ({}) can be included in the array.
	 * This definition overrides any declared top-level security.
	 * To remove a top-level security declaration, an empty array can be used.
	 */
	security?: OpenApiSecurityRequirementObject;

	/**
	 * An alternative server array to service this operation.
	 * If an alternative server object is specified at the
	 * Path Item Object or Root level, it will be overridden by this value.
	 */
	servers?: OpenApiServerObject[];
}
