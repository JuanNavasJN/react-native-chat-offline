import React, {useCallback, useEffect, useState} from 'react';
import {Container, Content} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import {
  createMessage,
  getAllMessages,
  deleteAllMessages,
  deleteMessage,
  getUser,
  createUser,
  updateUserById,
} from '../db/index';
import Header from '../components/Header';
import Chat from '../components/Chat';

const Index = () => {
  return (
    <Container>
      <Header />
      <Chat />
    </Container>
  );
};

export default Index;
