import React, { Component } from 'react'
import { connect } from 'react-redux'

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = { matches: [] };
  }

  render() {
    const { } = this.props

    return (
       <div className="container">
       </div>
    );
  }
}
 
function mapStateToProps(state) {
  return state;
}
 
export default connect(mapStateToProps)(Matches)
