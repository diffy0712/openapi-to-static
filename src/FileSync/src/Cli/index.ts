import {loadJson} from '../Core/Util/FileSystem';
import chalk from 'chalk';
import * as _ from 'lodash';
import {GeneratorConfigInterface} from '../Core/Generator/GeneratorConfigInterface';
import {logger} from './Utils/logger';
import {GeneratorLoggerTypeEnum} from '../Core/Generator/GeneratorLoggerTypeEnum';
import AbstractGenerator from '../Core/Generator/AbstractGenerator';

(async(): Promise<void> => {
	const configArg = process.argv.find(value => value.startsWith('--config='));
	if (!configArg){
		logger('Please specify --config={{config-file-path}} argument.', GeneratorLoggerTypeEnum.warning);
		return;
	}
	const configFilePath = configArg.replace('--config=', '');

	logger(`Loading config file '${configFilePath}'`, GeneratorLoggerTypeEnum.success, 'configLoaderSpinner');
	try {
		const configs: {[name: string]: GeneratorConfigInterface} = await loadJson<{[name: string]: GeneratorConfigInterface}>(configFilePath);
		logger(`Loading config file '${configFilePath}' succeeded!`, GeneratorLoggerTypeEnum.success, 'configLoaderSpinner', {symbol: `${chalk.green('✔')}`});

		
		generatorFactory.onGeneratorImport.subscribe(async (generator: AbstractGenerator) => {
			generator.beforeFileGenerate.subscribe((args) => {
				logger(`Generating file ${args.filePath}!`, GeneratorLoggerTypeEnum.success, `generateFileLoader-${args.filePath}`);
			});
			generator.fileGenerateSuccess.subscribe((args) => {
				logger(`Generating file ${args.filePath}!`, GeneratorLoggerTypeEnum.success, `generateFileLoader-${args.filePath}`);
			});
			await generator.generateFiles();
			logger(`✔ Working on ${name} finished!`, GeneratorLoggerTypeEnum.success);
		});
		
		_.forEach(configs, generatorFactory.getGeneratorByConfig);
	}catch (e) {
		logger(`Loading config file '${configFilePath}' failed!`, GeneratorLoggerTypeEnum.warning, 'configLoaderSpinner', {symbol: `${chalk.green('✖')}`});
		console.error(e);
	}
})();
