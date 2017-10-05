import React from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import './style.css';

function view(me) { 
    return(

		<div className="container container-boxed">
	
			<div className="card"> 
				<div className="card-header">
					<span className="card-title">
						<p>In questa sezione sono elencati gli utenti di test predefiniti.</p>
						{!me.state.testUsersLoaded ? (
							<p>Per caricare gli utenti di test fare click cul pulsante <b>"Carica utenti di test"</b></p>		
						) : ''}
					</span>
					{!me.state.testUsersLoaded ? (
						<div className="panel-elements">
							<button id="SaveUserButton" className="btn btn-success pull-right"
								onClick={()=>{ me.saveTestUsers() }}>
									<span className="fa fa-save"></span>  Carica utenti di test 
							</button>
						</div>			
					) : ''}
				</div>				
			</div>

		{me.state.testUsersLoaded ? (
			<div className="row">
				<div className="col-md-12">    
					<div className="card"> 
						<div className="panel panel-default" id="service_0">
							<div className="card-header">
								<span className="card-title"><span className="fa fa-user-o fa-fw"></span> Utenti pubblici</span>
							</div>
							<div className="card-block">  
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Username</th>
											<th>Password</th>
											<th>Cognome</th>
											<th>Nome</th>
											<th>Codice Fiscale</th>
											<th>Sesso</th>
											<th>Data di Nascita</th>
											<th>Luogo di Nascita</th>
										</tr>
									</thead>
									<tbody>
										{me.state.users.map((item, index)=>(
											<tr>
												<td>{item.userName}</td>	
												<td>password123</td>	
												<td>{item.familyName}</td>
												<td>{item.name}</td>
												<td>{item.fiscalNumber}</td>
												<td>{item.gender}</td>
												<td>{item.dateOfBirth}</td>
												<td>{item.placeOfBirth}</td>     
											</tr>                      
										))}                    
									</tbody>
								</table>					
							</div>
						</div>	
					</div>
				</div>
			</div>
		) : ''}										
		
		</div>
    );
}

export default view;
