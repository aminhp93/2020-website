import React from 'react';

import { Tabs, Input, Button, Select, Spin } from 'antd';
import { connect } from 'react-redux';

import './css/App.css';
import './css/EquityAndDividends.css';
import './css/Financial.css';
import './css/News.css';
import './css/Price.css';
import './css/Profile.css';
import './css/Stakeholder.css';
import './css/Technical.css';
import './css/Transaction.css';

import EquityAndDividends from './containers/EquityAndDividends/EquityAndDividends';
import Financial from './containers/Financial/Financial';
import News from './containers/News/News';
import Price from './containers/Price/Price';
import Profile from './containers/Profile/Profile';
import Stakeholder from './containers/Stakeholder/Stakeholder';
import Technical from './containers/Technical/Technical';
import Transaction from './containers/Transaction/Transaction';
import debounce from 'lodash/debounce';

import {
  setSymbol,
} from './actions/stock';

const { TabPane } = Tabs;
const { Option } = Select;

const SAMPLE_STOCK_LIST = [
  {
    Symbol: 'VND'
  },
  {
    Symbol: 'AAV'
  },
  {
    Symbol: 'VPB'
  }
]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: [],
      fetching: false,
    }

    this.lastFetchId = 0;
    this.fetchUser = debounce(this.fetchUser, 800);

  }

  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false,
    }, () => {
      value && value.length && this.props.setSymbol(value[0]['key']);
    });
  };


  fetchUser = value => {
    console.log('fetching user', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch('https://randomuser.me/api/?results=5')
      .then(response => response.json())
      .then(body => {
        if (fetchId !== this.lastFetchId) {
          // for fetch callback order
          return;
        }
        this.setState({ data: SAMPLE_STOCK_LIST, fetching: false });
      });
  };

  render() {
    const { fetching, data, value } = this.state;

    return (
      <div className="App">
        <div className="App-header">Header - Current Symbol {this.props.Symbol}</div>
        <div className="App-container">
          <div className="App-navigation">
            <Select
              mode="multiple"
              labelInValue
              value={value}
              placeholder="Select stock"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              filterOption={false}
              onSearch={this.fetchUser}
              onChange={this.handleChange}
              style={{ width: '100%' }}
            >
              {data.map(d => (
                <Option key={d.Symbol}>{d.Symbol}</Option>
              ))}
            </Select>
          </div>
          <div className="App-content">
            <div>Content</div>
            <div>
              <Tabs defaultActiveKey="7">
                <TabPane tab="Transaction" key="1">
                  <Transaction />
                </TabPane>
                <TabPane tab="Profile" key="2">
                  <Profile />
                </TabPane>
                <TabPane tab="Stakeholder" key="3">
                  <Stakeholder />
                </TabPane>
                <TabPane tab="EquityAndDividends" key="4">
                  <EquityAndDividends />
                </TabPane>
                <TabPane tab="News" key="5">
                  <News />
                </TabPane>
                <TabPane tab="Price" key="6">
                  <Price />
                </TabPane>
                <TabPane tab="Financial" key="7">
                  <Financial />
                </TabPane>
                <TabPane tab="Technical" key="8">
                  <Technical />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {}

}

const mapDispatchToProps = {
  setSymbol
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
