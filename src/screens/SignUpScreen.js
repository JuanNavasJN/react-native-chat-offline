import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Body,
  Button,
  Text,
  Content,
  Item,
  Input,
} from 'native-base';
import Header from '../components/Header';
import {vh, vw} from 'react-native-css-vh-vw';
import {useSelector} from 'react-redux';

const SignUpScreen = ({navigation}) => {
  const {content, bgCard, text, placeholder, bgBotton} = useSelector(
    state => state.colors,
  );
  return (
    <Container>
      <Header title="Sign Up" navigation={navigation} />
      <View style={[styles.content, {backgroundColor: content}]}>
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
                  <Button
                    style={[styles.button, {backgroundColor: bgBotton}]}
                    onPress={_ => navigation.navigate('SignIn')}>
                    <Text>Sign In</Text>
                  </Button>
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
    paddingTop: '20%',
    paddingHorizontal: '3%',
  },
  row: {
    width: vw(81),
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    minWidth: vw(32),
    textAlign: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '100%',
  },
});

export default SignUpScreen;
