import React from 'react';
import CodeMirror from 'react-codemirror2';
import "./style.css";

function view(me) { 
    
    return(
        <CodeMirror className="codeMirror"
            value={me.state.code} 
            options={me.options} 
            onValueChange={(value)=> { me.updateCode(value) }} 
        >
        </CodeMirror>
    );
};

export default view;