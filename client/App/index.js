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
        const redirect = (condition, path, jsx) => (condition ? <Redirect to={path}/> : jsx);
        return (
            <Switch>
                <Route path="/results" render={() => <Results ps={this.ps}/>}/>
                <Route path="/register" render={() => <Register ps={this.ps}/>}/>
                <Route path="/login" render={() => redirect(this.state.loggedIn, "/", <Login ps={this.ps}/>)}/>
                <Route path="/" render={() => redirect(!this.state.loggedIn, "/login", <Home ps={this.ps}/>)}/>
            </Switch>
        );
    }
}

export default App;
