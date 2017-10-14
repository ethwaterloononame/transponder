import React, { Component } from 'react';
import { connect } from 'react-redux';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Blockies from 'ethereum-blockies';

class Squawks extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.contract && !!nextProps.contract) {
      nextProps.contract.deployed().then((instance) => {
        instance.Squawk({fromBlock: 0, toBlock: 'latest'}).watch((error, result) => {
          if (!error)
            console.log(result);
            this.props.onReceiveSquawk(result);         
        });
      });  
    }
  }

  createAvatar(seed) {
    return Blockies.create({ // All options are optional
      seed: seed, // seed used to generate icon data, default: random
      size: 15, // width/height of the icon in blocks, default: 8
      scale: 3 // width/height of each block in pixels, default: 4
    });
  }

  render() {
    return (
      <List>
        { this.props.squawks.log.map((squawk, index) => {
          
          const icon = this.createAvatar(squawk.args._author);

          return <ListItem
            key={index}
            leftAvatar={ <Avatar src={icon.toDataURL()} /> }
            primaryText={squawk.args._author}
            secondaryText={squawk.args._text}
          />
        }) }
      </List>
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
