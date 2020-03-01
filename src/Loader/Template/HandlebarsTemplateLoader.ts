import {loadFile} from '../../Util/FileSystem';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as handlebars from 'handlebars';
import * as _ from 'lodash';
import {TemplateLoaderInterface} from './TemplateLoaderInterface';

/**
 * Loads the Mustache template files.
 */
export class HandlebarsTemplateLoader implements TemplateLoaderInterface {
	/**
	 * @param name
	 * @param fn
	 */
	public registerHelper(name: string, fn: handlebars.HelperDelegate): void {
		handlebars.registerHelper(name, fn);
	}

	public async load(path: string, data: object): Promise<string> {
		return loadFile(path)
			.then((content: string) => {
				handlebars.registerHelper('in_array', function(property: string, arr: string[], options: handlebars.HelperOptions) {
					// @ts-ignore
					return typeof arr != 'undefined' && !(arr.find(value => value === property)) ? options.fn(this) : '';
				});
				handlebars.registerHelper('camel_case', function(value: string) {
					return _.camelCase(value);
				});
				const template = handlebars.compile(content);
				return template(data);
			})
			.catch((error: any) => {
				throw error;
			});
	}
}
