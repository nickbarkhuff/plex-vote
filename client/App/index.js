import "./style.scss";

import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

import {PubSub, post} from "../../lib";

import LayoutForm from "./LayoutForm";
import LayoutPage from "./LayoutPage";

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
                        this.ps.publish("login failure", res.error);
                    }
                })
                .catch((error) => {
                    this.ps.publish("fetch error", error);
                });
            });
        });

        this.ps.subscribe("fetch error", (error) => {
            alert("You don't seem to be connected to the internet.\n\n" + error);
        });
    }

    render(){
        const redirect = (condition, path, jsx) => (condition ? <Redirect to={path}/> : jsx);
        return (
            <Switch>
                <Route path="/(login|register)" render={() =>
                    <LayoutForm>
                        <Switch>
                            <Route path="/register" render={() => <Register ps={this.ps}/>}/>
                            <Route path="/login" render={() => redirect(this.state.loggedIn, "/", <Login ps={this.ps}/>)}/>
                        </Switch>
                    </LayoutForm>
                }/>
                <Route render={() =>
                    <LayoutPage>
                        <Switch>
                            <Route path="/results" render={() => <Results ps={this.ps}/>}/>
                            <Route path="/" render={() => redirect(!this.state.loggedIn, "/login", <Home ps={this.ps}/>)}/>
                        </Switch>
                    </LayoutPage>
                }/>
            </Switch>
        );
    }
}

export default App;
