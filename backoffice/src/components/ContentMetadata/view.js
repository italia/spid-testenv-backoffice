import React from "react";
import Box1 from '../Box1';
import Box2 from '../Box2';
import "./style.css";

function view(me) {
    return(

      <div className="container container-boxed mt-3">
        <div className="row">
          <div className="col-md-6">  
            <Box1 />        
          </div>
          <div className="col-md-6">     
            <Box2 />         
          </div>
        </div>
      </div>

    );
}

export default view;