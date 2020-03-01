import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Table, Button, Tabs, Radio } from 'antd';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import {
    getYearlyFinancialInfoUrl,
    getQuarterlyFinancialInfoUrl,
    getLastestFinancialReportsUrl,
} from '../../request';
import { BILLION_UNIT } from '../../utils/unit';
import { LATEST_FINANCIAL_REPORTS } from '../../utils/all'

const { TabPane } = Tabs;

const columns = [
    {
        title: 'Quarter',
        render: (params) => {
            return 'Quy ' + params.Quarter
        }
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
            period: 'yearly',
            lastestFinancialReportsType: LATEST_FINANCIAL_REPORTS.TYPE_2
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
    }

    getLastestFinancialReports = (type) => {
        const { Symbol: symbol } = this.props;
        let type_index = 1
        if (!symbol) return;
        switch (type) {
            case LATEST_FINANCIAL_REPORTS.TYPE_1:
                type_index = 1
                break;
            case LATEST_FINANCIAL_REPORTS.TYPE_2:
                type_index = 2
                break;
            case LATEST_FINANCIAL_REPORTS.TYPE_3:
                type_index = 3
                break;
            case LATEST_FINANCIAL_REPORTS.TYPE_4:
                type_index = 4
                break;
            default:
                break;
        }
        let quarter = this.state.period === 'quarterly' ? 4 : 0
        let year = 2020
        axios({
            method: 'get',
            url: getLastestFinancialReportsUrl(symbol, type_index, year, quarter)
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

    mapDataRevenueTable = (data, data2) => {
        if (!data || !data2) return []
        let result = [];
        let keys = [2016, 2017, 2018, 2019]
        for (let j = 1; j < 5; j++) {
            let itemObj = {}
            for (let i = 0; i < data.length; i++) {
                let item = data[i]
                if (item.Quarter === j) {

                    itemObj['Quarter'] = j
                    for (let k = 0; k < keys.length; k++) {
                        if (item.Year === keys[k]) {
                            itemObj[keys[k]] = (item.NetSales_MRQ / BILLION_UNIT).toFixed(2)
                        }
                    }
                }
            }
            result.push(itemObj)
        }
        result.push({
            'Quarter': 'total',
            '2016': data2.filter(item => item.Year === 2016).length && (data2.filter(item => item.Year === 2016)[0]['Sales'] / BILLION_UNIT).toFixed(2),
            '2017': data2.filter(item => item.Year === 2017).length && (data2.filter(item => item.Year === 2017)[0]['Sales'] / BILLION_UNIT).toFixed(2),
            '2018': data2.filter(item => item.Year === 2018).length && (data2.filter(item => item.Year === 2018)[0]['Sales'] / BILLION_UNIT).toFixed(2),
            '2019': data2.filter(item => item.Year === 2019).length && (data2.filter(item => item.Year === 2019)[0]['Sales'] / BILLION_UNIT).toFixed(2),
        })
        return result
    }

    handleOpenFinancialReports = () => {
        this.setState({
            isFinancialReports: true
        }, () => {
            this.getLastestFinancialReports(LATEST_FINANCIAL_REPORTS.TYPE_2)
        })
    }

    handleCloseFinancialReports = () => {
        this.setState({
            isFinancialReports: false
        })
    }

    handleChangeLastestFinancialReportsType = (index) => {
        this.setState({
            lastestFinancialReportsType: index
        }, () => {
            this.getLastestFinancialReports(index)
        })

    }

    getColumn = (data) => {
        console.log(data);
        const yearsArray = [2015, 2016, 2017, 2018, 2019]
        const quarterArray = [
            {
                Year: 2018,
                Quarter: 4
            },
            {
                Year: 2019,
                Quarter: 1
            },
            {
                Year: 2019,
                Quarter: 2
            },
            {
                Year: 2019,
                Quarter: 3
            },
            {
                Year: 2019,
                Quarter: 4
            }
        ]

        let result = [{
            title: 'Title',
            render: (params) => {
                return params.Name
            }
        }]

        if (this.state.period === 'yearly') {
            yearsArray.map(year => (
                result.push({
                    title: year,
                    render: (params) => {
                        if (params.Values && params.Values.length) {
                            const data = params.Values.filter(item => item.Year === year)
                            return data.length && (data[0].Value / BILLION_UNIT).toFixed(2)
                        }
                    }
                })
            ))
        } else {
            quarterArray.map(quarterItem => (
                result.push({
                    title: `${quarterItem.Year} ${quarterItem.Quarter}`,
                    render: (params) => {
                        if (params.Values && params.Values.length) {
                            const data = params.Values.filter(item => item.Year === quarterItem.Year && item.Quarter === quarterItem.Quarter)
                            return data.length && (data[0].Value / BILLION_UNIT).toFixed(2)
                        }
                    }
                })
            ))
        }


        return result
    }

    handlePeriod = e => {
        this.setState({ period: e.target.value }, () => {
            this.getLastestFinancialReports(this.state.lastestFinancialReportsType)
        });
    };



    // RENDER PART

    renderRevenueTable = () => {
        const { QuarterlyFinancialInfoArray, YearlyFinancialInfoArray } = this.state;
        const mappeddata = this.mapDataRevenueTable(QuarterlyFinancialInfoArray, YearlyFinancialInfoArray);
        return <Table dataSource={mappeddata} columns={columns} pagination={false} />
    }

    renderRevenueQuarterChart = (index) => {
        const { QuarterlyFinancialInfoArray } = this.state;
        const data = QuarterlyFinancialInfoArray.map(item => {
            item.NetSales_MRQ = (item.NetSales_MRQ / BILLION_UNIT).toFixed(2)
            return item
        }).sort((a, b) => {
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

    renderRevenueYearChart = () => {
        const { YearlyFinancialInfoArray } = this.state;
        const data = YearlyFinancialInfoArray.map(item => {
            // item.Sales = (item.Sales / 10000).toFixed(2)
            return item
        }).sort((a, b) => a.Year - b.Year)
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
                <Bar dataKey={'Sales'} fill="lightblue" />
            </BarChart>
        )
    }

    renderLastestFinancialReports = (type) => {
        const { LastestFinancialReportsArray } = this.state;
        const columns = this.getColumn(LastestFinancialReportsArray);
        return (
            <Table dataSource={LastestFinancialReportsArray} columns={columns} pagination={false} />
        )
    }

    render() {
        const { period, isFinancialReports } = this.state;
        if (isFinancialReports) {
            return (
                <div className="Financial">
                    <div>
                        <Button onClick={this.handleCloseFinancialReports}>Chi tieu tai chinh</Button>
                    </div>
                    <div>
                        <Radio.Group value={period} onChange={this.handlePeriod}>
                            <Radio.Button value="quarterly">Hang quy</Radio.Button>
                            <Radio.Button value="yearly">Hang nam</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div>
                        <Tabs defaultActiveKey="1" onChange={this.handleChangeLastestFinancialReportsType}>
                            <TabPane tab={LATEST_FINANCIAL_REPORTS.TYPE_2} key={LATEST_FINANCIAL_REPORTS.TYPE_2}>
                                {this.renderLastestFinancialReports()}
                            </TabPane>
                            <TabPane tab={LATEST_FINANCIAL_REPORTS.TYPE_1} key={LATEST_FINANCIAL_REPORTS.TYPE_1}>
                                {this.renderLastestFinancialReports()}
                            </TabPane>
                            <TabPane tab={LATEST_FINANCIAL_REPORTS.TYPE_3} key={LATEST_FINANCIAL_REPORTS.TYPE_3}>
                                {this.renderLastestFinancialReports()}
                            </TabPane>
                            <TabPane tab={LATEST_FINANCIAL_REPORTS.TYPE_4} key={LATEST_FINANCIAL_REPORTS.TYPE_4}>
                                {this.renderLastestFinancialReports()}
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
                            <div className="Financial-revenue-chart">
                                {this.renderRevenueQuarterChart()}
                                {this.renderRevenueYearChart()}
                            </div>

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