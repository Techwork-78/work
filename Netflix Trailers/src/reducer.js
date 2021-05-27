export const initialState = {
  user: null,
  isErr: false,
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_ERROR":
      return {
        ...state,
        isErr: action.isErr,
      };

    default:
      return state;
  }
};

export default reducer;
