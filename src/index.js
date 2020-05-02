import React, {useEffect, useCallback} from 'react';
import ChatScreen from './screens/ChatScreen';
import {getUser, createUser} from './db/index';
import {useDispatch} from 'react-redux';
import userParse from './utils/userParse';
const Index = () => {
  const dispatch = useDispatch();

  const setUser = useCallback(
    data => dispatch({type: 'SET_USER', payload: data}),
    [dispatch],
  );

  const setUserToRedux = async _ => {
    // console.log('--- getUser ------');
    let userDB = await getUser();

    if (userDB) {
      setUser(userDB);
      // deleteAllMessages();
    } else {
      console.log('no hay user');
      let newUser = await createUser({
        name: 'Juan Navas',
        username: 'jn',
      });

      console.log('userCreated: ', newUser.username, newUser.name);
    }

    // console.log('//--- getUser ------//');
  };
  useEffect(_ => {
    setUserToRedux();
  }, []);
  return <ChatScreen />;
};

export default Index;
