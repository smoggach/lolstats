import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { fetchMatches } from '../redux/actions'
import { getItemImg, getChampionName, getChampionImg } from '../utils/staticData'

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = { matches: [] };
  }

  fetchMoreMatches() {
    this.props.dispatch(fetchMatches(this.props.summoner.accountId, this.props.cursor));
  }

  renderMatches(props) {
    const matches = props.matches;
    let matchItems = [];
    if (props.fetching) {
      return(<div className="lds-dual-ring" />)
    } else if (matches && matches.length) {
      for (let match of matches) {
        const matchDuration = moment.utc(moment.duration(match.duration * 1000).as('milliseconds')).format('HH:mm:ss');
        const matchClass = `match flex-container ${match.outcome === "Win" ? "win" : "lose"}`;
        const champName = getChampionName(parseInt(match.champName));
        const champImgSrc = getChampionImg(champName);

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
          const imgSrc = getItemImg(item);
          items.push(
            <img src={imgSrc} className="item-img"/>
          )
        }

        let winners = [];
        for (let winner of match.winners) {
          const champImgSrc = getChampionImg(getChampionName(winner.champId));

          let winnerName = winner.name;
          if (winner.champId === match.champName) {
            winnerName = <strong>{winner.name}</strong>
          }

          winners.push(
            <div className="match-participant">
              <img src={champImgSrc} className="participant-img" /> {winnerName} <br />
            </div>
          )
        }

        let losers = [];
        for (let loser of match.losers) {
          const champImgSrc = getChampionImg(getChampionName(loser.champId));

          let loserName = loser.name;
          if (loser.champId === match.champName) {
            loserName = <strong>{loser.name}</strong>;
          }

          losers.push(
            <div className="match-participant">
              <img src={champImgSrc} className="participant-img" /> {loserName} <br />
            </div>
          )
        }


        matchItems.push(
          <div className={matchClass}>
            <div className="match-summary">
              {match.outcome} <br />
              {matchDuration} <br />
              <img src={champImgSrc} className="champ-img"/> <br />
              {champName} <br />
              <strong>Level: </strong>{match.champLevel} <br />
              {runes} <br />
            </div>
            <div className="match-stats">
              <strong>K:D:A</strong><br />
              {match.kills}:{match.deaths}:{match.assists} -- {match.kda}<br />
              <strong>cs:</strong> {match.creepScore} <br />
              <strong>cs/min:</strong> {match.creepScoreMinute} <br />
              <div className="match-items">
                {items}
              </div>
            </div>
            <div className="match-participants">
              <div className="player-column"><strong>Winners</strong><br /> {winners} </div>
              <div className="player-column"><strong>Losers</strong><br /> {losers} </div>
            </div>
          </div>
        )
      }
    }

    return (<div>{matchItems}</div>)
  }

  renderMore(props) {
    if (props.fetching) {
      return(<div className="lds-dual-ring" />)
    } else if (props.matches && props.matches.length && props.cursor) {
      return(<button type="button" onClick={props.click}>Show More</button>)
    }

    return(null)
  }

  render() {
    const { } = this.props

    return (
       <div className="container">
        <this.renderMatches matches={this.props.matches} fetching={this.props.isFetchingMatches}/>
        <this.renderMore
          matches={this.props.matches}
          fetching={this.props.isFetchingMoreMatches}
          cursor={this.props.cursor}
          click={this.fetchMoreMatches.bind(this)}/>
       </div>
    );
  }
}
 
function mapStateToProps(state) {
  return state;
}
 
export default connect(mapStateToProps)(Matches)
