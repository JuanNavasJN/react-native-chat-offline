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

const SignInScreen = ({navigation}) => {
  return (
    <Container>
      <Header title="Sign In" navigation={navigation} />
      <View style={styles.content}>
        <Card>
          <CardItem>
            <Body style={styles.body}>
              <Content>
                <View style={styles.row}>
                  <Item style={styles.item}>
                    <Input placeholder="Name" />
                  </Item>
                </View>
                <View style={styles.row}>
                  <Item style={styles.item}>
                    <Input placeholder="Username" />
                  </Item>
                </View>

                <View style={[styles.row, {marginTop: 20}]}>
                  <Button
                    style={styles.button}
                    onPress={_ => navigation.navigate('Chats')}>
                    <Text>Login</Text>
                  </Button>
                  <Button
                    style={styles.button}
                    onPress={_ => navigation.navigate('SignUp')}>
                    <Text>Sign Up</Text>
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
  body: {height: 210, width: 500},
  content: {
    backgroundColor: '#fafafa',
    height: '100%',
    paddingTop: '25%',
    paddingHorizontal: '3%',
  },
  row: {
    width: 300,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    minWidth: 120,
    textAlign: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '100%',
  },
});

export default SignInScreen;
