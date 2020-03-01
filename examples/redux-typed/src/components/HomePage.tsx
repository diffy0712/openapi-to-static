import React from 'react';
import { connect } from 'react-redux';
import {startRemoveArticle, startEditArticle, startAddArticle} from '../actions/articles';
import { Article } from '../types/Article';
import { AppState } from '../store/configureStore';
import { bindActionCreators } from 'redux';
import { AppActions } from '../types/actions';
import { ThunkDispatch } from 'redux-thunk';
import {BodyCreateNewArticle} from '../api/main/schemas/BodyCreateNewArticle';

interface HomePageProps {
	id?: string;
	color?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface HomePageState {}

type Props = HomePageProps & LinkStateProps & LinkDispatchProps;

export class HomePagePage extends React.Component<Props, HomePageState> {
	onCreate = (article: BodyCreateNewArticle) => {
		this.props.startCreateArticle(article);
	};
	onEdit = (article: Article) => {
		this.props.startEditArticle(article);
	};
	onRemove = (id: string) => {
		this.props.startRemoveArticle(id);
	};
	render(): object {
		const { articles } = this.props;
		return (
			<div>
				<h1>Article Page</h1>
				<button onClick={() => this.onCreate({article: {title: 'test2', description: 'asdd', body: 'bodyad', tagList: []}})}/>
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
			</div>
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
