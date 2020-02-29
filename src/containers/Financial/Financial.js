import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Table, Button, Tabs } from 'antd';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import {
    getYearlyFinancialInfoUrl,
    getQuarterlyFinancialInfoUrl,
    getLastestFinancialReportsUrl,
} from '../../request';


const { TabPane } = Tabs;


const columns = [
    {
        title: 'Quy',
        dataIndex: 'Quarter',
        key: 'Quarter',
    },
    {
        title: '2016',
        dataIndex: '2016',
        key: '2016',
    },
    {
        title: '2017',
        dataIndex: '2017',
        key: '2017',
    },
    {
        title: '2018',
        dataIndex: '2018',
        key: '2018',
    },
    {
        title: '2019',
        dataIndex: '2019',
        key: '2019',
    },

];



class Financial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            YearlyFinancialInfoArray: [],
            QuarterlyFinancialInfoArray: [],
            LastestFinancialReportsArray: [],
            isFinancialReports: false,
        }
    }

    componentDidMount() {
        this.crawlData(this.props.Symbol);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps Financial', this.props, nextProps)
        if (this.props.Symbol !== nextProps.Symbol) {
            this.crawlData(nextProps.Symbol);
        }
    }

    crawlData = (symbol) => {
        if (!symbol) return;
        axios({
            method: 'get',
            url: getYearlyFinancialInfoUrl(symbol)
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        YearlyFinancialInfoArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: getQuarterlyFinancialInfoUrl(symbol)
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        QuarterlyFinancialInfoArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))


        axios({
            method: 'get',
            url: getLastestFinancialReportsUrl(symbol)
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        LastestFinancialReportsArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))
    }

    mapDataRevenueTable = (data) => {
        return [
            {
                'Quarter': 1,
                '2016': '2016-1',
                '2017': '2017-1',
                '2018': '2018-1',
                '2019': '2019-1'
            },
            {

                'Quarter': 2,
                '2016': '2016-2',
                '2017': '2017-2',
                '2018': '2018-2',
                '2019': '2019-2'
            }
        ];
    }

    handleOpenFinancialReports = () => {
        this.setState({
            isFinancialReports: true
        })
    }

    handleCloseFinancialReports = () => {
        this.setState({
            isFinancialReports: false
        })
    }

    renderRevenueTable = () => {
        const { QuarterlyFinancialInfoArray } = this.state;
        const mappeddata = this.mapDataRevenueTable(QuarterlyFinancialInfoArray);
        return <Table dataSource={mappeddata} columns={columns} pagination={false} />
    }

    renderRevenueChart = (index) => {
        const { QuarterlyFinancialInfoArray } = this.state;
        const data = QuarterlyFinancialInfoArray.sort((a, b) => {
            return a.Year !== b.Year ? a.Year - b.Year : a.Quarter - b.Quarter
        }).reverse().slice(0, 5).reverse()
        return (
            <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 50, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={'NetSales_MRQ'} fill="lightblue" />
            </BarChart>
        )
    }

    render() {
        if (this.state.isFinancialReports) {
            return (
                <div className="Financial">
                    <div>
                        <Button onClick={this.handleCloseFinancialReports}>Bao cao tai chinh</Button>
                    </div>
                    <div>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Ket qua kinh doanh" key="1">
                                Content of Tab Pane 1
                            </TabPane>
                            <TabPane tab="Can doi ke toan" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="Luu chuyen tien te truc tiep" key="3">
                                Content of Tab Pane 3
                            </TabPane>
                            <TabPane tab="Luu chuyen tien te gian tiep" key="4">
                                Content of Tab Pane 4
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            )
        }
        return (
            <div className="Financial">
                <div className="Financial-left-container">
                    <div className="Financial-revenue">
                        <div>
                            <div>
                                DOANH THU (TỶ)
                            </div>
                            <div>
                                <Button onClick={this.handleOpenFinancialReports}>Bao cao tai chinh</Button>
                            </div>
                        </div>
                        <div>
                            {this.renderRevenueTable()}
                            {this.renderRevenueChart()}
                        </div>
                    </div>
                    <div className="Financial-profit">
                        <div>
                            LỢI NHUẬN (TỶ)

                        </div>
                        <div>
                            LỢI NHUẬN (TỶ)

                        </div>
                    </div>
                </div>
                <div className="Financial-right-container">
                    <div>
                        CHỈ TIÊU TÀI CHÍNH
                    </div>
                    <div>

                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Financial);