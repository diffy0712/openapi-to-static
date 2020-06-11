// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as _ from 'lodash';
import {OpenApiOperationObject, OpenApiPathItemObject} from '../Model/OpenApi/OpenApiPathsObject';
import {OpenApi} from '../Model/OpenApi/OpenApi';
import {writeFile} from '../Util/FileSystem';
import {OpenApiResponseObject} from '../Model/OpenApi/OpenApiResponseObject';
import {OpenApiMediaTypeObject} from '../Model/OpenApi/OpenApiMediaTypeObject';
import {OpenApiSchemaObject} from '../Model/OpenApi/OpenApiSchemaObject';
import {OpenApiRequestBodyObject} from '../Model/OpenApi/OpenApiRequestBodyObject';
import {OpenApiParameterObject} from '../Model/OpenApi/OpenApiParameterObject';
import {TemplateLoaderInterface} from '../Loader/Template/TemplateLoaderInterface';
import GeneratorInterface from './GeneratorInterface';
import {HandlebarsTemplateLoader} from '../Loader/Template/HandlebarsTemplateLoader';
import {GeneratorConfigInterface} from './GeneratorConfigInterface';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import HelperOptions = Handlebars.HelperOptions;
import {getTypeOfOpenApiSchemaType} from '../Util/OpenApi';
import {isOpenApiReferenceObject, OpenApiReferenceObject} from '../Model/OpenApi/OpenApiReferenceObject';

/**
 * Generate the typescript files based on an openApi json.
 * FIXME: clean this mess in this class.
 */
export default class ServiceGenerator implements GeneratorInterface {
	protected services: {[key: string]: ServiceData} = {};

	/**
	 * @param openApi
	 * @param config
	 * @param templateLoader
	 */
	constructor(protected openApi: OpenApi, protected config: GeneratorConfigInterface, protected templateLoader: TemplateLoaderInterface) {
		this.prepareServices();
	}

	public generate(): Promise<void> {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		return new Promise<void>((resolve, reject) => {
			const templatePath = this.config.template;

			_.forEach(this.services, async (data: ServiceData) => {
				await this.templateLoader.load(templatePath, data)
					.then((content: string) => {
						// console.log(chalk.bgBlue(`${schema.title} rendered!`));
						// console.log(chalk.green(`Writing ${schema.title}...`));
						return writeFile(this.config.workingDir + data.name + '.ts' , content);
					})
					.then(() => {
						console.log(`${data.name} written!`);
					}).catch((errno: any) => {
						console.log(`${data.name} failed!`);
						console.log(errno);
					});
			});
		});
	}

	protected prepareServices(): void {
		this.services = {};

		_.forEach(this.openApi.paths, (pathItem: OpenApiPathItemObject, route: string) => {
			const service = this.getServiceData(route, pathItem);
			this.addServiceData(service);
		});
	}

	/**
	 * @param serviceData
	 */
	protected addServiceData(serviceData: ServiceData): void {
		if (this.services[serviceData.name]) {
			serviceData = {
				config: serviceData.config,
				name: serviceData.name,
				summary: this.services[serviceData.name].summary || serviceData.summary,
				description: this.services[serviceData.name].description || serviceData.description,
				schemas: _.union(this.services[serviceData.name].schemas, serviceData.schemas),
				routes: {...this.services[serviceData.name].routes, ...serviceData.routes},
			};
		}

		this.services[serviceData.name] = serviceData;
	}

	/**
	 * @param route
	 * @param pathItem
	 */
	protected getServiceData(route: string, pathItem: OpenApiPathItemObject): ServiceData {
		const routes: {[route: string]: any} = {};
		routes[route] = this.getPathItemRoutes(pathItem);
		const schemas: string[] = this.getImports(pathItem);

		return {
			config: this.config,
			name: this.getServiceName(route.length > 1 ? route : 'index'),
			summary: pathItem.summary || '',
			description: pathItem.description || '',
			schemas,
			routes
		};
	}

	/**
	 * @param pathItem
	 */
	protected getPathItemRoutes(pathItem: OpenApiPathItemObject): {[route: string]: OpenApiOperationObject} {
		const methods: {[name: string]: OpenApiOperationObject} = {};

		// delete empty methods
		_.forEach({
			get: pathItem.get,
			post: pathItem.post,
			delete: pathItem.delete,
			patch: pathItem.patch,
			options: pathItem.options,
			trace: pathItem.trace
		}, (value: OpenApiOperationObject | undefined, key: string) => {
			if (!value) {
				return;
			}
			methods[key] = this.replaceTypes(value);
		});

		return methods;
	}

	/**
	 * @param operation
	 */
	protected replaceTypes(operation: OpenApiOperationObject): OpenApiOperationObject {
		if (!operation) {
			return operation;
		}

		_.forEach(operation.parameters, (parameter: OpenApiParameterObject | OpenApiReferenceObject) => {
			if (isOpenApiReferenceObject(parameter)){
				return; // todo: what should I do with reference objects?
			}
			const schema: OpenApiSchemaObject = parameter.schema as OpenApiSchemaObject;
			if (schema.type) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
				//@ts-ignore
				parameter.schema.type = getTypeOfOpenApiSchemaType(schema);
			}
		});

		_.forEach(operation.responses, (response: OpenApiResponseObject | OpenApiReferenceObject) => {
			if (isOpenApiReferenceObject(response)){
				return; // todo: what should I do with reference objects?
			}
			_.forEach(response.content, (mediaType: OpenApiMediaTypeObject) => {
				const schema: OpenApiSchemaObject = mediaType.schema as OpenApiSchemaObject;
				// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
				//@ts-ignore
				mediaType.schema.type = getTypeOfOpenApiSchemaType(schema);
			});
		});

		const requestBody: OpenApiRequestBodyObject = operation.requestBody as OpenApiRequestBodyObject;
		if (requestBody) {
			_.forEach(requestBody.content, (mediaType: OpenApiMediaTypeObject, index: string) => {
				if (index == 'application/json') {
					const schema: OpenApiSchemaObject = mediaType.schema as OpenApiSchemaObject;
					// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
					//@ts-ignore
					schema.type = getTypeOfOpenApiSchemaType(schema);
				}
			});
		}
		return operation;
	}

	/**
	 * @param pathItem
	 */
	protected getImports(pathItem: OpenApiPathItemObject): string[] {
		const imports: string[] = [];

		_.forEach([
			pathItem.get,
			pathItem.put,
			pathItem.post,
			pathItem.delete,
			pathItem.patch,
			pathItem.options,
			pathItem.trace,
		], (operation: OpenApiOperationObject|undefined) => {
			if (!operation) {
				return;
			}
			_.forEach(operation.responses, (response: OpenApiResponseObject | OpenApiReferenceObject) => {
				if (isOpenApiReferenceObject(response)){
					return; // todo: what should I do with reference objects?
				}
				_.forEach(response.content, (mediaType: OpenApiMediaTypeObject) => {
					const schema: OpenApiSchemaObject = mediaType.schema as OpenApiSchemaObject;
					if (schema.type) {
						const schemaName = schema.type.replace('[]', '');
						if (imports.find(value => schemaName === value)) {
							return;
						}
						if (schemaName != 'void' && !imports.find(value => value === schemaName)) {
							imports.push(schemaName);
						}
					}
				});
			});

			const requestBody: OpenApiRequestBodyObject = operation.requestBody as OpenApiRequestBodyObject;
			if (requestBody) {
				_.forEach(requestBody.content, (mediaType: OpenApiMediaTypeObject, index: string) => {
					if (index == 'application/json') {
						const schema: OpenApiSchemaObject = mediaType.schema as OpenApiSchemaObject;
						if (schema.type) {
							const schemaName = schema.type.replace('[]', '');
							if (imports.find(value => schemaName === value)) {
								return;
							}
							if (schemaName != 'void' && !imports.find(value => value === schemaName)) {
								imports.push(schemaName);
							}
						}
					}
				});
			}
		});

		return imports;
	}

	/**
	 * @param val
	 */
	protected getServiceName(val: string): string {
		const serviceNameWithSpaces = val.replace( new RegExp('(?<={)(.*?)(?=})','gm'),'') // remove content between { and }
			.split('{}').join('')
			.split('//').join('/')
			.split('/').join(' ');
		const serviceName = _.camelCase(serviceNameWithSpaces);

		return serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
	}

	/**
	 * @param openApi
	 * @param config
	 */
	public static getInstance = (openApi: OpenApi, config: GeneratorConfigInterface): ServiceGenerator => {
		const templateLoader = new HandlebarsTemplateLoader();
		templateLoader.registerHelper('getAxiosResponseType', (operation: OpenApiOperationObject) => {
			let responseType = 'object';
			_.forEach(operation.responses, (response: OpenApiResponseObject | OpenApiReferenceObject, statusCode: string) => {
				if (isOpenApiReferenceObject(response)){
					return; // todo: what should I do with reference objects?
				}
				if (statusCode === '200') {
					_.forEach(response.content, (mediaType: OpenApiMediaTypeObject, index: string) => {
						if (index === 'application/json') {
							const schema: OpenApiSchemaObject = mediaType.schema as OpenApiSchemaObject;
							responseType = schema.type || 'any';
						}
					});
				}
			});
			return responseType;
		});
		templateLoader.registerHelper('getParameters', (operation: OpenApiOperationObject) => {
			const parameters: string[] = [];

			const requestBody: OpenApiRequestBodyObject = operation.requestBody as OpenApiRequestBodyObject;
			if (requestBody) {
				_.forEach(requestBody.content, (mediaType: OpenApiMediaTypeObject, index: string) => {
					if (index == 'application/json') {
						const schema: OpenApiSchemaObject = mediaType.schema as OpenApiSchemaObject;
						if (schema.type) {
							parameters.push('data: ' + schema.type);
						}
					}
				});
			}

			if (typeof operation.parameters != 'undefined') {
				const sortedParameters = operation.parameters.sort((a, b) => {
					// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
					//@ts-ignore
					if (typeof a.required != 'undefined' && typeof b.requred != 'undefined') {
						return -1;
					}
					// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
					//@ts-ignore
					return (a.required && !b.required) ? -1 : 1;
				});
				_.forEach(sortedParameters, (parameter: OpenApiParameterObject | OpenApiReferenceObject) => {
					if (isOpenApiReferenceObject(parameter)){
						return; // todo: what should I do with reference objects?
					}
					const schema: OpenApiSchemaObject = parameter.schema as OpenApiSchemaObject;
					parameters.push(_.camelCase(schema.title) + (!parameter.required ? '?' : '') + ': ' + schema.type);
				});
			}
			parameters.push('config?: AxiosRequestConfig');
			return parameters.join(', ');
		});
		templateLoader.registerHelper('getRoute', (operation: OpenApiOperationObject, helperOptions: HelperOptions) => {
			let route = helperOptions.data._parent.key;
			const queryParameters: string[] = [];
			_.forEach(operation.parameters, (parameter: OpenApiParameterObject | OpenApiReferenceObject) => {
				if (isOpenApiReferenceObject(parameter)){
					return; // todo: what should I do with reference objects?
				}
				if (parameter.in === 'query') {
					queryParameters.push(parameter.name + '=${' + _.camelCase(parameter.name) + '}');
					return;
				}
				route = route.replace(`{${parameter.name}}`, '${' + _.camelCase(parameter.name) + '}');
			});
			if (queryParameters.length > 0) {
				route += '?' + queryParameters.join('&');
			}
			return route;
		});
		return new ServiceGenerator(openApi, config, templateLoader);
	}
}


interface ServiceData {
	config: GeneratorConfigInterface;
	name: string;
	summary: string;
	description: string;

	/**
	 * String of schemas to import
	 */
	schemas: string[];

	routes: {
		[route: string]: {
			[name: string]: OpenApiOperationObject;
		};
	};
};
