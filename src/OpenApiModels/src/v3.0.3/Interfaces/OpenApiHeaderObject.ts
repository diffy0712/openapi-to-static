/**
 * The Header Object follows the structure of the Parameter Object with the following changes:
 *  - name MUST NOT be specified, it is given in the corresponding headers map.
 *  - in MUST NOT be specified, it is implicitly in header.
 *  - All traits that are affected by the location MUST be applicable to a location of header (for example, style).
 *
 * @source https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#headerObject
 */
export interface OpenApiHeaderObject {
	/**
	 * A brief description of the parameter.
	 * This could contain examples of use. CommonMark syntax MAY be used for rich text representation.
	 */
	description: string;

	/**
	 * Determines whether this parameter is mandatory.
	 * If the parameter location is "path", this property is REQUIRED and its value MUST be true.
	 * Otherwise, the property MAY be included and its default value is false.
	 *
	 * TODO: This condition above should be handled somewhere!
	 */
	required: boolean;

	/**
	 * Specifies that a parameter is deprecated and SHOULD be transitioned out of usage.
	 *
	 * Default value is false.
	 *
	 * TODO: Default should be handled!
	 */
	deprecated: boolean;

	/**
	 * Sets the ability to pass empty-valued parameters.
	 * This is valid only for query parameters and allows sending a parameter with an empty value.
	 * Default value is false.
	 * If style is used, and if behavior is n/a (cannot be serialized),
	 * the value of allowEmptyValue SHALL be ignored.
	 * Use of this property is NOT RECOMMENDED, as it is likely to be removed in a later revision.
	 */
	allowEmptyValue: boolean;
}
