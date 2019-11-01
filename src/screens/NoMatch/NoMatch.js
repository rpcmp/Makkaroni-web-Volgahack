import React from 'react';
import { withRouter } from 'react-router-dom';

class NoMatch extends React.Component {
  render() {
    setTimeout(() => this.props.history.push('/'), 5000);
    return (
      <div>
        <h3 style={{ marginTop: 80 }}>
          No match for <code>{this.props.location.pathname}</code>
        </h3>
      </div>
    );
  }
}
export default withRouter(NoMatch);
