/**
 * The implementor of this interface
 * should be able to load a template,
 * apply data on it(optional) and return the
 * resulting text.
 */
export interface TemplateLoaderInterface {
	/**
	 * @param path
	 * @param data
	 */
	load(path: string, data?: object): Promise<string>;
}
