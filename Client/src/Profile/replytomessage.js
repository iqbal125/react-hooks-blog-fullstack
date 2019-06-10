import React, { useContext } from 'react';
import Context from '../utils/context';
import axios from 'axios';
import history from '../utils/history';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const ReplytoMessage = (props) => {
  const context = useContext(Context)

  const handleSubmit = event => {
    event.preventDefault()
    const message_to_username = props.location.state.props.message.message_sender
    const message_from_username = context.dbProfileState[0].username
    const message_title = event.target.title.value
    const message_body = event.target.body.value

    const data = {message_sender: message_from_username,
                  message_to: message_to_username,
                  title: message_title,
                  body: message_body }
    axios.post('/api/post/messagetodb', data)
      .then(response => console.log(response))
      .catch(function (error) {
        console.log(error);
      })
      .then(setTimeout( function() { history.replace('/') }, 700))
     }

    return (
      <div>
      <h2> Message: </h2>
      <div className='FlexColumn'>
        <div>
          <p><strong>{props.location.state.props.message.message_title}</strong></p>
        </div>
        <div>
          <p>{props.location.state.props.message.message_body}</p>
        </div>
        <div>
          <small> By: {props.location.state.props.message.message_sender}</small>
        </div>
      </div>

      <div className="FlexRow">
        <form onSubmit={handleSubmit}>
          <TextField
            id="title"
            label="Title"
            margin="normal"
          />
          <br/>
            <TextField
            id="body"
            multiline
            rows="4"
            margin="normal"
          />
          <br/>
            <Button variant="contained" color="primary" type="submit" >Submit</Button>
        </form>
          <br />
        </div>
        <div className="FlexRow">
          <button className="CancelButton" onClick={() => history.replace('/')}> Cancel </button>
        </div>
      </div>
  );
}



export default (ReplytoMessage);
