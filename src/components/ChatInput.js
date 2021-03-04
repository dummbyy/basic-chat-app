import { Button } from '@material-ui/core';
import { InputTwoTone } from '@material-ui/icons';
import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components';
import { db , auth } from '../firebase';

import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from 'firebase';
function ChatInput({kanalAdi, channelId, chatRef}) {

    const [input, setInput] = useState('')
    const [user] = useAuthState(auth);


    const sendMessage = e => {
        e.preventDefault(); // Prevents refresh


        if(!channelId){
            return false;
        }

        db.collection('odalar').doc(channelId).collection('mesajlar').add({
            mesaj: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            kullanici: user.displayName,
            kullaniciAvatar: user.photoURL
        });

        chatRef.current.scrollIntoView({
            behavior: "smooth",
        })

        setInput("");
    }



    return <ChatInputContainer>
        <form>
            <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${kanalAdi}`}/>
            <Button hidden type="submit" onClick={sendMessage}>
                SEND
            </Button>

        </form>
    </ChatInputContainer>
}

export default ChatInput

const ChatInputContainer = styled.div`
    border-radius:20x;

    > form {
        position: relative;
        display: flex;
        justify-content: center;
    }
    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        display: none !important;
    }

 
`;