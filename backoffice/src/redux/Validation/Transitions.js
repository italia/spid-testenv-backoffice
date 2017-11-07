import initialState from "./InitialState";
import * as Type from "./Actions";


function transitions(state = initialState, action) {
 
    switch(action.type) {

        case Type.SET_INFO_VALID:
            state = Object.assign({}, state, {
                info: action.value
            });
            break;     
			
        case Type.SET_LOGOUT_VALID:
            state = Object.assign({}, state, {
                logout: action.value
            });
            break;  		

        case Type.SET_ASSERTION_VALID:
            state = Object.assign({}, state, {
                assertion: action.value
            });
            break;  		

        case Type.SET_ATTRIBUTE_VALID:
            state = Object.assign({}, state, {
                attribute: action.value
            });
            break;  		
            
        default: 
            state = Object.assign({}, state);
            break;  
    }

    return state;
}

export default transitions;