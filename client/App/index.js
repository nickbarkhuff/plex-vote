import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Results from "./Results";

class App extends React.Component{
    constructor(){
        super();

        this.state = {
            loggedIn: false
        };
    }

    render(){
        const protect = (jsx) => {
            if(!this.state.loggedIn)
                return <Redirect to="/login"/>;
            else
                return jsx;
        };

        return (
            <Switch>
                <Route path="/login" render={() => <Login ps={this.ps}/>}/>
                <Route path="/register" render={() => <Register ps={this.ps}/>}/>
                <Route path="/results" render={() => <Results ps={this.ps}/>}/>
                <Route path="/" render={() => protect(<Home ps={this.ps}/>)}/>
            </Switch>
        );
    }
}

export default App;
