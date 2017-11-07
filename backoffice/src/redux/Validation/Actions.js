export const SET_INFO_VALID = "SET_INFO_VALID";
export const SET_LOGOUT_VALID = "SET_LOGOUT_VALID";
export const SET_ASSERTION_VALID = "SET_ASSERTION_VALID";
export const SET_ATTRIBUTE_VALID = "SET_ATTRIBUTE_VALID";

class Actions {

    static setInfoValid(value) {
        return {
            type: SET_INFO_VALID,
            value: value
        }        
    }
	
    static setLogoutValid(value) {
        return {
            type: SET_LOGOUT_VALID,
            value: value
        }        
    }	

    static setAssertionValid(value) {
        return {
            type: SET_ASSERTION_VALID,
            value: value
        }        
    }
    
    static setAttributeValid(value) {
        return {
            type: SET_ATTRIBUTE_VALID,
            value: value
        }        
    }    

}

export default Actions;