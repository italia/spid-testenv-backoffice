import axios from "axios";
import Utility from "../util/Utility";

const TAG = "Services.js";

class MainService {

	mainService = null;

	constructor() {
		Utility.log(TAG, "MAINSERVICE CREATED");
	}

	static getMainService() {
		if(this.mainService==null) 
			this.mainService = new MainService()

		return this.mainService;
	}
	
	getUsers(applicationName, callback_response, callback_error) {
		Utility.log(TAG, "GET //user?applicationName="+applicationName+"-> ");
		axios.get('/user?applicationName='+applicationName)
		.then(function (response) {
			Utility.log(TAG, "< ", response);
			callback_response(response.data);
		})
		.catch(function (error) {
			callback_error((error.response!=null) ? error.response.data : "Service not available");
		});
	}  
	
	getPublicUsers(callback_response, callback_error) {
		Utility.log(TAG, "GET //user?public-> ");
		axios.get('/user?public')
		.then(function (response) {
			Utility.log(TAG, "< ", response);
			callback_response(response.data);
		})
		.catch(function (error) {
			callback_error((error.response!=null) ? error.response.data : "Service not available");
		});
	} 	
	
	ping(callback_response, callback_error) {
		//dummy call only for check status
		axios.get('/user?applicationName=PING')
		.then(function (response) {
			callback_response(response.data);
		})
		.catch(function (error) {
			callback_error((error.response!=null) ? error.response.data : "Service not available");
		});
	} 		
	
	saveUser(data, callback_response, callback_error) {
		Utility.log(TAG, "POST /user -> ", data);
		axios.post('/user', data)
		.then(function (response) {
			Utility.log(TAG, "< ", response);
			callback_response(response.data);
		})
		.catch(function (error) {
			callback_error((error.response!=null) ? error.response.data : "Service not available");
		});
	}  

	deleteUser(data, callback_response, callback_error) {
		Utility.log(TAG, "DELETE /user -> ", data);
		axios.post('/user-delete', data)
		.then(function (response) {
			Utility.log(TAG, "< ", response);
			callback_response(response.data);
		})
		.catch(function (error) {
			callback_error((error.response!=null) ? error.response.data : "Service not available");
		});
	}	
	
	getServices(callback_response, callback_error) {
		Utility.log(TAG, "GET /service -> ");
		axios.get('/service')
		.then(function (response) {
			Utility.log(TAG, "< ", response);
			callback_response(response.data);
		})
		.catch(function (error) {
			callback_error((error.response!=null) ? error.response.data : "Service not available");
		});
	}  	
	
	sendData(data, callback_response, callback_error) {
		Utility.log(TAG, "POST /service -> ", data);
		axios.post('/service', data)
		.then(function (response) {
			Utility.log(TAG, "< ", response);
			callback_response(response.data);
		})
		.catch(function (error) {
			Utility.log(TAG, "Error sending data ", error);
			callback_error((error.response!=null) ? error.response.data : "Service not available");
		});
	}	
	
	deleteService(data, callback_response, callback_error) {
		Utility.log(TAG, "DELETE /service-delete -> ", data);
		axios.post('/service-delete', data)
		.then(function (response) {
			Utility.log(TAG, "< ", response);
			callback_response(response.data);
		})
		.catch(function (error) {
			callback_error((error.response!=null) ? error.response.data : "Service not available");
		});
	}  	
}

export default MainService;