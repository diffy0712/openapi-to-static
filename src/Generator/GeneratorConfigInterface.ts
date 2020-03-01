/**
 * A generator's responsibility is to
 * do something with the OpenApi object
 * and generate something from it.
 */
export interface GeneratorConfigInterface {
	/**
	 * REQUIRED
	 *
	 * The type of the generator
	 */
	type: string;

	/**
	 * REQUIRED
	 *
	 * The directory where the generator
	 * should generate the files.
	 */
	workingDir: string;

	/**
	 * The template, which the generator should use
	 * to generate files.
	 *
	 * Not required since, you might want to define
	 * the template in your generator.
	 */
	template: string;

	/**
	 * Any options to pass to the generator
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	options?: {[key: string]: any};
}
