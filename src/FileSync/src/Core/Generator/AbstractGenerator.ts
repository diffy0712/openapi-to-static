import {GeneratorConfigInterface} from './GeneratorConfigInterface';
import {writeFile} from '../Util/FileSystem';
import {NonUniformSimpleEventList, ISimpleEvent} from 'strongly-typed-events';

export default abstract class AbstractGenerator{
	protected files: File[] = [];

	/**
	 * @param filePath
	 * @param content
	 */
	protected appendFile(filePath: string, content: string): void {
		this.files.push({
			filePath,
			content
		});
	}

	/**
	 * @param config
	 */
	protected constructor(protected config: GeneratorConfigInterface) {}

	/**
	 * Get an instance of the concrete generator.
	 */
	public static getInstance<T extends AbstractGenerator>(
		this: new (config: GeneratorConfigInterface) => T,
		config: GeneratorConfigInterface
	): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			try{
				resolve(new this(config));
			} catch (e) {
				reject(e);
			}
		});
	}

	public async generateFiles(): Promise<void> {
		await this.prepareFiles();
		this.events.get('beforeFilesGenerate').dispatch(this.files);
		for (const key in this.files) {
			const file = this.files[key];
			this.events.get('onFileGenerate').dispatch(file);
			try {
				await writeFile(file.filePath, file.content);
				this.events.get('fileGenerateSuccess').dispatch(file);
			} catch (e) {
				this.events.get('fileGenerateFail').dispatch(file);
			}
		}
		this.events.get('afterFilesGenerate').dispatch(this.files);
	}

	protected abstract async prepareFiles(): Promise<void>;

	protected events = new NonUniformSimpleEventList<GeneratorEventArgMap>();

	public get beforeFilesGenerate(): ISimpleEvent<File[]>
	{
		return this.events.get('beforeFilesGenerate').asEvent();
	}

	public get afterFilesGenerate(): ISimpleEvent<File[]>
	{
		return this.events.get('afterFilesGenerate').asEvent();
	}

	public get onFileGenerate(): ISimpleEvent<File>
	{
		return this.events.get('onFileGenerate').asEvent();
	}

	public get fileGenerateSuccess(): ISimpleEvent<File>
	{
		return this.events.get('fileGenerateSuccess').asEvent();
	}

	public get fileGenerateFail(): ISimpleEvent<File>
	{
		return this.events.get('fileGenerateFail').asEvent();
	}
}

export type GeneratorEventArgMap = {
	'afterFilesGenerate': File[];
	'beforeFilesGenerate': File[];
	'onFileGenerate': File;
	'fileGenerateSuccess': File;
	'fileGenerateFail': File;
};

export interface File {
	filePath: string;
	content: string;
}
