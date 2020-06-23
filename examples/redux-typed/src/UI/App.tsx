import React, { FunctionComponent, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { store } from '../Redux/Store/configureStore';
import AppRouter from './Routers/AppRouter';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

const App: FunctionComponent = (): ReactElement => (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

export default App;
