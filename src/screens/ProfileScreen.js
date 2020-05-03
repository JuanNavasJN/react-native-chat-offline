import React from 'react';
import {Container} from 'native-base';
import Header from '../components/Header';

const ProfileScreen = ({navigation}) => {
  return (
    <Container>
      <Header title="Profile" navigation={navigation} />
    </Container>
  );
};

export default ProfileScreen;
