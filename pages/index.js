import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { chatClient } from '../stream';
import Loading from '../components/Loading';
import styled from 'styled-components';
import Modal from '../components/Modal';

import {
    Chat,
    Channel,
    Window,
    ChannelHeader,
    MessageList,
    MessageInput,
    Thread,
    LoadingIndicator,
    ChannelList,
    SearchInput,
    ChannelPreviewUIComponentProps
} from 'stream-chat-react'

import 'stream-chat-react/dist/css/index.css'
import { Avatar, Button, IconButton } from '@mui/material';
import { ChatBubbleOutline, MoreVertOutlined } from '@mui/icons-material';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import PlantAvatar from '../components/PlantAvatar';



const ChatScreen = () => {
    const [user, loading] = useAuthState(auth)
    const[client, setClient] = useState(null)
    const[isOpen, setIsOpen] = useState(false)

    const filters = { members: { $in: [ user.uid ] } }

    useEffect(() => {
        setClient(chatClient)
    }, [])

    const logOut = () => {
      chatClient.disconnect();
      signOut(auth)
    }

    const CustomList = (props) => {
      return(
        <>
        <Header>
          <UserAvatar 
          src={user.photoURL}
          onClick={logOut}
          />
          <IconsContainer>
            <IconButton>
            <ChatBubbleOutline />
            </IconButton>
            <IconButton>
            <MoreVertOutlined />
            </IconButton>
          </IconsContainer>
        </Header>
        <Button 
        variant="contained"
        style={{
          marginLeft: "10px",
          marginRight: "10px",
          marginTop: "10px",
        }}
        onClick={() => setIsOpen(true)}
        >Create a New Tock</Button>
        <Modal 
        open={isOpen}
        onClose={() => setIsOpen(false)}
        client={chatClient}
        >
        </Modal>
      <div
       style={{
        width: '300px',
        padding: '10px',
       }}
      >{props.children}</div>
        </>
      
      )
    }

    const CustomChannel = (ChannelPreviewUIComponentProps) => {
        const { channel, setActiveChannel, watchers, Avatar } = ChannelPreviewUIComponentProps;
        const array = Object.values(channel.state.members);
        const recipient = array.filter(person => person.user.name !== user.email)[0].user.name;
        
        return(
          <div style={{
            width: '100%',
            height: '50px',
            backgroundColor: '#EFEFEF',
            marginTop: '7px',
            marginBottom: '7px',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            cursor: 'pointer',
            height: '220px',
            paddingTop: '20px',
          }}
          onClick={() => setActiveChannel(channel, watchers)}
          >
            <PlantAvatar />
            <p>{recipient}</p>
            </div>
        )
    }

    if(!client) return <Loading />

    return(
        <div>
            <Chat client={client} theme="messaging light">
                <ChannelList 
                filters={filters} List={CustomList}
                showChannelSearch additionalChannelSearchProps={{ searchForChannels: true }}
                Preview={CustomChannel}
                />
                <Channel>
                    <Window>
                        <ChannelHeader />
                        <MessageList />
                        <MessageInput />
                    </Window>
                    <Thread />
                </Channel>
            </Chat>
        </div>
    )
}

export default ChatScreen

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: whitesmoke;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 16px;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  border-bottom: whitesmoke;

`;

const UserAvatar = styled(Avatar)`
  margin: 10px;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;



