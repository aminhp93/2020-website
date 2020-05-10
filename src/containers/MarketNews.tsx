import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { List, Avatar, Pagination, Modal, Tabs } from 'antd';
import { get } from 'lodash';


import News from './News';
import {
    getCompanyNewsUrl,
    getCompanyNewsCountUrl,
    getNewsContentUrl,
} from '../utils/request';
import { IStock, ICompanyNews } from '../types'
import {
    fetchNews
} from '../reducers/stocks';


const { TabPane } = Tabs;

interface IProps {
    selectedSymbol: string,
    stocks: IStock,
    lastUpdatedDate: string,
    fetchNews: any,
}

interface IState {
    newsDataSource: any,
    key: string
}

class MarketNews extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            newsDataSource: [],
            key: '1',
        }
    }

    componentDidMount() {
        this.crawlData();
    }

    componentDidUpdate(preProps) {
        console.log('componentDidUpdate News', this.props, preProps)
        if (this.props.selectedSymbol !== preProps.selectedSymbol) {
            this.crawlData();
        }
    }

    crawlData = () => {
        try {
            let type
            let group
            let startIndex = 5
            let count = 0
            switch (this.state.key) {
                case '1':
                    type = 'AllNews'

                    break;
                case '2':
                    type = 'PositiveNews'

                    break;
                case '3':
                    type = 'NegativeNews'

                    break;
                case '4':
                    type = 'NewsInGroup'
                    group = 1
                    break;
                case '5':
                    type = 'NewsInGroup'
                    group = 2
                    break;
                case '6':
                    type = 'NewsInGroup'
                    group = 3
                    break;
                case '7':
                    type = 'NewsInGroup'
                    group = 4
                    break;
                case '8':
                    type = 'NewsInGroup'
                    group = 5
                    break;
                case '9':
                    type = 'NewsInGroup'
                    group = 6
                    break;
                default:
                    break;

            }
            this.props.fetchNews({ type, group, startIndex, count })
        } catch (error) {
            console.log(error)
        }

    }


    render() {
        const {
            key,
            newsDataSource
        } = this.state;
        console.log(key)
        return (
            <div>
                <Tabs defaultActiveKey={key} onChange={(key) => this.setState({ key }, () => this.crawlData())}>
                    <TabPane tab="Moi nhat" key="1">
                        <News dataSource={newsDataSource} />
                    </TabPane>
                    <TabPane tab="Tich cuc" key="2">
                        <News dataSource={newsDataSource} />
                    </TabPane>
                    <TabPane tab="Tieu cuc" key="3">
                        <News dataSource={newsDataSource} />
                    </TabPane>
                    <TabPane tab="Thi truong" key="4">
                        <News dataSource={newsDataSource} />
                    </TabPane>
                    <TabPane tab="Doanh nghiep" key="5">
                        <News dataSource={newsDataSource} />
                    </TabPane>
                    <TabPane tab="Tai chinh" key="6">
                        <News dataSource={newsDataSource} />
                    </TabPane>
                    <TabPane tab="Kinh te" key="7">
                        <News dataSource={newsDataSource} />
                    </TabPane>
                    <TabPane tab="The gioi" key="8">
                        <News dataSource={newsDataSource} />
                    </TabPane>
                    <TabPane tab="Bat dong san" key="9">
                        <News dataSource={newsDataSource} />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedSymbol: get(state, 'selectedSymbol'),
        stocks: get(state, 'stocks'),
        lastUpdatedDate: get(state, 'lastUpdatedDate')
    }
}

const mapDispatchToProps = {
    fetchNews
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketNews);