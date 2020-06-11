import { Article } from '../types/Article';
import {
	ADD_ARTICLE,
	AppActions,
	REMOVE_ARTICLE,
	EDIT_ARTICLE,
	SET_ARTICLES, ArticleActionTypes
} from '../types/Actions';
import { Dispatch } from 'redux';
import { AppState } from '../Store/configureStore';
import { ApiArticles } from '../../Service/Main/Services/ApiArticles';
import { ArticleInCreate } from '../../Service/Main/Schemas/ArticleInCreate';

export const addArticle = (article: Article): AppActions => ({
	type: ADD_ARTICLE,
	article
});

export const removeArticle = (slug: string): AppActions => ({
	type: REMOVE_ARTICLE,
	slug
});

export const editArticle = (article: Article): AppActions => ({
	type: EDIT_ARTICLE,
	article
});

export const setArticles = (articles: Article[]): AppActions => ({
	type: SET_ARTICLES,
	articles
});

export const startAddArticle = (articleData: ArticleInCreate) => {
	return async (dispatch: Dispatch<AppActions>): Promise<ArticleActionTypes> => {
		const createNewArticleResponse = await ApiArticles.createNewArticle(articleData);
		const article = createNewArticleResponse.data;

		return dispatch(
			addArticle({
				title: article.title,
				tagList: article.tagList,
				body: article.body,
				slug: article.slug,
				createdAt: 10000,
				updatedAt: article.updatedAt,
				description: article.description
			})
		);
	};
};

export const startRemoveArticle = (slug: string) => {
	return (dispatch: Dispatch<AppActions>): void => {
		dispatch(removeArticle(slug));
	};
};

export const startEditArticle = (article: Article) => {
	return (dispatch: Dispatch<AppActions>): void => {
		dispatch(editArticle(article));
	};
};

export const startSetArticles = (articles: Article[]) => {
	return (dispatch: Dispatch<AppActions>): void => {
		dispatch(setArticles(articles));
	};
};
