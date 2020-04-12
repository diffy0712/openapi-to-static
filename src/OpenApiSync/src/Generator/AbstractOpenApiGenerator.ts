import AbstractGenerator, {File, GeneratorEventArgMap} from '../../../FileSync/src/Core/Generator/AbstractGenerator';
import {GeneratorConfigInterface} from '../../../FileSync/src/Core/Generator/GeneratorConfigInterface';
import {TemplateLoaderInterface} from '../../../FileSync/src/Core/Loader/Template/TemplateLoaderInterface';
import {OpenApi} from '../../../OpenApiModels/src/v3.0.3/Interfaces/OpenApi';
import {getModel} from '../../../FileSync/src/Core/Loader/ModelFactory';
import {HandlebarsTemplateLoader} from '../../../FileSync/src/Core/Loader/Template/HandlebarsTemplateLoader';
import {ISimpleEvent, NonUniformSimpleEventList} from 'ste-simple-events';

/**
 * Generate the typescript files based on an openApi json.
 */
export default abstract class AbstractOpenApiGenerator extends AbstractGenerator{
	/**
	 * @param config
	 * @param templateLoader
	 * @param openApi
	 */
	protected constructor(protected config: GeneratorConfigInterface, protected templateLoader: TemplateLoaderInterface, protected openApi: OpenApi) {
		super(config);
	}

	/**
	 * Fetch the openapi.json file and
	 * get an instance of the concrete class
	 */
	public static async getInstance<T extends AbstractGenerator>(
		this: new (config: GeneratorConfigInterface, templateLoader: TemplateLoaderInterface, openApi: OpenApi) => T,
		config: GeneratorConfigInterface
	): Promise<T> {
		if (typeof config.options == undefined) {
			throw new Error('Options path is required!');
		}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const options = config.options as any;
		// logger(`Fetching openApi.json file from '${options.path}'`, GeneratorLoggerTypeEnum.success, 'openApiLoaderSpinner');
		const openApi: OpenApi = await getModel<OpenApi>(options.path);
		// logger(`Fetching openApi.json from '${options.path}' succeeded`, GeneratorLoggerTypeEnum.success, 'openApiLoaderSpinner', {symbol: `${chalk.green('✔')}`});

		return new Promise((resolve, reject) => {
			try {
				const templateLoader = new HandlebarsTemplateLoader();
				const selfInstance = new this(config, templateLoader, openApi);
				resolve(selfInstance);
			} catch (e) {
				reject(e);
			}
		});
	}

	protected events = new NonUniformSimpleEventList<GeneratorEventArgMap>();

	public get beforeFilesGenerate(): ISimpleEvent<File[]>
	{
		return this.events.get('beforeFilesGenerate').asEvent();
	}
}

export type OpenApiGeneratorEventArgMap = GeneratorEventArgMap & {
	'beforeOpenApiModelFetch': File;
};
