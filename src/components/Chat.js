import { InfoOutlined, StarBorderOutlined } from '@material-ui/icons'
import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import {  useSelector } from 'react-redux';
import { selectRoomId } from '../features/appSlice';
import ChatInput from './ChatInput';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import { kanalAdi , channelId } from './ChatInput';
import Message from './Message';
function Chat() {
    const chatRef = useRef(null);
    const roomId = useSelector(selectRoomId);
    const [roomDetails] = useCollection(
        roomId && db.collection('odalar').doc(roomId)
    )
    const [roomMessages, loading] = useCollection(
        roomId &&
        db
            .collection('odalar')
            .doc(roomId)
            .collection('mesajlar')
            .orderBy('timestamp', 'asc')
    )
        
    useEffect(() => {
        chatRef?.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [roomId, loading])

    return <ChatContainer>

         {roomDetails && roomMessages  && (
             <>
                

                      <Header> 
                          <HeaderLeft>
                              <h4><strong>#{roomDetails?.data().name}</strong></h4>
                              <StarBorderOutlined />
                          </HeaderLeft>
          
                          <HeaderRight>
                              <p>
                                  <InfoOutlined/> Details
                              </p>
                          </HeaderRight>
                      </Header>
          
                      <ChatMessages>
          
                          {roomMessages?.docs.map(doc => {
                              const { mesaj, timestamp, kullanici, kullaniciAvatar} = doc.data();
          
                              return (
                                  <Message
                                  key = {doc.id}
                                  message = {mesaj}
                                  timestamp = {timestamp}
                                  user = {kullanici}
                                  userImage = {kullaniciAvatar ? kullaniciAvatar : "https://www.pngitem.com/pimgs/m/279-2799324_transparent-guest-png-become-a-member-svg-icon.png"}
                                  />
                              )
                          })}
                          <ChatBottom ref={chatRef}/>
          
                      </ChatMessages>
                      <ChatInput
                      chatRef={chatRef}
                      kanalAdi={roomDetails?.data().name}
                      channelId={roomId} />      
                      </>
            )}
         </ChatContainer>
}

export default Chat

const ChatBottom = styled.div`
    padding-bottom: 100px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid lightgray;
`;

const ChatMessages = styled.div`
`;

const HeaderLeft = styled.div`
    display: flex;
    align-items:center;



    >h4 {
        display: flex;
        text-transform: lowercase;
    }
    >h4 > .MuiSvgIcon-root {
        margin-left: 10px;
        font-size: 18px;
    }
`;

const HeaderRight = styled.div`
    > p {
        display:flex;
        align-items:center;
        font-size: 14px;
    }

    > p > .MuiSvgIcon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`;


const ChatContainer = styled.div`
    flex:0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top:60px;
`;
