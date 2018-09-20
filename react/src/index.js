import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const alertopts = {
  position: 'top center',
  timeout: 4000,
  offset: '30px',
  transition: 'scale'
}

ReactDOM.render((
	<BrowserRouter>
		<AlertProvider template={AlertTemplate} {...alertopts}>
			<App />
		</AlertProvider>
	</BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
