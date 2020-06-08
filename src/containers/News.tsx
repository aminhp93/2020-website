import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { List, Avatar, Pagination, Modal } from 'antd';
import { get } from 'lodash';

import {
    getCompanyNewsUrl,
    getCompanyNewsCountUrl,
    getNewsContentUrl,
} from '../utils/request';
import { IStock, ICompanyNews } from '../types'

interface IProps {
    selectedSymbol: string,
    stocks: IStock,
    lastUpdatedDate: string,
    dataSource: [ICompanyNews?]
}

interface IState {
    CompanyNewsCountString: number,
    CompanyNewsArray: [ICompanyNews?],
    visible: boolean,
    NewsContent: string
}

class News extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            CompanyNewsCountString: 0,
            CompanyNewsArray: [],
            visible: false,
            NewsContent: ''
        }
    }

    componentDidMount() {
        // this.crawlData();
    }

    componentDidUpdate(preProps) {
        console.log('componentDidUpdate News', this.props, preProps)
        if (this.props.selectedSymbol !== preProps.selectedSymbol) {
            this.crawlData();
        }
    }

    crawlData = () => {
        const { selectedSymbol } = this.props;
        if (!selectedSymbol) return;
        axios({
            method: 'get',
            url: getCompanyNewsCountUrl(selectedSymbol),
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        CompanyNewsCountString: response.data
                    })
                }
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: getCompanyNewsUrl(selectedSymbol),
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        CompanyNewsArray: response.data
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
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    changePagination = (index) => {
        axios({
            method: 'get',
            url: getCompanyNewsUrl(index),
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        CompanyNewsArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        const {
            CompanyNewsCountString,
            // CompanyNewsArray,
            NewsContent
        } = this.state;
        const { dataSource } = this.props;
        return (
            <div>
                <div>TIN TỨC</div>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={dataSource}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    // title={<div onClick={() => this.showModal(item)}>{item.Title}</div>}
                                    title={<a href={item.NewsUrl} target="_blank" rel="noopener noreferrer">{item.Title}</a>}
                                    description={item.Description}
                                />
                            </List.Item>
                        )}
                    />
                    <Pagination defaultCurrent={1} total={CompanyNewsCountString} onChange={this.changePagination} />
                </div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {ReactHtmlParser(NewsContent)}
                </Modal>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(News);