import React, {useState, useEffect, useCallback} from 'react';
import {Platform, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector, useDispatch} from 'react-redux';
import userParse from '../utils/userParse';
import {createMessage, getUser} from '../db/index';

const Chat = _ => {
  const dispatch = useDispatch();

  const {messages, user} = useSelector(state => state.main);

  const pushMessages = useCallback(
    data => dispatch({type: 'PUSH_MESSAGES', payload: data}),
    [dispatch],
  );

  const [chat, setChat] = useState(null);

  useEffect(
    _ => {
      if (messages && user) {
        setChat(
          <GiftedChat
            messages={messages}
            onSend={onSend}
            user={userParse(user)}
          />,
        );
      }
    },
    [user, messages],
  );

  const onSend = messages => {
    // console.log(messages);
    pushMessages(messages);
  };

  if (Platform.OS === 'android') {
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        // behavior="padding"
        keyboardVerticalOffset={30}
        enabled>
        {chat}
      </KeyboardAvoidingView>
    );
  }
  return <SafeAreaView style={{flex: 1}}>{chat}</SafeAreaView>;
};

export default Chat;
