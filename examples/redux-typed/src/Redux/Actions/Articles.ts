import { Article } from '../../Service/Main/Schemas/Article';
import {
	ADD_ARTICLE,
	AppActions,
	REMOVE_ARTICLE,
	EDIT_ARTICLE,
	SET_ARTICLES, ArticleActionTypes
} from '../types/actions';
import { Dispatch } from 'redux';
import { AppState } from '../Store/configureStore';
import { ApiArticles } from '../../Service/Main/Services/ApiArticles';
import { BodyCreateNewArticle } from '../../Service/Main/Schemas/BodyCreateNewArticle';

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
		const article = createNewArticleResponse.data;
		const id = (Math.random() * Math.random()).toString();

		return dispatch(
			addArticle({
				id,
				title: article.title,
				tagList: article.tagList,
				body: article.body,
				slug: article.slug,
				createdAt: (10000).toString(),
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
