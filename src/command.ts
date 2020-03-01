#!/bin/node
import {OpenApi} from './Model/OpenApi/OpenApi';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import * as chalk from 'chalk';
import {loadJson} from './Util/FileSystem';
import {fetchApi} from './Util/Http';
import {ConfigInterface} from './Config';
import {GeneratorConfigInterface} from './Generator/GeneratorConfigInterface';
import {NoGeneratorDefinedException} from './Exception/NoGeneratorDefinedException';
import GeneratorInterface from './Generator/GeneratorInterface';

// get the config file path
const configArg = process.argv.find(value => value.startsWith('--config='));
const configFilePath = configArg.replace('--config=', '');

console.error(chalk.bgGreen(`Load config from ${configFilePath}...`));

(async(): Promise<void> => {
	await loadJson<ConfigInterface[]>(configFilePath).then(async(configs: ConfigInterface[]) => {
		await Promise.all([configs.map(async (config: ConfigInterface): Promise<void> => {
			console.info(chalk.blue(`----Fetching ${config.path}---- \n`));

			let openApi: OpenApi;
			if (config.path.startsWith('http') || config.path.startsWith('https')) {
				openApi = await fetchApi<OpenApi>(config.path);
			} else {
				openApi = await loadJson<OpenApi>(config.path);
			}

			console.log(chalk.green('----Fetching Finished!----'));
			console.log(chalk.blueBright(`OpenApi: ${openApi.openapi}`));
			console.log(chalk.blueBright(`Title: ${openApi.info.title}`));
			console.log(chalk.blueBright(`Description: ${openApi.info.description}`));
			console.log(chalk.blueBright(`Version: ${openApi.info.version}`));

			if (typeof config.generators == 'undefined' || config.generators.length < 1) {
				throw new NoGeneratorDefinedException(`${config.name} does not define any generator!`);
			}

			await Promise.all([config.generators.map(async(generatorConfig: GeneratorConfigInterface) => {

				const generatorExportedMembers: {
					getInstance: (openApi: OpenApi, generatorConfig: GeneratorConfigInterface) => GeneratorInterface;
				// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
				// @ts-ignore
				} = await import(generatorConfig.type);
				const generator: GeneratorInterface = generatorExportedMembers.getInstance(openApi, generatorConfig);
				await generator.generate();
			})]);
		})]);
	});
})();
