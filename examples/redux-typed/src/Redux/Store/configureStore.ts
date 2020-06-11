import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { articleReducer } from '../Reducers/Articles';
import { AppActions } from '../types/Actions';

export const rootReducer = combineReducers({
	articles: articleReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
	rootReducer,
	applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);
