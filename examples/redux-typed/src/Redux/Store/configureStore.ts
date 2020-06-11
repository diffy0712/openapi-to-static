import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { articleReducer } from '../Reducers/articles';
import { AppActions } from '../types/actions';

export const rootReducer = combineReducers({
	articles: articleReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
	rootReducer,
	applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);
