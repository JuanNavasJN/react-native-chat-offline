import React from 'react';
import {
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Item,
  Input,
  Button,
  Text,
  Icon,
} from 'native-base';
import Header from '../components/Header';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {vh, vw} from 'react-native-css-vh-vw';
import {useSelector} from 'react-redux';

const ProfileScreen = ({navigation}) => {
  const {content, bgCard, text, placeholder, bgBotton} = useSelector(
    state => state.colors,
  );
  return (
    <Container>
      <Header title="Profile" navigation={navigation} />
      <View style={[styles.content, {backgroundColor: content}]}>
        <View style={[styles.row2]}>
          <TouchableOpacity style={styles.avatar}>
            {/* <View//> */}
            <Icon
              type="MaterialIcons"
              name="camera-alt"
              style={[styles.icon, {color: text}]}
            />
          </TouchableOpacity>
        </View>
        <Card>
          <CardItem style={[{backgroundColor: bgCard}]}>
            <Body style={styles.body}>
              <Content>
                <View style={styles.row}>
                  <Item style={styles.item}>
                    <Input
                      placeholder="Name"
                      placeholderTextColor={placeholder}
                      style={{color: text}}
                    />
                  </Item>
                </View>
                <View style={styles.row}>
                  <Item style={styles.item}>
                    <Input
                      placeholder="Username"
                      placeholderTextColor={placeholder}
                      style={{color: text}}
                    />
                  </Item>
                </View>
                <View style={styles.row}>
                  <Item style={styles.item}>
                    <Input
                      placeholder="Password"
                      placeholderTextColor={placeholder}
                      style={{color: text}}
                    />
                  </Item>
                </View>
                <View style={styles.row}>
                  <Item style={styles.item}>
                    <Input
                      placeholder="Confirm Password"
                      placeholderTextColor={placeholder}
                      style={{color: text}}
                    />
                  </Item>
                </View>

                <View style={[styles.row, {marginTop: 20}]}>
                  <Button style={[styles.button, {backgroundColor: bgBotton}]}>
                    <Text>Save</Text>
                  </Button>
                </View>
              </Content>
            </Body>
          </CardItem>
        </Card>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {height: vh(50)},
  content: {
    height: '100%',
    // paddingTop: '25%',
    paddingHorizontal: '3%',
  },
  row: {
    width: vw(81),
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row2: {
    alignItems: 'center',
    marginVertical: vh(4),
  },
  button: {
    minWidth: vw(35),
    textAlign: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '100%',
  },
  avatar: {
    backgroundColor: '#E5E5E5',
    width: vw(30),
    height: vw(30),
    borderRadius: 100,
    elevation: 4,
    alignItems: 'flex-end',
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    elevation: 5,
    fontSize: 27,
  },
});

export default ProfileScreen;
