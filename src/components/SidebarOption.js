import React from 'react';

import styled  from 'styled-components';
import { db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { enterRoom } from '../features/appSlice'
import { useDispatch } from 'react-redux';
function SidebarOption( { Icon , baslik, kanalAyar, id} ){

    const dispatch = useDispatch();
    const [channels, loading, error] = useCollection(db.collection("odalar"));
    // console.log(channels); 
    const kanalEkle = () => {
        const kanalAdi = prompt('Enter the channel name');
        if(kanalAdi){
            db.collection('odalar').add({
                name: kanalAdi,
            })
        }
    };

    const kanalSec = () => {
            if(id){
                dispatch(enterRoom({
                    roomId: id
                }));
            }
    };

      return (
         <SidebarOptionContainer onClick={kanalAyar ? kanalSec : kanalEkle}>

            {Icon && <Icon fontSize='small' style={{padding:10}}/>}
            {Icon ? (
                <h3>{baslik}</h3>
            ) : (
                <SidebarOptionChannel>
                    <span>#</span> {baslik}
                </SidebarOptionChannel>
            )}
         </SidebarOptionContainer>
    )
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
    display: flex;
    font-size:12px;
    align-items:center;
    padding-left:2px;
    cursor:pointer;

    :hover {
        opacity:0.9;
        background-color:#340e36;
    }

    > h3 {
        font-weight: 500;
    }

    > h3 > span {
        padding: 15px;

    }
`;

const SidebarOptionChannel = styled.h3`
    padding: 10px 0;
    font-weight:300; 
`;