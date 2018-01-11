import { Component } from 'react';
import view from "./view.js";
import Utility from "../../util/Utility";
import Services from "../../services/Services";
import ReduxStore from "../../redux/Store";
import Actions_Util from "../../redux/Util/Actions";


class ContentUsers extends Component {

	utilStore = ReduxStore.getUtil();
	state = {
		users: [], 
		applicationName: "",
		username: "",
		password:"",
		expirationDate: "",
		name: "",
		familyName: "",
		gender: "N",			// default value
		dateOfBirth: "",
		countyOfBirth: "",
		placeOfBirth: "",
		digitalAddress: "",
		email: "",
		ivaCode: "",
		fiscalNumber: "",
		companyName: "",
		
		idCard: "",
		idCardTypology: "cartaIdentita",		//default value
		idCardNumber: "",
		idCardEmitter: "",
		idCardIssueDate: "",
		idCardExpirationDate: "",
		
		mobile: "",
		mobilePrefix: "",
		mobileNumber: "",
		
		address: "",
		addressTypology: "",
		addressAddress: "",
		addressStreetNumber: "",
		addressPostalCode: "",
		addressPlace: "",
		addressCounty: "",
		
		registeredOffice: "",
		registeredOfficeTypology: "",
		registeredOfficeAddress: "",
		registeredOfficeStreetNumber: "",
		registeredOfficePostalCode: "",
		registeredOfficePlace: "",
		registeredOfficeCounty: "",
	};

	constructor(props) {
		super(props);
		this.unsubscribe = this.utilStore.subscribe(()=>this.onUtilStoreUpdate());
	}	
	
	onUtilStoreUpdate() {
		let utilState = this.utilStore.getState(); 
		if(this.state.applicationName!=utilState.applicationName) {
			this.setState({
				applicationName: utilState.applicationName
			}, ()=>{
				this.loadUsers(utilState.applicationName)
			});
		}
	}	
	
	render() {    
		return view(this);
	}
	
	// reload theme rendering functions
	componentDidMount() { 	
		this.loadUsers(this.state.applicationName);
		Utility.applyTheme();
	}  		

	loadUsers(applicationName) { 
		let service = Services.getMainService();
		this.utilStore.dispatch(Actions_Util.setBlockUI(true));

		service.getUsers(
			applicationName,
			(response)=> {
				this.utilStore.dispatch(Actions_Util.setBlockUI(false));
				this.setState({
					users: response,
				}, ()=>{
					// state updated
				});
			},
			(error)=> { 
				this.utilStore.dispatch(Actions_Util.setBlockUI(false));
				this.setState({
					users: [],
				}, ()=>{
					// state updated
				});
				Utility.log("ContentUsers getUsers", "Error", error);
			}
		);  
	}  
	
	

	setUsername(value) { this.setState({ username: value}) }
	setPassword(value) { this.setState({ password: value}) }
	setExpirationDate(value) { this.setState({ expirationDate: value}) }
	setName(value) { this.setState({ name: value}) }
	setFamilyName(value) { this.setState({ familyName: value}) }
	setGender(value) { this.setState({ gender: value}) }
	setDateOfBirth(value) { this.setState({ dateOfBirth: value}) }
	setCountyOfBirth(value) { this.setState({ countyOfBirth: value}) }
	setPlaceOfBirth(value) { this.setState({ placeOfBirth: value}) }
	setDigitalAddress(value) { this.setState({ digitalAddress: value}) }
	setEmail(value) { this.setState({ email: value}) }
	setIvaCode(value) { this.setState({ ivaCode: value}) }
	setFiscalNumber(value) { this.setState({ fiscalNumber: value}) }
	setCompanyName(value) { this.setState({ companyName: value}) }
	setIDCardTypology(value) { this.setState({ idCardTypology: value}) }
	setIDCardNumber(value) { this.setState({ idCardNumber: value}) }
	setIDCardEmitter(value) { this.setState({ idCardEmitter: value}) }
	setIDCardIssueDate(value) { this.setState({ idCardIssueDate: value}) }
	setIDCardExpirationDate(value) { this.setState({ idCardExpirationDate: value}) }
	setMobilePrefix(value) { this.setState({ mobilePrefix: value}) }
	setMobileNumber(value) { this.setState({ mobileNumber: value}) }
	setAddressTypology(value) { this.setState({ addressTypology: value}) }
	setAddressAddress(value) { this.setState({ addressAddress: value}) }
	setAddressStreetNumber(value) { this.setState({ addressStreetNumber: value}) }
	setAddressPostalCode(value) { this.setState({ addressPostalCode: value}) }
	setAddressPlace(value) { this.setState({ addressPlace: value}) }
	setAddressCounty(value) { this.setState({ addressCounty: value}) }
	setRegisteredOfficeTypology(value) { this.setState({ registeredOfficeTypology: value}) }
	setRegisteredOfficeAddress(value) { this.setState({ registeredOfficeAddress: value}) }
	setRegisteredOfficeStreetNumber(value) { this.setState({ registeredOfficeStreetNumber: value}) }
	setRegisteredOfficePostalCode(value) { this.setState({ registeredOfficePostalCode: value}) }
	setRegisteredOfficePlace(value) { this.setState({ registeredOfficePlace: value}) }
	setRegisteredOfficeCounty(value) { this.setState({ registeredOfficeCounty: value}) }
	
	
	clear() {
		this.setState({
			username: "",
			password: "",
			expirationDate: "",
			name: "",
			familyName: "",
			gender: "",
			dateOfBirth: "",
			countyOfBirth: "",
			placeOfBirth: "",
			digitalAddress: "",
			email: "",
			ivaCode: "",
			fiscalNumber: "",
			companyName: "",
			
			idCard: "",
			idCardTypology: "",
			idCardNumber: "",
			idCardEmitter: "",
			idCardIssueDate: "",
			idCardExpirationDate: "",
			
			mobile: "",
			mobilePrefix: "",
			mobileNumber: "",
			
			address: "",
			addressTypology: "",
			addressAddress: "",
			addressStreetNumber: "",
			addressPostalCode: "",
			addressPlace: "",
			addressCounty: "",
			
			registeredOffice: "",
			registeredOfficeTypology: "",
			registeredOfficeAddress: "",
			registeredOfficeStreetNumber: "",
			registeredOfficePostalCode: "",
			registeredOfficePlace: "",
			registeredOfficeCounty: "",
		});
	}
	
	save() {
		let service = Services.getMainService();
		this.utilStore.dispatch(Actions_Util.setBlockUI(true));
		
		service.saveUser({
				userName: this.state.username,
				lastName: this.state.familyName,
				credential: this.state.password,
				roleList: "Application/" + this.state.applicationName,
				claims: {
					expirationDate: this.state.expirationDate,
					name: this.state.name,
					familyName: this.state.familyName,
					gender: this.state.gender,
					dateOfBirth: this.state.dateOfBirth,
					countyOfBirth: this.state.countyOfBirth,
					placeOfBirth: this.state.placeOfBirth,
					digitalAddress: this.state.digitalAddress,
					email: this.state.email,
					ivaCode: this.state.ivaCode,
					fiscalNumber: this.state.fiscalNumber,
					companyName: this.state.companyName,	
					idCard: this.makeIdCard(),
					mobilePhone: this.makeMobilePhone(),
					address: this.makeAddress(),
					registeredOffice: this.makeRegisteredOffice(),
				}
			},
			(response)=> {
				this.utilStore.dispatch(Actions_Util.setBlockUI(false));
				this.clear();
				this.loadUsers(this.state.applicationName);
			},
			(error)=> { 
				this.utilStore.dispatch(Actions_Util.setBlockUI(false));
				//this.clear();
				this.loadUsers(this.state.applicationName);
				Utility.showModal({
					title: "Salvataggio utente",
					subtitle: "Si sono verificati errori durante il salvataggio dell'utente",
					text: error,
					isOpen: true
				}); 
			}
		); 
		
	}
	
	deleteUser(userName) {
		let service = Services.getMainService();
		
		Utility.showModal({
			title: "Cancellazione utente",
			subtitle: "",
			text: "Sicuro di voler cancellare l'utente: " + userName + " ?",
			isOpen: true,
			callbackOk: ()=> {

				service.deleteUser({
						userName: userName,
					},
					(response)=> {
						this.utilStore.dispatch(Actions_Util.setBlockUI(false));
						this.loadUsers(this.state.applicationName);
					},
					(error)=> { 
						this.utilStore.dispatch(Actions_Util.setBlockUI(false));
						this.loadUsers(this.state.applicationName);
						Utility.showModal({
							title: "Salvataggio utente",
							subtitle: "Si sono verificati errori durante la cancellazione dell'utente",
							text: error,
							isOpen: true
						}); 
					}
				);				

			},
			okLabel: "Cancella"
		}); 
	}
	
	
	makeIdCard() {
		var idCardField = [];
		if(this.state.idCardTypology!="") idCardField.push(this.state.idCardTypology);
		if(this.state.idCardNumber!="") idCardField.push(this.state.idCardNumber);
		if(this.state.idCardEmitter!="") idCardField.push(this.state.idCardEmitter);
		if(this.state.idCardIssueDate!="") idCardField.push(this.state.idCardIssueDate);
		if(this.state.idCardExpirationDate!="") idCardField.push(this.state.idCardExpirationDate);
		
		return idCardField.join(" ");
	}
	
	makeMobilePhone() {
		var mobilePhoneField = [];
		if(this.state.mobilePrefix!="") mobilePhoneField.push(this.state.mobilePrefix);
		if(this.state.mobileNumber!="") mobilePhoneField.push(this.state.mobileNumber);
		
		return mobilePhoneField.join(" ");		
	}
	
	makeAddress() {
		var addressField = [];
		if(this.state.addressTypology!="") addressField.push(this.state.addressTypology);
		if(this.state.addressAddress!="") addressField.push(this.state.addressAddress);
		if(this.state.addressStreetNumber!="") addressField.push(this.state.addressStreetNumber);
		if(this.state.addressPostalCode!="") addressField.push(this.state.addressPostalCode);
		if(this.state.addressPlace!="") addressField.push(this.state.addressPlace);
		if(this.state.addressCounty!="") addressField.push(this.state.addressCounty);
		
		return addressField.join(" ");		
	}
	
	makeRegisteredOffice() {
		var registeredOfficeField = [];
		if(this.state.registeredOfficeTypology!="") registeredOfficeField.push(this.state.registeredOfficeTypology);
		if(this.state.registeredOfficeAddress!="") registeredOfficeField.push(this.state.registeredOfficeAddress);
		if(this.state.registeredOfficeStreetNumber!="") registeredOfficeField.push(this.state.registeredOfficeStreetNumber);
		if(this.state.registeredOfficePostalCode!="") registeredOfficeField.push(this.state.registeredOfficePostalCode);
		if(this.state.registeredOfficePlace!="") registeredOfficeField.push(this.state.registeredOfficePlace);
		if(this.state.registeredOfficeCounty!="") registeredOfficeField.push(this.state.registeredOfficeCounty);
		
		return registeredOfficeField.join(" ");			
	}
  
}

export default ContentUsers;
