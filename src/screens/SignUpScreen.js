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

const SignUpScreen = ({navigation}) => {
  return (
    <Container>
      <Header title="Sign Up" />
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
                <View style={styles.row}>
                  <Item style={styles.item}>
                    <Input placeholder="Password" />
                  </Item>
                </View>
                <View style={styles.row}>
                  <Item style={styles.item}>
                    <Input placeholder="Confirm Password" />
                  </Item>
                </View>

                <View style={[styles.row, {marginTop: 20}]}>
                  <Button
                    style={styles.button}
                    onPress={_ => navigation.navigate('SignIn')}>
                    <Text>Sign In</Text>
                  </Button>
                  <Button style={styles.button}>
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
  body: {height: 350, width: 500},
  content: {
    backgroundColor: '#fafafa',
    height: '100%',
    paddingTop: '20%',
    paddingHorizontal: '3%',
  },
  row: {
    // backgroundColor: '#ccc',
    width: 300,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 2,
  },
  button: {
    minWidth: 120,
    textAlign: 'center',
    justifyContent: 'center',
  },
  item: {
    // backgroundColor: '#ccc',
    width: '100%',
  },
});

export default SignUpScreen;
