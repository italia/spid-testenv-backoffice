import React from 'react';
import Box1Info from "../Box1Info";
import Box1Organization from "../Box1Organization";
import Box1Assertion from "../Box1Assertion";
import Box1Logout from "../Box1Logout";
import Box1Attribute from "../Box1Attribute";
import Box1Options from "../Box1Options";
import "./style.css";

function view(me) { 
    
    return(
        <div className="card"> 
            <div className="panel panel-default" id="service_0">
                <div className="card-header">
                    <span className="card-title"><span className="fa fa-pencil fa-fw"></span> Crea il tuo metadata...</span>
                </div>
                <div className="card-block">  
                    <div id="accordion" role="tablist">
                        <Box1Info />
                        <Box1Logout />
                        <Box1Assertion />
                        <Box1Attribute />
                        <Box1Organization />
												<Box1Options />
                    </div>    
                </div>
            </div>
        </div>
    )
};

export default view;