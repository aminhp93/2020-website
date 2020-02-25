import React from 'react';

import { Tabs, Input, Button } from 'antd';
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

import {
  setSymbol,
} from './actions/stock';

const { TabPane } = Tabs;


class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     SymbolInput: ''   
  //   }
  // }

  changeSymbol = () => {

  }

  handleSearch = () => {
    const value = this.inputRef && this.inputRef.state && this.inputRef.state.value;
    value && this.props.setSymbol(value);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">Header</div>
        <div className="App-container">
          <div className="App-navigation">
            Navigation
            <Input placeholder='Ma chung khoan' onChange={this.changeSymbol} ref={input => this.inputRef = input} />
            <Button onClick={this.handleSearch}>Search</Button>
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
