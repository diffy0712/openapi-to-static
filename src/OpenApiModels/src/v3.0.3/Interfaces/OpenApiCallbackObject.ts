import {OpenApiPathItemObject} from './OpenApiPathsObject';

/**
 * A map of possible out-of band callbacks related to the parent operation.
 * Each value in the map is a Path Item Object that describes
 * a set of requests that may be initiated by the API provider and the expected responses.
 * The key value used to identify the path item object is an expression,
 * evaluated at runtime, that identifies a URL to use for the callback operation.
 *
 * @source https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#callbackObject
 */
export interface OpenApiCallbackObject {
	/**
	 * A Path Item Object used to define a callback request and expected responses.
	 * A complete example is available.
	 */
	[expression: string]: OpenApiPathItemObject;
}
