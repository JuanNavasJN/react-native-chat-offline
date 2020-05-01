import React from 'react';
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

import {deleteAllMessages} from '../db/index';
const Index = _ => {
  const handlePress = _ => {
    deleteAllMessages();
  };

  return (
    <Header>
      <Left>
        <Button transparent>
          <Icon name="menu" />
        </Button>
      </Left>
      <Body>
        <Title>Header</Title>
      </Body>
      <Right>
        <Button danger onPress={handlePress}>
          <Text>Delete All</Text>
        </Button>
      </Right>
    </Header>
  );
};

export default Index;
