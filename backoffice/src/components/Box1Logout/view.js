import React from 'react';
import Box1LogoutItem from "./item-index"
import "./style.css";

function view(me) { 
    
    return(
        <div className={"card maincard " + me.state.validation}>
            <a data-toggle="collapse" href="#general-logout-container" aria-expanded="true" aria-controls="general-logout-container">
                <div className="card-header" role="tab" id="logout-header" >
                    <div className="title">Single Logout Service</div>
                </div>
            </a>
            <div id="general-logout-container" className="collapse" role="tabpanel" aria-labelledby="logout-header" data-parent="#accordion" aria-expanded="false" >
                <div className="card-block">
                    <div id="logout-container" className="content">
                        {me.state.data.map((item, index)=>(
                        <Box1LogoutItem key={item.n} data={item} />
                        ))}
                    </div>
					{ /*
                    <div className="">
                        <button className="btn btn-success pull-right" 
                            onClick={()=>{me.addSingleLogout()}}>
                            <span className="fa fa-plus"></span>
                            &nbsp;&nbsp;&nbsp;Aggiungi un'ulteriore Single Logout Service
                        </button>
                    </div>          
					*/ }
                </div>
            </div>
         </div>
    )
};

export default view;
