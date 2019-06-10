import React, { useContext, useState } from 'react';
import axios from 'axios';
import history from '../utils/history';
import Context from '../utils/context';

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";




const EditPost = (props) => {
  const context = useContext(Context)

  const [stateLocal, setState] = useState({ title: props.location.state.post.post.title,
                                            body: props.location.state.post.post.body
                                          })


  const handleTitleChange = (event) => {
    setState({...stateLocal, title: event.target.value })
  }

  const handleBodyChange = (event) => {
    setState({...stateLocal, body: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const user_id = context.dbProfileState[0].uid
    const username = context.dbProfileState[0].username
    const pid = props.location.state.post.post.pid
    const title = event.target.title.value
    const body = event.target.body.value

    const data = {title: title,
                  body: body,
                  pid: pid,
                  uid: user_id,
                  username: username
                 }
    axios.put("/api/put/post", data)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .then(setTimeout(() => history.replace('/profile'), 700 ))
  }


    return(
        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              id='title'
              label='title'
              margin="normal"
              value={stateLocal.title}
              onChange={handleTitleChange}
            />
            <br />
            <TextField
              id='body'
              label='body'
              multiline
              rows="4"
              margin='normal'
              value={stateLocal.body}
              onChange={handleBodyChange}
              />
          <br />
          <button type="submit"> Submit </button>
          </form>
          <br />
          <Button onClick={() => history.goBack()}> Cancel </Button>
        </div>
    )}



export default EditPost;
