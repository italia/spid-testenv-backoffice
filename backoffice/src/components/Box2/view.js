import React from 'react';
import AceEditor from "../AceEditor";
import "./style.css";

function view(me) { 
    
    return(
        <div>
            <div className="card" id="panel-metadata">
                <div className="card-header">
                    <span className="panel-title"><span className="fa fa-code fa-fw"></span> Verifica il tuo metadata</span>
                    <div className="panel-elements panel-elements-cp pull-right">    
                    </div>                    
                </div>
                <div className="card-block">   
					<AceEditor />
                </div>	     
		
                <div className="card-footer">   
                    <div className="panel-elements pull-right">
                        <button id="ExportMetadataButton" className="btn btn-success pull-right"
                            onClick={()=>{ me.export() }}>
                                <span className="fa fa-download"></span>  Scarica 
                        </button>
                    </div>        

					<div className="panel-elements pull-right">
						<button id="UploadMetadataButton" className="btn btn-success pull-right"
							onClick={()=>{ me.save() }}>
								<span className="fa fa-save"></span>  Salva 
						</button>
					</div>     
                </div>
				
            </div>		
        </div>
    )
};

export default view;