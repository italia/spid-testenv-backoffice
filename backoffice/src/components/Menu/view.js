import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function view(me) {
    return (
		<div>	
			<div className="app-navigation-horizontal margin-bottom-15 "> 
                         <div className="pull-right mt-3 mr-3">
						{ me.renderStatusLed() }
					</div>
				<div className="container container-boxed">
                                
					<nav className="navbar navbar-expand-lg navbar-light">
						<ul className="nav">
	
							<li className="nav-item">
								<Link id="MetadataMenu"  to="/"
									className="dropdown-toggle" 
									data-toggle="dropdown"  role="button" 
									aria-haspopup="true" aria-expanded="false" >
										<span className="fa fa-refresh fa-lg"></span>&nbsp;&nbsp;&nbsp;Service Provider
								</Link>
	
								<div className="dropdown-menu noborder" aria-labelledby="MetadataMenu">
									<div className="dropdown-item" >
										&nbsp;&nbsp;&nbsp;<Link to="/" className="dropdown-item-element">Creazione Metadata</Link>                                    
										&nbsp;&nbsp;&nbsp;<Link to="/services" className="dropdown-item-element">Servizi registrati</Link>                                    
									</div>
								</div>
							</li>

							<li className="nav-item">
								<Link id="IdentityProviderMenu" to="/infoidp" 
									role="button" 
									aria-haspopup="false" aria-expanded="false">
										<span className="fa fa-server fa-lg"></span>&nbsp;&nbsp;&nbsp;Identity Provider 
								</Link>
							</li>      

							<li className="nav-item">
								<Link id="UserMenuPublic" to="/publicusers" 
									role="button" 
									aria-haspopup="true" aria-expanded="false">
										<span className="fa fa-user-o fa-lg"></span>&nbsp;&nbsp;&nbsp;Utenti pubblici
								</Link>
							</li>      
							
						</ul>
						
					</nav>
							
				</div>	
                       
				<nav className="navbar navbar-white ">
<span> &nbsp;</span>
				</nav>
			</div>
						
						
			<div className="navbar">
			</div>
		</div>
    );
}

export default view;
