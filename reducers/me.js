const meReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_ME':
      return {
        ...state,
        fetchMeLoading: true
      }
    case 'FETCH_ME_DONE':
      return {
        ...state,
        username: action.username
      }
    case 'FETCH_ME_ERROR':
      return state
    default:
      return state
  }
}

export default meReducer
