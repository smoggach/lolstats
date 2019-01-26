import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = { matches: [] };
  }

  renderMatches(props) {
    const matches = props.matches;
    let matchItems = [];
    if (props.fetching) {
      return(<div className="lds-dual-ring" />)
    } else if (matches && matches.length) {
      for (let match of matches) {
        let runes = [];
        if (match.runes && match.runes.length) {
          for (let rune of match.runes) {
            runes.push(
              <div>
                {rune.runeId} <br />
                {rune.rank} <br />
              </div>
            )
          }
        }

        let items = [];
        for (let item of match.items) {
          items.push(
            <div>
              {item}
            </div>
          )
        }

        let winners = [];
        for (let winner of match.winners) {
          winners.push(
            <div>
              {winner.name} {winner.champId} <br />
            </div>
          )
        }

        let losers = [];
        for (let loser of match.losers) {
          losers.push(
            <div>
              {loser.name} {loser.champId} <br />
            </div>
          )
        }

        const matchDuration = moment.utc(moment.duration(match.duration * 1000).as('milliseconds')).format('HH:mm:ss');
        matchItems.push(
          <div className="flex-container">
            <div className="flex-item">
              {match.outcome} <br />
              {matchDuration} <br />
            </div>
            <div className="flex-item">
              {match.champName} <br />
              {match.champLevel} <br />
              {runes} <br />
            </div>
            <div className="flex-item">
              {match.kills}:{match.deaths}:{match.assists} <br />
              {match.kda}:1<br />
              {match.creepScore} <br />
              {match.creepScoreMinute} <br />
            </div>
            <div className="flex-item">
              {items}
            </div>
            <div className="flex-item">
              <div className="player-column"> {winners} </div>
              <div className="player-column"> {losers} </div>
            </div>
          </div>
        )
      }
    }

    return (<div>{matchItems}</div>)
  }

  render() {
    const { } = this.props

    return (
       <div className="container">
        <this.renderMatches matches={this.props.matches} fetching={this.props.isFetchingMatches}/>
       </div>
    );
  }
}
 
function mapStateToProps(state) {
  return state;
}
 
export default connect(mapStateToProps)(Matches)
