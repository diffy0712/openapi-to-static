import React, { ReactElement } from 'react';
import { Article } from '../../../Redux/types/Article';
import { ArticleInCreate } from '../../../Service/Main/Schemas/ArticleInCreate';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Layout, Button, Typography } from 'antd';

export interface HomeDispatchProps {
	startCreateArticle: (article: ArticleInCreate) => void;
	startEditArticle: (article: Article) => void;
	startRemoveArticle: (id: string) => void;
}

export interface HomeStateProps {
	articles: Article[];
}

export interface HomePageProps {
	article: Article;
	articles: Article[];
	onCreate: (article: Article) => void;
	onEdit: (article: Article) => void;
	onRemove: (slug: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HomePageState {}

export type Props = HomePageProps & HomeStateProps & HomeDispatchProps;

export default (props: HomePageProps, state: HomePageState): ReactElement => pug`
	.wrapper
		p
			| test
`;
