let state = {
    //_path: "/",

    EntityId: "",
	Id: "",
    Certificate: "",
    SingleLogoutServices: [
        {
            Index: 0,
            Binding: "HTTP-POST",
            Location: ""
        }
    ],
    AssertionConsumerServices: [
        {
            Index: 0,
            IsDefault: true,
            Binding: "HTTP-POST",
            Location: ""
        }
    ],
    AttributeConsumingServices: [
        {
            Name: "",
            Description: "",
            RequestedAttribute: [
                
            ]
        }
    ],
    Organization: {
        Name: "",
        DisplayName: "",
        Url: ""
    }    
}

export default state;