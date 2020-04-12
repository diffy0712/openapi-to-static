import {OpenApiSchemaObject} from './OpenApiSchemaObject';
import {OpenApiReferenceObject} from './OpenApiReferenceObject';
import {OpenApiResponseObject} from './OpenApiResponseObject';
import {OpenApiParameterObject} from './OpenApiParameterObject';
import {OpenApiExampleObject} from './OpenApiExampleObject';
import {OpenApiRequestBodyObject} from './OpenApiRequestBodyObject';
import {OpenApiHeaderObject} from './OpenApiHeaderObject';
import {OpenApiSecuritySchemeObject} from './OpenApiSecurityObject';
import {OpenApiLinkObject} from './OpenApiLinkObject';
import {OpenApiCallbackObject} from './OpenApiCallbackObject';

/**
 * Holds a set of reusable objects for different aspects of the OAS.
 * All objects defined within the components object will have no effect on the API
 * unless they are explicitly referenced from properties outside the components object.
 *
 * @source https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#componentsObject
 */
export interface OpenApiComponentsObject {
	/**
	 * An object to hold reusable Schema Objects.
	 */
	schemas?: { [v: string]: OpenApiSchemaObject|OpenApiReferenceObject };

	/**
	 * An object to hold reusable Response Objects.
	 */
	responses?: { [v: string]: OpenApiResponseObject|OpenApiReferenceObject };

	/**
	 * An object to hold reusable Parameter Objects.
	 */
	parameters?: { [v: string]: OpenApiParameterObject|OpenApiReferenceObject };

	/**
	 * An object to hold reusable Example Objects.
	 */
	examples?: { [v: string]: OpenApiExampleObject|OpenApiReferenceObject };

	/**
	 * An object to hold reusable Request Body Objects.
	 */
	requestBodies?: { [v: string]: OpenApiRequestBodyObject|OpenApiReferenceObject };

	/**
	 * An object to hold reusable Header Objects.
	 */
	headers?: { [v: string]: OpenApiHeaderObject|OpenApiReferenceObject };

	/**
	 * An object to hold reusable Security Scheme Objects.
	 */
	securitySchemes?: { [v: string]: OpenApiSecuritySchemeObject|OpenApiReferenceObject };

	/**
	 * An object to hold reusable Link Objects.
	 */
	links?: { [v: string]: OpenApiLinkObject|OpenApiReferenceObject };

	/**
	 * An object to hold reusable Callback Objects.
	 */
	callbacks?: { [v: string]: OpenApiCallbackObject|OpenApiReferenceObject };
}
