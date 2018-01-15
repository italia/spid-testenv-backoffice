import ReduxStore from "../redux/Store";
import ModalActions from "../redux/Modal/Actions";

class Utility {

    static applyTheme() {
        window.loadApp(); 
        window.loadPlugin();
        window.app.loaded();
    }

    static log(src, tag, text) {
        console.log("(" + src + ") " + tag);
        if(text!=null) console.log(JSON.stringify(text, null, 4));
    }

    static uuidv4() {
        let uuid = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
        if (uuid.match(/^\d/)) uuid  = "_"+uuid.substring(1);
        return uuid;
    }


    static showModal(data) {
        let modal = ReduxStore.getModal();
        modal.dispatch(
            ModalActions.setInfo({
                title: data.title,
                subtitle: data.subtitle,
                text: JSON.stringify(data.text),
                isOpen: data.isOpen,
                callbackOk: data.callbackOk,
                okLabel: data.okLabel
            })
        );        
    }

    static json2metadata(json) {

        let order = 1;
        let assertionArray = [];
        for(var i in json.AssertionConsumerServices) {
            if(json.AssertionConsumerServices[i].IsDefault) {
                assertionArray[0] = json.AssertionConsumerServices[i];
            } else {
                assertionArray[order++] = json.AssertionConsumerServices[i];
            }  
        }
        json.AssertionConsumerServices = assertionArray;


// eslint-disable-next-line
let metadata = '\
<?xml version="1.0"?> \n\
<md:EntityDescriptor \n\
    xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata"  \n\
    xmlns:ds="http://www.w3.org/2000/09/xmldsig#"  \n\
    entityID="' + json.EntityId + '"  \n\
    ID="'+json.Id+'"> \n';
        /*
        <ds:Signature> \n \
            <ds:SignedInfo> \n \
                <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/> \n \
                <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/> \n \
                <ds:Reference URI=""> \n \
                    <ds:Transforms> \n \
                        <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/> \n \
                        <ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/> \n \
                    </ds:Transforms> \n \
                    <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/> \n \
                    <ds:DigestValue></ds:DigestValue> \n \
                </ds:Reference> \n \
            </ds:SignedInfo> \n \
            <ds:SignatureValue></ds:SignatureValue> \n \
            <ds:KeyInfo> \n \
                <ds:X509Data> \n \
                    <ds:X509Certificate></ds:X509Certificate> \n \
                </ds:X509Data> \n \
            </ds:KeyInfo> \n \
        </ds:Signature> \n \
        */

        // eslint-disable-next-line
metadata += ' \
    \n\
    <md:SPSSODescriptor  \n\
        protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol"  \n\
        AuthnRequestsSigned="true"  \n\
        WantAssertionsSigned="true"> \n\
        \n\
        <md:KeyDescriptor use="signing"> \n\
            <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"> \n\
                <ds:X509Data> \n\
                    <ds:X509Certificate>' + json.Certificate + '</ds:X509Certificate> \n\
                </ds:X509Data> \n\
            </ds:KeyInfo> \n\
        </md:KeyDescriptor> \n\
        \n\
        <md:KeyDescriptor use="encryption"> \n\
            <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#"> \n\
                <ds:X509Data> \n\
                    <ds:X509Certificate>' + json.Certificate + '</ds:X509Certificate> \n\
                </ds:X509Data> \n\
            </ds:KeyInfo> \n\
        </md:KeyDescriptor> \n\
        \n';

for(var i1 in json.SingleLogoutServices) {
// eslint-disable-next-line
metadata += '\
        <md:SingleLogoutService \n\
            Binding="urn:oasis:names:tc:SAML:2.0:bindings:' + json.SingleLogoutServices[i1].Binding + '"\n\
            Location="' + json.SingleLogoutServices[i1].Location + '" /> \n\n';
}

// eslint-disable-next-line
metadata += '\
        <md:NameIDFormat>urn:oasis:names:tc:SAML:2.0:nameid-format:transient</md:NameIDFormat> \n\n';

let nAssertion = 1;
for(var i2 in json.AssertionConsumerServices) {
// eslint-disable-next-line
metadata += '\
        <md:AssertionConsumerService  \n\
            Binding="urn:oasis:names:tc:SAML:2.0:bindings:' + json.AssertionConsumerServices[i2].Binding + '"  \n\
            Location="' + json.AssertionConsumerServices[i2].Location + '"  \n';
                
if(json.AssertionConsumerServices[i2].IsDefault) {
metadata += '\
            index="0"  \n\
            isDefault="true" /> \n';
} else {
metadata += '\
            index="' + nAssertion + '" /> \n';
nAssertion++;
}
metadata += '\n';
}            

for(var i3 in json.AttributeConsumingServices) {
// eslint-disable-next-line
metadata += '\
        <md:AttributeConsumingService index="' + (+i3+1) /* first index 1 because index 0 is for resident sp in wso2 */ + '"> \n\
            <md:ServiceName xml:lang="it">' + json.AttributeConsumingServices[i3].Name + '</md:ServiceName> \n\
            <md:ServiceDescription xml:lang="it">' + json.AttributeConsumingServices[i3].Description + '</md:ServiceDescription> \n';
for(var j in json.AttributeConsumingServices[i3].RequestedAttribute) {
metadata += '\
            <md:RequestedAttribute Name="' + json.AttributeConsumingServices[i3].RequestedAttribute[j] + '" NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:basic"/> \n';
}
// eslint-disable-next-line
metadata += '\
        </md:AttributeConsumingService> \n\n';
}
// eslint-disable-next-line
metadata += '\
    </md:SPSSODescriptor> \n\n';

if(json.Organization.Name!=="" || json.Organization.DisplayName!=="" || json.Organization.Url!=="") {
// eslint-disable-next-line
metadata += '\
    <md:Organization> \n\
        <md:OrganizationName xml:lang="it">' + json.Organization.Name + '</md:OrganizationName> \n\
        <md:OrganizationDisplayName xml:lang="it">' + json.Organization.DisplayName + '</md:OrganizationDisplayName> \n\
        <md:OrganizationURL xml:lang="it">' + json.Organization.Url + '</md:OrganizationURL> \n\
    </md:Organization> \n\
\n';
}
// eslint-disable-next-line
metadata += '\
</md:EntityDescriptor>\n '

        return metadata;
    }
}

export default Utility;