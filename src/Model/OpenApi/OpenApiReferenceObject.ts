/**
 * A simple object to allow referencing other components in the specification, internally and externally.
 * The Reference Object is defined by JSON Reference and follows the same structure, behavior and rules.
 *
 * For this specification, reference resolution is accomplished as defined by the JSON Reference specification and not by the JSON Schema specification.
 *
 * @source https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#referenceObject
 */
export interface OpenApiReferenceObject {
	/**
	 * REQUIRED. The reference string.
	 */
	$ref: string;
}

/**
 * OpenApiReferenceObject occurs a lot.
 * ex: components: OpenApiComponentObject | OpenApiReferenceObject;
 * This needs to be checked later.
 *
 * Example usage:
 * let object: Foo | Bar;
 * if (isFoo(object)) {
 * 	// `object` has type `Foo`. object.fooProperty;
 * } else {
 * 	// `object` has type `Bar`.
 * 	object.barProperty;
 * }
 * @source https://stackoverflow.com/questions/14425568/interface-type-check-with-typescript
 * @source https://www.typescriptlang.org/docs/handbook/advanced-types.html
 * @param object
 */
export function isOpenApiReferenceObject(object: any): object is OpenApiReferenceObject {
	return '$ref' in object;
}
