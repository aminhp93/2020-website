import React from 'react';
import axios from 'axios';
import { List, Avatar, Pagination, Modal } from 'antd';
import ReactHtmlParser from 'react-html-parser';

import {
    getCompanyNewsUrl,
    getCompanyNewsCountUrl,
    getNewsContentUrl,
} from '../../request';


export default class News extends React.Component {
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
        axios({
            method: 'get',
            url: getCompanyNewsCountUrl(),
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
            url: getCompanyNewsUrl(),
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
            CompanyNewsArray,
            NewsContent
        } = this.state;
        return (
            <div>
                <div>TIN TỨC</div>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={CompanyNewsArray}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={<div onClick={() => this.showModal(item)}>{item.Title}</div>}
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