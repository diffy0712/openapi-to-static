import {loadFile} from '../../Util/FileSystem';
import * as handlebars from 'handlebars';
import * as _ from 'lodash';
import {TemplateLoaderInterface} from './TemplateLoaderInterface';

/**
 * Loads the Handlebars template files.
 */
export class HandlebarsTemplateLoader implements TemplateLoaderInterface {
	/**
	 * @param name
	 * @param fn
	 */
	public registerHelper(name: string, fn: handlebars.HelperDelegate): void {
		handlebars.registerHelper(name, fn);
	}

	/**
	 * @param path
	 * @param data
	 */
	public async load(path: string, data?: object): Promise<string> {
		return loadFile(path)
			.then((content: string) => {
				this.registerHelper('in_array', HandlebarsTemplateLoader.inArrayHelper);
				this.registerHelper('camel_case', _.camelCase);
				const template = handlebars.compile(content);
				return template(data);
			})
			.catch((error: any) => {
				throw error;
			});
	}

	/**
	 * Helper to return `property`'s value
	 * if `property` is in `arr`
	 * @param property
	 * @param arr
	 * @param options
	 */
	public static inArrayHelper(property: string, arr: string[], options: handlebars.HelperOptions): string {
		return typeof arr != 'undefined' && !(arr.find(value => value === property)) ? options.fn(this) : '';
	}
}
