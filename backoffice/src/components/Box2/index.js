import { Component } from 'react';
import view from "./view.js";
import Utility from "../../util/Utility";
import Services from "../../services/Services"
import ReduxStore from "../../redux/Store";
import Actions_Util from "../../redux/Util/Actions";


class Box2 extends Component {

	store 		= ReduxStore.getStore();
	utilStore 	= ReduxStore.getUtil();
	service 		= Services.getMainService();
    
	render() { 
		return view(this); 
	}

	validate() {
		
		let data = this.store.getState();
		this.utilStore.dispatch(Actions_Util.setBlockUI(true));
		this.service.sendData(
			data,
			(response)=> {
				this.utilStore.dispatch(Actions_Util.setBlockUI(false));
				
				/*
				Utility.showModal({
					title: "Validazione Metadata",
					subtitle: "Metadata salvato con successo",
					//text: "response",
					isOpen: true
				});        
				*/
				
				window.location = "https://localhost:8080/#/services";

				Utility.log("Metadata send", "Response", response);
			},
			(error)=> {
				this.utilStore.dispatch(Actions_Util.setBlockUI(false));
				Utility.showModal({
					title: "Validazione Metadata",
					subtitle: "Si sono verificati errori durante il salvataggio del metadata",
					text: error,
					isOpen: true
				}); 

				Utility.log("Metadata send", "Error", error);
			} 
		);
	}

}

export default Box2;
