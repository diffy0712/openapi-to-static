import React, { ReactElement } from 'react';
import { Article } from '../../../Redux/types/Article';
import {Grid, Box, ButtonPrimary, Heading} from '@primer/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

import { Props, HomePageState } from './Interfaces';

export default (props: {
	article: Article;
	articles: Article[];
	onCreate: (article: Article) => void;
	onEdit: (article: Article) => void;
	onRemove: (slug: string) => void;
}, state: HomePageState): ReactElement => (
	<Grid gridTemplateColumns="repeat(2, auto)" gridGap={3}>
		<Box p={3} bg="blue.2">
			<Heading fontSize={6} mb={2}>
				Manage Articles
			</Heading>
			<ButtonPrimary
				onClick={(): void => props.onCreate(props.article)}
			>
				<FontAwesomeIcon icon={faCoffee} /> Create article
			</ButtonPrimary>
			<div>
				{props.articles.map((article: Article): ReactElement => (
					<div>
						<p>{article.title}</p>
						<p>{article.description}</p>
						<p>{article.body}</p>
						<button onClick={(): void => props.onRemove(article.slug)}>
							Remove Article
						</button>
						<button onClick={(): void => props.onEdit(article)}>Edit Article</button>
					</div>
				))}
			</div>
		</Box>
		<Box p={3} bg="yellow.2">2</Box>
	</Grid>
);