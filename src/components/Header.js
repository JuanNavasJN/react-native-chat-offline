import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import {
  Header,
  Title,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Text,
} from 'native-base';
import {vh, vw} from 'react-native-css-vh-vw';
import {useSelector, useDispatch} from 'react-redux';

import {deleteAllMessages} from '../db/index';
const Index = ({title, navigation}) => {
  const [showMenu, setShowMenu] = useState(false);
  const {content, mode, bgBotton, text} = useSelector(state => state.colors);

  const dispatch = useDispatch();

  const setMode = useCallback(
    data => dispatch({type: 'SET_COLOR_MODE', payload: data}),
    [dispatch],
  );

  const setContent = useCallback(
    data => dispatch({type: 'SET_CONTENT_COLOR', payload: data}),
    [dispatch],
  );

  const setBgCard = useCallback(
    data => dispatch({type: 'SET_BGCARD_COLOR', payload: data}),
    [dispatch],
  );

  const setText = useCallback(
    data => dispatch({type: 'SET_TEXT_COLOR', payload: data}),
    [dispatch],
  );

  const setPlaceholder = useCallback(
    data => dispatch({type: 'SET_PLACEHOLDER_COLOR', payload: data}),
    [dispatch],
  );

  const setBgBotton = useCallback(
    data => dispatch({type: 'SET_BGBOTTON_COLOR', payload: data}),
    [dispatch],
  );

  useEffect(
    _ => {
      if (mode === 'light') {
        setLightColors();
      } else if (mode === 'dark') {
        setDarkColors();
      }
    },
    [mode],
  );

  const handlePress = _ => {
    deleteAllMessages();
  };

  const handleMenu = _ => {
    setShowMenu(!showMenu);
  };

  const to = screen => {
    setShowMenu(false);
    navigation.navigate(screen);
  };

  const setDarkColors = _ => {
    setContent('#1e1e24');
    setBgCard('#232336');
    setText('#fff');
    setPlaceholder('#787878');
    setBgBotton('#2d2d33');
  };

  const setLightColors = _ => {
    setContent('#fafafa');
    setBgCard('#fff');
    setText('#696969');
    setPlaceholder('#b3b3b3');
    setBgBotton('#3949ab');
  };

  const handleMode = mode => {
    setShowMenu(false);
    setMode(mode);
  };

  return (
    <View>
      <Header
        androidStatusBarColor={bgBotton}
        style={[styles.header, {backgroundColor: bgBotton}]}>
        <Left>
          <Button transparent onPress={handleMenu}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right>
          {title === 'Chat' && (
            <Button danger onPress={handlePress}>
              <Text>Delete All</Text>
            </Button>
          )}
        </Right>
      </Header>
      {showMenu && (
        <View style={[styles.menuContainer, {backgroundColor: content}]}>
          <TouchableOpacity style={styles.row} onPress={_ => to('Profile')}>
            <Text style={[styles.text, {color: text}]}>Profile</Text>
          </TouchableOpacity>
          {mode === 'light' ? (
            <TouchableOpacity
              style={styles.row}
              onPress={_ => handleMode('dark')}>
              <Text style={[styles.text, {color: text}]}>Dark Mode</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.row}
              onPress={_ => handleMode('light')}>
              <Text style={[styles.text, {color: text}]}>Light Mode</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.row} onPress={_ => to('SignIn')}>
            <Text style={[styles.text, {color: text}]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: vh(8),
  },
  menuContainer: {
    position: 'absolute',
    // backgroundColor: '#f5f5f5',
    // height: vh(10),
    top: vh(8.3),
    left: 4,
    width: vw(45),
    zIndex: 9,
    borderWidth: 0.3,
    borderColor: '#d4d4d4',
    elevation: 1,
    paddingVertical: vh(2),
  },
  row: {
    // backgroundColor: '#fafafa',
    paddingLeft: vw(3),
    marginVertical: vh(1.5),
  },
  text: {
    color: '#757575',
  },
});

export default Index;
