export default interface GeneratorInterface {
	/**
	 * Generate the data
	 */
	generate(): Promise<void>;
}
