import React from "react";
import { Component } from 'react';
import view from "./view.js";
import Services from "../../services/Services";



class Menu extends Component {

	state = {
		online: false
	}
	
	render() {
		return view(this);
	}
	
	componentDidMount() { 	
		this.ping();
	}  	
  
	renderStatusLed() {
		if(this.state.online) {
			return(<div className="badge badge-pill badge-success">IDP ATTIVO</div>);
		} else {
			return(<div className="badge badge-pill badge-danger">IDP NON ATTIVO</div>); 
		}
	}
	
	ping() {
		console.log("Start ping service");
		let service = Services.getMainService();
		
		setInterval( () => { 
			service.ping(
				(response)=> { 
					if(Array.isArray(response) && response.length==0) {
						this.setState({online: true});
					} else {
						this.setState({online: false});
					}
				},
				(error)=> { 
					this.setState({online: false});
				}
			);			
		}, 3000);
	}

}

export default Menu;
