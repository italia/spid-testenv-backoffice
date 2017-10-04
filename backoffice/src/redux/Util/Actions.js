export const SET_BLOCKUI = "SET_BLOCKUI";
export const SET_APPLICATIONNAME = "SET_APPLICATIONNAME";

class Actions {

    static setBlockUI(value) {
        return {
            type: SET_BLOCKUI,
            value: value
        }        
    }
	
    static setUsersPageApplicationName(value) {
        return {
            type: SET_APPLICATIONNAME,
            value: value
        }        
    }	

}

export default Actions;