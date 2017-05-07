import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';
import '../style/style.scss';
import { AppContainer } from 'react-hot-loader';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}