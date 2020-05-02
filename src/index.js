import React, {useEffect, useCallback} from 'react';
import ChatScreen from './screens/ChatScreen';
import {getUser, createUser} from './db/index';
import {useDispatch, useSelector} from 'react-redux';
import Navigator from './Navigator';

const Index = () => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.main);

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

  useEffect(
    _ => {
      if (user === undefined) {
        setUserToRedux();
      }
    },
    [user],
  );
  return <Navigator />;
};

export default Index;
