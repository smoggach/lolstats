import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSummoner } from '../redux/actions'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: '', searchValue: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchValue != prevState.searchValue) {
      this.props.dispatch(fetchSummoner(this.state.searchValue));
    }
  }

  handleChange(event) {
    this.setState({ searchInput: event.target.value });
  }

  handleSubmit(event) {
    // TODO: validate input
    this.setState({ searchValue: this.state.searchInput });
    event.preventDefault();
  }

  render() {
    const { } = this.props

    return (
       <div className="container">
        <form onSubmit={ this.handleSubmit } >
          <input type="text" name="searchInput" onChange={ this.handleChange } />
          <input type="submit" name="searchButton" />
        </form>
       </div>
    );
  }
}
 
function mapStateToProps(state) {
  return state;
}
 
export default connect(mapStateToProps)(Search)
