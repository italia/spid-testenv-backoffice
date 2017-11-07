import React from 'react';
import "./style.css";

function view(me) { 
    return(
        <div className="card">
            <div className="card-header">
                <div className="panel-title">Single Logout Service</div>

                {me.data.removeButton ? 
                    <div className="panel-elements pull-right">
                        <button href="#" 
                            onClick={()=>me.data.removeFunc(me.data.n)} 
                            className="btn btn-sm btn-danger fa fa-remove">
                        </button>
                    </div> 
                : <div /> }                

            </div>
            <div className="card-body">
                <form className="form-horizontal" id="service_'+logoutNum+'_logout-container" name="form-logout">
                    <div className="mt-3 container-fluid">
                    <div className="form-group row mt-3">
                        <label htmlFor="singlelogoutbinding" className="col-md-3 control-label">Binding </label>
                        <div className="col-md-8">
                            <select id="singlelogoutbinding" className=""
                                value={me.data.Binding}
                                onChange={(e)=>me.data.setBinding(me.data.n, e)} >
                                    <option selected>SOAP</option>
                                    <option>HTTP-POST</option>
                                    <option>HTTP-REDIRECT</option>
                            </select>
                        </div>
                        <div className="col-md-1"> <i className="fa fa-info-circle fa-lg" data-toggle="tooltip" data-placement="top"aria-hidden="true"  title="Inserisci l'indirizzo della P.A. in https"></i> </div>
                        </div>
                        <div className="form-group row mt-3">
                            <label className="col-md-3 control-label">Location </label>
                                <div className="col-md-8">
                                    <input type="url" className="form-control" 
                                        value={me.data.Location}
                                        onChange={(e)=>me.data.setLocation(me.data.n, e)}
                                        placeholder = "Inserisci URL. Es. https://www.example.com"
                                        aria-required="true" pattern="https://(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"
                                        required />
                                </div>
                                <div className="col-md-1"> <i className="fa fa-info-circle fa-lg" data-toggle="tooltip" data-placement="top"aria-hidden="true" title="Inserisci l'URL del servizio di Single Logout messo a disposizione dal Service Provider"></i> </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default view;