import React from 'react';
import { connect } from 'react-redux';
import {startRemoveArticle, startEditArticle, startAddArticle} from '../actions/articles';
import { Article } from '../types/Article';
import { AppState } from '../store/configureStore';
import { bindActionCreators } from 'redux';
import { AppActions } from '../types/actions';
import { ThunkDispatch } from 'redux-thunk';
import {BodyCreateNewArticle} from '../api/main/schemas/BodyCreateNewArticle';

import {Grid, Box, ButtonPrimary, Heading} from '@primer/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

interface HomePageProps {
	id?: string;
	color?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomePageState {}

type Props = HomePageProps & LinkStateProps & LinkDispatchProps;

export class HomePagePage extends React.Component<Props, HomePageState> {
	onCreate = (article: BodyCreateNewArticle): void => {
		this.props.startCreateArticle(article);
	};
	onEdit = (article: Article): void => {
		this.props.startEditArticle(article);
	};
	onRemove = (id: string): void => {
		this.props.startRemoveArticle(id);
	};
	render(): object {
		const { articles } = this.props;
		return (
			<Grid gridTemplateColumns="repeat(2, auto)" gridGap={3}>
				<Box p={3} bg="blue.2">
					<Heading fontSize={6} mb={2}>Article Page</Heading>
					<ButtonPrimary
						onClick={(): void => this.onCreate({article: {title: 'test2', description: 'asdd', body: 'bodyad', tagList: []}})}
					>
						<FontAwesomeIcon icon={faCoffee} /> Create article
					</ButtonPrimary>
					<div>
						{articles.map(article => (
							<div>
								<p>{article.title}</p>
								<p>{article.description}</p>
								<p>{article.body}</p>
								<button onClick={() => this.onRemove(article.id)}>
									Remove Article
								</button>
								<button onClick={() => this.onEdit(article)}>Edit Article</button>
							</div>
						))}
					</div>
				</Box>
				<Box p={3} bg="yellow.2">2</Box>
			</Grid>
		);
	}
}

interface LinkStateProps {
	articles: Article[];
}
interface LinkDispatchProps {
	startCreateArticle: (article: BodyCreateNewArticle) => void;
	startEditArticle: (article: Article) => void;
	startRemoveArticle: (id: string) => void;
}

const mapStateToProps = (
	state: AppState,
	ownProps: HomePageProps
): LinkStateProps => ({
	articles: state.articles
});

const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, AppActions>,
	ownProps: HomePageProps
): LinkDispatchProps => ({
	startCreateArticle: bindActionCreators(startAddArticle, dispatch),
	startEditArticle: bindActionCreators(startEditArticle, dispatch),
	startRemoveArticle: bindActionCreators(startRemoveArticle, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomePagePage);
