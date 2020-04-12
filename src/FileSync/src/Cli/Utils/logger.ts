import chalk from 'chalk';
import {GeneratorLoggerTypeEnum} from '../../Core/Generator/GeneratorLoggerTypeEnum';
import ora from 'ora';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ui = require('cliui')();

const loaders: {[key: string]: ora.Ora}= {};

/**
 * @param message
 * @param type
 * @param loaderName
 * @param loaderProps
 */
export const logger = (message: string|string[], type: GeneratorLoggerTypeEnum, loaderName?: string, loaderProps?: any): void => {
	let text = `${message} `;

	switch (type) {
	case GeneratorLoggerTypeEnum.info:
		text = `${chalk.blueBright(message)} `;
		break;
	case GeneratorLoggerTypeEnum.success:
		text = `${chalk.green(message)} `;
		break;
	case GeneratorLoggerTypeEnum.warning:
		text = `${chalk.red(message)} `;
		break;
	case GeneratorLoggerTypeEnum.text:
		text = `${chalk.white(message)} `;
		break;
	}

	if (loaderName) {
		if (loaders[loaderName]) {
			loaders[loaderName].stopAndPersist({
				text,
				...loaderProps
			});
			return;
		}
		loaders[loaderName] = ora({
			text,
			...loaderProps
		}).start();
		return;
	}

	if (typeof message == 'string') {
		ui.div(text);
	} else {
		ui.div(...message.map(value => {
			return {
				text: value,
				width: 100,
				padding: [0, 0, 0, 0]
			};
		}, {}));
	}

	console.log(ui.toString());
};
