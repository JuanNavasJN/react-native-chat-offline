import React, {useEffect, useCallback, useState} from 'react';
import ChatScreen from './screens/ChatScreen';
import {getUser, getSetting} from './db/index';
import {useDispatch, useSelector} from 'react-redux';
import Navigator from './Navigator';
import {useDarkMode} from 'react-native-dark-mode';

const Index = () => {
  const dispatch = useDispatch();
  const isDarkMode = useDarkMode();

  const {user} = useSelector(state => state.main);
  const {mode} = useSelector(state => state.colors);

  const [settings, setSettings] = useState(undefined);

  const setUser = useCallback(
    data => dispatch({type: 'SET_USER', payload: data}),
    [dispatch],
  );

  const setMode = useCallback(
    data => dispatch({type: 'SET_COLOR_MODE', payload: data}),
    [dispatch],
  );

  const setUserToRedux = async _ => {
    // console.log('--- getUser ------');
    let userDB = await getUser();

    if (userDB) {
      // console.log('user seted-----', userDB);
      setUser(userDB);
      // deleteAllMessages();
    } else {
      // console.log('no hay user');
      // let newUser = await createUser({
      //   name: 'Juan Navas',
      //   username: 'jn',
      // });
      // console.log('userCreated: ', newUser.username, newUser.name);
    }

    // console.log('//--- getUser ------//');
  };

  useEffect(
    _ => {
      if (settings === undefined) {
        if (isDarkMode === true) {
          setMode('dark');
        } else if (isDarkMode === false) {
          setMode('light');
        }
      }
    },
    [isDarkMode],
  );

  useEffect(
    _ => {
      let config = getSetting();
      if (config !== undefined) {
        setSettings(config);
        if (typeof config.darkMode === 'boolean' && config.darkMode === true) {
          setMode('dark');
        } else if (
          typeof config.darkMode === 'boolean' &&
          config.darkMode === false
        ) {
          setMode('light');
        }
      }
    },
    [mode],
  );

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
