/**
 * The configuration interface of a generator instance.
 *
 * Example:
 * > file-sync.json
 * ```json
 * {
 * 	  "figma-icons" : {
 * 		"path": "http://localhost:8081/figma.json",
 * 		"generator": "./Generator/IconGenerator",
 * 		"outDir": "./examples/redux-typed/src/assets/icons/",
 * 		"outFileName": "si.svg",
 * 		"template": "./templates/svg/font.handlebars"
 * 	  },
 * 	  "figma-variables" : {
 * 		"path": "http://localhost:8081/figma.json",
 * 		"generator": "./Generator/VariableGenerator",
 * 		"outDir": "./examples/redux-typed/src/assets/scss/",
 * 		"outFileName": "_variables.sass",
 * 		"template": "./templates/sass/variables.handlebars"
 * 	  }
 * }
 * ```
 */
export interface GeneratorConfigInterface {
	/**
	 * REQUIRED
	 *
	 * Generators path for to use.
	 */
	generator: string;

	/**
	 * REQUIRED
	 *
	 * The directory where the generator
	 * should generate the files.
	 */
	outDir: string;

	/**
	 * REQUIRED
	 *
	 * The name of the file, which
	 * the generator will generate.
	 */
	outFileName: string;

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
