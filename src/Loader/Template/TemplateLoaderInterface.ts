export interface TemplateLoaderInterface{
	load(path: string, data: object): Promise<string>;
}
