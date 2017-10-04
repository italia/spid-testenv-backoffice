import initialState from "./InitialState";
import * as Type from "./Actions";


function transitions(state = initialState, action) {
 
    switch(action.type) {

        case Type.SET_BLOCKUI:
            state = Object.assign({}, state, {
                blockUI: action.value
            });
            break;     
			
        case Type.SET_APPLICATIONNAME:
            state = Object.assign({}, state, {
                applicationName: action.value
            });
            break; 			
            
        default: 
            state = Object.assign({}, state);
            break;  
    }

    return state;
}

export default transitions;