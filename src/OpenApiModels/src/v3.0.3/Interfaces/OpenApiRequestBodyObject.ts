import {OpenApiMediaTypeObject} from './OpenApiMediaTypeObject';

/**
 * Describes a single request body.
 *
 * @source https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#requestBodyObject
 */
export interface OpenApiRequestBodyObject {
	/**
	 * A brief description of the request body.
	 * This could contain examples of use.
	 * CommonMark syntax MAY be used for rich text representation.
	 */
	description?: string;

	/**
	 * REQUIRED. The content of the request body.
	 * The key is a media type or media type range and the value describes it.
	 *
	 * For requests that match multiple keys,
	 * only the most specific key is applicable. e.g. text/plain overrides text/*
	 */
	content: { [v: string]: OpenApiMediaTypeObject };

	/**
	 *	Determines if the request body is required in the request.
	 *
	 *  Defaults to false.
	 *
	 * TODO: Default should be handled!
	 */
	required: boolean;
}
