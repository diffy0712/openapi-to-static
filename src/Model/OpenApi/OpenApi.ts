import {OpenApiInfoObject} from './OpenApiInfoObject';
import {OpenApiServerObject} from './OpenApiServerObject';
import {OpenApiExternalDocumentationObject} from './OpenApiExternalDocumentationObject';
import {OpenApiTagObject} from './OpenApiTagObject';
import {OpenApiSecurityRequirementObject} from './OpenApiSecurityObject';
import {OpenApiComponentsObject} from './OpenApiComponentsObject';
import {OpenApiPathsObject} from './OpenApiPathsObject';

/**
 * The OpenAPI Specification (OAS) defines a standard, language-agnostic interface to RESTful APIs
 * which allows both humans and computers to discover and understand the capabilities of the service without access to source code,
 * documentation, or through network traffic inspection. When properly defined,
 * a consumer can understand and interact with the remote service with a minimal amount of implementation logic.
 *
 * An OpenAPI definition can then be used by documentation generation tools to display the API,
 * code generation tools to generate servers and clients in various programming languages, testing tools, and many other use cases.
 *
 * @source https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md
 */
export interface OpenApi {
	/**
	 * 	REQUIRED. This string MUST be the semantic version number of the
	 * 	OpenAPI Specification version that the OpenAPI document uses.
	 * 	The openapi field SHOULD be used by tooling specifications
	 * 	and clients to interpret the OpenAPI document.
	 * 	This is not related to the API info.version string.
	 */
	openapi: string;

	/**
	 * REQUIRED. Provides metadata about the API. The metadata MAY be used by tooling as required.
	 */
	info: OpenApiInfoObject;

	/**
	 * An array of Server Objects, which provide connectivity information to a target server.
	 * If the servers property is not provided, or is an empty array,
	 * the default value would be a Server Object with a url value of /.
	 */
	servers?: OpenApiServerObject[];

	/**
	 * REQUIRED. The available paths and operations for the API.
	 */
	paths: OpenApiPathsObject;

	/**
	 * An element to hold various schemas for the specification.
	 */
	components?: OpenApiComponentsObject;

	/**
	 * A declaration of which security mechanisms can be used across the API.
	 * The list of values includes alternative security requirement objects
	 * that can be used.
	 *
	 * Only one of the security requirement objects need to be satisfied to authorize a request.
	 * Individual operations can override this definition.
	 * To make security optional, an empty security requirement ({}) can be included in the array.
	 */
	security?: OpenApiSecurityRequirementObject[];

	/**
	 * A list of tags used by the specification with additional metadata.
	 * The order of the tags can be used to reflect on their order by the parsing tools.
	 * Not all tags that are used by the Operation Object must be declared.
	 * The tags that are not declared MAY be organized randomly or based on the tools' logic.
	 * Each tag name in the list MUST be unique.
	 */
	tags?: OpenApiTagObject[];

	/**
	 * Additional external documentation.
	 */
	externalDocs?: OpenApiExternalDocumentationObject;
}


