import React, { Component } from 'react';

import Header from './Header';
import Footer from './Footer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Notes from '../containers/Notes';
import SharedNote from '../containers/SharedNote';

class App extends Component {
    render() {
        return ( 
          <React.Fragment>
            <Header />
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Notes} />
                        <Route path="/share/:id" component={SharedNote} />
                        <Route path="**" component={Notes} />
                    </Switch>
                </BrowserRouter>
              <Footer/>
            </React.Fragment>
        );
    }
}
export default App;

