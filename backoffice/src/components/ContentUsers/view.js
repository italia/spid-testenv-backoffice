import React from 'react';
import KendoDatePicker from 'kendo-ui-react-jquery-datepicker';
import 'react-block-ui/style.css';
import './kendoui/kendo.common.core.min.css';
import './kendoui/kendo.office365.min.css';
import './kendoui/kendo.office365.mobile.min.css';
import './style.css';
//import 'kendo-ui-core/js/cultures/kendo.culture.it-IT.js'; 

 
function view(me) { 
    return(

		<div className="container container-boxed">
	
			<div className="row">
				<div className="col-md-12">    
					<div className="card"> 
						<div className="panel panel-default" id="service_0">
							<div className="card-header">
								<span className="card-title"><span className="fa fa-user-o fa-fw"></span> Utenti registrati</span>
							</div>
							<div className="card-block">  
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Username</th>
											<th>Cognome</th>
											<th>Nome</th>
											<th>Codice Fiscale</th>
											<th>Sesso</th>
											<th>Data di Nascita</th>
											<th>Luogo di Nascita</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{me.state.users.map((item, index)=>(
											<tr>
												<td>{item.userName}</td>	
												<td>{item.familyName}</td>
												<td>{item.name}</td>
												<td>{item.fiscalNumber}</td>
												<td>{item.gender}</td>
												<td>{item.dateOfBirth}</td>
												<td>{item.placeOfBirth}</td>     
												<td>
													<button className="btn btn-success pull-right" onClick={()=>{ me.deleteUser(item.userName) }}>
														<span className="fa fa-trash"></span>  cancella 
													</button>												
												</td>
											</tr>                      
										))}                    
									</tbody>
								</table>					
							</div>
						</div>	
					</div>
				</div>
			</div>
	
			<div className="row">
				<div className="col-md-12">     
					<div className="card"> 
						<div className="panel panel-default" id="service_0">
							<div className="card-header">
								<span className="card-title"><span className="fa fa-user-plus fa-fw"></span> Crea nuovo utente...</span>
							</div>
							<div className="card-block">  
								<form className="form-horizontal">

									<div className="form-group row">
                                                                            <div className="col-md-2">
										<label className="control-label">Username SPID</label>
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="" data-original-title="Nome utente" ></i>
                                                                            </div>
										<div className="col-md-4">
											<input type="text" 
                                                                                                id = "SPIDUsername"
                                                                                                placeholder = "Definisci una Username"
												className="form-control" 
												onChange={(e)=>{ me.setUsername(e.target.value) }} 
												value = {me.state.username}
												aria-required="true" pattern="[0-9a-zA-Z]+"
												required
											/>
										</div>
                                                                         <div className="col-md-2">
										<label className="control-label">Password SPID</label>
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="" data-original-title="Password" ></i>
                                                                            </div>
										<div className="col-md-4">
											<input type="text" 
                                                                                                id = "SPIDPassword"
                                                                                                placeholder = "Definisci una Password"
												className="form-control" 
												onChange={(e)=>{ me.setPassword(e.target.value) }} 
												value = {me.state.password}
												aria-required="true" pattern="[0-9a-zA-Z]+"
                                                                                                
												required
											/>
										</div>

                                      
                                        
									</div>
									<div className="form-group row">
                                                                        <div className="col-md-2"> <label className="control-label">Scadenza Id. SPID</label> 
                                                                                    &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Data Scadenza Identità SPID nel formato AAAA-MM-GG" data-original-title=""></i>
                                                                                </div>
										<div className="col-md-4">
												
												<KendoDatePicker
												
													options = {{
														format: 'yyyy-MM-dd' 
													}}
													
													events = {{
														change: (e)=>{ me.setDateOfBirth(e.sender.element[0].value); } 
													}}
													
												>
													<input id="ExpirationDate"
														className="form-control"
														style={{width: '100%'}}
														value = {me.state.dateOfBirth}
														placeholder = "Scad. identità digitale nel formato AAAA-MM-GG"
														aria-required="true" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"		
														required
													/>
													
												</KendoDatePicker>												

										</div>
                                                                        <div className="col-md-6"></div> 
									</div>												
									<div className="form-group row">
										<div className="col-md-2"> 
                                                                                    <label className="control-label">Nome</label> 
                                                                                     &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Nome dell'utente. Es. Mario" data-original-title=""></i> 
                                                                                </div>         
										<div className="col-md-4">
											<input type="text" 
                                                                                                id = "Name"
												className="form-control" 
												onChange={(e)=>{ me.setName(e.target.value) }} 
												value = {me.state.name}
												placeholder = "Nome dell'utente. Es. Mario"
												aria-required="true" pattern=""
												required
											/>
										</div>
										<div className="col-md-2">
                                                                                     <label className="control-label">Cognome</label>    
                                                                                     &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Cognome dell'utente. Es. Rossi" data-original-title=""></i>         
                                                                                </div>
										<div className="col-md-4">
											<input type="text" 
                                                                                                id = "FamilyName"
												className="form-control" 
												onChange={(e)=>{ me.setFamilyName(e.target.value) }} 
												value = {me.state.familyName}
												placeholder = "Cognome dell'utente. Es. Rossi"
												aria-required="true" pattern=""
												required
											/>
										</div>												
									</div>	
									<div className="form-group row">
										<div className="col-md-2">
                                                                                    <label className="control-label">Sesso</label>
                                                                                    &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Selezionare il sesso dell'utente: Maschio / Femmina / Non Specificato." data-original-title=""></i>
                                                                                    </div>
										<div className="col-md-4">
											<select
                                                                                                id="Gender"
												className="form-control" 
												onChange={(e)=>{ me.setGender(e.target.value) }} 
												value = {me.state.gender}
												aria-required="true" pattern="M|F"
												required
											>
																																														<option value="N">Non Specificato</option>
																																														<option value="M">Maschio</option>
                                                                                            <option value="F">Femmina</option>
                                                                                        </select>
										</div>
										<div className="col-md-2"> 
                                                                                    <label className="control-label">Data di Nascita</label>
                                                                                    &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Data di nascita nel formato AAAA-MM-GG" data-original-title=""></i>
                                                                                    </div>                                       
										<div className="col-md-4">

												<KendoDatePicker
												
													options = {{
														format: 'yyyy-MM-dd' 
													}}
													
													events = {{
														change: (e)=>{ me.setDateOfBirth(e.sender.element[0].value); } 
													}}
													
												>
													<input id="DateOfBirth"
														className="form-control"
														style={{width: '100%'}}
														value = {me.state.dateOfBirth}
														placeholder = "Data di nascita nel formato AAAA-MM-GG"
														aria-required="true" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"		
														required
													/>
													
												</KendoDatePicker>
												
										</div>												
									</div>		
									<div className="form-group row">
										<div className="col-md-2">
                                                                                    <label className="control-label">Provincia di Nascita</label>
                                                                                    &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Sigla della provincia di nascita. Es. RM" data-original-title=""></i>
                                                                                </div> 
										<div className="col-md-4">
											<input type="text" 
                                                                                                id="CountyOfBirth"
												className="form-control" 
												onChange={(e)=>{ me.setCountyOfBirth(e.target.value) }} 
												value = {me.state.countyOfBirth}
												placeholder = "Sigla della provincia di nascita. Es. RM"
												aria-required="true" pattern="[A-Z]{2}"
												required
											/>
										</div>
										<div className="col-md-2"> <label className="control-label">Luogo di Nascita</label>
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Codice catastale del comune di nascita. Es. H501" data-original-title=""></i>
                                                                                </div>                              
										<div className="col-md-4">
											<input type="text" 
                                                                                                id="PlaceOfBirth"
												className="form-control" 
												onChange={(e)=>{ me.setPlaceOfBirth(e.target.value) }} 
												value = {me.state.placeOfBirth}
												placeholder = "Cod. catastale del comune di nascita. Es. H501"
												aria-required="true" pattern="[A-Z][0-9]{3}"
												required
											/>
										</div>												
									</div>	
									<div className="form-group row">
                                                                        <div className="col-md-2"> <label className="control-label">Indirizzo PEC</label>  
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Indirizzo della casella di posta elettronica certificata (PEC). Es. me@pec.example.com" data-original-title=""></i>
                                                                                </div>
										<div className="col-md-4">
											<input type="email" 
                                                                                                id="DigitalAddress"
												className="form-control" 
												onChange={(e)=>{ me.setDigitalAddress(e.target.value) }} 
												value = {me.state.digitalAddress}
												placeholder = "Indirizzo casella PEC. Es. me@pec.example.com"
												aria-required="true" 
												required
											/>
										</div>
										
										<div className="col-md-2"> <label className="control-label">Email</label>
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Indirizzo email utente. Es. me@example.com" data-original-title=""></i>
                                                                                </div>            
										<div className="col-md-4">
											<input type="email" 
                                                                                                id="Email"
												className="form-control" 
												onChange={(e)=>{ me.setEmail(e.target.value) }} 
												value = {me.state.email}
												placeholder = "Indirizzo email utente. Es. me@example.com"
												aria-required="true" 
												required
											/>
										</div>												
									</div>		
									<div className="form-group row"><div className="col-md-2"> <label className="control-label">Partita IVA</label> 
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Partita IVA. Es. 0764352056C" data-original-title=""></i>   
                                                                                </div>
										<div className="col-md-4">
											<input type="text" 
                                                                                                id="IvaCode"
												className="form-control" 
												onChange={(e)=>{ me.setIvaCode(e.target.value) }} 
												value = {me.state.ivaCode}
												placeholder = "Partita IVA. Es. 0764352056C"
												aria-required="true" pattern="[0-9]{10}[0-9A-Z]"
												required
											/>
										</div>
										
										<div className="col-md-2"> 
                                                                                    <label className="control-label">Codice Fiscale</label>                                                                                
                                                                                    &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Codice fiscale dell'utente. Es. RSSMRA60A01H501Q" data-original-title=""></i>
                                                                                </div>
										<div className="col-md-4">
											<input type="text" 
                                                                                                id="FiscalNumber"
												className="form-control" 
												onChange={(e)=>{ me.setFiscalNumber(e.target.value) }} 
												value = {me.state.fiscalNumber}
												placeholder = "Codice fiscale utente. Es. RSSMRA60A01H501Q"
												aria-required="true" pattern="[a-zA-Z]{6}[0-9]{2}[a-zA-Z][0-9]{2}[a-zA-Z][0-9]{3}[a-zA-Z]"
												required
											/>
										</div>												
									</div>	
                                                                <div className="form-group row">
										<div className="col-md-2"> <label className="control-label">Nome Azienda</label>
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Ragione Sociale. Es. Agenzia per l'Italia Digitale" data-original-title=""></i>                                                                        </div>
										<div className="col-md-4">
											<input type="text" 
                                                                                                id="CompanyName"
												className="form-control" 
												onChange={(e)=>{ me.setCompanyName(e.target.value) }} 
												value = {me.state.companyName}
												placeholder = "Ragione Sociale. Es. Agenzia per l'Italia Digitale"
												aria-required="true" 
												required
											/>
										</div>												
									</div>	
                                                                <div className="form-group row">
                                                                            <div className="col-md-12 mt-3 mb-3">
                                                                                <h6>Estremi Documento d'Identità</h6> 
                                                                            </div>
                                                                            <div className="col-md-2"> <label className="control-label">Tipologia Documento</label>
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Tipologia documento. Es. Patente, Carta Identità, Passaporto" data-original-title=""></i>
                                                                                </div>
										<div className="col-md-4">
                                                                                < select
                                                                                    id = "IDCardTypology"
                                                                                    className = "form-control"
                                                                                    onChange={(e)=>{ me.setIDCardTypology(e.target.value)  }} 
                                                                                    value = {me.state.idCardTypology}
                                                                                    aria-required = "true"
                                                                                    required >
                                                                                    < option value = "cartaIdentita" > Carta d'Identità < /option>
                                                                                    < option value = "passaporto" > Passaporto < /option>
                                                                                    < option value = "patenteGuida" > Patente di Guida < /option>
                                                                                    < option value = "patenteNautica" > Patente Nautica < /option>
                                                                                    < option value = "librettoPensione" > Libretto di Pensione < /option>
                                                                                    < option value = "patentinoImpTermici" > Patentino Impianti Termici < /option>
                                                                                    < option value = "portoArmi" > Porto d'Armi < /option>
                                                                                    < option value = "tesseraRiconoscimento" > Tessera di Riconoscimento < /option>
                                                                                < /select>
            
            
            
										</div>
                                                                
                                                                
										<div className="col-md-2"> <label className="control-label">Numero Documento</label>
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Numero del documento. Es. AH1234567" data-original-title=""></i>
                                                                                </div>                  
										<div className="col-md-4">
											<input type="text" 
                                                                                                id="IDCardNumber"
												className="form-control" 
												onChange={(e)=>{ me.setIDCardNumber(e.target.value) }} 
												value = {me.state.idCardNumber}
												placeholder = "Numero del documento. Es. AH1234567"
												aria-required="true" pattern="3[0-9]{2}[0-9]{7}"
												required
											/>
										</div>
																						
									</div>	
                                                                <div className="form-group row">
                                                                            <div className="col-md-2"> <label className="control-label">Emettitore</label>
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Ente emettitore. Es. Comune di Roma" data-original-title=""></i>
                                                                                </div>
										<div className="col-md-4">
											<input type="text" 
                                                                                                id="IDCardEmitter"
												className="form-control" 
												onChange={(e)=>{ me.setIDCardEmitter(e.target.value) }} 
												value = {me.state.idCardEmitter}
												placeholder = "Ente emettitore. Es. Comune di Roma"
												aria-required="true" 
												required
											/>
										</div>
                                                                
                                                                
										<div className="col-md-2"> <label className="control-label">Data Emissione</label>
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Data emissione del documento nel formato AAAA-MM-GG" data-original-title=""></i>
                                                                                </div>                  
										<div className="col-md-4">
												
												<KendoDatePicker
												
													options = {{
														format: 'yyyy-MM-dd' 
													}}
													
													events = {{
														change: (e)=>{ me.setDateOfBirth(e.sender.element[0].value); } 
													}}
													
												>
													<input id="IDCardIssueDate"
														className="form-control"
														style={{width: '100%'}}
														value = {me.state.dateOfBirth}
														placeholder = "Data emissione nel formato AAAA-MM-GG"
														aria-required="true" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"		
														required
													/>
													
												</KendoDatePicker>												
														
                                                                                </div>
                                                                             </div>	
                                                                <div className="form-group row">
										<div className="col-md-2"> <label className="control-label">Data Scadenza</label>
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Data scadenza del documento nel formato AAAA-MM-GG" data-original-title=""></i>
                                                                                </div>                  
										<div className="col-md-4">
														
												<KendoDatePicker
												
													options = {{
														format: 'yyyy-MM-dd' 
													}}
													
													events = {{
														change: (e)=>{ me.setDateOfBirth(e.sender.element[0].value); } 
													}}
													
												>
													<input id="IDCardExpirationDate"
														className="form-control"
														style={{width: '100%'}}
														value = {me.state.dateOfBirth}
														placeholder = "Data scadenza nel formato AAAA-MM-GG"
														aria-required="true" pattern="[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"		
														required
													/>
													
												</KendoDatePicker>														

										</div>
																						
									</div>	
                                                                
									<div className="form-group row">
                                                                            <div className="col-md-12 mt-3 mb-3">
                                                                                <h6>Contatto telefonico</h6> 
                                                                            </div>
                                                                            <div className="col-md-2"> <label className="control-label">Prefisso  Internaz.</label>
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Prefisso internazionale. Es. +39" data-original-title=""></i>
                                                                                </div>                  
										<div className="col-md-4">
											<input type="text" 
                                                                                                id="MobilePrefix"
												className="form-control" 
												onChange={(e)=>{ me.setMobilePrefix(e.target.value) }} 
												value = {me.state.mobilePrefix}
												placeholder = "Prefisso internazionale. Es. +39"
												aria-required="true" pattern="\+[0-9]{2}([0-9]?)"
												required
											/>
										</div>
                                                                
                                                                
										<div className="col-md-2"> <label className="control-label">Numero di Cellulare</label>
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Numero di cellulare. Es. 3331234567" data-original-title=""></i>
                                                                                </div>                  
										<div className="col-md-4">
											<input type="text" 
                                                                                                id="MobileNumber"
												className="form-control" 
												onChange={(e)=>{ me.setMobileNumber(e.target.value) }} 
												value = {me.state.mobileNumber}
												placeholder = "Numero di cellulare. Es. 3331234567"
												aria-required="true" pattern="3[0-9]{2}[0-9]{7}"
												required
											/>
										</div>
																						
									</div>	
                                                                        <div className="form-group row">
                                                                            <div className="col-md-12 mt-3 mb-3">
                                                                                <h6>Domicilio fisico</h6> 
                                                                            </div>
                                                                                <div className="col-md-2"> <label className="control-label">Tipologia Luogo</label> 
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Tipologia luogo. Es. Via, Viale, Piazza, Largo, Vicolo" data-original-title=""></i>   
                                                                                </div>
										<div className="col-md-4">
											<input type="text"
                                                                                                id="AddressTypology"
												className="form-control" 
												onChange={(e)=>{ me.setAddressTypology(e.target.value) }} 
												value = {me.state.addressTypology}
                                                                                                placeholder = "Tipologia luogo. Es. Via, Viale, Piazza, Largo, Vicolo"
												aria-required="true"
                                                                                                list="address_place_typology_list"
												required
											/>
                                                                                           <datalist id="address_place_typology_list">
                                                                                       < option > Accesso < /option>
                < option > Allea < /option>
                < option > Alinea < /option>
                < option > Alzaia < /option>
                < option > Androna < /option>
                < option > Angiporto < /option>
                < option > Arco < /option>
                < option > Archivolto < /option>
                < option > Arena < /option>
                < option > Argine < /option>
                < option > Bacino < /option>
                < option > Baluardo < /option>
                < option > Banchi < /option>
                < option > Banchina < /option>
                < option > Barbarìa < /option>
                < option > Bastione < /option>
                < option > Bastioni < /option>
                < option > Belvedere < /option>
                < option > Borgata < /option>
                < option > Borgo < /option>
                < option > Borgoloco < /option>
                < option > Cal < /option>
                < option > Calata < /option>
                < option > Calle < /option>
                < option > Calle larga < /option>
                < option > Calle lunga < /option>
                < option > Calle stretta < /option>
                < option > Callesèlla < /option>
                < option > Callesèllo < /option>
                < option > Callétta < /option>
                < option > Campiello < /option>
                < option > Campo < /option>
                < option > Canale < /option>
                < option > Cantone < /option>
                < option > Capo di piazza < /option>
                < option > Carraia < /option>
                < option > Carrara < /option>
                < option > Carrarone < /option>
                < option > Carro < /option>
                < option > Cascina < /option>
                < option > Case sparse < /option>
                < option > Cavalcavia < /option>
                < option > Cavone < /option>
                < option > Chiasso < /option>
                < option > Chiassetto < /option>
                < option > Chiassuola < /option>
                < option > Circonvallazione < /option>
                < option > Circumvallazione < /option>
                < option > Claustro < /option>
                < option > Clivio < /option>
                < option > Clivo < /option>
                < option > Complanare < /option>
                < option > Contrà < /option>
                < option > Contrada < /option>
                < option > Corsetto < /option>
                < option > Corsia < /option>
                < option > Corso < /option>
                < option > Corte < /option>
                < option > Cortesela < /option>
                < option > Corticella < /option>
                < option > Cortile < /option>
                < option > Cortile privato < /option>
                < option > Costa < /option>
                < option > Crocicchio < /option>
                < option > Crosa < /option>
                < option > Cupa < /option>
                < option > Cupa vicinale < /option>
                < option > Diramazione < /option>
                < option > Discesa < /option>
                < option > Distacco < /option>
                < option > Emiciclo < /option>
                < option > Erta < /option>
                < option > Estramurale < /option>
                < option > Fondaco < /option>
                < option > Fondamenta < /option>
                < option > Fondo < /option>
                < option > Fossa < /option>
                < option > Fossato < /option>
                < option > Frazione < /option>
                < option > Galleria < /option>
                < option > Gradinata < /option>
                < option > Gradini < /option>
                < option > Gradoni < /option>
                < option > Granviale < /option>
                < option > Isola < /option>
                < option > Larghetto < /option>
                < option > Largo < /option>
                < option > Laterale < /option>
                < option > Lido < /option>
                < option > Lista < /option>
                < option > Litoranea < /option>
                < option > Località < /option>
                < option > Lungadige < /option>
                < option > Lungarno < /option>
                < option > Lungo < /option>
                < option > Lungoadda < /option>
                < option > Lungoargine < /option>
                < option > Lungobisagno < /option>
                < option > Lungo Brenta < /option>
                < option > Lungobusento < /option>
                < option > Lungocalore < /option>
                < option > Lungo Castellano < /option>
                < option > Lungocrati < /option>
                < option > Lungocanale < /option>
                < option > Lungocurone < /option>
                < option > Lungodora < /option>
                < option > Lungofiume < /option>
                < option > Lungofoglia < /option>
                < option > Lungofrigido < /option>
                < option > Lungogesso < /option>
                < option > Lungoisarco < /option>
                < option > Lungoisonzo < /option>
                < option > Lungolago < /option>
                < option > Lungolario < /option>
                < option > Lungolinea < /option>
                < option > Lungoliri < /option>
                < option > Lungomare < /option>
                < option > Lungomazaro < /option>
                < option > Lungomolo < /option>
                < option > Lungonera < /option>
                < option > Lungoparco < /option>
                < option > Lungo Po < /option>
                < option > Lungoporto < /option>
                < option > Lungosabato < /option>
                < option > Lungosile < /option>
                < option > Lungostura < /option>
                < option > Lungotalvera < /option>
                < option > Lungotanaro < /option>
                < option > Lungotevere < /option>
                < option > Lungoticino < /option>
                < option > Lungotorrente < /option>
                < option > Lungotronto < /option>
                < option > Lungovelino < /option>
                < option > Masseria < /option>
                < option > Merceria < /option>
                < option > Molo < /option>
                < option > Mura < /option>
                < option > Murazzi del Po < /option>
                < option > Parallela < /option>
                < option > Passaggio < /option>
                < option > Passaggio privato < /option>
                < option > Passeggiata < /option>
                < option > Passeggio < /option>
                < option > Passo < /option>
                < option > Passo di piazza < /option>
                < option > Pendice < /option>
                < option > Pendino < /option>
                < option > Pendio < /option>
                < option > Penninata < /option>
                < option > Piaggia < /option>
                < option > Piazza < /option>
                < option > Piazza inferiore < /option>
                < option > Piazza privata < /option>
                < option > Piazzale < /option>
                < option > Piazzetta < /option>
                < option > Piazzetta privata < /option>
                < option > Piscina < /option>
                < option > Ponte < /option>
                < option > Portico < /option>
                < option > Porto < /option>
                < option > Prato < /option>
                < option > Prolungamento < /option>
                < option > Quadrato < /option>
                < option > Raggio < /option>
                < option > Ramo < /option>
                < option > Rampa < /option>
                < option > Rampa privata < /option>
                < option > Rampari < /option>
                < option > Rampe < /option>
                < option > Ratto < /option>
                < option > Regione < /option>
                < option > Rettifilo < /option>
                < option > Regaste < /option>
                < option > Riello < /option>
                < option > Rione < /option>
                < option > Rio < /option>
                < option > Rio terà < /option>
                < option > Ripa < /option>
                < option > Riva < /option>
                < option > Riviera < /option>
                < option > Rondò < /option>
                < option > Rotonda < /option>
                < option > Rua < /option>
                < option > Ruga < /option>
                < option > Rugheta < /option>
                < option > Sacca < /option>
                < option > Sagrato < /option>
                < option > Saia < /option>
                < option > Salita < /option>
                < option > Salita inferiore < /option>
                < option > Salita superiore < /option>
                < option > Salizada < /option>
                < option > Scalea < /option>
                < option > Scalette < /option>
                < option > Scalinata < /option>
                < option > Scalone < /option>
                < option > Scesa < /option>
                < option > Sdrucciolo < /option>
                < option > Selciato < /option>
                < option > Sentiero < /option>
                < option > Slargo < /option>
                < option > Sopportico < /option>
                < option > Sotoportego < /option>
                < option > Sottoportico < /option>
                < option > Spalto < /option>
                < option > Spiaggia < /option>
                < option > Spianata < /option>
                < option > Spiazzo < /option>
                < option > Strada < /option>
                < option > Strada accorciatoia < /option>
                < option > Strada alzaia < /option>
                < option > Strada antica < /option>
                < option > Strada arginale < /option>
                < option > Strada bassa < /option>
                < option > Strada cantoniera < /option>
                < option > Strada carrareccia < /option>
                < option > Strada consolare < /option>
                < option > Strada consortile < /option>
                < option > Strada consorziale < /option>
                < option > Strada di bonifica < /option>
                < option > Strada esterna < /option>
                < option > Strada inferiore < /option>
                < option > Strada intercomunale < /option>
                < option > Strada interna < /option>
                < option > Strada interpoderale < /option>
                < option > Strada litoranea < /option>
                < option > Strada militare < /option>
                < option > Strada nazionale < /option>
                < option > Strada panoramica < /option>
                < option > Strada pedonale < /option>
                < option > Strada perimetrale < /option>
                < option > Strada poderale < /option>
                < option > Strada privata < /option>
                < option > Strada provinciale < /option>
                < option > Strada regionale < /option>
                < option > Strada rotabile < /option>
                < option > Strada rurale < /option>
                < option > Strada traversante < /option>
                < option > Strada vicinale < /option>
                < option > Stradale < /option>
                < option > Stradella < /option>
                < option > Stradello < /option>
                < option > Stradetta < /option>
                < option > Stradone < /option>
                < option > Stradoncello < /option>
                < option > Stretta < /option>
                < option > Stretto < /option>
                < option > Strettoia < /option>
                < option > Strettola < /option>
                < option > Svoto < /option>
                < option > Supportico < /option>
                < option > Terrazza < /option>
                < option > Tondo < /option>
                < option > Traversa < /option>
                < option > Traversa privata < /option>
                < option > Traversale < /option>
                < option > Trasversale < /option>
                < option > Tratturo < /option>
                < option > Trazzera < /option>
                < option > Tresanda < /option>
                < option > Tronco < /option>
                < option > Vanella < /option>
                < option > Vallone < /option>
                < option > Via < /option>
                < option > Via accorciatoia < /option>
                < option > Via al mare < /option>
                < option > Via alta < /option>
                < option > Via alzaia < /option>
                < option > Via antica < /option>
                < option > Via arginale < /option>
                < option > Via bassa < /option>
                < option > Via circolare < /option>
                < option > Via comunale < /option>
                < option > Via consolare < /option>
                < option > Via cupa < /option>
                < option > Via destra < /option>
                < option > Via erta < /option>
                < option > Via estramurale < /option>
                < option > Via inferiore < /option>
                < option > Via intercomunale < /option>
                < option > Via interna < /option>
                < option > Via laterale < /option>
                < option > Via lungomare < /option>
                < option > Via militare < /option>
                < option > Via nazionale < /option>
                < option > Via nuova < /option>
                < option > Via pedonale < /option>
                < option > Via privata < /option>
                < option > Via provinciale < /option>
                < option > Via regionale < /option>
                < option > Via rotabile < /option>
                < option > Via rurale < /option>
                < option > Via sinistra < /option>
                < option > Via stretta < /option>
                < option > Via superiore < /option>
                < option > Via trasversale < /option>
                < option > Via vecchia < /option>
                < option > Via vicinale < /option>
                < option > Vial < /option>
                < option > Viale < /option>
                < option > Viale lungomare < /option>
                < option > Viale privato < /option>
                < option > Vialetto < /option>
                < option > Vialone < /option>
                < option > Vicinale < /option>
                < option > Vicoletto < /option>
                < option > Vicoletto cieco < /option>
                < option > Vicolo < /option>
                < option > Vicolo chiuso < /option>
                < option > Vicolo cieco < /option>
                < option > Vico < /option>
                < option > Vico estramurale < /option>
                < option > Vico inferiore < /option>
                < option > Vico lungo < /option>
                < option > Vico nuovo < /option>
                < option > Vico privato < /option>
                < option > Vico rotto < /option>
                < option > Vico storto < /option>
                < option > Vico stretto < /option>
                < option > Vico superiore < /option>
                < option > Viella < /option>
                < option > Vietta < /option>
                < option > Villaggio < /option>
                < option > Viottolo < /option>
                < option > Viuzza < /option>
                < option > Viuzzo < /option>
                < option > Vocabolo < /option>
                < option > Volti < /option>
                < option > Voltone < /option>
                < /datalist>
										</div>
                                                                        <div className="col-md-2"> 
                                                                                    <label className="control-label">Indirizzo</label>   
                                                                                       &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Indizzo del luogo. Es. Cristoforo Colombo" data-original-title=""></i>
                                                                                    </div>
                                                                                    <div className="col-md-4">
											<input type="text" 
                                                                                                id="AddressAddress"
												className="form-control" 
												onChange={(e)=>{ me.setAddressAddress(e.target.value)  }} 
												value = {me.state.addressAddress}
												placeholder = "Indizzo del luogo. Es. Cristoforo Colombo"
												aria-required="true" 
												required
											/>
                                                                                    </div>
                                                                        </div>
                                                                <div className="form-group row">
                                                                                <div className="col-md-2"> <label className="control-label">Numero Civico</label> 
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Numero del civico. Es. 1" data-original-title=""></i>   
                                                                                </div>
										<div className="col-md-4">
											<input type="text" 
                                                                                                id="AddressStreetNumber"
												className="form-control" 
												onChange={(e)=>{ me.setAddressStreetNumber(e.target.value) }} 
												value = {me.state.addressStreetNumber}
												placeholder = "Numero del civico. Es. 1"
												aria-required="true" pattern="[1-9][0-9]*([a-z]?)"
												required
											/>
										</div>
                                                                        <div className="col-md-2"> 
                                                                                    <label className="control-label">CAP</label>   
                                                                                       &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Codice avviamento postale. Es. 00100" data-original-title=""></i>
                                                                                    </div>
                                                                                    <div className="col-md-4">
											<input type="text" 
                                                                                                 id="AddressPostalCode"
												className="form-control" 
												onChange={(e)=>{ me.setAddressPostalCode(e.target.value) }} 
												value = {me.state.addressPostalCode}
												placeholder = "Codice avviamento postale. Es. 00100"
												aria-required="true" pattern="[0-9]{5}"
												required
											/>
                                                                                    </div>
                                                                        </div>
                                                                
                                                                 <div className="form-group row">
                                                                                <div className="col-md-2"> <label className="control-label">Comune</label> 
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Nome del Comune. Es. Roma" data-original-title=""></i>   
                                                                                </div>
										<div className="col-md-4">
											<input type="text" 
                                                                                                 id="AddressPlace"
												className="form-control" 
												onChange={(e)=>{ me.setAddressPlace(e.target.value) }} 
												value = {me.state.addressPlace}
												placeholder = "Nome del Comune. Es. Roma"
												aria-required="true" 
												required
											/>
										</div>
                                                                        <div className="col-md-2"> 
                                                                                    <label className="control-label">Provincia</label>   
                                                                                       &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Sigla della Provincia. Es. RM" data-original-title=""></i>
                                                                                    </div>
                                                                                    <div className="col-md-4">
											<input type="text" 
                                                                                                id="AddressCounty"
												className="form-control" 
												onChange={(e)=>{ me.setAddressCounty(e.target.value) }} 
												value = {me.state.addressCounty}
												placeholder = "Sigla della Provincia. Es. RM"
												aria-required="true" pattern="[A-Za-z]{2}"
												
											/>
                                                                                    </div>
                                                                        </div>
                                                                        <div className="form-group row">
                                                                            <div className="col-md-12 mt-3 mb-3">
                                                                                <h6>Sede Legale</h6> 
                                                                            </div>
                                                                                <div className="col-md-2"> <label className="control-label">Tipologia Luogo</label> 
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Tipologia luogo. Es. Via, Viale, Piazza, Largo, Vicolo" data-original-title=""></i>   
                                                                                </div>
										<div className="col-md-4">
											<input type="text" 
                                                                                                id="RegisteredOfficeTypology"
												className="form-control" 
												onChange={(e)=>{ me.setRegisteredOfficeTypology(e.target.value) }} 
												value = {me.state.registeredOfficeTypology}
												placeholder = "Tipologia luogo. Es. Via, Viale, Piazza, Largo"
                                                                                                list = "registered_office_place_typology_list"
                                                                                                placeholder = "Tipologia luogo. Es. Via, Viale, Piazza, Largo, Vicolo"
												aria-required="true" 
												required
											/>
                                                                                        <datalist id="registered_office_place_typology_list">
                                                                                       < option > Accesso < /option>
                < option > Allea < /option>
                < option > Alinea < /option>
                < option > Alzaia < /option>
                < option > Androna < /option>
                < option > Angiporto < /option>
                < option > Arco < /option>
                < option > Archivolto < /option>
                < option > Arena < /option>
                < option > Argine < /option>
                < option > Bacino < /option>
                < option > Baluardo < /option>
                < option > Banchi < /option>
                < option > Banchina < /option>
                < option > Barbarìa < /option>
                < option > Bastione < /option>
                < option > Bastioni < /option>
                < option > Belvedere < /option>
                < option > Borgata < /option>
                < option > Borgo < /option>
                < option > Borgoloco < /option>
                < option > Cal < /option>
                < option > Calata < /option>
                < option > Calle < /option>
                < option > Calle larga < /option>
                < option > Calle lunga < /option>
                < option > Calle stretta < /option>
                < option > Callesèlla < /option>
                < option > Callesèllo < /option>
                < option > Callétta < /option>
                < option > Campiello < /option>
                < option > Campo < /option>
                < option > Canale < /option>
                < option > Cantone < /option>
                < option > Capo di piazza < /option>
                < option > Carraia < /option>
                < option > Carrara < /option>
                < option > Carrarone < /option>
                < option > Carro < /option>
                < option > Cascina < /option>
                < option > Case sparse < /option>
                < option > Cavalcavia < /option>
                < option > Cavone < /option>
                < option > Chiasso < /option>
                < option > Chiassetto < /option>
                < option > Chiassuola < /option>
                < option > Circonvallazione < /option>
                < option > Circumvallazione < /option>
                < option > Claustro < /option>
                < option > Clivio < /option>
                < option > Clivo < /option>
                < option > Complanare < /option>
                < option > Contrà < /option>
                < option > Contrada < /option>
                < option > Corsetto < /option>
                < option > Corsia < /option>
                < option > Corso < /option>
                < option > Corte < /option>
                < option > Cortesela < /option>
                < option > Corticella < /option>
                < option > Cortile < /option>
                < option > Cortile privato < /option>
                < option > Costa < /option>
                < option > Crocicchio < /option>
                < option > Crosa < /option>
                < option > Cupa < /option>
                < option > Cupa vicinale < /option>
                < option > Diramazione < /option>
                < option > Discesa < /option>
                < option > Distacco < /option>
                < option > Emiciclo < /option>
                < option > Erta < /option>
                < option > Estramurale < /option>
                < option > Fondaco < /option>
                < option > Fondamenta < /option>
                < option > Fondo < /option>
                < option > Fossa < /option>
                < option > Fossato < /option>
                < option > Frazione < /option>
                < option > Galleria < /option>
                < option > Gradinata < /option>
                < option > Gradini < /option>
                < option > Gradoni < /option>
                < option > Granviale < /option>
                < option > Isola < /option>
                < option > Larghetto < /option>
                < option > Largo < /option>
                < option > Laterale < /option>
                < option > Lido < /option>
                < option > Lista < /option>
                < option > Litoranea < /option>
                < option > Località < /option>
                < option > Lungadige < /option>
                < option > Lungarno < /option>
                < option > Lungo < /option>
                < option > Lungoadda < /option>
                < option > Lungoargine < /option>
                < option > Lungobisagno < /option>
                < option > Lungo Brenta < /option>
                < option > Lungobusento < /option>
                < option > Lungocalore < /option>
                < option > Lungo Castellano < /option>
                < option > Lungocrati < /option>
                < option > Lungocanale < /option>
                < option > Lungocurone < /option>
                < option > Lungodora < /option>
                < option > Lungofiume < /option>
                < option > Lungofoglia < /option>
                < option > Lungofrigido < /option>
                < option > Lungogesso < /option>
                < option > Lungoisarco < /option>
                < option > Lungoisonzo < /option>
                < option > Lungolago < /option>
                < option > Lungolario < /option>
                < option > Lungolinea < /option>
                < option > Lungoliri < /option>
                < option > Lungomare < /option>
                < option > Lungomazaro < /option>
                < option > Lungomolo < /option>
                < option > Lungonera < /option>
                < option > Lungoparco < /option>
                < option > Lungo Po < /option>
                < option > Lungoporto < /option>
                < option > Lungosabato < /option>
                < option > Lungosile < /option>
                < option > Lungostura < /option>
                < option > Lungotalvera < /option>
                < option > Lungotanaro < /option>
                < option > Lungotevere < /option>
                < option > Lungoticino < /option>
                < option > Lungotorrente < /option>
                < option > Lungotronto < /option>
                < option > Lungovelino < /option>
                < option > Masseria < /option>
                < option > Merceria < /option>
                < option > Molo < /option>
                < option > Mura < /option>
                < option > Murazzi del Po < /option>
                < option > Parallela < /option>
                < option > Passaggio < /option>
                < option > Passaggio privato < /option>
                < option > Passeggiata < /option>
                < option > Passeggio < /option>
                < option > Passo < /option>
                < option > Passo di piazza < /option>
                < option > Pendice < /option>
                < option > Pendino < /option>
                < option > Pendio < /option>
                < option > Penninata < /option>
                < option > Piaggia < /option>
                < option > Piazza < /option>
                < option > Piazza inferiore < /option>
                < option > Piazza privata < /option>
                < option > Piazzale < /option>
                < option > Piazzetta < /option>
                < option > Piazzetta privata < /option>
                < option > Piscina < /option>
                < option > Ponte < /option>
                < option > Portico < /option>
                < option > Porto < /option>
                < option > Prato < /option>
                < option > Prolungamento < /option>
                < option > Quadrato < /option>
                < option > Raggio < /option>
                < option > Ramo < /option>
                < option > Rampa < /option>
                < option > Rampa privata < /option>
                < option > Rampari < /option>
                < option > Rampe < /option>
                < option > Ratto < /option>
                < option > Regione < /option>
                < option > Rettifilo < /option>
                < option > Regaste < /option>
                < option > Riello < /option>
                < option > Rione < /option>
                < option > Rio < /option>
                < option > Rio terà < /option>
                < option > Ripa < /option>
                < option > Riva < /option>
                < option > Riviera < /option>
                < option > Rondò < /option>
                < option > Rotonda < /option>
                < option > Rua < /option>
                < option > Ruga < /option>
                < option > Rugheta < /option>
                < option > Sacca < /option>
                < option > Sagrato < /option>
                < option > Saia < /option>
                < option > Salita < /option>
                < option > Salita inferiore < /option>
                < option > Salita superiore < /option>
                < option > Salizada < /option>
                < option > Scalea < /option>
                < option > Scalette < /option>
                < option > Scalinata < /option>
                < option > Scalone < /option>
                < option > Scesa < /option>
                < option > Sdrucciolo < /option>
                < option > Selciato < /option>
                < option > Sentiero < /option>
                < option > Slargo < /option>
                < option > Sopportico < /option>
                < option > Sotoportego < /option>
                < option > Sottoportico < /option>
                < option > Spalto < /option>
                < option > Spiaggia < /option>
                < option > Spianata < /option>
                < option > Spiazzo < /option>
                < option > Strada < /option>
                < option > Strada accorciatoia < /option>
                < option > Strada alzaia < /option>
                < option > Strada antica < /option>
                < option > Strada arginale < /option>
                < option > Strada bassa < /option>
                < option > Strada cantoniera < /option>
                < option > Strada carrareccia < /option>
                < option > Strada consolare < /option>
                < option > Strada consortile < /option>
                < option > Strada consorziale < /option>
                < option > Strada di bonifica < /option>
                < option > Strada esterna < /option>
                < option > Strada inferiore < /option>
                < option > Strada intercomunale < /option>
                < option > Strada interna < /option>
                < option > Strada interpoderale < /option>
                < option > Strada litoranea < /option>
                < option > Strada militare < /option>
                < option > Strada nazionale < /option>
                < option > Strada panoramica < /option>
                < option > Strada pedonale < /option>
                < option > Strada perimetrale < /option>
                < option > Strada poderale < /option>
                < option > Strada privata < /option>
                < option > Strada provinciale < /option>
                < option > Strada regionale < /option>
                < option > Strada rotabile < /option>
                < option > Strada rurale < /option>
                < option > Strada traversante < /option>
                < option > Strada vicinale < /option>
                < option > Stradale < /option>
                < option > Stradella < /option>
                < option > Stradello < /option>
                < option > Stradetta < /option>
                < option > Stradone < /option>
                < option > Stradoncello < /option>
                < option > Stretta < /option>
                < option > Stretto < /option>
                < option > Strettoia < /option>
                < option > Strettola < /option>
                < option > Svoto < /option>
                < option > Supportico < /option>
                < option > Terrazza < /option>
                < option > Tondo < /option>
                < option > Traversa < /option>
                < option > Traversa privata < /option>
                < option > Traversale < /option>
                < option > Trasversale < /option>
                < option > Tratturo < /option>
                < option > Trazzera < /option>
                < option > Tresanda < /option>
                < option > Tronco < /option>
                < option > Vanella < /option>
                < option > Vallone < /option>
                < option > Via < /option>
                < option > Via accorciatoia < /option>
                < option > Via al mare < /option>
                < option > Via alta < /option>
                < option > Via alzaia < /option>
                < option > Via antica < /option>
                < option > Via arginale < /option>
                < option > Via bassa < /option>
                < option > Via circolare < /option>
                < option > Via comunale < /option>
                < option > Via consolare < /option>
                < option > Via cupa < /option>
                < option > Via destra < /option>
                < option > Via erta < /option>
                < option > Via estramurale < /option>
                < option > Via inferiore < /option>
                < option > Via intercomunale < /option>
                < option > Via interna < /option>
                < option > Via laterale < /option>
                < option > Via lungomare < /option>
                < option > Via militare < /option>
                < option > Via nazionale < /option>
                < option > Via nuova < /option>
                < option > Via pedonale < /option>
                < option > Via privata < /option>
                < option > Via provinciale < /option>
                < option > Via regionale < /option>
                < option > Via rotabile < /option>
                < option > Via rurale < /option>
                < option > Via sinistra < /option>
                < option > Via stretta < /option>
                < option > Via superiore < /option>
                < option > Via trasversale < /option>
                < option > Via vecchia < /option>
                < option > Via vicinale < /option>
                < option > Vial < /option>
                < option > Viale < /option>
                < option > Viale lungomare < /option>
                < option > Viale privato < /option>
                < option > Vialetto < /option>
                < option > Vialone < /option>
                < option > Vicinale < /option>
                < option > Vicoletto < /option>
                < option > Vicoletto cieco < /option>
                < option > Vicolo < /option>
                < option > Vicolo chiuso < /option>
                < option > Vicolo cieco < /option>
                < option > Vico < /option>
                < option > Vico estramurale < /option>
                < option > Vico inferiore < /option>
                < option > Vico lungo < /option>
                < option > Vico nuovo < /option>
                < option > Vico privato < /option>
                < option > Vico rotto < /option>
                < option > Vico storto < /option>
                < option > Vico stretto < /option>
                < option > Vico superiore < /option>
                < option > Viella < /option>
                < option > Vietta < /option>
                < option > Villaggio < /option>
                < option > Viottolo < /option>
                < option > Viuzza < /option>
                < option > Viuzzo < /option>
                < option > Vocabolo < /option>
                < option > Volti < /option>
                < option > Voltone < /option>
                < /datalist>
										</div>
                                                                        <div className="col-md-2"> 
                                                                                    <label className="control-label">Indirizzo</label>   
                                                                                       &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Indizzo del luogo. Es. Cristoforo Colombo" data-original-title=""></i>
                                                                                    </div>
                                                                                    <div className="col-md-4">
											<input type="text" 
                                                                                                id="RegisteredOfficeAddress"
												className="form-control" 
												onChange={(e)=>{ me.setRegisteredOfficeAddress(e.target.value) }} 
												value = {me.state.registeredOfficeAddress}
												placeholder = "Indizzo del luogo. Es. Cristoforo Colombo"
												aria-required="true" 
												required
											/>
                                                                                    </div>
                                                                        </div>
                                                                <div className="form-group row">
                                                                                <div className="col-md-2"> <label className="control-label">Numero Civico</label> 
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Numero del civico. Es. 1" data-original-title=""></i>   
                                                                                </div>
										<div className="col-md-4">
											<input type="text" 
                                                                                                id="RegisteredOfficeStreetNumber"
												className="form-control" 
												onChange={(e)=>{ me.setRegisteredOfficeStreetNumber(e.target.value) }} 
												value = {me.state.registeredOfficeStreetNumber}
												placeholder = "Numero del civico. Es. 1"
												aria-required="true" pattern="[1-9][0-9]*([a-z]?)"
												required
											/>
										</div>
                                                                        <div className="col-md-2"> 
                                                                                    <label className="control-label">CAP</label>   
                                                                                       &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Codice avviamento postale. Es. 00100" data-original-title=""></i>
                                                                                    </div>
                                                                                    <div className="col-md-4">
											<input type="text" 
                                                                                                id="RegisteredOfficePostalCode"
												className="form-control" 
												onChange={(e)=>{ me.setRegisteredOfficePostalCode(e.target.value) }} 
												value = {me.state.registeredOfficePostalCode}
												placeholder = "Codice avviamento postale. Es. 00100"
												aria-required="true" pattern="[0-9]{5}"
												required
											/>
                                                                                    </div>
                                                                        </div>
                                                                
                                                                 <div className="form-group row">
                                                                                <div className="col-md-2"> <label className="control-label">Comune</label> 
                                                                                &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Nome del Comune. Es. Roma" data-original-title=""></i>   
                                                                                </div>
										<div className="col-md-4">
											<input type="text" 
                                                                                                id="RegisteredOfficePlace"
												className="form-control" 
												onChange={(e)=>{ me.setRegisteredOfficePlace(e.target.value) }} 
												value = {me.state.registeredOfficePlace}
												placeholder = "Nome del Comune. Es. Roma"
												aria-required="true" 
												required
											/>
										</div>
                                                                        <div className="col-md-2"> 
                                                                                    <label className="control-label">Provincia</label>   
                                                                                       &nbsp;<i className="fa fa-info-circle " data-toggle="tooltip" data-placement="top" aria-hidden="true" title="Sigla della Provincia. Es. RM" data-original-title=""></i>
                                                                                    </div>
                                                                                    <div className="col-md-4">
											<input type="text" 
                                                                                                id="RegisteredOfficeCounty"
												className="form-control" 
												onChange={(e)=>{ me.setRegisteredOfficeCounty(e.target.value) }} 
												value = {me.state.registeredOfficeCounty}
												placeholder = "Sigla della Provincia. Es. RM"
												aria-required="true" pattern="[A-Za-z]{2}"
												required
											/>
                                                                                    </div>
                                                                        </div>
								</form>
							</div>								
						</div>
											
						<div className="card-footer">   
							<div className="panel-elements pull-right">
								<button id="SaveUserButton" className="btn btn-success pull-right"
									onClick={()=>{ me.save() }}>
										<span className="fa fa-save"></span>  Salva 
								</button>
							</div>     
						</div>	
									
					</div>
				</div>
			</div>
												
		</div>
    );
}

export default view;
