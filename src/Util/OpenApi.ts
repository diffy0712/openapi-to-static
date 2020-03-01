/**
 * @param schema
 */
import {OpenApiSchemaObject} from '../Model/OpenApi/OpenApiSchemaObject';
import {isOpenApiReferenceObject, OpenApiReferenceObject} from "../Model/OpenApi/OpenApiReferenceObject";


/**
 * @param $ref
 */
export const getObjectNameFrom$ref = ($ref: string): string => {
	const refTypes = $ref.split('/');
	return refTypes[3];
};


/**
 * @param schema
 */
export const getSchemaImports = (schema: OpenApiSchemaObject): string|null => {
	let $ref = '';
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	if (schema.type === 'array' && typeof schema.items['$ref'] != 'undefined') {
		// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
		// @ts-ignore
		$ref = schema.items['$ref'];
		// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
		// @ts-ignore
	} else if (typeof schema['$ref'] != 'undefined') {
		// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
		// @ts-ignore
		$ref = schema['$ref'];
	}

	return $ref.length > 0 ? getObjectNameFrom$ref($ref) : null;
};

/**
 * @param schema
 */
export const getReferencedSchemas = (schema: OpenApiSchemaObject | OpenApiReferenceObject): string[] => {
	const imports: string[] = [];

	if (isOpenApiReferenceObject(schema)){
		return [];
	}

	if (schema.properties) {
		const propertyNames = Object.keys(schema.properties);
		propertyNames.forEach((value: string, index: number) => {
			if (schema.properties) {
				const propertySchema: OpenApiSchemaObject = schema.properties[propertyNames[index]] as OpenApiSchemaObject;
				const propertySchemaImports = getSchemaImports(propertySchema);
				if (propertySchemaImports) {
					imports.push(propertySchemaImports);
				}
			}
		});
	}

	if (schema.items) {
		const itemsSchema: OpenApiSchemaObject = schema.items as OpenApiSchemaObject;
		const itemsSchemaImports = getSchemaImports(itemsSchema);
		if (itemsSchemaImports) {
			imports.push(itemsSchemaImports);
		}
	}

	return imports;
};

/**
 * @param schema
 */
export const getTypeOfOpenApiSchemaType = (schema: OpenApiSchemaObject): string => {
	switch (schema.type) {
	case 'array':
		// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
		// @ts-ignore
		if (typeof schema.items['$ref'] != 'undefined') {
			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			const $ref: string = schema.items['$ref'];
			return getObjectNameFrom$ref($ref) + '[]';
			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
		} else if ( typeof schema.items['type'] != 'undefined') {
			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			return schema.items['type'] + '[]';
		}
		break;
	case 'integer':
		return 'number';
	case undefined:
		// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
		// @ts-ignore
		if (typeof schema['$ref'] != 'undefined') {
			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			const $ref: string = schema['$ref'];
			return getObjectNameFrom$ref($ref);
		}
		return 'void';
	}

	return schema.type;
};
