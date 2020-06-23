import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './UI/views/Home';
import { articleStore } from './Store/ArticleStore';

ReactDOM.render(
  <Home store={articleStore} />,
  document.getElementById('root')
);