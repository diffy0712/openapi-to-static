import {OpenApi} from './Model/OpenApi/OpenApi';
import {loadJson} from './Util/FileSystem';
import {fetchApi} from './Util/Http';
import {ConfigInterface} from './Config';
import {GeneratorConfigInterface} from './Generator/GeneratorConfigInterface';
import {NoGeneratorDefinedException} from './Exception/NoGeneratorDefinedException';
import GeneratorInterface from './Generator/GeneratorInterface';

(async(): Promise<void> => {
	// get the config file path
	const configArg = process.argv.find(value => value.startsWith('--config='));
	if (!configArg){
		console.error('Please specify --config= argument.');
		return;
	}
	const configFilePath = configArg.replace('--config=', '');

	console.log(`Load config from ${configFilePath}...`);
	await loadJson<ConfigInterface[]>(configFilePath).then(async(configs: ConfigInterface[]) => {
		await Promise.all([configs.map(async (config: ConfigInterface): Promise<void> => {
			console.info(`----Fetching ${config.path}---- \n`);

			let openApi: OpenApi;
			if (config.path.startsWith('http') || config.path.startsWith('https')) {
				openApi = await fetchApi<OpenApi>(config.path);
			} else {
				openApi = await loadJson<OpenApi>(config.path);
			}

			console.log('----Fetching Finished!----');
			console.log(`OpenApi: ${openApi.openapi}`);
			console.log(`Title: ${openApi.info.title}`);
			console.log(`Description: ${openApi.info.description}`);
			console.log(`Version: ${openApi.info.version}`);

			if (typeof config.generators == 'undefined' || config.generators.length < 1) {
				throw new NoGeneratorDefinedException(`${config.name} does not define any generator!`);
			}

			await Promise.all([config.generators.map(async(generatorConfig: GeneratorConfigInterface) => {

				const generatorExportedMembers: {
					default: {getInstance: (openApi: OpenApi, generatorConfig: GeneratorConfigInterface) => GeneratorInterface};
				} = await import(generatorConfig.type);
				const generator: GeneratorInterface = generatorExportedMembers.default.getInstance(openApi, generatorConfig);
				await generator.generate();
			})]);
		})]);
	});
})();
