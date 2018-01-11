import React from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import './style.css';

function view(me) { 
    return(

		<div className="container container-boxed">
	
			<div className="row">
				<div className="col-md-12">    
					<div className="card"> 
						<div className="panel panel-default" id="service_0">
							<div className="card-header">
								<span className="card-title"><span className="fa fa-refresh fa-fw"></span> Lista Service Provider</span>
							</div>
							<div className="card-block">  
								<table className="table table-striped">
									<thead>
										<tr>
											<th>Issuer</th>
											<th>Description</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{me.state.services.map((item, index)=>(
											<tr>
												<td>{item.issuer}</td>
												<td>{item.description}</td>
												<td>
													<button className="btn btn-success pull-right" onClick={()=>{ me.delete(item.applicationName) }}>
														<span className="fa fa-trash"></span>  cancella 
													</button>
													<button className="btn btn-success pull-right" onClick={()=>{ me.manageUsers(item.applicationName) }}>
														<span className="fa fa-user"></span>  utenti 
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
										
		</div>
    );
}

export default view;
