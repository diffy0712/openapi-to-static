/**
* This file was generated by OpenApi Typescript Sync cli tool.
*
* Do not edit this file as it might be regenerated.
*/


// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Axios, {AxiosRequestConfig, AxiosResponse, AxiosRequestConfig} from 'axios';
import { ArticleInResponse } from '../schemas/ArticleInResponse';
import { HttpValidationError } from '../schemas/HttpValidationError';
import {SSO_API_URL} from '../../settings';

/**
* 
*/
export const ApiArticlesFavorite = {
	/**
	 * Favorite Article
	 */
	favoriteArticle: (slug: string, authorization: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ArticleInResponse>> => {
		return Axios.post<ArticleInResponse>(`${SSO_API_URL}/api/articles/${slug}/favorite`, config);
	},

	/**
	 * Delete Article From Favorites
	 */
	deleteArticleFromFavorites: (slug: string, authorization: string, config?: AxiosRequestConfig): Promise<AxiosResponse<ArticleInResponse>> => {
		return Axios.delete<ArticleInResponse>(`${SSO_API_URL}/api/articles/${slug}/favorite`, config);
	},

};
