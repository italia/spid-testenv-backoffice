import initialState from "./InitialState";
import * as Type from "./Actions";


function transitions(state = initialState, action) {
 
    switch(action.type) {

        case Type.SET_INFO_ENTITYID:
            state = Object.assign({}, state, {
                EntityId: action.value
            });
            break;
			
        case Type.SET_INFO_ID:
            state = Object.assign({}, state, {
                Id: action.value
            });
            break;			

        case Type.SET_INFO_CERTIFICATE:
            state = Object.assign({}, state, {
                Certificate: action.value
            });
            break;            

        case Type.SET_ORGANIZATION_NAME:
            state = Object.assign({}, state, {
                Organization: {
                    Name: action.value,
                    DisplayName: state.Organization.DisplayName,
                    Url: state.Organization.Url
                }
            });
            break;            

        case Type.SET_ORGANIZATION_DISPLAYNAME:
            state = Object.assign({}, state, {
                Organization: {
                    Name: state.Organization.Name,
                    DisplayName: action.value,
                    Url: state.Organization.Url
                }
            });
            break;            

        case Type.SET_ORGANIZATION_URL:
            state = Object.assign({}, state, {
                Organization: {
                    Name: state.Organization.Name,
                    DisplayName: state.Organization.DisplayName,
                    Url: action.value
                }
            });
            break; 

        case Type.SET_SPIDLEVEL:
            state = Object.assign({}, state, {
            		SPIDLevel: action.value
            });
            break; 				
            
        case Type.SET_ASSERTIONCONSUMERSERVICE:
            state = Object.assign({}, state, {
                AssertionConsumerServices: action.value
            });
            break;             

        case Type.SET_SINGLELOGOUT:
            state = Object.assign({}, state, {
                SingleLogoutServices: action.value
            });
            break;             

        case Type.SET_ATTRIBUTECONSUMINGSERVICE:
            state = Object.assign({}, state, {
                AttributeConsumingServices: action.value
            });
            break;             
            
            
        default: 
            state = Object.assign({}, state);
            break;  
    }

    return state;
}

export default transitions;