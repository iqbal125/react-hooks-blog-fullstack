import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import axios from 'axios';
import moment from 'moment';
import Context from '../utils/context';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

import '../App.css';
import '../styles/pagination.css';




const Posts = (props) => {
const context = useContext(Context)


const [stateLocal, setState] = useState({ posts: [],
                                          fetched: false,
                                          first_page_load: false,
                                          pages_slice: [1, 2, 3, 4, 5],
                                          max_page: null,
                                          items_per_page: 3,

                                          currentPage: 1,
                                          num_posts: null,
                                          posts_slice: null,
                                          posts_search: [],
                                          posts_per_page: 3
                                      })


  useEffect(() => {
   if(!context.postsState) {
      axios.get('/api/get/allposts')
        .then(res => context.handleAddPosts(res.data) )
        .catch((err) => console.log(err))
      }
    if (context.postsState && !stateLocal.fetched) {
      const indexOfLastPost = 1 * stateLocal.posts_per_page
      const indexOfFirstPost = indexOfLastPost - stateLocal.posts_per_page
      const last_page = Math.ceil(context.postsState.length/stateLocal.posts_per_page)

      setState({...stateLocal,
                fetched: true,
                posts: [...context.postsState],
                num_posts: context.postsState.length,
                max_page: last_page,
                posts_slice: context.postsState.slice(indexOfFirstPost,
                                                      indexOfLastPost)
                })
      }
    }, [context, stateLocal])


  useEffect(() => {
    let page = stateLocal.currentPage
    let indexOfLastPost = page * 3;
    let indexOfFirstPost = indexOfLastPost - 3;

    setState({...stateLocal,
              posts_slice: stateLocal.posts.slice(indexOfFirstPost,
                                                  indexOfLastPost) })
  }, [stateLocal.currentPage]) //eslint-disable-line




 const add_search_posts_to_state = (posts) => {
    setState({...stateLocal, posts_search: []});
    setState({...stateLocal, posts_search: [...posts]});
 }


const handleSearch = (event) => {
   setState({...stateLocal, posts_search: []});
   const search_query = event.target.value
   axios.get('/api/get/searchpost', {params: {search_query: search_query} })
     .then(res => res.data.length !== 0
                    ? add_search_posts_to_state(res.data)
                    : null )
     .catch(function (error) {
       console.log(error);
       })
   }



const RenderPosts = post => (
  <div >
  <Card >
    <CardHeader
      title={<Link to={{pathname:'/post/' + post.post.pid, state: {post}}}>
                {post.post.title}
              </Link> }
      subheader={
          <div className="FlexColumn">
            <div className="FlexRow">
            {  moment(post.post.date_created).format('MMMM Do, YYYY | h:mm a') }
            </div>
            <div className="FlexRow">
              By:
              <Link style={{paddingLeft: '5px', textDecoration: 'none'}}
                    to={{pathname:"/user/" + post.post.author, state:{post} }}>
               { post.post.author }
               </Link>
             </div>
             <div className="FlexRow">
              <i className="material-icons">thumb_up</i>
              <div className="notification-num-allposts"> {post.post.likes} </div>
            </div>
          </div>
          }
        />
    <br />
    <CardContent>
      <span style={{overflow: 'hidden' }}> {post.post.body} </span>
    </CardContent>
  </Card>
  </div>
)

const page_change = (page) => {
  window.scrollTo({top:0, left: 0, behavior: 'smooth'})

  //variables for page change
  let next_page = page + 1
  let prev_page = page - 1

  //handles general page change
  //if(state.max_page < 5 return null)
  if(page > 2 && page < stateLocal.max_page - 1) {
    setState({...stateLocal,
              currentPage: page,
              pages_slice: [prev_page - 1,
                            prev_page,
                            page,
                            next_page,
                            next_page + 1],
            })
   }
   if(page === 2 ) {
     setState({...stateLocal,
              currentPage: page,
               pages_slice: [prev_page,
                             page,
                             next_page,
                             next_page + 1,
                             next_page + 2],
             })
    }
   //handles use case for user to go back to first page from another page
   if(page === 1) {
     setState({...stateLocal,
              currentPage: page,
               pages_slice: [page,
                             next_page,
                             next_page + 1,
                             next_page + 2,
                             next_page + 3],
          })
   }
   //handles last page change
   if(page === stateLocal.max_page) {
     setState({...stateLocal,
               currentPage: page,
               pages_slice: [prev_page - 3,
                             prev_page - 2,
                             prev_page - 1,
                             prev_page,
                             page],
             })
   }
   if(page === stateLocal.max_page - 1) {
     setState({...stateLocal,
               currentPage: page,
               pages_slice: [prev_page - 2,
                             prev_page - 1,
                             prev_page,
                             page,
                             next_page],
             })
   }
 }



return(
    <div>
    <div style={{opacity: stateLocal.opacity, transition: 'opacity 2s ease'}}>
    <br />
    { context.authState
      ?  <Link to="/addpost">
            <Button variant="contained" color="primary">
              Add Post
            </Button>
          </Link>
      : <Link to="/signup">
            <Button variant="contained" color="primary">
              Sign Up to Add Post
            </Button>
          </Link>
        }
    </div>
    <br />
    <TextField
      id="search"
      label="Search"
      margin="normal"
      onChange={handleSearch}
    />
    <hr />
     <button onClick={() => console.log(stateLocal)}> Button </button>
     <button onClick={() => console.log(context)}> Button </button>
     <br />
     <div>
       {stateLocal.posts_search
         ? stateLocal.posts_search.map(post =>
           <RenderPosts key={post.pid + 1000} post={post} />
          )
          : null
        }
      </div>

    <h1>Posts</h1>
      <div>
        {stateLocal.posts_slice
          ? stateLocal.posts_slice.map(post =>
            <RenderPosts key={post.pid} post={post} />
           )
          : null
         }
      </div>
      <div>
          <div className="FlexRow">
              <button onClick={() => page_change(1) }> First </button>
              <button onClick={() => page_change(stateLocal.currentPage - 1) }> Prev </button>
                 {stateLocal.pages_slice.map((page) =>
                     <div
                       onClick={() => page_change(page)}
                       className={stateLocal.currentPage === page
                                     ? "pagination-active"
                                     : "pagination-item" }
                       key={page}>
                         {page}
                      </div>
                 )}
               <button onClick={() => page_change(stateLocal.currentPage + 1)}> Next </button>
               <button onClick={() => page_change(stateLocal.max_page)}> Last </button>
             </div>
       </div>
    </div>
)}


export default Posts;
