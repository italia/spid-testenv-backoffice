import { Component } from 'react';
import view from "./view.js";
import Utility from "../../util/Utility";
import Services from "../../services/Services";
import ReduxStore from "../../redux/Store";
import Actions_Util from "../../redux/Util/Actions";


class ContentIdentityProvider extends Component {

	utilStore = ReduxStore.getUtil();
	state = {
		xml: " \n\n\
		<?xml version=\"1.0\" encoding=\"UTF-8\"?> \n\
		<EntityDescriptor xmlns=\"urn:oasis:names:tc:SAML:2.0:metadata\" ID=\"_2487e8a5-3a05-488c-8fa6-fe32b8ae96c8\" xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" entityID=\"<entityID>\">  \n\
		  <!-- Per test non viene richiesta la firma del metadata come avverrebbe in produzione --> \n\
		  <IDPSSODescriptor WantAuthnRequestsSigned=\"true\" protocolSupportEnumeration=\"urn:oasis:names:tc:SAML:2.0:protocol\"> \n\
			<KeyDescriptor use=\"signing\"> \n\
			  <KeyInfo xmlns=\"http://www.w3.org/2000/09/xmldsig#\"> \n\
				<X509Data> \n\
				  <!-- certificato di default dell'identity server, se modificato è necessario cambiarlo --> \n\
				  <X509Certificate> \n\
					MIICNTCCAZ6gAwIBAgIES343gjANBgkqhkiG9w0BAQUFADBVMQswCQYDVQQGEwJVUzELMAkGA1UE \n\
					CAwCQ0ExFjAUBgNVBAcMDU1vdW50YWluIFZpZXcxDTALBgNVBAoMBFdTTzIxEjAQBgNVBAMMCWxv \n\
					Y2FsaG9zdDAeFw0xMDAyMTkwNzAyMjZaFw0zNTAyMTMwNzAyMjZaMFUxCzAJBgNVBAYTAlVTMQsw \n\
					CQYDVQQIDAJDQTEWMBQGA1UEBwwNTW91bnRhaW4gVmlldzENMAsGA1UECgwEV1NPMjESMBAGA1UE \n\
					AwwJbG9jYWxob3N0MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUp/oV1vWc8/TkQSiAvTou \n\
					sMzOM4asB2iltr2QKozni5aVFu818MpOLZIr8LMnTzWllJvvaA5RAAdpbECb+48FjbBe0hseUdN5 \n\
					HpwvnH/DW8ZccGvk53I6Orq7hLCv1ZHtuOCokghz/ATrhyPq+QktMfXnRS4HrKGJTzxaCcU7OQID \n\
					AQABoxIwEDAOBgNVHQ8BAf8EBAMCBPAwDQYJKoZIhvcNAQEFBQADgYEAW5wPR7cr1LAdq+IrR44i \n\
					QlRG5ITCZXY9hI0PygLP2rHANh+PYfTmxbuOnykNGyhM6FjFLbW2uZHQTY1jMrPprjOrmyK5sjJR \n\
					O4d1DeGHT/YnIjs9JogRKv4XHECwLtIVdAbIdWHEtVZJyMSktcyysFcvuhPQK8Qc/E/Wq8uHSCo= \n\
					</X509Certificate> \n\
				</X509Data> \n\
			  </KeyInfo> \n\
			</KeyDescriptor> \n\
			<SingleLogoutService Binding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect\" Location=\"https://<host_spid_idptest>:<port_spid_idptest>/samlsso\" ResponseLocation=\"https://<host_spid_idptest>:<port_spid_idptest>/samlsso\"> \n\
			<NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</NameIDFormat> \n\
			<SingleSignOnService Binding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST\" Location=\"https://<host_spid_idptest>:<port_spid_idptest>/samlsso\"/> \n\
			<SingleSignOnService Binding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect\" Location=\"<host_spid_idptest>:<port_spid_idptest>/samlsso\"/> \n\
			<saml2:Attribute Name=\"spidCode\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"name\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"familyName\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"placeOfBirth\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"countyOfBirth\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"dateOfBirth\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"gender\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"companyName\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"registeredOffice\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"fiscalNumber\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"ivaCode\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"idCard\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"mobilePhone\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"email\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"address\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"expirationDate\" NameFormat=\"xsi:string\"/> \n\
			<saml2:Attribute Name=\"digitalAddress\" NameFormat=\"xsi:string\"/> \n\
		  </IDPSSODescriptor> \n\
		  <Organization> \n\
			<OrganizationName xml:lang=\"it\">SPID Test Environment</OrganizationName> \n\
			<OrganizationDisplayName xml:lang=\"it\">SPID TestEnvironment</OrganizationDisplayName> \n\
			<OrganizationURL xml:lang=\"it\">https://www.spid.gov.it</OrganizationURL> \n\
		  </Organization> \n\
		</EntityDescriptor> \n\n\
		"
	};

	constructor(props) {
		super(props);
		this.unsubscribe = this.utilStore.subscribe(()=>this.onUtilStoreUpdate());
	}	
	
	onUtilStoreUpdate() {
		let utilState = this.utilStore.getState(); 
	}	
	
	render() {    
		return view(this);
	}
  
}

export default ContentIdentityProvider;
