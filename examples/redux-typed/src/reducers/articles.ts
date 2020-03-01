import { Article } from '../types/Article';
import {
	ArticleActionTypes,
	ADD_ARTICLE,
	REMOVE_ARTICLE,
	EDIT_ARTICLE,
	SET_ARTICLES
} from '../types/actions';

const articlesReducerDefaultState: Article[] = [];

const articleReducer = (
	state = articlesReducerDefaultState,
	action: ArticleActionTypes
): Article[] => {
	switch (action.type) {
	case ADD_ARTICLE:
		return [...state, action.article];
	case REMOVE_ARTICLE:
		return state.filter(({ id }) => id !== action.id);
	case EDIT_ARTICLE:
		return state.map(article => {
			if (article.id === action.article.id) {
				return {
					...article,
					...action.article
				};
			} else {
				return article;
			}
		});
	case SET_ARTICLES:
		return action.articles;
	default:
		return state;
	}
};

export { articleReducer };
