/**
* This file was generated by OpenApi Typescript Sync cli tool.
*
* Do not edit this file as it might be regenerated.
*/


// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import Axios, {AxiosRequestConfig, AxiosResponse, AxiosRequestConfig} from 'axios';
import { TagsList } from '../schemas/TagsList';
import {SSO_API_URL} from '../../settings';

/**
* 
*/
export const ApiTags = {
	/**
	 * Get All Tags
	 */
	getAllTags: (config?: AxiosRequestConfig): Promise<AxiosResponse<TagsList>> => {
		return Axios.get<TagsList>(`${SSO_API_URL}/api/tags`, config);
	},

};
