import initialState from "./InitialState";
import * as Type from "./Actions";


function transitions(state = initialState, action) {
 
    switch(action.type) {

        case Type.SET_INFO:
            state = Object.assign({}, state, {
                title: action.value.title,
                subtitle: action.value.subtitle,
                text: action.value.text,
                isOpen: action.value.isOpen,
				callbackOk: action.value.callbackOk
            });
            break;     
            
        default: 
            state = Object.assign({}, state);
            break;  
    }

    return state;
}

export default transitions;