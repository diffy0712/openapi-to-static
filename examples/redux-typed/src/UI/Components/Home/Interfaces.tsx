import { Article } from '../../../Redux/types/Article';
import { ArticleInCreate } from '../../../Service/Main/Schemas/ArticleInCreate';

export interface LinkDispatchProps {
	startCreateArticle: (article: ArticleInCreate) => void;
	startEditArticle: (article: Article) => void;
	startRemoveArticle: (id: string) => void;
}

export interface LinkStateProps {
	articles: Article[];
}

export interface HomePageProps {
	id?: string;
	color?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HomePageState {}

export type Props = HomePageProps & LinkStateProps & LinkDispatchProps;