/**
 * Config to describe what and how to generate.
 */
import {OpenApiPathItemObject} from './Model/OpenApi/OpenApiPathsObject';
import {GeneratorConfigInterface} from './Generator/GeneratorConfigInterface';

/**
 *
 */
export interface ConfigInterface {
	/**
	 * A name to identify the api
	 */
	name: string; // ex: "main", "sso"
	/**
	 * The path (http or file) where the openapi.json
	 * is located.
	 */
	path: string; // ex: http://localhost:8000/openapi.json

	/**
	 * You can define proxies to extend the api.
	 * The proxy is a path of an openapi.json
	 * just as path, but the proxies's openApi object
	 * will be merged with the main one.
	 *
	 * The merge will happen in the same order
	 * as this array defines them.
	 *
	 * Example: This `path` is the real api, but
	 * there is a proxy api, which may override some endpoints
	 * and/or may extend of the original one.
	 */
	proxies?: string[];

	/**
	 * The
	 */
	debug?: boolean;

	/**
	 * Generators
	 */
	generators: GeneratorConfigInterface[];

	/**
	 * If there is a need to only include some
	 * endpoints we can define them here.
	 */
	include?: OpenApiPathItemObject[];

	/**
	 * If there is a need to exclude some
	 * endpoints, we can define them here.
	 */
	exclude?: OpenApiPathItemObject[];
}
