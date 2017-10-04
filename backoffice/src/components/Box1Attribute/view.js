import React from 'react';
import Box1AttributeItem from "./item-index"
import "./style.css";

function view(me) { 
    
    return(
        <div className="card maincard">
            <a data-toggle="collapse" href="#attributeconsumingservice-container" aria-expanded="true" aria-controls="attributeconsumingservice-container">
                <div className="card-header" role="tab" id="attributeconsumingservice-header">
                    <div className="title">Attribute Consuming Service</div>
                </div>
            </a>
            <div id="attributeconsumingservice-container" className="collapse" role="tabpanel" aria-labelledby="attributeconsumingservice-header" data-parent="#accordion" aria-expanded="true">
                <div className="card-block">
                    <div id="attribute-container" className="content">
                        {me.state.data.map((item, index)=>(
                        <Box1AttributeItem key={item.n} data={item} />
                        ))}
                    </div>
					{ /*
                    <div className="">
                        <button className="btn btn-success pull-right" 
                            onClick={()=>{me.addAttributeConsumingService()}}>
                            <span className="fa fa-plus"></span>
                        &nbsp;&nbsp;&nbsp;Aggiungi un'ulteriore Attribute Consuming Service
                        </button>
                    </div>
					*/ }
                </div>
            </div>
        </div>
    )
};

export default view;