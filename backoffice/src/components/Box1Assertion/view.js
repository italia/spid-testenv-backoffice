import React from "react";
import Box1AssertionItem from "./item-index"
import "./style.css";

function view(me) { 
    
    return(
        <div className={"card maincard " + me.state.validation} onChange={()=>{me.onChange()}}>
            <a data-toggle="collapse" href="#assertionconsumerservice-container" aria-expanded="true" aria-controls="assertionconsumerservice-container">
                <div className="card-header" role="tab" id="assertionconsumerservice-header">
                    <div className="title">Assertion Consumer Service</div>
                </div>
            </a>
            <div id="assertionconsumerservice-container" className="collapse" role="tabpanel" aria-labelledby="assertionconsumerservice-header" data-parent="#accordion" aria-expanded="false" >
                <div className="card-block">
                    <div id="service-container" className="content">
                          {me.state.data.map((item, index)=>(
                          <Box1AssertionItem key={item.n} data={item} />
                          ))}
                    </div>
                    <div className="">
                        <button className="btn btn-success pull-right" 
                            onClick={()=>{me.addAssertionConsumerService()}}>
                            <span className="fa fa-plus"></span>
                            &nbsp;&nbsp;&nbsp;Aggiungi un'ulteriore Assertion Consumer Service
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default view;
