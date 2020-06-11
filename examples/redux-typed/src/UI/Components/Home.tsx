import React, { Component } from 'react';
import { connect } from 'react-redux';
import {startRemoveArticle, startEditArticle, startAddArticle} from '../../Redux/Actions/Articles';
import { Article } from '../../Redux/types/Article';
import { AppState } from '../../Redux/Store/configureStore';
import { bindActionCreators } from 'redux';
import { AppActions } from '../../Redux/types/Actions';
import { ThunkDispatch } from 'redux-thunk';

import {Grid, Box, ButtonPrimary, Heading} from '@primer/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ArticleInCreate } from '../../Service/Main/Schemas/ArticleInCreate';

interface HomePageProps {
	id?: string;
	color?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomePageState {}

type Props = HomePageProps & LinkStateProps & LinkDispatchProps;

export class HomePagePage extends Component<Props, HomePageState>
{
	public render(): object
	{
		const { articles } = this.props;
		const article = {title: 'test4', description: 'asdd', body: 'bodyad', tagList: []};

		return (
			<Grid gridTemplateColumns="repeat(2, auto)" gridGap={3}>
				<Box p={3} bg="blue.2">
					<Heading fontSize={6} mb={2}>
						Manage Articles
					</Heading>
					<ButtonPrimary
						onClick={(): void => this.onCreate(article)}
					>
						<FontAwesomeIcon icon={faCoffee} /> Create article
					</ButtonPrimary>
					<div>
						{articles.map(article => (
							<div>
								<p>{article.title}</p>
								<p>{article.description}</p>
								<p>{article.body}</p>
								<button onClick={(): void => this.onRemove(article.slug)}>
									Remove Article
								</button>
								<button onClick={(): void => this.onEdit(article)}>Edit Article</button>
							</div>
						))}
					</div>
				</Box>
				<Box p={3} bg="yellow.2">2</Box>
			</Grid>
		);
	}

	private onCreate(article: ArticleInCreate): void
	{
		this.props.startCreateArticle(article);
	}

	private onEdit(article: Article): void
	{
		this.props.startEditArticle(article);
	}

	private onRemove(id: string): void
	{
		this.props.startRemoveArticle(id);
	}
}

interface LinkStateProps {
	articles: Article[];
}
const mapStateToProps = (
	state: AppState
): LinkStateProps => ({
	articles: state.articles
});

interface LinkDispatchProps {
	startCreateArticle: (article: ArticleInCreate) => void;
	startEditArticle: (article: Article) => void;
	startRemoveArticle: (id: string) => void;
}
const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, AppActions>
): LinkDispatchProps => ({
	startCreateArticle: bindActionCreators(startAddArticle, dispatch),
	startEditArticle: bindActionCreators(startEditArticle, dispatch),
	startRemoveArticle: bindActionCreators(startRemoveArticle, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePagePage);
