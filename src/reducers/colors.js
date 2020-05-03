const initialState = {
  mode: 'light',
  content: '#fafafa',
  bgCard: '#fff',
  text: '#696969',
  placeholder: '#b3b3b3',
  bgBotton: '#3949ab',
};

export default (state = initialState, {type, ...action}) => {
  switch (type) {
    case 'SET_COLOR_MODE':
      return {...state, mode: action.payload};
    case 'SET_CONTENT_COLOR':
      return {...state, content: action.payload};
    case 'SET_BGCARD_COLOR':
      return {...state, bgCard: action.payload};
    case 'SET_TEXT_COLOR':
      return {...state, text: action.payload};
    case 'SET_PLACEHOLDER_COLOR':
      return {...state, placeholder: action.payload};
    case 'SET_BGBOTTON_COLOR':
      return {...state, bgBotton: action.payload};
    default:
      return state;
  }
};
