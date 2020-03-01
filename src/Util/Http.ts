import fetch from 'node-fetch';

/**
 * Fetch a url for data.
 *
 * Example:
 * fetchApi<OpenApi>(path)
 *		.then((openApi: OpenApi) => {
 *			console.log(openApi);
 *		})
 *		.catch(error => {
 *			console.error(error);
 *		});
 *
 * @param url
 * @source https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript
 */
export function fetchApi<T>(url: string): Promise<T> {
	return fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json() as Promise<T>;
		});
}
