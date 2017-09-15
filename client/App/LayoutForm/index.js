import "./style.scss";

import React from "react";

class LayoutForm extends React.Component{
    constructor(){
        super();
    }

    render(){
        return (
            <div id="layout-form">{this.props.children}</div>
        );
    }
}

export default LayoutForm;
