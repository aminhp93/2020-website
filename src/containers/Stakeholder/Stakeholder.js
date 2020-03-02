import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Tabs, Table } from 'antd';
import {
    PieChart, Pie,
} from 'recharts';

import {
    getMajorHoldersUrl,
    getMajorHolderTransactionsUrl,
    getMajorHolderTransactionsRangeUrl,
} from '../../request';

const { TabPane } = Tabs;

const allMajorColumns = [
    {
        title: 'TEN',
        render: params => {
            return `${params.Name} | ${params.Position}`
        }
    },
    {
        title: 'SO CP',
        render: params => {
            return params.Shares
        }
    },
    {
        title: 'TY LE',
        render: params => {
            return params.Ownership
        }
    },
    {
        title: 'NGAY CAP NHAT',
        render: params => {
            return params.Reported
        }
    },
]

const data01 = [
    { name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 },
];
const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'C1', value: 100 },
    { name: 'C2', value: 200 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 },
];

class Stakeholder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MajorHoldersArray: [],
        }
    }

    componentDidMount() {
        this.crawlData(this.props.Symbol);
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps Stakeholder', this.props, nextProps)
        if (this.props.Symbol !== nextProps.Symbol) {
            this.crawlData(nextProps.Symbol);
        }
    }

    crawlData = (symbol) => {
        if (!symbol) return;
        axios({
            method: 'get',
            url: getMajorHoldersUrl(symbol)
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        MajorHoldersArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: getMajorHolderTransactionsUrl(symbol),
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        MajorHolderTransactionsArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: getMajorHolderTransactionsRangeUrl(symbol)
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        MajorHolderTransactionsRangeArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))
    }

    render() {
        const {
            MajorHoldersArray
        } = this.state;
        const MajorIndividualHoldersArray = MajorHoldersArray.filter(i => !i.IsOrganization)
        const MajorOrganizationHoldersArray = MajorHoldersArray.filter(i => i.IsOrganization)
        // return <div>Stack</div>
        return (
            <div className="Stakeholder">
                <div className="Stakeholder-top-container">
                    <div className="Stakeholder-major bg-white">
                        <div>Co dong lon</div>
                        <div>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="All" key="1">
                                    <Table dataSource={MajorHoldersArray} columns={allMajorColumns} />
                                </TabPane>
                                <TabPane tab="Individual" key="2">
                                    <Table dataSource={MajorIndividualHoldersArray} columns={allMajorColumns} />
                                </TabPane>
                                <TabPane tab="Organization" key="3">
                                    <Table dataSource={MajorOrganizationHoldersArray} columns={allMajorColumns} />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                    <div className="Stakeholder-structure bg-white">
                        <div>
                            Co cau co dong
                        </div>
                        <div className="Stakeholder-piechart">
                            <PieChart width={400} height={400}>
                                <Pie data={data01} dataKey="value" cx={200} cy={200} outerRadius={60} fill="#8884d8" />
                                <Pie data={data02} dataKey="value" cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                            </PieChart>
                        </div>
                    </div>
                </div>
                <div className="Stakeholder-bottom-container bg-white">
                    Giao dich co dong lon
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

export default connect(mapStateToProps, mapDispatchToProps)(Stakeholder);