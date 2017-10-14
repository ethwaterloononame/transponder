import React, { Component } from 'react';
import { connect } from 'react-redux';

class Squawks extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.contract && !!nextProps.contract) {
      nextProps.contract.deployed().then((instance) => {
        instance.Squawk().watch((error, result) => {
          if (!error)
            console.log(result);
            this.props.onReceiveSquawk(result);         
        });
      });  
    }
  }

  render() {
    return (
      <ul>
        { this.props.squawks.log.map((squawk, index) => {
          return <li key={index}>{squawk.args._text}</li>
        }) }
        <li>test</li>
      </ul>
    )
  } 
}

const mapStateToProps = (state, ownProps) => {
  return {
    contract: state.contract,
    web3: state.web3.web3Instance,
    squawks: state.squawks
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onReceiveSquawk: squawk => {
      dispatch({
        type: 'SQUAWK_RECEIVED',
        squawk
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Squawks);
