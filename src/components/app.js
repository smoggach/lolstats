import React, {Component} from 'react'
import { connect } from 'react-redux'
import Search from './search'

class App extends Component {
  render() {
    const { } = this.props

    return (
       <div>
        <Search />
       </div>
    );
  }
}
 
function mapStateToProps(state) {
  return state;
}
 
export default connect(mapStateToProps)(App)
