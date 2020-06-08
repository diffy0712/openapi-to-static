import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import AppRouter from './router';

const App: FunctionComponent = () => (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

export default App;
