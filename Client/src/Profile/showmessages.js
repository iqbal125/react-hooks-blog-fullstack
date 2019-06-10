import React, { useContext, useState, useEffect } from 'react';
import Context from '../utils/context';

import { Link } from 'react-router-dom';

import axios from 'axios';
import history from '../utils/history';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const ShowMessages = (props) => {
  const context = useContext(Context)

  const [messages, setMessages] = useState([])

  useEffect(() => {
    const username = context.dbProfileState[0].username
    axios.get('/api/get/usermessages', {params: {username: username}})
      .then(res =>  setMessages([...res.data]))
      .catch(function (error) {
          console.log(error);
        })
   }, [] )  //eslint-disable-line

   const RenderMessages = (props) => (
     <TableRow>
         <TableCell>
           <p> <strong>From: </strong>  {props.message.message_sender} </p>
           <p> <strong>Title </strong>   { props.message.message_title } </p>
           <p><strong> Message:</strong>  { props.message.message_body } </p>
           <small> { props.message.date_created } </small>
           <br />
           <Link to={{pathname:"/replytomessage", state:{props} }}>
               <button>
                  Reply
               </button>
            </Link>
           <button onClick={() => DeleteMessage(props.message.mid)}> Delete </button>
           <br />
           <br />
           <button onClick={() => history.goBack()}> Cancel </button>
        </TableCell>
       </TableRow>
   )

  const DeleteMessage = (mid) => {
    axios.delete('/api/delete/usermessage', { data: { mid: mid }})
    .then(res => console.log(res))
    .catch(function (error) {
        console.log(error);
      })
     .then(() => setTimeout( function() { history.replace('/') }, 700))
  }



  return (
    <div>
      <div className='FlexRow'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell> <strong> Messages </strong> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { messages
            ? messages.map( message =>
              <RenderMessages key={message.mid} message={message} />
            )
            : null
          }
         </TableBody>
        </Table>
      </div>
    </div>
  )
}



export default (ShowMessages);
