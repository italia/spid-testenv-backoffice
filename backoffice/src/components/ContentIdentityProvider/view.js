import React from 'react';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import AceEditor from 'react-ace';
import './style.css';

function view(me) { 
    return(

        <AceEditor
            mode="xml"
            theme="cobalt"
            name="AceEditor"
            className="AceEditor"
            defaultValue={me.state.xml}
            value={me.state.xml}
            readOnly={true}
            maxLines={10000}
            editorProps={{$blockScrolling: true}}
        />

    );
}

export default view;
