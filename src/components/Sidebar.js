import React from 'react';
import styled from 'styled-components';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CreateIcon from '@material-ui/icons/Create';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AppsIcon from '@material-ui/icons/Apps';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SidebarOption from './SidebarOption';
import AddIcon from '@material-ui/icons/Add';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Sidebar() {
    const [channels, loading, error] = useCollection(db.collection("odalar"));
    const [user] = useAuthState(auth);
    
    return(
        <SidebarContainer>
            <SidebarHeader>
                <SideBarInfo>
                    <h2>SJUHYEON CHAT</h2>
                    <h3>
                        <FiberManualRecordIcon/>
                        {user.displayName}
                    </h3>
                </SideBarInfo>
                <CreateIcon/>
            </SidebarHeader>

            <SidebarOption Icon={InsertCommentIcon} kanalAyar baslik="Mesajlar"/>
            <SidebarOption Icon={InboxIcon} kanalAyar baslik="Etiketlemeler & Tepkiler"/>
            <SidebarOption Icon={DraftsIcon} kanalAyar baslik="Kayıtlar"/>
            <SidebarOption Icon={BookmarkBorderIcon} kanalAyar baslik="Kanal arama"/>
            <SidebarOption Icon={PeopleAltIcon} kanalAyar baslik="Kullanıcılar & Kullanıcı grupları"/>
            <SidebarOption Icon={AppsIcon} kanalAyar baslik="Uygulama"/>
            <SidebarOption Icon={FileCopyIcon} kanalAyar baslik="Dosya arama"/>
            <SidebarOption Icon={ExpandLessIcon} kanalAyar baslik="Daha az göster"/>
            <hr />
            <SidebarOption Icon={ExpandMoreIcon} kanalAyar baslik="Kanallar"/>
            <hr />
            <SidebarOption Icon={AddIcon}  baslik="Kanal aç"/>

            {channels?.docs.map( doc => (
                <SidebarOption key={doc.id} id={doc.id} kanalAyar baslik={doc.data().name} />
            ))}
        </SidebarContainer>

    )   
}

export default Sidebar;

const SidebarContainer = styled.div`
    color:white;
    background-color: var(--slack-color);
    flex:0.3;
    border-top: 1px solid #49274b;
    max-width:260px;
    margin-top:60px;

    >hr {
        margin-top: 10px;
        margin-bottom:10px;
        border: 1px solid #49274b;
    }
`;

const SidebarHeader = styled.div`
    display:flex;
    border-bottom:1px solid #49274b;
    padding:13px;

    > .MuiSvgIcon-root{
        padding:8px;
        color:#49274b;
        font-size:18px;
        background-color:white;
        border-radius:999px;
    }
`;

const SideBarInfo = styled.div`
    flex:1;

    > h2{
        font-size:15px;
        font-weight:900;
        margin-bottom:5px;
    }

    > h3{
        display:flex;
        font-size:13px;
        font-weight:400;
        align-items:center;
    }
    > h3 > .MuiSvgIcon-root{
        font-size:13px;
        margin-top:1px;
        margin-right:2px;
        color:green;
    }
`;