import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import {PubSub, redirect, post} from "./lib";

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

        this.ps = new PubSub();

        this.ps.subscribe("login", (data) => {
            fetch("/api/login", post({
                username: data.username,
                password: data.password
            }))
            .then(res => res.json())
            .then(res => {
                if(res.success){
                    this.setState({loggedIn: true});
                    window.localStorage.jwt = res.jwt;
                }
            })
            .catch(console.error);
        });

        this.ps.subscribe("register", data => {
            fetch("/api/register", post({
                username: data.username,
                password: data.password
            }))
            .then(res => res.json())
            .then(res => {
                if(res.success){
                    this.setState({loggedIn: true});
                    window.localStorage.jwt = res.jwt;
                }
            })
            .catch(console.error);
        });

        window.ps = this.ps;
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
