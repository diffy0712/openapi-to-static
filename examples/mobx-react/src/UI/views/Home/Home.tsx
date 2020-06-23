import { Component } from 'react';
import { observer } from "mobx-react"
import logo from '../../assets/logo.svg';
import './Home.css';

import ArticleView from '../../components/widgets/Article/ArticleView';
import { ArticleStore } from '../../../Store/ArticleStore';
import Board from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';

import template from './index.pug';

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
export default class Home extends Component<HomeProps> {
  render() {
    return template.call(this, {
      // variables
      report: this.props.store.report,
      articles: this.props.store.articles,
      board,
      // components
      Board,
      ArticleView
    });
  }

  onNewTodo = () => {
      this.props.store.addArticle(prompt('Enter a new todo:','coffee plz') || 'null', 'asdasd');
  }
}
