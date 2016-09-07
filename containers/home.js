import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import {loadMe} from '../actions/me'
import style from './home.styl'

const mapStateToProps = (state) => {
  const {me: {username}} = state
  return {
    username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: () => {
      dispatch(loadMe)
    }
  }
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.onLoad()
  }
  render() {
    const {username} = this.props

    return (
      <div className={style.red}>
        {username}, this is the home page<br />
        <Link to="/contact">Go to contact page</Link>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
