import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
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

import {deleteAllMessages} from '../db/index';
const Index = ({title, navigation}) => {
  const [showMenu, setShowMenu] = useState(false);
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

  return (
    <View>
      <Header style={styles.header}>
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
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.row} onPress={_ => to('Profile')}>
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={_ => to('SignIn')}>
            <Text style={styles.text}>Log Out</Text>
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
    backgroundColor: '#f5f5f5',
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
