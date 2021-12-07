import { SearchOutlined, AttachFile,InsertEmoticon, MicNone } from "@material-ui/icons";
import axios from "./axios";
import React, { useState, useRef, useEffect  } from "react";
import "./Chat.css";


function Chatbody({ messages, name, toName }) {
  const msgsender = "chat_reciever chat_message ";
  const msgreciever = "chat_message";
  const [input, setinput] = useState([]);
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  // const [newmessages, setnewMessages]= useState([]); 
  // setnewMessages(messages);
    const sendMessage= async(e)=>{
      e.preventDefault();
        await axios.post('/messages/new',{
          message: input,
          name: name,
          toname: toName,
          timestamp: Date(),
          recieved: true
        });
        setinput("");
      
        // await axios.get('/messages/sync').then((response) =>{
        //   setnewMessages(response.data)
        // })
    };

    return (
        <div className="container">
            <div className="chat_body">

{/* {
name === messages.name &&
//  toName === messages.name) 
<div> */}
{
  messages.map(msg => (
    // let isUser = (name === message.name); 
    <p className={(name === msg.name) ? msgsender : msgreciever}>
    <span className="chat_name">{msg.name}</span>
    {msg.message}
              <span className="chat_timestamp">{msg.timestamp}</span>
  </p>
  ))
}
<div ref={messagesEndRef} />
</div>     
<div className="chat_footer">
    <InsertEmoticon />
    <form>
        <input value={input} onChange={e=> setinput(e.target.value)} placeholder="Type a message" type="text" />
        <button onClick={sendMessage} type="submit"> send a message</button>
    </form>
    <MicNone/>
</div>
        </div>
    )
}

export default Chatbody
