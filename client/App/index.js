import React from "react";
import {Switch, Route} from "react-router-dom";

import {PubSub, redirect, post} from "./lib";

import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Results from "./Results";

class App extends React.Component{
    constructor(){
        super();

        this.state = {
            loggedIn: !!localStorage.jwt
        };

        this.ps = new PubSub();
        ["login", "register"].forEach((action) => {
            this.ps.subscribe(action, (data) => {
                fetch("/api/" + action, post({
                    username: data.username,
                    password: data.password
                }))
                .then(res => res.json())
                .then(res => {
                    if(res.success){
                        this.setState({loggedIn: true});
                        window.localStorage.jwt = res.jwt;
                        this.ps.publish("login success");
                    }
                    else{
                        this.ps.publish("login failure");
                    }
                })
                .catch((error) => {
                    this.ps.publish("fetch error", error);
                });
            });
        });
    }

    render(){
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
