import React, {Component} from 'react'
import { connect } from 'react-redux'
import Search from './search'
import Matches from './matches'
import SummonerInfo from './summonerInfo'

class App extends Component {
  render() {
    const { } = this.props

    return (
       <div>
        <Search />
        <SummonerInfo />
        <Matches />
       </div>
    );
  }
}
 
function mapStateToProps(state) {
  return state;
}
 
export default connect(mapStateToProps)(App)
