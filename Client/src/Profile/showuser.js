import React, { useState, useEffect } from 'react';


import { Link } from 'react-router-dom';

import axios from 'axios';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import Button from '@material-ui/core/Button';


const ShowUser = (props) => {

  const [profile, setProfile ] = useState({})
  const [userPosts, setPosts ] = useState([])

  useEffect(() => {
    const username = props.location.state.post.post.author
    axios.get('/api/get/otheruserprofilefromdb', {params: {username: username}} )
      .then(res =>  setProfile({...res.data} ))
      .catch(function (error) {
          console.log(error);
        })
     axios.get('/api/get/otheruserposts', {params: {username: username}} )
       .then(res =>  setPosts([...res.data]))
       .catch(function (error) {
           console.log(error);
         })
      window.scrollTo({top: 0, left: 0})
    }, [props.location.state.post.post.author] )


  const RenderProfile = (props) => (
    <div>
      <div className="FlexRow">
         <h1>
            {props.profile.username}
         </h1>
         </div>
         <div className="FlexRow">
         <Link to={{pathname:"/sendmessage/", state:{props} }}>
             <Button variant="contained" color="primary" type="submit">
                Send Message
             </Button>
          </Link>
        </div>
    </div>
    );


  const RenderPosts = (post) => (
    <div>
     <Card className="CardStyles">
        <CardHeader
          title={<Link to={{pathname:"/post/" + post.post.pid, state: {post} }}>
                { post.post.title }
                </Link>}
          subheader={
                    <div>
                      <div >
                      {  moment(post.post.date_created).format('MMMM Do, YYYY | h:mm a') }
                      </div>
                      <div >{post.post.author}</div>
                    </div> }
        />
        <CardContent>
            <span style={{ overflow: 'hidden'}}>{ post.post.body } </span>
        </CardContent>
      </Card>
    </div>
  );


   return (
     <div>
     <div className="FlexRow">
        {profile
          ? <RenderProfile profile={profile} />
          : null
         }
     </div>

    <br />
    <hr className="style-two" />

     <h3> Latest Activity: </h3>
       <div className="FlexColumn">
       { userPosts ?
          userPosts.map(post =>
          <div key={ post.pid }>
             <RenderPosts  post={post} />
             <br />
          </div>
           )
       : null
       }
       </div>
     </div>
  )
}


export default (ShowUser);
