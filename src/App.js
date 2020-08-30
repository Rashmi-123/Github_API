import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import Dashboard from './Container/Dashboard/Dashboard';
import Repository from './Container/Repository/Repository';

function App() {

      let routes = <Switch>
                      <Route path={"/repos"}
                            exact
                            component={Repository} />
                        <Route path={"/"}
                            exact
                            component={Dashboard} />
                    </Switch>;


  return (
    <div className="login-bg">
      {routes}
    </div>
  );
}

export default App;
