import React from 'react';
import Select from 'react-normalized-select';
import "./style.css";

function view(me) { 
    return(
        <div className="card">
            <div className="card-header">
                <div className="row">
                <div className="panel-title col-md-10">Attribute Consuming Service</div>

                {me.data.removeButton ? 
                    <div className="panel-elements pull-right col-md-2 close-button">
                        <button href="#" 
                            onClick={()=>me.data.removeFunc(me.data.n)} 
                            className="btn btn-sm btn-danger fa fa-remove">
                        </button>
                    </div> 
                : <div /> }
                 </div>
            </div>
            <div className="card-body">
                <form className="form-horizontal" id="service_0_attribute-container" name="form-attribute">
                <div className="mt-3 container-fluid">
                    <div className="form-group row">
                        <label htmlFor="ServiceName" className="col-md-3 control-label">Name </label>
                        <div className="col-md-8">
                            <input type="text"
                                id="ServiceName"
                                className="form-control" 
                                value={me.data.Name}
                                onChange={(e)=>me.data.setName(me.data.n, e)}
                                placeholder = "Inserisci il nome del Servizio"
                                required />
                        </div>
                        <div className="col-md-1"> <i className="fa fa-info-circle fa-lg" data-toggle="tooltip" data-placement="top"aria-hidden="true" title="Inserisci il nome del servizio"></i> </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="id1" className="col-md-3 control-label" >Description </label>
                        <div  className="col-md-8">
                            <input id="id1" type="text" 
                                className="form-control" 
                                value={me.data.Description}
                                onChange={(e)=>me.data.setDescription(me.data.n, e)}    
                                placeholder = "Inserisci la descrizione del Servizio"
                           />
                        </div>
                        <div className="col-md-1"> <i className="fa fa-info-circle fa-lg" data-toggle="tooltip" data-placement="top"aria-hidden="true" title="Inserisci la descrizione del servizio"></i> </div>
                    </div>
                    <fieldset className="form-group row">
                        <legend className="col-md-12 control-label mb-3">Requested Attribute (selezionarne almeno uno): </legend>
                         <div className="ml-4">
                            <div className="row">
                                <div className="form-check form-check-inline col-md-6">
                                    <span className="app-checkbox">               
                                        <label htmlFor="SPIDCODE" className="form-check-label">
                                            <input className="form-check-input" type="checkbox"  value="spidCode" 
												id={"SPIDCODE_"+me.data.n}
												onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> SPIDCODE  
                                        </label>
                                    </span>    
                                </div>
                                <div className="form-check form-check-inline col-md-5 offset-md-1">
                                    <span className="app-checkbox"> 
                                        <label htmlFor="FISCALNUMBER" className="form-check-label">
                                            <input className="form-check-input" type="checkbox" value="fiscalNumber" 
												id={"FISCALNUMBER_"+me.data.n}
												onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> FISCALNUMBER 
                                        </label>
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-check form-check-inline col-md-6">
                                    <span className="app-checkbox">        
                                        <label htmlFor="NAME" className="form-check-label">
                                            <input className="form-check-input" type="checkbox" value="name" 
												id={"NAME_"+me.data.n}
												onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> NAME 
                                        </label>
                                    </span>
                                </div>
                                <div className="form-check form-check-inline col-md-5 offset-md-1">
                                    <span className="app-checkbox"> 
                                        <label htmlFor="FAMILYNAME" className="form-check-label">
                                            <input className="form-check-input" type="checkbox" value="familyName" 
												id={"FAMILYNAME_"+me.data.n}
												onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> FAMILYNAME
                                        </label>
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-check form-check-inline col-md-6">
                                    <span className="app-checkbox">        
                                        <label htmlFor="GENDER" className="form-check-label">
                                            <input className="form-check-input" type="checkbox" value="gender" 
												id={"GENDER_"+me.data.n}
												onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> GENDER
                                        </label>
                                    </span>
                                </div>
                                <div className="form-check form-check-inline col-md-5 offset-md-1">
                                    <span className="app-checkbox">               
                                        <label htmlFor="DATEOFBIRTH" className="form-check-label">
                                            <input className="form-check-input" type="checkbox"  value="dateOfBirth" 
						id={"DATEOFBIRTH_"+me.data.n}
                                                onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> DATEOFBIRTH 
                                        </label>
                                    </span>    
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-check form-check-inline col-md-6">
                                    <span className="app-checkbox">        
                                        <label htmlFor="PLACEOFBIRTH" className="form-check-label">
                                            <input className="form-check-input" type="checkbox"  value="placeOfBirth" 
                                                    id={"PLACEOFBIRTH_"+me.data.n}
                                                    onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> PLACEOFBIRTH 
                                        </label>
                                    </span>
                                </div>
                                <div className="form-check form-check-inline col-md-5 offset-md-1">
                                    <span className="app-checkbox">        
                                        <label htmlFor="COUNTYOFBIRTH" className="form-check-label">
                                            <input className="form-check-input" type="checkbox"  value="countyOfBirth" 
                                                    id={"COUNTYOFBIRTH_"+me.data.n}
                                                    onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> COUNTYOFBIRTH 
                                        </label>
                                    </span>
                                </div>
                            </div>
                        <div className="row">
                            <div className="form-check form-check-inline col-md-6">
                            <span className="app-checkbox">               
                                <label htmlFor="IVACODE" className="form-check-label">
                                    <input className="form-check-input" type="checkbox"  value="ivaCode" 
												id={"IVACODE_"+me.data.n}
												onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> IVACODE   
                                </label>
                            </span>    
                        </div>
                            <div className="form-check form-check-inline col-md-5 offset-md-1">
                                <span className="app-checkbox"> 
                                    <label htmlFor="IDCARD" className="form-check-label">
                                      <input className="form-check-input" type="checkbox" value="idCard" 
												id={"IDCARD_"+me.data.n}
												onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> IDCARD 
                                    </label>
                                </span>
                            </div>
                        </div>
                        
                <div className="row">
                        <div className="form-check form-check-inline col-md-6">
                            <span className="app-checkbox">        
                                <label htmlFor="COMPANYNAME" className="form-check-label">
                                    <input className="form-check-input" type="checkbox" value="companyName" 
												id={"COMPANYNAME_"+me.data.n}
												onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> COMPANYNAME 
                                </label>
                            </span>
                        </div>
                        <div className="form-check form-check-inline col-md-5 offset-md-1">
                            <span className="app-checkbox"> 
                                <label htmlFor="REGISTEREDOFFICE" className="form-check-label">
                                    <input className="form-check-input" type="checkbox" value="registeredOffice" 
												id={"REGISTEREDOFFICE_"+me.data.n}
												onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> REGISTEREDOFFICE
                                </label>
                            </span>
                        </div>
                </div>
         <div className="row">
                            <div className="form-check form-check-inline col-md-6">
                                <span className="app-checkbox">               
                                    <label htmlFor="MOBILEPHONE" className="form-check-label">
                                        <input className="form-check-input" type="checkbox"  value="mobilePhone" 
												id={"MOBILEPHONE_"+me.data.n}
												onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> MOBILEPHONE 
                                    </label>
                                </span>    
                            </div>
                            <div className="form-check form-check-inline col-md-5 offset-md-1">
                            <span className="app-checkbox">        
                                <label htmlFor="EMAIL" className="form-check-label">
                                    <input className="form-check-input" type="checkbox"  value="email" 
												id={"EMAIL_"+me.data.n}
												onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> EMAIL 
                                </label>
                            </span>
                        </div>
                </div>
                <div className="row">
                    <div className="form-check form-check-inline col-md-3 col-md-6">
                        <span className="app-checkbox"> 
                            <label htmlFor="ADDRESS" className="form-check-label">
                                <input className="form-check-input" type="checkbox" value="address" 
                                    id={"ADDRESS_"+me.data.n}
                        		onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> ADDRESS
                            </label>
                        </span>
                    </div>
                    <div className="form-check form-check-inline col-md-5 offset-md-1">
                        <span className="app-checkbox">        
                            <label htmlFor="DIGITALADDRESS" className="form-check-label">
                                <input className="form-check-input" type="checkbox" value="digitalAddress" 
					id={"DIGITALADDRESS_"+me.data.n}
                                        onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> DIGITALADDRESS 
                            </label>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="form-check form-check-inline col-md-3 col-md-6">
                        <span className="app-checkbox"> 
                            <label htmlFor="EXPIRATIONDATE" className="form-check-label">
                                <input className="form-check-input" type="checkbox" value="expirationDate" 
                                        id={"EXPIRATIONDATE_"+me.data.n}
					onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)} /> EXPIRATIONDATE
                            </label>
                        </span>
                    </div>
                </div>    
        </div>

    {/* <div className="col-md-7">
                            <Select className="" multiple={true}
                                onChange={(e)=>me.data.setRequestedAttribute(me.data.n, e)}>

                                <option>SPIDCODE </option>
                                <option>NAME</option>
                                <option>FAMILYNAME</option>
                                <option>FISCALNUMBER</option>
                                <option>GENDER </option>
                                <option>DATEOFBIRTH</option>
                                <option>PLACEOFBIRTH</option>
                                
                                <option>DOCUMENTTYPE</option>
                                <option>DOCUMENTNUMBER</option>
                                <option>ISSUER</option>
                                <option>ISSUEDON</option>
                                <option>DOCUMENTEXPIRATIONDATE</option>
                                <option>MOBILEPHONE</option>
                                <option>EMAIL</option>
                                <option>IDENTITYCREATIONDATE</option>
                                <option>IDENTITYEXPIRATIONDATE</option>
                                <option>DIGITALADDRESS</option>
                                <option>PHYSICALSTREETTYPE</option>
                                <option>PHYSICALADDRESS</option>
                                <option>PHYSICALADDRESSNUMBER</option>
                                <option>PHYSICALCITY</option>
                                <option>PHYSICALPROVINCECODE</option>
                                <option>PHYSICALCAP</option>
        <option>COMPANYNAME</option>
                                <option>OFFICESTREETTYPE</option>
                                <option>OFFICEADDRESS</option>
                                <option>OFFICEADDRESSNUMBER</option>
                                <option>OFFICECITY</option>
                                <option>OFFICEPROVINCECODE</option>
                                <option>OFFICECAP</option>
                                <option>IVACODE</option>
        
                            </Select>
                        </div> */}
                        </fieldset>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default view;