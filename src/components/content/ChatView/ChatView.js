import React from 'react'
import Typography from "@material-ui/core/Typography"

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

function ChatView (props){
    return (
        <div {...props}>
            <Typography variant="h1" align='center'>
                This is the Chat view
            </Typography>
        </div>
    )
}

export default ChatView