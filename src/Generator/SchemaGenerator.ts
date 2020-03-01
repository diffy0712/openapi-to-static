// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as chalk from 'chalk';
import * as _ from 'lodash';
import GeneratorInterface from './GeneratorInterface';
import {OpenApiSchemaObject} from '../Model/OpenApi/OpenApiSchemaObject';
import {writeFile} from '../Util/FileSystem';
import {getReferencedSchemas, getTypeOfOpenApiSchemaType} from '../Util/OpenApi';
import {OpenApi} from '../Model/OpenApi/OpenApi';
import {GeneratorConfigInterface} from './GeneratorConfigInterface';
import {HandlebarsTemplateLoader} from '../Loader/Template/HandlebarsTemplateLoader';
import {TemplateLoaderInterface} from '../Loader/Template/TemplateLoaderInterface';

/**
 * Generate the typescript files based on an openApi json.
 */
export class SchemaGenerator implements GeneratorInterface {
	/**
	 * @param openApi
	 * @param config
	 * @param templateLoader
	 */
	constructor(protected openApi: OpenApi, protected config: GeneratorConfigInterface, protected templateLoader: TemplateLoaderInterface) {}

	public generate(): Promise<void> {
		return new Promise(() => {
			// create the model and enum templates.
			// save them into files
			const templatePath = this.config.template;
			_.forEach(this.openApi.components.schemas, async (schema: OpenApiSchemaObject) => {
				const schemaData: SchemaData = this.getSchemaData(schema);

				// console.log(schemaData);
				console.log(chalk.blue(`Rendering ${schema.title}...`));
				await this.templateLoader.load(templatePath, schemaData)
					.then((content: string) => {
						console.log(chalk.bgBlue(`${schema.title} rendered!`));
						console.log(chalk.green(`Writing ${schema.title}...`));
						return writeFile(this.config.workingDir + schema.title + '.ts' , content);
					})
					.then(() => {
						console.log(chalk.bgGreen(`${schema.title} written!`));
					}).catch((errno: any) => {
						console.log(chalk.bgRed(`${schema.title} failed!`));
						console.log(errno);
					});
			});
		});

	}

	/**
	 * @param openApi
	 */
	protected getSchemaData(openApi: OpenApiSchemaObject): SchemaData {
		const schemas = getReferencedSchemas(openApi);
		const data = openApi;
		_.forEach(data.properties, (value: OpenApiSchemaObject) => {
			// override the type so we get the correct typescript interface.
			value.type = getTypeOfOpenApiSchemaType(value);
		});
		return {
			data,
			schemas
		};
	}
}

interface SchemaData {
	/**
	 * String of schemas to import
	 */
	schemas: string[];

	/**
	 *
	 */
	data: OpenApiSchemaObject;
}

/**
 * @param openApi
 * @param config
 */
export const getInstance = (openApi: OpenApi, config: GeneratorConfigInterface): SchemaGenerator => {
	const templateLoader = new HandlebarsTemplateLoader();
	return new SchemaGenerator(openApi, config, templateLoader);
};
