import "./style.scss";

import React from "react";

class LayoutPage extends React.Component{
    constructor(){
        super();
    }

    render(){
        return (
            <div id="layout-page">{this.props.children}</div>
        );
    }
}

export default LayoutPage;
