export const SET_INFO_ENTITYID = "SET_INFO_ENTITYID";
export const SET_INFO_ID = "SET_INFO_ID";
export const SET_INFO_CERTIFICATE = "SET_INFO_CERTIFICATE";

export const SET_ORGANIZATION_NAME = "SET_ORGANIZATION_NAME";
export const SET_ORGANIZATION_DISPLAYNAME = "SET_ORGANIZATION_DISPLAYNAME";
export const SET_ORGANIZATION_URL = "SET_ORGANIZATION_URL";
export const SET_SPIDLEVEL = "SET_SPIDLEVEL";

/* inner state managed by components */
export const SET_ASSERTIONCONSUMERSERVICE = "SET_ASSERTIONCONSUMERSERVICE";
export const SET_SINGLELOGOUT = "SET_SINGLELOGOUT";
export const SET_ATTRIBUTECONSUMINGSERVICE = "SET_ATTRIBUTECONSUMINGSERVICE";



class Actions {

    static setInfo_EntityId(value) {
        return {
            type: SET_INFO_ENTITYID,
            value: value
        }
    }

    static setInfo_Id(value) {
        return {
            type: SET_INFO_ID,
            value: value
        }
    }
	
    static setInfo_Certificate(value) {
        return {
            type: SET_INFO_CERTIFICATE,
            value: value
        }
    }    

    static setOrganization_Name(value) {
        return {
            type: SET_ORGANIZATION_NAME,
            value: value
        }
    }    

    static setOrganization_DisplayName(value) {
        return {
            type: SET_ORGANIZATION_DISPLAYNAME,
            value: value
        }
    }     

    static setOrganization_Url(value) {
        return {
            type: SET_ORGANIZATION_URL,
            value: value
        }
    }   
		
    static setSPIDLevel(value) {
        return {
            type: SET_SPIDLEVEL,
            value: value
        }
    }		

    static setAssertionConsumerService(value) {
        return {
            type: SET_ASSERTIONCONSUMERSERVICE,
            value: value
        }
    }     

    static setSingleLogout(value) {
        return {
            type: SET_SINGLELOGOUT,
            value: value
        }
    }  
    
    static setAttributeConsumingService(value) {
        return {
            type: SET_ATTRIBUTECONSUMINGSERVICE,
            value: value
        }
    }          
}

export default Actions;