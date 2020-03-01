import { Article } from '../types/Article';
import {
	ADD_ARTICLE,
	AppActions,
	REMOVE_ARTICLE,
	EDIT_ARTICLE,
	SET_ARTICLES, ArticleActionTypes
} from '../types/actions';
import { Dispatch } from 'redux';
import { AppState } from '../store/configureStore';
import {ApiArticles} from '../api/main/services/ApiArticles';
import {BodyCreateNewArticle} from '../api/main/schemas/BodyCreateNewArticle';

export const addArticle = (article: Article): AppActions => ({
	type: ADD_ARTICLE,
	article
});

export const removeArticle = (id: string): AppActions => ({
	type: REMOVE_ARTICLE,
	id
});

export const editArticle = (article: Article): AppActions => ({
	type: EDIT_ARTICLE,
	article
});

export const setArticles = (articles: Article[]): AppActions => ({
	type: SET_ARTICLES,
	articles
});

export const startAddArticle = (articleData: BodyCreateNewArticle) => {
	return async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<ArticleActionTypes> => {
		const token = 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJleHAiOjE1ODM3MDY4MTMsInN1YiI6ImFjY2VzcyJ9.TsdJFfMqzrnpwjkS-IEGgN53uTuvsURYA4i8oqFwIvw';
		const createNewArticleResponse = await ApiArticles.createNewArticle(articleData, token, {headers: {Authorization: token}});
		const article = createNewArticleResponse.data.article;
		const id = (Math.random() * Math.random()).toString();

		return dispatch(
			addArticle({
				id,
				title: article.title,
				tagList: article.tagList,
				body: article.body,
				slug: article.slug,
				createdAt: parseInt((article.createdAt || '100')),
				updatedAt: article.updatedAt,
				description: article.description
			})
		);
	};
};

export const startRemoveArticle = (id: string) => {
	return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
		dispatch(removeArticle(id));
	};
};

export const startEditArticle = (article: Article) => {
	return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
		dispatch(editArticle(article));
	};
};

export const startSetArticles = (articles: Article[]) => {
	return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
		dispatch(setArticles(articles));
	};
};
