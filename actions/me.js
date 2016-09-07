import superagent from 'superagent'

const loadMe = (dispatch) => {
  dispatch({
    type: 'FETCH_ME'
  })

  superagent.get('/me')
    .end((err, res) => {
      if (err) {
        return dispatch({
          type: 'FETCH_ME_ERROR'
        })
      }
      return dispatch({
        type: 'FETCH_ME_DONE',
        username: res.body.username
      })
    })
}

export {loadMe}
