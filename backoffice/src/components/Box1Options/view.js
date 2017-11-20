import React from 'react';
import "./style.css";

function view(me) { 
    
    return(
        <div className="card maincard">
            <a data-toggle="collapse" href="#developtions-container" aria-expanded="true" aria-controls="developtions-container">
                <div className="card-header" role="tab" id="developtions-header" >
                    <div className="title">Opzioni sviluppo e test
                        <div className="pull-right">
                            <span className="label label-warning">Opzionale</span>
                        </div>   
                    </div>             
                </div>
            </a>
            <div id="developtions-container" className="collapse" role="tabpanel" aria-labelledby="developtions-header" data-parent="#accordion" aria-expanded="true" >
                <div className="card-block">
                    <form className="form-horizontal">										
                        <div className="form-group row mt-3">
                            <label htmlFor="OrganizationName" className="col-md-3 control-label">Livello SPID </label>
                            <div className="col-md-8">
															<select id="SPIDLevel"
																className="form-control" 
																onChange={(e)=>{ me.setSPIDLevel(e) }} >
																	<option value="1">1° Livello (Username e Password)</option>
			                            <option value="2">2° Livello (Email OTP)</option>
	                           	</select>	
                            </div>																	
                           	<div className="col-md-1"> <i className="fa fa-info-circle fa-lg" data-toggle="tooltip" data-placement="top"aria-hidden="true" title="Specifica il livello di autenticazione SPID da forzare"></i></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default view;