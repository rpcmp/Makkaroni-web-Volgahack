import React, { Component } from 'react';
import Header from 'components/Header';
import monstr from 'assets/prazdnichny_chuvachok.png';
import API from '../../service/api';
import Typography from '@material-ui/core/Typography';

class DayPhrase extends Component {
  state = {
    citations: '',
    pushCount: 0,
  };

  componentDidMount() {
    try {
      setTimeout(async () => {
        const citations = await API.get(
          'http://192.168.1.98:8080/api/citations/random'
        );
        console.log(citations.data.content);
        const content = citations.data.content;
        this.setState({ citations: content });
      }, 1000);
    } catch (e) {
      this.setState({ citations: 'Произошел взлом ЖОПЫ' });
    }
  }

  render() {
    return (
      <div>
        <Header title="Маккаронни фор асс" history={this.props.history}>
          <div
            style={{
              width: '100%',
              height: '100%',
              marginTop: 70,
            }}
          >
            <Typography variant="h5">{this.state.citations}</Typography>
            <div style={{ marginLeft: 'auto', width: '100%' }}>
              <img
                style={{ position: 'absolute', right: 20, width: 350 }}
                src={monstr}
                alt=""
              />
            </div>
          </div>
        </Header>
      </div>
    );
  }
}

export default DayPhrase;
