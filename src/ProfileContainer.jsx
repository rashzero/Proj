import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';

class ProfileContainer extends React.Component {
  render() {
    return <Profile setUserTextActionObject={setUserTextActionObject} state={this.props.state} />;
  }
}

const setUserTextActionObject = (data) => ({
  type: 'CHANGE_USER',
  payload: data,
});

const mapStateToProps = (state) => ({
  state,
});

function mapDispatchToProps(dispatch) {
  return {
    setUserTextAction() {
      const UserTextActionResult = (data) => { setUserTextActionObject(data); };
      dispatch(UserTextActionResult);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
