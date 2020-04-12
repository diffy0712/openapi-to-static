import {GeneratorConfigInterface} from './GeneratorConfigInterface';
import AbstractGenerator from './AbstractGenerator';

/**
 * @param generatorConfig
 * @param name
 */
export const getGeneratorByConfig = async (generatorConfig: GeneratorConfigInterface, name: string): Promise<AbstractGenerator> => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const generatorExportedMembers: any = await import(generatorConfig.generator);
	return await generatorExportedMembers.default.getInstance(generatorConfig);
};
