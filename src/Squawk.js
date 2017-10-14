import React, { Component } from 'react';
import { connect } from 'react-redux'

class Squawk extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.submitted) return;

    this.setState({submitted: true});

    this.props.web3.eth.getAccounts((err, accounts) => {
      if (err != null) {
        alert("There was an error fetching your accounts.");
        return;
      }

      if (accounts.length == 0) {
        alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      var account = accounts[0];

      var transponder;
      this.props.contract.deployed().then((instance) => {
        transponder = instance;
        return transponder.squawk(this.state.value, { from: account });
      }).then(() => {
        this.setState({submitted: false, value: ''});
        console.log("Transaction complete!");
      })

    });

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.value} onChange={this.handleChange}/>
        <input type="submit" value="Squawk" />
      </form>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    contract: state.contract,
    web3: state.web3.web3Instance
  }
}

export default connect(mapStateToProps, {})(Squawk);

