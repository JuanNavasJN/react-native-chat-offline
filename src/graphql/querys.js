import gql from 'graphql-tag';

export const USER_CREATE = gql`
  mutation UserCreate($data: UserCreateInput!) {
    userCreate(data: $data) {
      _id
      username
      name
    }
  }
`;

export const LOGIN = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      _id
      name
      username
      accessToken
      avatar
    }
  }
`;

export const USER_UPDATE = gql`
  mutation UpdateUser($accessToken: String!, $data: UserUpdateInput!) {
    userUpdate(accessToken: $accessToken, data: $data) {
      _id
      username
      name
      avatar
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      uri
    }
  }
`;

export const GET_CHATS = gql`
  query GetChats($token: String!) {
    getChats(accessToken: $token) {
      data {
        _id
        name
        avatar
        messages {
          _id
          text
          chat
          user
          sent
          pending
          received
          createdAt
          readed
        }
      }
    }
  }
`;

export const MESSAGE_CREATE = gql`
  mutation MessageCreate($token: String!, $data: MessageCreateInput!) {
    messageCreate(accessToken: $token, data: $data) {
      _id
      text
      user
      chat
      sent
      pending
      received
      readed
    }
  }
`;
