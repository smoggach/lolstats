import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchMatches } from '../redux/actions'

class SummonerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
    let prevAccountId = prevProps.summoner && prevProps.summoner.accountId;
    let accountId = this.props.summoner && this.props.summoner.accountId;

    if (accountId != prevAccountId) {
      this.props.dispatch(fetchMatches(accountId))
    }
  }

  summonerInfo(props) {
    if (props.summoner) {
      const summonerName = props.summoner.name;
      const summonerLevel = props.summoner.summonerLevel;

      return (
        <div>
          <strong>Name:</strong> {summonerName} <br />
          <strong>Level:</strong> {summonerLevel} <br />
        </div>
      )
    }

    return(null)
  }

  render() {


    return (
       <div className="container">
        <this.summonerInfo summoner={this.props.summoner}/>
       </div>
    );
  }
}
 
function mapStateToProps(state) {
  return state;
}
 
export default connect(mapStateToProps)(SummonerInfo)
