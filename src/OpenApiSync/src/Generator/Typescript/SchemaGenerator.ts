import {OpenApiSchemaObject} from '../../../../OpenApiModels/src/v3.0.3/Interfaces/OpenApiSchemaObject';
import {getReferencedSchemas, getTypeOfOpenApiSchemaType} from '../../Util/OpenApi';
import AbstractOpenApiGenerator from '../AbstractOpenApiGenerator';
import {
	isOpenApiReferenceObject,
	OpenApiReferenceObject
} from '../../../../OpenApiModels/src/v3.0.3/Interfaces/OpenApiReferenceObject';
import * as _ from 'lodash';

/**
 * Generate the typescript files based on an openApi json.
 */
export default class SchemaGenerator extends AbstractOpenApiGenerator{
	protected async prepareFiles(): Promise<void> {
		if (this.openApi.components) {
			for (const key in this.openApi.components.schemas) {
				const schema = this.openApi.components.schemas[key];
				if (isOpenApiReferenceObject(schema) || !schema.title) {
					return; // todo: what should I do with reference objects?
				}
				schema.title = _.camelCase(schema.title);
				schema.title = schema.title.charAt(0).toUpperCase() + schema.title.slice(1);
				const templateData: TemplateData = this.prepareTemplateData(schema);

				const content = await this.templateLoader.load(this.config.template, templateData);
				this.appendFile(`${this.config.outDir}${this.config.outFileName.replace('{schema.title}', schema.title)}`, content);
			}
		}
	}

	/**
	 * @param schema
	 */
	protected prepareTemplateData(schema: OpenApiSchemaObject): TemplateData {
		const schemas = getReferencedSchemas(this.openApi);
		const data = this.openApi;
		_.forEach(schema.properties, (schema: OpenApiSchemaObject | OpenApiReferenceObject) => {
			// override the type so we get the correct typescript interface.
			schema.type = getTypeOfOpenApiSchemaType(schema);
		});

		return {
			schemas,
			data
		};
	}
}

interface TemplateData {
	/**
	 * String of schemas to import
	 */
	schemas: string[];

	/**
	 *
	 */
	data: OpenApiSchemaObject;
}
