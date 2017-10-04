import React from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import './style.css';

function view(me) { 
    return(

		<div className="container container-boxed">
	
			<p>
				<b>Binding POST</b><hr/>
				Binding: urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST<br/>
				Location: https://localhost:9443/samlsso<br/>
	
				<br/>
			</p>
			<p>
				<b>Binding REDIRECT</b><hr/>
				Binding: urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect<br/>
				Location: https://localhost:9443/samlsso<br/>
	
				<br/>
			</p>				
	
			<p>
				<b>X509 Certificate</b><hr/>
				MIICNTCCAZ6gAwIBAgIES343gjANBgkqhkiG9w0BAQUFADBVMQswCQYDVQQGEwJVUzELMAkGA1UE<br/>
				CAwCQ0ExFjAUBgNVBAcMDU1vdW50YWluIFZpZXcxDTALBgNVBAoMBFdTTzIxEjAQBgNVBAMMCWxv<br/>
				Y2FsaG9zdDAeFw0xMDAyMTkwNzAyMjZaFw0zNTAyMTMwNzAyMjZaMFUxCzAJBgNVBAYTAlVTMQsw<br/>
				CQYDVQQIDAJDQTEWMBQGA1UEBwwNTW91bnRhaW4gVmlldzENMAsGA1UECgwEV1NPMjESMBAGA1UE<br/>
				AwwJbG9jYWxob3N0MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUp/oV1vWc8/TkQSiAvTou<br/>
				sMzOM4asB2iltr2QKozni5aVFu818MpOLZIr8LMnTzWllJvvaA5RAAdpbECb+48FjbBe0hseUdN5<br/>
				HpwvnH/DW8ZccGvk53I6Orq7hLCv1ZHtuOCokghz/ATrhyPq+QktMfXnRS4HrKGJTzxaCcU7OQID<br/>
				AQABoxIwEDAOBgNVHQ8BAf8EBAMCBPAwDQYJKoZIhvcNAQEFBQADgYEAW5wPR7cr1LAdq+IrR44i<br/>
				QlRG5ITCZXY9hI0PygLP2rHANh+PYfTmxbuOnykNGyhM6FjFLbW2uZHQTY1jMrPprjOrmyK5sjJR<br/>
				O4d1DeGHT/YnIjs9JogRKv4XHECwLtIVdAbIdWHEtVZJyMSktcyysFcvuhPQK8Qc/E/Wq8uHSCo=<br/>
			</p>		
		</div>
    );
}

export default view;
