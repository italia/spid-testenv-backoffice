const config = require('./config.js');
const soap = require('soap');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var basicAuthSecurity = new soap.BasicAuthSecurity(config.wso2_user, config.wso2_pass);


exports.saveUser = function(data, callback) {
	
	addUser({
		"userName": data.userName,
		"lastName": data.lastName,
		"credential": data.credential,
		"roleList": data.roleList
		
	}, () => {
		
		var claimsSavedNum = 0;
		
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/externalid", "TEST"+generateUID(), claimsSavedNum, callback);
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/privatePersonalIdentifier", data.claims.idCard, claimsSavedNum, callback);
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/nickname", "TINIT-"+data.claims.fiscalNumber, claimsSavedNum, callback);
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/mobile", data.claims.mobilePhone, claimsSavedNum, callback);
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/dob", data.claims.dateOfBirth, claimsSavedNum, callback);
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/stateorprovince", data.claims.countyOfBirth, claimsSavedNum, callback);
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/givenname", data.claims.name, claimsSavedNum, callback);
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/otheremail", data.claims.digitalAddress, claimsSavedNum, callback);
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/im", data.claims.ivaCode, claimsSavedNum, callback);
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/locality", data.claims.placeOfBirth, claimsSavedNum, callback);
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/expirationdate", data.claims.expirationDate, claimsSavedNum, callback);
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/gender", data.claims.gender, claimsSavedNum, callback);
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/registeredOffice", data.claims.registeredOffice, claimsSavedNum, callback);
		/* avoid saving username double 
		  * claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/lastname", data.claims.familyName, claimsSavedNum, callback);
		  * */
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/emailaddress", data.claims.email, claimsSavedNum, callback);
		claimsSavedNum = checkLasteAddedUserClaimValue(data.userName, "http://wso2.org/claims/organization", data.claims.companyName, claimsSavedNum, callback);
		
		
		/* As above but unrolled
		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/privatePersonalIdentifier",
			value: data.claims.idCard
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);
		
		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/nickname",
			value: data.claims.fiscalNumber
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);
			
		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/mobile",
			value: data.claims.mobilePhone
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);
			
		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/dob",
			value: data.claims.dateOfBirth
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);

		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/stateorprovince",
			value: data.claims.countyOfBirth
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);
			
		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/givenname",
			value: data.claims.name
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);
			
		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/otheremail",
			value: data.claims.digitalAddress
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);
			
		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/im",
			value: data.claims.ivaCode
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);
			
		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/locality",
			value: data.claims.placeOfBirth
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);
			
		/* saved internally by wso2
		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/userid",
			value: data.claims.spidCode
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);
		

		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/expirationdate",
			value: data.claims.expirationDate
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);
			
		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/gender",
			value: data.claims.gender
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);
			
		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/registeredOffice",
			value: data.claims.registeredOffice
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);
			
		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/lastname",
			value: data.claims.familyName
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);
			
		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/emailaddress",
			value: data.claims.email
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);
			
		addUserClaimValue({
			userName: data.userName,
			claimURI: "http://wso2.org/claims/organization",
			value: data.claims.companyName
		}, () => { 
				claimsSavedNum++; 
				if(claimsSavedNum==15) {
					callback({
						code: 200,
						message: "Ok"
					});
				}
			} 
		);		
		*/
		
	}, (errString) => {
		callback({
			code: 400,
			message: errString
		});	
	});	
	
}

checkLasteAddedUserClaimValue = function(username, claimURI, remoteClaim, savedNum, callback) {
	savedNum++; 
	
	addUserClaimValue({
		userName: username,
		claimURI: claimURI,
		value: remoteClaim
	}, () => { 
			if(savedNum==15) {
				callback({
					code: 200,
					message: "Ok"
				});
			}
		} 
	);
	return savedNum;
}

exports.getUsers = function(data, callback) {
	
	getUserListOfRole({
		roleName: data.roleName
	}, (soapResponse) => {
		var users = [];
		var processed = 0;
		if(soapResponse.length==0) callback({
			code: 200, 
			message: "No registered users for role: " + data.roleName, 
			result: []
		});
		for(var i = 0; i<soapResponse.length; i++) {
			getUserClaimValues({
				userName: soapResponse[i]
			}, (claimsResponse) => {
				user = {};
				for(c in claimsResponse) {
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/privatePersonalIdentifier") user.idCard = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/nickname") user.fiscalNumber = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/username") user.userName = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/mobile") user.mobilePhone = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/dob") user.dateOfBirth = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/stateorprovince") user.countyOfBirth = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/givenname") user.name = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/otherEmail") user.digitalAddress = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/im") user.ivaCode = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/locality") user.placeOfBirth = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/externalid") user.spidCode = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/expirationDate") user.expirationDate = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/gender") user.gender = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/registeredOffice") user.registeredOffice = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/lastname") user.familyName = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/emailaddress") user.email = claimsResponse[c].value;
					if(claimsResponse[c].claimUri == "http://wso2.org/claims/organization") user.companyName = claimsResponse[c].value;
				}
				
				users.push(user);
				if(++processed == soapResponse.length) {
					callback({
						code: 200, 
						message: "Ok", 
						result: users
					});
				}						
			});
		}
	}, (errString) => {
		callback({
			code: 400,
			message: errString
		});	
	});	
}

exports.deleteUser = function(data, callback) {
	getUserListOfRole({
		roleName: "admin"
	}, (soapResponse) => {
		var isAdmin = false;
		for(var i = 0; i<soapResponse.length; i++) {
			if(soapResponse[i]==data.userName) isAdmin = true;
		}
		if(!isAdmin) {
			deleteUser(data.userName, () => {
				callback({
					code: 200,
					message: "Ok"
				});
			}, (errString) => {
				callback({
					code: 400,
					message: errString
				});	
			});
		} else {
			callback({
				code: 400,
				message: "Cannot delete administrator user"
			});
		}
	}, (errString) => {
		callback({
			code: 400,
			message: errString
		});	
	});
}




addUser = function(data, next, nexterr) {
	var url = config.wso2_url + '/services/RemoteUserStoreManagerService?wsdl';
	console.log(url);
	soap.createClient(url, function(err, client, raw) {
		if(client==null) { nexterr("Identity Server not available"); return; }
		if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
		else {
			client.setSecurity(basicAuthSecurity);

			var args = {
				"userName": data.userName,
				"credential": data.credential,
				"roleList": data.roleList,
				"claims": {
					"claimURI": "http://wso2.org/claims/lastname",
					"value": data.lastName
				},
				"requirePasswordChange": "false"
			};				
			
			client.addUser(args, function(err, result, raw) {
			if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
				else next();
			});
		}
	});				
}

deleteUser = function(userName, next, nexterr) {
	var url = config.wso2_url + '/services/RemoteUserStoreManagerService?wsdl';
	console.log(url);
	soap.createClient(url, function(err, client, raw) {
		if(client==null) { nexterr("Identity Server not available"); return; }
		if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
		else {
			client.setSecurity(basicAuthSecurity);

			var args = {
				"userName": userName,
			};				
			
			client.deleteUser(args, function(err, result, raw) {
				if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
				else next();
			});
		}
	});				
}

addUserClaimValue = function(data, next) {
	var url = config.wso2_url + '/services/RemoteUserStoreManagerService?wsdl';
	console.log(url);
	soap.createClient(url, function(err, client) {
		if(client==null) { nexterr("Identity Server not available"); return; }
		
		// if err??
		client.setSecurity(basicAuthSecurity);

		var args = {
			"userName": data.userName,
			"claimURI": data.claimURI,
			"claimValue": data.value
		};				
		
		client.addUserClaimValue(args, function(err, result, raw, soapHeader) {
			next();
		});
	});				
}

getUserListOfRole = function(data, next, nexterr) {
	var url = config.wso2_url + '/services/RemoteUserStoreManagerService?wsdl';
	if(data.roleName!="Application/PING") console.log(url + " roleName: " + data.roleName);
	soap.createClient(url, function(err, client, raw) {
		if(client==null) { nexterr("Identity Server not available"); return; }
		if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
		else {
			client.setSecurity(basicAuthSecurity);

			var args = {
				"roleName": data.roleName
			};				
			client.getUserListOfRole(args, function(err, result, raw, header) {
				if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
				else {
					var userList = []
					if(result!=null && result.getUserListOfRoleResponse!=null) {
						if(Array.isArray(result.getUserListOfRoleResponse.return)) {
							userList = result.getUserListOfRoleResponse.return;
						} else {
							// only one element
							userList.push(result.getUserListOfRoleResponse.return);
						};
					}
					
					// exclude admin user
					userList = userList.filter(function(user) { 
						return user !== "admin";
					});
					
					next(userList);
				}
			});
		}
	});				
}

getUserList = function(next, nexterr) {
	var url = config.wso2_url + '/services/RemoteUserStoreManagerService?wsdl';
	console.log(url);
	soap.createClient(url, function(err, client, raw) {
		if(client==null) { nexterr("Identity Server not available"); return; }
		if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
		else {
			client.setSecurity(basicAuthSecurity);

			var args = {
				"filter": "*",
				"maxItemLimit": "-1"
			};				
			client.listUsers(args, function(err, result, raw, header) {
				if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
				else {
					var userList = []
					if(result!=null && result.listUsersResponse!=null) {
						if(Array.isArray(result.listUsersResponse.return)) {
							userList = result.listUsersResponse.return;
						} else {
							// only one element
							userList.push(result.listUsersResponse.return);
						};
					}
					
					// exclude admin user
					userList = userList.filter(function(user) { 
						return user !== "admin";
					});
					
					next(userList);
				}
			});
		}
	});				
}

getUserClaimValues = function(data, next, nexterr) {
	var url = config.wso2_url + '/services/RemoteUserStoreManagerService?wsdl';
	console.log(url);
	soap.createClient(url, function(err, client, raw) {
		if(client==null) { nexterr("Identity Server not available"); return; }
		if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
		else {
			client.setSecurity(basicAuthSecurity);

			var args = {
				"userName": data.userName
			};				
			client.getUserClaimValues(args, function(err, result, raw) {
				if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
				else {
					if(result!=null && result.getUserClaimValuesResponse!=null) {
						next(result.getUserClaimValuesResponse.return);
					} else {
						next({});
					}
				}
			});
		}
	});				
}



parseFaultString = function(s) {
	if(s!=null) {
		s = s.replace("<faultstring>", "");
		s = s.replace("</faultstring>", "");
	} else {
		s = "";
	}
	return s;
}


generateUID = function() {
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("00000" + firstPart.toString(36)).slice(-5);
    secondPart = ("00000" + secondPart.toString(36)).slice(-5);
    return firstPart + secondPart;
}