import React from "react";
import "./style.css";

function view(me) { 

    return(
        <div className={"card maincard " + me.state.validation}>
            <a data-toggle="collapse" href="#info-container" aria-expanded="true" aria-controls="info-container">
                <div className="card-header" role="tab" id="info-header">
                    Info
                </div>
            </a>
            <div id="info-container" className="collapse" role="tabpanel" aria-labelledby="info-header" data-parent="#accordion" aria-expanded="true">
                <div className="card-block">
                    <form className="form-horizontal" name="form-info">
                        <div className="form-group row mt-3">
                            <label className="col-md-3 control-label">Entity ID </label>
                            <div className="col-md-8">
                                <input type="url" 
                                    className="form-control" 
                                    onChange={(e)=>{ me.setEntityId(e) }} 
                                    placeholder = "Inserisci URL. Es. https://www.example.com"
                                    aria-required="true" pattern="https://(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"
                                required
                                />
                            </div>
                            <div className="col-md-1"> <i className="fa fa-info-circle fa-lg" data-toggle="tooltip" data-placement="top"aria-hidden="true" title="Inserisci la URL del sito istituzionale della P.A. (in https)" ></i> </div>
                        </div>		
                        <div className="form-group row mt-3">
                            <label htmlFor="X509Certificate" className="col-md-3 control-label">Certificate </label>
                            <div className="col-md-8">
                                <textarea id="X509Certificate" className="form-control" rows="5"
                                    onChange={(e)=>{ me.setCertificate(e) }}
                                    placeholder = "Inserisci il certificato X509 della P.A."
                                    data-pattern="MII[a-zA-Z0-9/\+=\r\n]+"
                                    required></textarea>
                            </div>
                            <div className="col-md-1"> <i className="fa fa-info-circle fa-lg" data-toggle="tooltip" data-placement="top"aria-hidden="true" title="Inserisci il certificato X.509, corrispondete alla chiave pubblica della P.A."></i> </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default view;