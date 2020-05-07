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
