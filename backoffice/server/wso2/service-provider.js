const config = require('./config.js');
const soap = require('soap');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
var basicAuthSecurity = new soap.BasicAuthSecurity(config.wso2_user, config.wso2_pass);


exports.getSP = function(data, callback) {
	
	var applicationList = [];
	
	getRoleListOfUser({
		
		"userName": data.userName
		
	}, (roleList) => {
	
		var applicationList = [];
		var processed = 0;
		for(var i=0; i<roleList.length; i++) {
			if(roleList[i].substring(0, 12)=="Application/") {
				getApplication({
					
					"applicationName": roleList[i].substring(12)
					
				}, (application) => {
					
					applicationList.push({
						applicationID: application.applicationID,
						applicationName: application.applicationName,
						description: application.description,
						issuer: application.issuer
					});

					if(++processed == roleList.length) {
						callback({
							code: 200,
							message: "Ok",
							result: applicationList
						});	
					}					
					
				}, (errString) => {
					callback({
						code: 400,
						message: errString
					});	
				});
				
			} else {
				if(++processed == roleList.length) {
					callback({
						code: 200,
						message: "Ok",
						result: applicationList
					});	
				}					
			}
		}
	}, (errString) => {
		callback({
			code: 400,
			message: errString
		});	
	});	
}

exports.deleteSP = function(data, callback) {
	
	deleteApplication({
		
		"applicationName": data.applicationName
		
	}, () => {
		
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
}

exports.saveSP = function(data, callback) {
	
	var applicationID = null;
	var entityId = data.EntityId;
	
	var applicationName = "";

	if(entityId.substring(0,8)=="https://") {
		applicationName = entityId.substring(8).replace(/\s+/g, '').toLowerCase();
	} else if(entityId.substring(0,7)=="http://") {
		applicationName = entityId.substring(7).replace(/\s+/g, '').toLowerCase();
	} else {
		callback({
			code: 400,
			message: "Entity ID must start with https:// or http://"
		});			
		return;
	}

	var applicationDescription = data.Organization.DisplayName + ' (' + data.Organization.Url + ')'	
	var certificateAlias = entityId.substring(8).replace(/\s+/g, '').toLowerCase() + ".crt";
	
	deleteApplication({
		
		"applicationName": applicationName
		
	}, () => {		
		createApplication({
			
			"applicationName": applicationName, 
			"description": applicationDescription
			
		}, () => {
			importCertToStore({
				
				"fileName": certificateAlias,
				"fileData": data.Certificate
				
			}, () => {
				addRPServiceProvider({			
					
					"assertionConsumerServices": data.AssertionConsumerServices,
					"singleLogoutServices": data.SingleLogoutServices,
					"entityId": entityId,
					"certificateAlias": certificateAlias
					
				}, () => {
					getApplication({
						
						"applicationName": applicationName
						
					}, (app) => {
						updateApplication({
							
							"applicationID": app.applicationID, 
							"applicationName": applicationName, 
							"description": applicationDescription,
							"entityId": entityId,
							"claims": data.AttributeConsumingServices[0].RequestedAttribute
							
						}, (soapRes) => {
							
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
						
					}, (errString) => {
						
						callback({
							code: 400,
							message: errString
						});	
					});			
					
				}, (errString) => {
					
					callback({
						code: 400,
						message: errString
					});	
				});	
				
			}, (errString) => {
				
				callback({
					code: 400,
					message: errString
				});	
			});	
			
		}, (errString) => {
				
				callback({
					code: 400,
					message: errString
				});	
			}
		);

	}, (errString) => {
		callback({
			code: 400,
			message: errString
		});	
	});		
}

createApplication = function(data, next, nexterr) {
	var url = config.wso2_url + '/services/IdentityApplicationManagementService?wsdl';
	soap.createClient(url, function(err, client, raw) {
		if(client==null) { nexterr("Identity Server not available"); return; }
		if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
		else {
			client.setSecurity(basicAuthSecurity);

			var args = {
					'serviceProvider': {
						'applicationName': data.applicationName,
						'description': data.description
					}
			};				
			client.createApplication(args, function(err, result, raw) {
				if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
				else next();
			});
		}
	});				
}

importCertToStore = function(data, next, nexterr) {
	var url = config.wso2_url + '/services/KeyStoreAdminService?wsdl';
	soap.createClient(url, function(err, client, raw) {	
		if(client==null) { nexterr("Identity Server not available"); return; }
		if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
		else {
			client.setSecurity(basicAuthSecurity);
			
			var args = {
				'fileName': data.fileName,
				'fileData': data.fileData,
				'keyStoreName': 'wso2carbon.jks'
			};				
			client.importCertToStore(args, function(err, result, raw) {
				if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
				else next();
			});
		}
	});				
}

addRPServiceProvider = function(data, next, nexterr) {
	var url = config.wso2_url + '/services/IdentitySAMLSSOConfigService?wsdl';			
	soap.createClient(url, function(err, client, raw) {
		if(client==null) { nexterr("Identity Server not available"); return; }
		if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
		else {
			client.setSecurity(basicAuthSecurity);
			
			let assertionConsumerUrl = '';
			let assertionConsumerUrls = [];
			let defaultAssertionConsumerUrl = '';
			
			for(assertion in data.assertionConsumerServices) {
				item = data.assertionConsumerServices[assertion];
				assertionConsumerUrls.push(item.Location);
				if(item.IsDefault==true) {
					defaultAssertionConsumerUrl = item.Location;
				}
			}

			var args = {
					'spDto': {
						'assertionConsumerUrl': data.assertionConsumerServices[0].Location,
						'assertionConsumerUrls': assertionConsumerUrls,
						'attributeConsumingServiceIndex': 1,
						'certAlias': data.certificateAlias,
						'defaultAssertionConsumerUrl': defaultAssertionConsumerUrl,
						'digestAlgorithmURI': 'http://www.w3.org/2001/04/xmlenc#sha256',
						'doEnableEncryptedAssertion': 'false',
						'doSignAssertions': 'true',
						'doSignResponse': 'true',
						'doSingleLogout': 'true',
						'doValidateSignatureInRequests': 'true',
						'enableAttributeProfile': 'true',
						'enableAttributesByDefault': 'false',
						'idPInitSLOEnabled': 'false',
						'idPInitSSOEnabled': 'false',
						'issuer': data.entityId,
						'loginPageURL': '',
						'nameIDFormat': 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient',
						'signingAlgorithmURI': 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256',
						'sloRequestURL': data.singleLogoutServices[0].Location,
						'sloResponseURL': data.singleLogoutServices[0].Location,
					}
			};				

			client.addRPServiceProvider(args, function(err, result, raw) {
				if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
				else next();
			});
		}
	});			
}

getApplication = function(data, next, nexterr) {
	var url = config.wso2_url + '/services/IdentityApplicationManagementService?wsdl';			
	soap.createClient(url, function(err, client, raw) {
		if(client==null) { nexterr("Identity Server not available"); return; }
		if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
		else {
			client.setSecurity(basicAuthSecurity);
			
			var args = {
					'applicationName': data.applicationName
			};		
			client.getApplication(args, function(err, result, raw) {
				if(result==null) { nexterr(err); return; }
				if(result!=null 
					&& result.IdentityApplicationManagementServiceIdentityApplicationManagementException!=null
					&& result.IdentityApplicationManagementServiceIdentityApplicationManagementException.IdentityApplicationManagementException!=null) {
						nexterr(result.IdentityApplicationManagementServiceIdentityApplicationManagementException.IdentityApplicationManagementException.message);
				} else {
					if(result.getApplicationResponse!=null && result.getApplicationResponse.return!=null) {
						var issuerConfig = result.getApplicationResponse.return.inboundAuthenticationConfig;
						var issuer = (issuerConfig.inboundAuthenticationRequestConfigs!=null && issuerConfig.inboundAuthenticationRequestConfigs.length>0) ? 
							issuerConfig.inboundAuthenticationRequestConfigs[0].inboundAuthKey : "";
									
						next({
							applicationID: result.getApplicationResponse.return.applicationID,
							applicationName: result.getApplicationResponse.return.applicationName,
							description: result.getApplicationResponse.return.description,
							issuer: issuer
						});
					}
				}
			});
		}
	});				
}

deleteApplication = function(data, next, nexterr) {
	var url = config.wso2_url + '/services/IdentityApplicationManagementService?wsdl';			
	soap.createClient(url, function(err, client, raw) {
		if(client==null) { nexterr("Identity Server not available"); return; }
		if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
		else {
			client.setSecurity(basicAuthSecurity);

			var args = {
					'applicationName': data.applicationName
			};				
			client.deleteApplication(args, function(err, result, raw) {
				if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
				else next();
			});
		}
	});				
}

getRoleListOfUser = function(data, next, nexterr) {
	var url = config.wso2_url + '/services/RemoteUserStoreManagerService?wsdl';
	soap.createClient(url, function(err, client, raw) {
		if(client==null) { nexterr("Identity Server not available"); return; }
		if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
		else {
			client.setSecurity(basicAuthSecurity);

			var args = {
					'userName': data.userName
			};				
			client.getRoleListOfUser(args, function(err, result, raw) {
				if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
				else {
					if(result.getRoleListOfUserResponse!=null) {
						next(result.getRoleListOfUserResponse.return);
					}
				}
			});
		}
	});				
}

updateApplication = function(data, next, nexterr) {
	var url = config.wso2_url + '/services/IdentityApplicationManagementService?wsdl';			
	soap.createClient(url, function(err, client, raw) {
		if(client==null) { nexterr("Identity Server not available"); return; }
		if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
		else {
			client.setSecurity(basicAuthSecurity);
			
			var claimMappings = [];
			for(attribute in data.claims) {
				let localUri = "";
				if(data.claims[attribute]=="spidCode") localUri = "http://wso2.org/claims/userid";
				if(data.claims[attribute]=="name") localUri = "http://wso2.org/claims/givenname";
				if(data.claims[attribute]=="familyName") localUri = "http://wso2.org/claims/lastname";
				if(data.claims[attribute]=="placeOfBirth") localUri = "http://wso2.org/claims/locality";
				if(data.claims[attribute]=="countyOfBirth") localUri = "http://wso2.org/claims/stateorprovince";
				if(data.claims[attribute]=="dateOfBirth") localUri = "http://wso2.org/claims/dob";
				if(data.claims[attribute]=="gender") localUri = "http://wso2.org/claims/gender";
				if(data.claims[attribute]=="companyName") localUri = "http://wso2.org/claims/organization";
				if(data.claims[attribute]=="registeredOffice") localUri = "http://wso2.org/claims/registeredOffice";
				if(data.claims[attribute]=="fiscalNumber") localUri = "http://wso2.org/claims/nickname";
				if(data.claims[attribute]=="ivaCode") localUri = "http://wso2.org/claims/im";
				if(data.claims[attribute]=="idCard") localUri = "http://wso2.org/claims/privatePersonalIdentifier";
				if(data.claims[attribute]=="mobilePhone") localUri = "http://wso2.org/claims/mobile";
				if(data.claims[attribute]=="email") localUri = "http://wso2.org/claims/emailaddress";
				if(data.claims[attribute]=="address") localUri = "http://wso2.org/claims/addresses";
				if(data.claims[attribute]=="expirationDate") localUri = "http://wso2.org/claims/expirationdate";
				if(data.claims[attribute]=="digitalAddress") localUri = "http://wso2.org/claims/otheremail";
				
				var claim = {
					'requested': true,
					'localClaim': {
						'claimId': 0,
						'claimUri': localUri,
					},
					'remoteClaim': {
						'claimId': 0,
						'claimUri': data.claims[attribute]
					}
				}
				
				claimMappings.push(claim);
			}
			
			var args = {
					'serviceProvider': {
						'applicationID': data.applicationID,
						'applicationName': data.applicationName,
						'claimConfig': {
							'localClaimDialect': 'false',
							'alwaysSendMappedLocalSubjectId': 'false',
							'claimMappings': claimMappings,	
							'localClaimDialect': 'false',
							'roleClaimURI': '',
							'userClaimURI': 'true'
						},
						
						'description': data.description,
						'saasApp': true,
						'inboundAuthenticationConfig': {
							'inboundAuthenticationRequestConfigs': {
								'friendlyName': '',
								'inboundAuthKey': data.entityId,
								'inboundAuthType': 'samlsso',
								'inboundConfigType': 'standardAPP',
								'properties': {
									'displayOrder': '0',
									'name': 'attrConsumServiceIndex',
									'value': '1'
								}
							},
							/* ?
							'inboundAuthenticationRequestConfigs': {
								'friendlyName': '',
								'inboundAuthKey': data.entityId,
								'inboundAuthType': 'samlsso',
								'inboundConfigType': 'standardAPP',
								'properties': {
									'displayOrder': '1',
									'name': 'attrConsumServiceIndex',
									'value': '12346'
								}
							}					
							*/
						},
						'inboundProvisioningConfig': {
							'provisioningEnabled': 'false',
							'provisioningUserStore': 'PRIMARY'
						},
						'localAndOutBoundAuthenticationConfig': {
							'alwaysSendBackAuthenticatedListOfIdPs': 'false',
							'authenticationType': 'default',
							'authenticationSteps': [
								{
									'stepOrder': 1,
									'subjectStep': false,
									'attributeStep': false,
									'localAuthenticatorConfigs': {
										'displayName': 'basic',
										'enabled': 'false',
										'name': 'BasicAuthenticator',
										'valid': true
									},
								},
								{
									'stepOrder': 2,
									'subjectStep': false,
									'attributeStep': false,
									'federatedIdentityProviders': {
										'defaultAuthenticatorConfig': {
											'displayName': 'EmailOTPLoA3',
											'enabled': false,
											'name': 'EmailOTPLoA3',
											'valid': true
										},
										'enable': false,
										'federatedAuthenticatorConfigs': {
											'displayName': 'EmailOTPLoA3',
											'enabled': false,
											'name': 'EmailOTPLoA3',
											'valid': true
										},
										'federationHub': false,
										'identityProviderName': 'SHARED_EmailOTPLoA3_IDP',
										'primary': false,
									}
								}						
							],
							'authenticationType': 'flow',
							'enableAuthorization': false,
							'useTenantDomainInLocalSubjectIdentifier': false,
							'useUserstoreDomainInLocalSubjectIdentifier': false
						},
						'outboundProvisioningConfig': '',
						'owner': {
							'tenantDomain': 'carbon.super',
							'userName': 'admin',
							'userStoreDomain': 'PRIMARY'
						},
						'permissionAndRoleConfig': ''
					}
			};				

			client.updateApplication(args, function(err, result, raw) {
				if(raw!=null && (raw.indexOf("<faultstring>")>-1)) { nexterr(parseFaultString(raw)); return; }
				else next();
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
