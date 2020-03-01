import { Article } from './Article';

// action strings
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const EDIT_ARTICLE = 'EDIT_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';
export const SET_ARTICLES = 'SET_ARTICLES';

export interface SetArticleAction {
  type: typeof SET_ARTICLES;
  articles: Article[];
}

export interface EditArticleAction {
  type: typeof EDIT_ARTICLE;
  article: Article;
}

export interface RemoveArticleAction {
  type: typeof REMOVE_ARTICLE;
  id: string;
}

export interface AddArticleAction {
  type: typeof ADD_ARTICLE;
  article: Article;
}

export type ArticleActionTypes =
  | SetArticleAction
  | EditArticleAction
  | RemoveArticleAction
  | AddArticleAction;

export type AppActions = ArticleActionTypes;
