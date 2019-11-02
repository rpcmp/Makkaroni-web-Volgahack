import React, { Component } from 'react';
import Header from 'components/Header';
import styled from 'styled-components';
import API from 'service/api';
import { YMaps, Map } from 'react-yandex-maps';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
`;

class ContributionMap extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <YMaps>
            <Map
              defaultState={{ center: [55.75, 37.57], zoom: 9 }}
              width={window.innerWidth}
              height={window.innerHeight - 71}
            />
          </YMaps>
        </Content>
      </Container>
    );
  }
}

export default ContributionMap;
