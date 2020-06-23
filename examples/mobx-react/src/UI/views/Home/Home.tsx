import React from 'react';
import { observer } from "mobx-react"
import logo from '../../assets/logo.svg';
import './Home.css';

import ArticleView from './ArticleView';
import { ArticleStore } from '../../../Store/ArticleStore';
import Board from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';

const board = {
  columns: [
    {
      id: 1,
      title: 'Articles',
      cards: [
        {
          id: 1,
          title: 'Add card',
          description: 'Add capability to add a card in a column'
        },
      ]
    },
    {
      id: 2,
      title: 'Doing',
      cards: [
        {
          id: 2,
          title: 'Drag-n-drop support',
          description: 'Move a card between the columns'
        },
      ]
    }
  ]
}

export interface HomeProps {
  store: ArticleStore
}

@observer
export default class Home extends React.Component<HomeProps> {
  render() {
      const store = this.props.store;
      return (
      <div>
          <img src={logo} className="App-logo" alt="logo" />
          { store.report }
          <ul>
          { store.articles.map(
          (article, idx) => <ArticleView article={ article } key={ idx } />
          ) }
          </ul>
          { store.pendingRequests > 0 ? 'Loading...' : null }
          <button onClick={ this.onNewTodo }>New Todo</button>
          <small> (double-click a todo to edit)</small>

          <Board initialBoard={board} />
      </div>
      );
  }

  onNewTodo = () => {
      this.props.store.addArticle(prompt('Enter a new todo:','coffee plz') || 'null', 'asdasd');
  }
}
