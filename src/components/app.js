import React, {Component} from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    const { } = this.props

    return (
       <div>
       </div>
    );
  }
}
 
function mapStateToProps(state) {
  return state;
}
 
export default connect(mapStateToProps)(App)
