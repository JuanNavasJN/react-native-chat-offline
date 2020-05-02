import React from 'react';
import {Container} from 'native-base';
import Header from '../components/Header';
import Chat from '../components/Chat';

const ChatScreen = () => {
  return (
    <Container>
      <Header title="Chat" />
      <Chat />
    </Container>
  );
};

export default ChatScreen;
