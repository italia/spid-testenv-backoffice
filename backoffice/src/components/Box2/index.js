import { Component } from 'react';
import view from "./view.js";
import Utility from "../../util/Utility";
import Services from "../../services/Services"
import ReduxStore from "../../redux/Store";
import Actions_Util from "../../redux/Util/Actions";
import Actions_Validation from "../../redux/Validation/Actions";


class Box2 extends Component {

	store 			= ReduxStore.getStore();
	utilStore 		= ReduxStore.getUtil();
	validationStore = ReduxStore.getValidation();
	service 		= Services.getMainService();
    
	render() { 
		return view(this); 
	}

	save() {

		let data = this.store.getState();
		this.utilStore.dispatch(Actions_Util.setBlockUI(true));
		
		if(this.validate(data)) {
			this.service.sendData(
				data,
				(response)=> {
					this.utilStore.dispatch(Actions_Util.setBlockUI(false));
					
					Utility.showModal({
						title: "Validazione Metadata",
						subtitle: "Metadata salvato con successo",
						text: "Cliccando Ok sarà automaticamente scaricato il metadata salvato. Per modificare il metadata salvarlo nuovamente inserendo lo stesso Entity ID",
						isOpen: true,
						callbackOk: ()=> {
							this.export();
							window.location = "/#/services";
						},
						okLabel: "OK"
					});        
	
					Utility.log("Metadata send", "Response", response);
				},
				(error)=> {
					this.utilStore.dispatch(Actions_Util.setBlockUI(false));
					Utility.showModal({
						title: "Validazione Metadata",
						subtitle: "Si sono verificati errori durante il salvataggio del metadata",
						text: error,
						isOpen: true,
					}); 
	
					Utility.log("Metadata send", "Error", error);
				} 
			);

		} else {			
			Utility.showModal({
				title: "Errore compilazione form",
				subtitle: "",
				text: "Uno o più campi del form non sono stati compilati correttamente. ",
				isOpen: true
			});	
			
			this.utilStore.dispatch(Actions_Util.setBlockUI(false));				
		}
	}

	export() {

		let data = this.store.getState();
		this.utilStore.dispatch(Actions_Util.setBlockUI(true));

		if(this.validate(data)) {
            var blob = Utility.json2metadata(data);
            var textFile = new Blob([blob], {type: 'text/plain'});
            let filename = this.generateName();
            this.invokeSaveAsDialog(textFile, filename);

		} else {			
			Utility.showModal({
				title: "Errore compilazione form",
				subtitle: "",
				text: "Uno o più campi del form non sono stati compilati correttamente. ",
				isOpen: true
			});					
		}		

		this.utilStore.dispatch(Actions_Util.setBlockUI(false));		
	}	

	validate(data) {

		// reset
		this.validationStore.dispatch(Actions_Validation.setInfoValid(true));
		this.validationStore.dispatch(Actions_Validation.setLogoutValid(true));
		this.validationStore.dispatch(Actions_Validation.setAssertionValid(true));
		this.validationStore.dispatch(Actions_Validation.setAttributeValid(true));

		let valid = true;	

        let formList = document.getElementsByTagName("form");
        for(let i = 0; i<formList.length; i++) {
            let formid = formList[i].id;
			let formvalidity =  formList[i].checkValidity();

            if (!formvalidity) {
                switch(formList[i].name) {
					case "form-info": 
						this.validationStore.dispatch(Actions_Validation.setInfoValid(false)); 
						valid = false;		
						break;
					case "form-logout": 
						this.validationStore.dispatch(Actions_Validation.setLogoutValid(false)); 
						valid = false;		
						break;
					case "form-assertion": 
						this.validationStore.dispatch(Actions_Validation.setAssertionValid(false)); 
						valid = false;		
						break;
					case "form-attribute": 
						this.validationStore.dispatch(Actions_Validation.setAttributeValid(false)); 
						valid = false;		
						break;
					case "form-organization": 
						//this.validationStore.dispatch(Actions_Validation.setOrganizationValid(false)); 
						//valid = false;		
						break;					
				}
            }
		}		
		
		if(data.AttributeConsumingServices[0].RequestedAttribute.length==0) { 
			this.validationStore.dispatch(Actions_Validation.setAttributeValid(false)); 
			valid = false;
		}	
		
		
		return valid;
	}












	invokeSaveAsDialog(file, fileName) {
		if (!file) {
			throw 'Blob object is required.';
		}
	
		if (!file.type) {
			try {
				file.type = 'video/webm';
			} catch (e) {
			}
		}
	
		var fileExtension = (file.type || 'video/webm').split('/')[1];
	
		if (fileName && fileName.indexOf('.') !== -1) {
			var splitted = fileName.split('.');
			fileName = splitted[0];
			fileExtension = splitted[1];
		}
	
		var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;
	
		if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
			return navigator.msSaveOrOpenBlob(file, fileFullName);
		} else if (typeof navigator.msSaveBlob !== 'undefined') {
			return navigator.msSaveBlob(file, fileFullName);
		}
	
		var hyperlink = document.createElement('a');
		hyperlink.href = URL.createObjectURL(file);
		hyperlink.download = fileFullName;
	
		hyperlink.style = 'display:none;opacity:0;color:transparent;';
		(document.body || document.documentElement).appendChild(hyperlink);
	
		if (typeof hyperlink.click === 'function') {
			hyperlink.click();
		} else {
			hyperlink.target = '_blank';
			hyperlink.dispatchEvent(new MouseEvent('click', {
				view: window,
				bubbles: true,
				cancelable: true
			}));
		}
		(window.URL || window.webkitURL).revokeObjectURL(hyperlink.href);
	}	


	generateTimeStamp(dateIn) {
		var yyyy = dateIn.getFullYear();
		var mm = dateIn.getMonth() + 1; // getMonth() is zero-based
		var dd = dateIn.getDate();
		var hh = dateIn.getHours();
		var mmnn = dateIn.getMinutes();
		var ss = dateIn.getSeconds();
		return String(10000 * yyyy + 100 * mm + dd) + String(10000 * hh + mmnn * 100 + ss); // Leading zeros for mm and dd
	}
	
	generateName() {
		let suffix = ".xml";
		let filename = "Metadata";

		let data = this.store.getState();
		var displayname = data.Organization.Name;

		if (typeof displayname !== undefined) {
			displayname = "-" + displayname.replace(/[\\/:*?\"<>|/\s]/g, "");
			filename += displayname.toLowerCase();
		}
		filename += "-" + this.generateTimeStamp(new Date());
		return filename + suffix;
	}	

}

export default Box2;
