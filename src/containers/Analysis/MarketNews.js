import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';
import { List, Avatar, Pagination, Modal } from 'antd';

import {
    getMarketNewsUrl,
    getNewsContentUrl,
} from '../../utils/request';


class MarketNews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            NewsArray: []
        }
    }

    componentDidMount() {
        this.crawlData();
        setInterval(() => this.crawlData(), 10000)
    }

    crawlData = () => {
        axios({
            method: 'get',
            url: getMarketNewsUrl(),
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        NewsArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))
    }

    showModal = (data) => {
        this.setState({
            visible: true,
        });
        axios({
            method: 'get',
            url: getNewsContentUrl(data.NewsID),
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        NewsContent: response.data
                    })
                }
            })
            .catch(error => console.log(error))
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        const {
            NewsArray
        } = this.state;
        return (
            <div className="MarketNews">
                <div>TIN TỨC</div>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={NewsArray}
                        renderItem={item => {
                            const time = moment(Number(item.PublishTime.slice(6, 19))).format('DD/MM/YYYY hh:mm')
                            return (
                                <List.Item>
                                    <List.Item.Meta
                                        title={
                                            <div className="flex">
                                                <div className="MarketNews-time">{`${time}`}</div>
                                                <a href={`https://vietstock.vn/${item.URL}`} target="_blank">{item.Title}</a>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )
                        }}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        Symbol: state.stock.Symbol
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketNews);