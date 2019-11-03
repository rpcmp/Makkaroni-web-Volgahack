import React, { Component } from 'react';
import Header from 'components/Header';
import Item from './components/Item';
import List from '@material-ui/core/List';
import lodash from 'lodash';
import API from 'service/api';
import Logotype from '../../components/Logotype';
import Typography from '@material-ui/core/Typography';

class Search extends Component {
  state = {
    itemsList: [],
    searchValue: '',
  };

  sendRequest = async () => {
    try {
      const { searchValue } = this.state;
      if (searchValue) {
        const keywords = JSON.stringify(searchValue.trim().split(' '));
        const response = await API.get(`citations?keywords=${keywords}`);
        this.setState({ itemsList: response.data });
      }
    } catch (e) {
      console.log(e);
    }
  };

  debouncedOnChange = lodash.debounce(this.sendRequest, 200);

  handleSearch = async event => {
    const value = event.target.value;
    this.setState({ searchValue: value });
    this.debouncedOnChange();
  };

  renderItem = ({ _id, content, keywords }) => (
    <>
      {console.log(keywords)}
      <Item key={_id} keywords={keywords} content={content} />
    </>
  );

  renderPlaceholder = () => {
    if (this.state.searchValue) {
      return 'Ничего не найдено';
    }
    return (
      <div>
        <Typography variant="h1" component="h2">
          <Logotype size={150} style={{ marginBottom: -20 }} />
          akkaroni
        </Typography>
        <Typography variant="h2" component="h2">
          Добро пожаловать на лукоморье для <b>маккаронников</b>!
        </Typography>
        <div
          style={{
            marginTop: 20,
          }}
        >
          <Typography variant="h5">Введите запрос</Typography>
        </div>
      </div>
    );
  };

  render() {
    const { itemsList, searchValue } = this.state;
    /// const classes = useStyles();
    return (
      <div>
        <Header
          history={this.props.history}
          inputProps={{
            type: 'text',
            value: searchValue,
            onChange: this.handleSearch,
          }}
        >
          <List
            style={{
              width: '100%',
            }}
          >
            {itemsList && itemsList.length
              ? itemsList.map(item => {
                  console.log(item);
                  return this.renderItem(item);
                })
              : this.renderPlaceholder()}
          </List>
        </Header>
      </div>
    );
  }
}

export default Search;
