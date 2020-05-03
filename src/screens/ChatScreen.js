import React from 'react';
import {Container} from 'native-base';
import Header from '../components/Header';
import Chat from '../components/Chat';

const ChatScreen = ({navigation}) => {
  return (
    <Container>
      <Header title="Chat" navigation={navigation} />
      <Chat />
    </Container>
  );
};

export default ChatScreen;
