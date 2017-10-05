import React from "react";
import "./style.css";

function view(me) {
    return (
       
            <div className="app-header app-header-design-blue navbar">
             <a href="/" className="navbar-brand">  <span className="titleTag">TestEnv</span><span className="betaTag"> v0.9-beta.1</span> </a> 
                <ul className="nav navbar-nav ml-auto">
                    <li>
                        <a href="/" 
                        className="btn btn-link btn-icon" 
                        data-navigation-horizontal-toggle="true">
                        
                            <span className="icon-menu"></span>
                        </a>
                    </li>                    
                </ul>
            </div>
    );
}

export default view;
    
   
    