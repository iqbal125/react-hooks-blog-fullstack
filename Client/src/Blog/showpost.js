import React, { useContext, useState, useEffect } from 'react';


import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../utils/history';
import Context from '../utils/context';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';




const ShowPost = (props) => {
  const context = useContext(Context)

  const [stateLocal, setState] = useState({ comment: '',
                                            fetched: false,
                                            cid: 0,
                                            delete_comment_id: 0,
                                            edit_comment_id: 0,
                                            edit_comment: '',
                                            comments_arr: null,
                                            cur_user_id: null,
                                            like_post: true,
                                            likes: 0,
                                            like_user_ids: [],
                                            post_title: null,
                                            post_body: null,
                                            post_author: null,
                                            post_id: null
                                           })



    useEffect(() => {
      if(props.location.state && !stateLocal.fetched) {
        console.log('tttt')
        setState({...stateLocal,
                  fetched: true,
                  likes: props.location.state.post.post.likes,
                  like_user_ids: props.location.state.post.post.like_user_id,
                  post_title: props.location.state.post.post.title,
                  post_body: props.location.state.post.post.body,
                  post_author: props.location.state.post.post.author,
                  post_id: props.location.state.post.post.pid})
        }
      }, [stateLocal,
          props.location])

  useEffect( () => {
    if(!props.location.state && !stateLocal.fetched) {
      console.log('yyyy')
      const post_id = props.location.pathname.substring(6)

      axios.get('/api/get/post',
                  {params: {post_id: post_id}} )
        .then(res => res.data.length !== 0
                ?   setState({...stateLocal,
                        fetched: true,
                        likes: res.data[0].likes,
                        like_user_ids: res.data[0].like_user_id,
                        post_title: res.data[0].title,
                        post_body: res.data[0].body,
                        post_author: res.data[0].author,
                        post_id: res.data[0].pid
                      })
                 : null
              )
        .catch((err) => console.log(err) )
    }
  }, [stateLocal,
      props.location])

   useEffect(() => {
     if(!stateLocal.comments_arr) {
       if(props.location.state) {
         const post_id = props.location.pathname.substring(6)
         axios.get('/api/get/allpostcomments',
                     {params: {post_id: post_id}} )
           .then(res => res.data.length !== 0
                          ? setState({...stateLocal, comments_arr: [...res.data]})
                          : null )
           .catch((err) => console.log(err))
       } 
     }
   }, [props.location, stateLocal])


    const handleCommentSubmit = (submitted_comment) => {
        if(stateLocal.comments_arr) {
            setState({...stateLocal, comments_arr: [submitted_comment,
                                                  ...stateLocal.comments_arr]})
         } else {
           setState({...stateLocal, comments_arr: [submitted_comment]})
         }
     };

     const handleCommentUpdate = (comment) => {
       const commentIndex = stateLocal.comments_arr.findIndex(com => com.cid === comment.cid)
       var newArr = [...stateLocal.comments_arr ]
       newArr[commentIndex] = comment

       setTimeout(() => setState({...stateLocal, comments_arr: [...newArr], edit_comment_id: 0 }), 100)
     };


     const handleCommentDelete = (cid) => {
       setState({...stateLocal, delete_comment_id: cid})
       const newArr = stateLocal.comments_arr.filter(com => com.cid !== cid)
       setState({...stateLocal, comments_arr: newArr})
     };

     const handleEditFormClose = () => {
       setState({...stateLocal, edit_comment_id: 0})
     }


    const RenderComments = (props) => {
      return(
      <div className={stateLocal.delete_comment_id === props.comment.cid
                        ? "FadeOutComment"
                        : "CommentStyles"}>
        <div>
        <p>{props.comment.comment} </p>
        <small>
          { props.comment.date_created === 'Just Now'
            ?  <div> {props.comment.isEdited
                  ? <span> Edited </span>
                  : <span> Just Now </span> }</div>
            :  props.comment.date_created
          }
        </small>
        <p> By: { props.comment.author} </p>
        </div>
        <div>
        {props.cur_user_id === props.comment.user_id
          ? !props.isEditing
            ?  <div>
                  <Button onClick={() => setState({...stateLocal,
                                                  edit_comment_id: props.comment.cid,
                                                  edit_comment: props.comment.comment
                                                  })
                                     }>
                     Edit
                   </Button>
                </div>
            :   <form onSubmit={(event, cid) => handleUpdate(event, props.comment.cid) }>
                  <input
                    autoFocus={true}
                    name="edit_comment"
                    id="editted_comment"
                    label="Comment"
                    value={stateLocal.edit_comment}
                    onChange={handleEditCommentChange}
                  />
                    <br />
                    <Button type='submit'>
                       Agree
                    </Button>
                    <Button type="button" onClick={handleEditFormClose}>
                     Cancel
                    </Button>
                    <button onClick={() => handleDeleteComment(props.comment.cid)}>
                      Delete
                    </button>
                  </form>
            : null }
          </div>
      </div>
    );
   }



    const handleEditCommentChange = (event) => (
      setState({...stateLocal,
                edit_comment: event.target.value})
    );


    const handleSubmit = (event) => {
      event.preventDefault()
      setState({...stateLocal, comment: ''})

      const comment = event.target.comment.value
      const user_id = context.dbProfileState[0].uid
      const username = context.dbProfileState[0].username
      const post_id = stateLocal.post_id
      const current_time = "Just Now"
      const temp_cid = Math.floor(Math.random() * 1000);

      const submitted_comment = {cid: temp_cid,
                                 comment: comment,
                                 user_id: user_id,
                                 author: username,
                                 date_created: current_time }

      const data = {comment: event.target.comment.value,
                    post_id: post_id,
                    user_id: user_id,
                    username: username}

      axios.post('/api/post/commenttodb', data)
        .then(res => console.log(res))
        .catch((err) => console.log(err))
      window.scroll({top: 0, left: 0, behavior: 'smooth'})
      handleCommentSubmit(submitted_comment)
    }

    const handleUpdate = (event, cid) => {
      event.preventDefault()
      console.log(event)
      console.log(cid)
      const comment = event.target.editted_comment.value
      const comment_id = cid
      const post_id = stateLocal.post_id
      const user_id = context.dbProfileState[0].uid
      const username = context.dbProfileState[0].username
      const isEdited = true
      const current_time = "Just Now"

      const edited_comment = {cid: comment_id,
                              comment: comment,
                              user_id: user_id,
                              author: username,
                              date_created: current_time,
                              isEdited: isEdited }

      const data = {cid: comment_id,
                    comment: comment,
                    post_id: post_id,
                    user_id: user_id,
                    username: username}

      axios.put('/api/put/commenttodb', data)
        .then(res => console.log(res))
        .catch((err) => console.log(err))
      handleCommentUpdate(edited_comment);
    }

    const handleDeleteComment = (cid) => {
      const comment_id = cid
      console.log(cid)
      axios.delete('/api/delete/comment', {data: {comment_id: comment_id}} )
        .then(res => console.log(res))
        .catch((err) => console.log(err))
      handleCommentDelete(cid)
    }

    const handleLikes = () => {
        const user_id = context.dbProfileState[0].uid
        const post_id = stateLocal.post_id

        const data = { uid: user_id, post_id: post_id }
        console.log(data)
        if(!stateLocal.like_user_ids.includes(user_id)) {
        	axios.put('/api/put/likes', data)
          		.then( !stateLocal.like_user_ids.includes(user_id)
          					&& stateLocal.like_post
                    ? setState({...stateLocal,
                                likes: stateLocal.likes + 1,
                                like_post: false})
                    : null )
          		.catch(err => console.log(err))
      };
     }


    return(
        <div>
          <div>
            <h2>Post</h2>
            {stateLocal.comments_arr || props.location.state
              ? <div>
                  <p>{stateLocal.post_title}</p>
                  <p>{stateLocal.post_body}</p>
                  <p>{stateLocal.post_author}</p>
                </div>
            : null
           }

              <div style={{cursor: 'pointer'}} onClick={context.authState
                                                        ? () => handleLikes()
                                                        : () => history.replace('/signup')}>
                  <i className="material-icons">thumb_up</i>
                  <small className="notification-num-showpost">
                    {stateLocal.likes}
                  </small>
                </div>
          </div>
          <div>

            <h2> Comments:</h2>
            {stateLocal.comments_arr
              ? stateLocal.comments_arr.map((comment) =>
                 <RenderComments comment={comment}
                                 cur_user_id={context.dbProfileState
                                                ? context.dbProfileState[0].uid
                                                : null  }
                                 key={comment.cid}
                                 isEditing={comment.cid === stateLocal.edit_comment_id
                                              ? true
                                              : false }
                       />)
              : null
            }
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <TextField
                id="comment"
                label="Comment"
                margin="normal"
              />
              <br />
              <div>
                {console.log('hhhhh')}
              </div>
              {context.authState
                ? <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                : <Link to="/signup">
                     <Button  variant="contained" color="primary">
                         Signup to Comment
                      </Button>
                   </Link>
               }
            </form>
          </div>
          <div>
          </div>
        </div>
    )}




export default ShowPost;

