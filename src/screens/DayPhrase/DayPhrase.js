import React, { Component } from 'react';
import Header from 'components/Header';
import Animation from './components/Animation';
import API from '../../service/api';
import Typography from '@material-ui/core/Typography';

class DayPhrase extends Component {
  state = {
    citations: '',
    pushCount: 0,
  };

  async componentDidMount() {
    try {
      const citations = await API.get('http://192.168.1.98:8080/api/citations');
      this.setState({ citations });
    } catch (e) {
      this.setState({ citations: 'Произошел взлом ЖОПЫ' });
    }
  }

  handleCounter = () => {
    let pushCount = this.state.pushCount;
    console.log('pushCount', pushCount);
    if (pushCount >= 4) {
      this.setState({ pushCount: 0 });
    }
    pushCount++;
    this.setState({ pushCount });
  };

  render() {
    return (
      <div>
        <Header title="Маккаронни фор асс" history={this.props.history}>
          <div style={{ marginTop: 70 }} onClick={this.handleCounter}>
            {this.state.pushCount >= 3 ? (
              <Typography variant="h5">{this.state.citations}</Typography>
            ) : (
              <>
                <Animation />
                Push ME
              </>
            )}
          </div>
        </Header>
      </div>
    );
  }
}

export default DayPhrase;
