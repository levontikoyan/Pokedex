import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Root from './root.js';
import Table from './table';
import reducers from './../reducers';

injectTapEventPlugin();

let App = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <MuiThemeProvider>
      <Provider store={store}>
        <Router>
            <Root>
              <Switch>
                <Route exact path="/" component={Table} />
              </Switch>
            </Root>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
};

export default App;
