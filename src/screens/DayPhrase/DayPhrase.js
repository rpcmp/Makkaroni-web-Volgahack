import React, { Component } from 'react';
import Header from 'components/Header';

class DayPhrase extends Component {
  render() {
    return (
      <div>
        <Header history={this.props.history}>DayPhrase</Header>
      </div>
    );
  }
}

export default DayPhrase;
