import {fetchApi} from '../Util/Http';
import {loadJson} from '../Util/FileSystem';

/**
 * @param path
 * TODO: Do some strategy to load models from different sources with different data.
 * 		 Now this only supports json data.
 */
export const getModel = async <T>(path: string): Promise<T> => {
	if (path.startsWith('http') || path.startsWith('https')) {
		return await fetchApi<T>(path);
	}

	return await loadJson<T>(path);
};
