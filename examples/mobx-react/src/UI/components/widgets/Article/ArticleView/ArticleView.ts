import React from 'react';
import { observer } from "mobx-react"

import { Article } from '../../../../../Service/Main/Schemas/Article';

import template from './ArticleView.pug';

export interface ArticleViewProps {
  article: Article
}

@observer
export default class ArticleView extends React.Component<ArticleViewProps> {
  render() {
    return template.call(this, {
      article: this.props.article
    });
  }

  onToggleCompleted = () => {
    const article = this.props.article;
    article.awesomeness = !article.awesomeness;
  }

  onRename = () => {
    const article = this.props.article;
    article.title = prompt('Task name', article.title) || article.title;
  }
}