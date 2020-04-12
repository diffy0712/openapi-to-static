/**
 * The object provides metadata about the API.
 * The metadata MAY be used by the clients if needed, and MAY be presented in editing or documentation generation tools for convenience.
 *
 * @source https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#infoObject
 */
export interface OpenApiInfoObject {
	/**
	 * REQUIRED. The title of the API.
	 */
	title: string;

	/**
	 * A short description of the API. CommonMark syntax MAY be used for rich text representation.
	 */
	description?: string;

	/**
	 * A URL to the Terms of Service for the API. MUST be in the format of a URL.
	 */
	termsOfService?: string;

	/**
	 * The contact information for the exposed API.
	 */
	contact?: OpenApiContactObject;

	/**
	 * The license information for the exposed API.
	 */
	license?: OpenApiLicenseObject;

	/**
	 * REQUIRED. The version of the OpenAPI document
	 * (which is distinct from the OpenAPI Specification version or the API implementation version).
	 */
	version: string;
}

/**
 * License information for the exposed API.
 *
 * @source https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#licenseObject
 */
export interface OpenApiLicenseObject {
	/**
	 * REQUIRED. The license name used for the API.
	 */
	name: string;

	/**
	 * A URL to the license used for the API. MUST be in the format of a URL.
	 */
	url?: string;
}

/**
 * Contact information for the exposed API.
 *
 * @source https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#contactObject
 */
export interface OpenApiContactObject {
	/**
	 * The identifying name of the contact person/organization.
	 */
	name?: string;

	/**
	 * The URL pointing to the contact information. MUST be in the format of a URL.
	 */
	url?: string;

	/**
	 * The email address of the contact person/organization. MUST be in the format of an email address.
	 */
	email?: string;
}
