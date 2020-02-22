import React from 'react';
import './css/App.css';
import './css/Profile.css';
import { Tabs, Input } from 'antd';

import EquityAndDividends from './containers/EquityAndDividends/EquityAndDividends';
import Financial from './containers/Financial/Financial';
import News from './containers/News/News';
import Price from './containers/Price/Price';
import Profile from './containers/Profile/Profile';
import Stakeholder from './containers/Stakeholder/Stakeholder';
import Technical from './containers/Technical/Technical';
import Transaction from './containers/Transaction/Transaction';

const { TabPane } = Tabs;


class App extends React.Component {

  callback = (key) => {
    console.log(key);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">Header</div>
        <div className="App-container">
          <div className="App-navigation">
            Navigation
            <Input placeholder='Ma chung khoan' />
          </div>
          <div className="App-content">
            <div>Content</div>
            <div>
              <Tabs defaultActiveKey="2" onChange={this.callback}>
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

export default App;
