import React from 'react';
import { observer } from "mobx-react"

import { Article } from '../../../../Service/Main/Schemas/Article';

export interface ArticleViewProps {
  article: Article
}
  
@observer
export default class ArticleView extends React.Component<ArticleViewProps> {
  render() {
    const article = this.props.article;
    return (
      <li onDoubleClick={ this.onRename }>
        <input
          type='checkbox'
          checked={ article.awesomeness }
          onChange={ this.onToggleCompleted }
        />
        { article.title }
        <small>{ article.description }</small>
      </li>
    );
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