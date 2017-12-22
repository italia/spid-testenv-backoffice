import { Component } from 'react';
import view from "./view.js";
import Utility from "../../util/Utility";
import Services from "../../services/Services";
import ReduxStore from "../../redux/Store";
import Actions_Util from "../../redux/Util/Actions";


class ContentIdentityProvider extends Component {

	utilStore = ReduxStore.getUtil();
	state = {
		xml: "\
<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?> \n\
<md:EntityDescriptor xmlns:md=\"urn:oasis:names:tc:SAML:2.0:metadata\" ID=\"_5c2n3699-c647-82gd-hfjs-ak4xu6710475\" entityID=\"idp.spid.gov.it\"> \n\
	<ds:Signature xmlns:ds=\"http://www.w3.org/2000/09/xmldsig#\"> \n\
		<ds:SignedInfo> \n\
			<ds:CanonicalizationMethod Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\"/> \n\
			<ds:SignatureMethod Algorithm=\"http://www.w3.org/2001/04/xmldsig-more#rsa-sha256\"/> \n\
			<ds:Reference URI=\"#_5c2n3699-c647-82gd-hfjs-ak4xu6710475\"> \n\
				<ds:Transforms> \n\
					<ds:Transform Algorithm=\"http://www.w3.org/2000/09/xmldsig#enveloped-signature\"/> \n\
					<ds:Transform Algorithm=\"http://www.w3.org/2001/10/xml-exc-c14n#\"/> \n\
				</ds:Transforms> \n\
				<ds:DigestMethod Algorithm=\"http://www.w3.org/2001/04/xmlenc#sha256\"/> \n\
				<ds:DigestValue>Adkz9h8RaE82Ncyykv8PJWLk61gDGmJd0pDB66jDhx0=</ds:DigestValue> \n\
			</ds:Reference> \n\
		</ds:SignedInfo> \n\
		<ds:SignatureValue> \n\
			rX3kOz84GsfXcMDrHd7oFTTLzQsKTBqIls388mGM31XULwwm8plpVdxBPTSMZpKDr6qhu0oDnRG+ \n\
			b+akCnNOHji7tc70n1kRlr64Vih75xOLK7q8BZNMRfBVpWRyI1phWrqWFghfbr3vfqE25vAroQHe \n\
			4Wusq0ImwgqinsxD0eWh1N/6Lr6bJ8o6gIoeQLxbdNRVIJgJcLVCytH/qRZ5N2aA1f34lMswdlGr \n\
			USVXj0+HgmGPsQ3bXkB9iuANJjo5UkZq5fcq6A8/QEupKNXIzlpwc0EKQtRWSJ9RV04RXPa8bokR \n\
			ug3JWZUQGfdKtgr23zlW1cS9H52VHCikrRVbag== \n\
		</ds:SignatureValue> \n\
		<ds:KeyInfo> \n\
			<ds:KeyValue> \n\
				<ds:RSAKeyValue> \n\
					<ds:Modulus> \n\
						4AKsqNsEoN7ZP35pl50rwqtWujTSNiSzsaTODGQBDThpknWPWUXphZ8+IhA7Ojou8WvWyhv7k8N+ \n\
						VboMfAfHVqfCC/XfdYOJagZyCsc8mP9hRMB02Yfafsd9zeVIWha/W5EUp0mT2zL3U04XT5M4gRL9 \n\
						MzNQnk7uMzLaxFXWF3wfDwL1RiPZvywXR09aDocmX9hiriwyxhNjx9D63TH7f6gdq7PREYMtebai \n\
						XRGYqN7VpPMPdquXAMz2Lsll1nvgkp6URLoQCokKNPMydEBvxQxKevinBadvPBndyqhEWM7JzQcL \n\
						bXLy4+K5CAQ3UCtncjjCJLHR6OzVYRvZLukOLw== \n\
					</ds:Modulus> \n\
					<ds:Exponent>AQAB</ds:Exponent> \n\
				</ds:RSAKeyValue> \n\
			</ds:KeyValue> \n\
			<ds:X509Data> \n\
				<ds:X509Certificate> \n\
					MIIEejCCA2KgAwIBAgIJAIeDbQlIUlUZMA0GCSqGSIb3DQEBCwUAMIGEMQswCQYDVQQGEwJJVDEN \n\
					MAsGA1UECBMEUm9tYTENMAsGA1UEBxMEUm9tYTENMAsGA1UEChMEQWdJRDENMAsGA1UECxMEU3Bp \n\
					ZDEWMBQGA1UEAxQNKi5zcGlkLmdvdi5pdDEhMB8GCSqGSIb3DQEJARYScm9zaW5pQGFnaWQuZ292 \n\
					Lml0MB4XDTE3MTExNDAwNDExMloXDTE4MTExNDAwNDExMlowgYQxCzAJBgNVBAYTAklUMQ0wCwYD \n\
					VQQIEwRSb21hMQ0wCwYDVQQHEwRSb21hMQ0wCwYDVQQKEwRBZ0lEMQ0wCwYDVQQLEwRTcGlkMRYw \n\
					FAYDVQQDFA0qLnNwaWQuZ292Lml0MSEwHwYJKoZIhvcNAQkBFhJyb3NpbmlAYWdpZC5nb3YuaXQw \n\
					ggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDgAqyo2wSg3tk/fmmXnSvCq1a6NNI2JLOx \n\
					pM4MZAENOGmSdY9ZRemFnz4iEDs6Oi7xa9bKG/uTw35Vugx8B8dWp8IL9d91g4lqBnIKxzyY/2FE \n\
					wHTZh9p+x33N5UhaFr9bkRSnSZPbMvdTThdPkziBEv0zM1CeTu4zMtrEVdYXfB8PAvVGI9m/LBdH \n\
					T1oOhyZf2GKuLDLGE2PH0PrdMft/qB2rs9ERgy15tqJdEZio3tWk8w92q5cAzPYuyWXWe+CSnpRE \n\
					uhAKiQo08zJ0QG/FDEp6+KcFp288Gd3KqERYzsnNBwttcvLj4rkIBDdQK2dyOMIksdHo7NVhG9ku \n\
					6Q4vAgMBAAGjgewwgekwHQYDVR0OBBYEFFDyg6bQRWTJxVGOMEYblA2qEDekMIG5BgNVHSMEgbEw \n\
					ga6AFFDyg6bQRWTJxVGOMEYblA2qEDekoYGKpIGHMIGEMQswCQYDVQQGEwJJVDENMAsGA1UECBME \n\
					Um9tYTENMAsGA1UEBxMEUm9tYTENMAsGA1UEChMEQWdJRDENMAsGA1UECxMEU3BpZDEWMBQGA1UE \n\
					AxQNKi5zcGlkLmdvdi5pdDEhMB8GCSqGSIb3DQEJARYScm9zaW5pQGFnaWQuZ292Lml0ggkAh4Nt \n\
					CUhSVRkwDAYDVR0TBAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAmP+o3CPOhceAu3KWKir6CZlA \n\
					5lshTq0IleGFE7I3d9JZCqgmKR3AoJb7QfgjViNLA+b9M0UZ3oG+RZha92Xefv3KQp6O81fNaCxI \n\
					UKp+EnSruMOxmG6S405KUzpJwYTviyNZkALbuRuHZJioiHS9hIeAzEUKkUGP4YTSvthMa4aAQBd4 \n\
					k9ZwEblg1BtK7bBKPFfvL+m8qRauV9QWlR51ie4mqHeTTn5GLKnfqiCJq7NhwKAFzgq7VJqXefP4 \n\
					+CzDQ5opV9+R97rGMA+Bex+ObcVz5eCmojk1JEeLKeYKCntByjwBImc4QUdMMfq7Bo0Kl/ZT4pDk \n\
					HTv9M2zh8LQOMw== \n\
				</ds:X509Certificate> \n\
			</ds:X509Data> \n\
		</ds:KeyInfo> \n\
	</ds:Signature> \n\
	<md:IDPSSODescriptor WantAuthnRequestsSigned=\"true\" protocolSupportEnumeration=\"urn:oasis:names:tc:SAML:2.0:protocol\"> \n\
		<md:KeyDescriptor use=\"signing\"> \n\
			<ds:KeyInfo xmlns:ds=\"http://www.w3.org/2000/09/xmldsig#\"> \n\
				<ds:X509Data> \n\
					<ds:X509Certificate> \n\
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
					</ds:X509Certificate> \n\
				</ds:X509Data> \n\
			</ds:KeyInfo> \n\
		</md:KeyDescriptor> \n\
		<md:SingleLogoutService Binding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST\" Location=\"https://spid-testenv-identityserver:9443/samlsso\" ResponseLocation=\"https://spid-testenv-identityserver:9443/samlsso\"/> \n\
		<md:SingleLogoutService Binding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect\" Location=\"https://spid-testenv-identityserver:9443/samlsso\" ResponseLocation=\"https://spid-testenv-identityserver:9443/samlsso\"/> \n\
		<md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</md:NameIDFormat> \n\
		<md:SingleSignOnService Binding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST\" Location=\"https://spid-testenv-identityserver:9443/samlsso\"/> \n\
		<md:SingleSignOnService Binding=\"urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect\" Location=\"https://spid-testenv-identityserver:9443/samlsso\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"spidCode\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"name\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"familyName\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"placeOfBirth\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"countyOfBirth\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"dateOfBirth\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"gender\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"companyName\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"registeredOffice\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"fiscalNumber\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"ivaCode\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"idCard\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"mobilePhone\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"email\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"address\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"digitalAddress\" NameFormat=\"xsi:string\"/> \n\
		<saml2:Attribute xmlns:saml2=\"urn:oasis:names:tc:SAML:2.0:assertion\" Name=\"expirationDate\" NameFormat=\"xsi:string\"/> \n\
	</md:IDPSSODescriptor> \n\
	<md:Organization> \n\
		<md:OrganizationName xml:lang=\"it\">AGID - IDP Test SPID</md:OrganizationName> \n\
		<md:OrganizationDisplayName xml:lang=\"it\">AGID - IDP Test SPID</md:OrganizationDisplayName> \n\
		<md:OrganizationURL xml:lang=\"it\">https://www.spid.gov.it</md:OrganizationURL> \n\
	</md:Organization> \n\
</md:EntityDescriptor> \n\
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
