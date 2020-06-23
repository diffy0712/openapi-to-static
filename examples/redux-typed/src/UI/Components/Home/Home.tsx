import React, { Component } from 'react';
import { connect } from 'react-redux';
import {startRemoveArticle, startEditArticle, startAddArticle} from '../../../Redux/Actions/Articles';
import { Article } from '../../../Redux/types/Article';
import { AppState } from '../../../Redux/Store/configureStore';
import { bindActionCreators } from 'redux';
import { AppActions } from '../../../Redux/types/Actions';
import { ThunkDispatch } from 'redux-thunk';

import { ArticleInCreate } from '../../../Service/Main/Schemas/ArticleInCreate';

import renderTemplate from './Template';
import { Props, HomePageState, HomeStateProps, HomeDispatchProps } from './Template';

export class Home extends Component<Props, HomePageState>
{
	public render(): object
	{
		return renderTemplate(
			{
				article: {title: 'test123', body: 'asd', slug: 'asd', description: 'asd', createdAt: 100, tagList: ['tag1']},
				articles: this.props.articles,
				onCreate: this.onCreate,
				onEdit: this.onEdit,
				onRemove: this.onRemove
			},
			this.state
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

const mapStateToProps = (
	state: AppState
): HomeStateProps => ({
	articles: state.articles
});

const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, AppActions>
): HomeDispatchProps => ({
	startCreateArticle: bindActionCreators(startAddArticle, dispatch),
	startEditArticle: bindActionCreators(startEditArticle, dispatch),
	startRemoveArticle: bindActionCreators(startRemoveArticle, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
