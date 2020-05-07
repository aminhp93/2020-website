import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { Table, Button, Tabs, Radio, List } from 'antd';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';

import {
    getYearlyFinancialInfoUrl,
    getYearlyFinancialInfoUpdateUrl,
    getQuarterlyFinancialInfoUrl,
    getQuarterlyFinancialInfoUpdateUrl,
    getLastestFinancialReportsUrl,
    getLastestFinancialInfoUrl,
    getLastestFinancialInfoUpdateUrl,
    getLastestFinancialReportsNameUpdateUrl,
    getLastestFinancialReportsValueUpdateUrl
} from '../../utils/request';
import { BILLION_UNIT } from '../../utils/unit';
import { LATEST_FINANCIAL_REPORTS, formatNumber } from '../../utils/all'

const { TabPane } = Tabs;

let xxx = []

const TYPE_DEFAULT = []
const TYPE_NGAN_HANG = ["ACB", "BAB", "BID", "CTG", "EIB", "EVF", "HDB", "KLB", "LPB", "MBB", "NVB", "SHB", "STB", "TCB", "TPB", "VBB", "VCB", "VIB", "VPB"]
const TYPE_BAO_HIEM = ["ABI", "BIC", "BLI", "BMI", "BVH", "MIG", "PGI", "PTI", "VNR"]
const TYPE_CHUNG_KHOAN = ["AGR", "APG", "APS", "ART", "BMS", "BSI", "BVS", "CSI", "CTS", "DSC", "EVS", "FTS", "HAC", "HBS", "HCM", "HFT", "IVS", "MBS", "ORS", "PHS", "PSI", "SBS", "SHS", "SSI", "TCI", "TVB", "TVS", "VCI", "VDS", "VIG", "VIX", "VND", "WSS"]
const TYPE_QUY = ["E1VFVN30", "FUCVREIT", "FUCTVGF1"]

// 0: "4. Giá vốn hàng bán"
// 1: "ABC"
// 2: "Lãi/Lỗ thuần từ hoạt động dịch vụ"
// 3: "ACB"
// 4: "- Phí nhượng tái bảo hiểm"
// 5: "ABI"
// 6: "b. Chênh lệch tăng đánh giá lại các TSTC thông qua lãi/lỗ"
// 7: "AGR"
// 8: "2. Lãi trái phiếu được nhận "
// 9: "E1VFVN30"

class Financial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            YearlyFinancialInfoArray: [],
            QuarterlyFinancialInfoArray: [],
            LastestFinancialReportsArray: [],
            isFinancialReports: false,
            period: 'yearly',
            lastestFinancialReportsType: LATEST_FINANCIAL_REPORTS.TYPE_2,
            LastestFinancialInfoObj: {},
        }
    }

    componentDidMount() {
        this.crawlData();
    }

    componentDidUpdate(preProps) {
        if (this.props.Symbol !== preProps.Symbol) {
            if (this.state.isFinancialReports) {
                this.setState({
                    LastestFinancialReportsArray: []
                })
                this.getLastestFinancialReports()
            } else {
                this.crawlData();
            }
        }
    }

    crawlData = async () => {
        const { Symbol: symbol } = this.props;
        if (!symbol) return;
        let YearlyFinancialInfoArray = null;
        let QuarterlyFinancialInfoArray = null
        let LastestFinancialInfoObj = null
        await axios({
            method: 'get',
            url: getYearlyFinancialInfoUrl(symbol)
        })
            .then(response => {
                if (response.data) {
                    YearlyFinancialInfoArray = response.data
                }
            })
            .catch(error => console.log(error))

        await axios({
            method: 'get',
            url: getQuarterlyFinancialInfoUrl(symbol)
        })
            .then(response => {
                if (response.data) {
                    QuarterlyFinancialInfoArray = response.data
                }
            })
            .catch(error => console.log(error))

        await axios({
            method: 'get',
            url: getLastestFinancialInfoUrl(symbol)
        })
            .then(response => {
                if (response.data) {
                    LastestFinancialInfoObj = response.data
                }
            })
            .catch(error => console.log(error))
        if (YearlyFinancialInfoArray && QuarterlyFinancialInfoArray && LastestFinancialInfoObj) {
            this.setState({
                YearlyFinancialInfoArray,
                QuarterlyFinancialInfoArray,
                LastestFinancialInfoObj
            })
        }

    }

    getLastestFinancialReports = () => {
        const { Symbol: symbol } = this.props;
        const { lastestFinancialReportsType } = this.state;
        let type_index = 1
        if (!symbol) return;
        switch (lastestFinancialReportsType) {
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

    mapDataRevenueTable = (data, data2, isProfit) => {
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
                            if (isProfit) {
                                itemObj[keys[k]] = (item.ProfitAfterTax_MRQ / BILLION_UNIT).toFixed(2)
                            } else {
                                itemObj[keys[k]] = (item.NetSales_MRQ / BILLION_UNIT).toFixed(2)
                            }

                        }
                    }
                }
            }
            result.push(itemObj)
        }
        const indexTotal = isProfit ? 'ProfitAfterTax' : 'Sales'
        result.push({
            'Quarter': 'total',
            '2016': data2.filter(item => item.Year === 2016).length && (data2.filter(item => item.Year === 2016)[0][indexTotal] / BILLION_UNIT).toFixed(2),
            '2017': data2.filter(item => item.Year === 2017).length && (data2.filter(item => item.Year === 2017)[0][indexTotal] / BILLION_UNIT).toFixed(2),
            '2018': data2.filter(item => item.Year === 2018).length && (data2.filter(item => item.Year === 2018)[0][indexTotal] / BILLION_UNIT).toFixed(2),
            '2019': data2.filter(item => item.Year === 2019).length && (data2.filter(item => item.Year === 2019)[0][indexTotal] / BILLION_UNIT).toFixed(2),
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
        }, () => {
            this.crawlData();
        })
    }

    handleChangeLastestFinancialReportsType = (index) => {
        this.setState({
            lastestFinancialReportsType: index,
            LastestFinancialReportsArray: []
        }, () => {
            this.getLastestFinancialReports()
        })

    }

    getColumn = (data) => {
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
            result.push({
                title: 'Chart',
                render: () => {
                    return (
                        <div className="test">
                            <BarChart width={10} height={10} data={data}>
                                <Bar dataKey="uv" fill="#8884d8" />
                            </BarChart>
                        </div>


                    )
                }
            })
            yearsArray.map(year => (
                result.push({
                    title: year,
                    sorter: (a, b) => {
                        if (a.Values && a.Values.length && b.Values && b.Values.length) {
                            const data1 = a.Values.filter(item => item.Year === year)
                            const data2 = b.Values.filter(item => item.Year === year)
                            return data1[0].Value - data2[0].Value
                        }
                    },
                    render: (params) => {
                        if (params.Values && params.Values.length) {
                            const data = params.Values.filter(item => item.Year === year)
                            const returnValue = data.length && (data[0].Value / BILLION_UNIT).toFixed(2)
                            return returnValue !== '0.00' ? returnValue : ''
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

    updateLatestFinancialInfo = (symbol, resolve) => {
        if (!symbol) return
        axios({
            method: 'put',
            url: getLastestFinancialInfoUpdateUrl(symbol)
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    resolve && resolve(response.data)
                }
            })
            .catch(error => {
                console.log(error)
                resolve && resolve(error)
            })
    }

    updateLatestFinancialInfoPartial = (start, count) => {
        let listPromises = [];
        const arr = cloneDeep(this.props.AllStocks);
        arr.splice(start, count)
        arr.map(item => {
            item.Symbol && listPromises.push(
                new Promise(resolve => {
                    this.updateLatestFinancialInfo(item.Symbol, resolve);
                })
            );
        });

        return Promise.all(listPromises)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    updateLatestFinancialInfoAll = async () => {
        await this.updateLatestFinancialInfoPartial(0, 500);
        await this.updateLatestFinancialInfoPartial(500, 500);
        await this.updateLatestFinancialInfoPartial(1000, 1000);
    }

    updateYearlyFinancialInfo = (symbol, resolve) => {
        if (!symbol) return
        axios({
            method: 'put',
            url: getYearlyFinancialInfoUpdateUrl(symbol)
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    resolve && resolve(response.data)
                }
            })
            .catch(error => {
                console.log(error)
                resolve && resolve(error)
            })
    }

    updateYearlyFinancialInfoPartial = (start, count) => {
        let listPromises = [];
        const arr = cloneDeep(this.props.AllStocks);
        arr.splice(start, count)
        arr.map(item => {
            item.Symbol && listPromises.push(
                new Promise(resolve => {
                    this.updateYearlyFinancialInfo(item.Symbol, resolve);
                })
            );
        });

        return Promise.all(listPromises)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    updateYearlyFinancialInfoAll = async () => {
        await this.updateYearlyFinancialInfoPartial(0, 500);
        await this.updateYearlyFinancialInfoPartial(500, 500);
        await this.updateYearlyFinancialInfoPartial(1000, 1000);
    }

    updateQuarterlyFinancialInfo = (symbol, resolve) => {
        if (!symbol) return
        axios({
            method: 'put',
            url: getQuarterlyFinancialInfoUpdateUrl(symbol)
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    resolve && resolve(response.data)
                }
            })
            .catch(error => {
                console.log(error)
                resolve && resolve(error)
            })
    }

    updateQuarterlyFinancialInfoPartial = (start, count) => {
        let listPromises = [];
        const arr = cloneDeep(this.props.AllStocks);
        arr.splice(start, count)
        arr.map(item => {
            item.Symbol && listPromises.push(
                new Promise(resolve => {
                    this.updateQuarterlyFinancialInfo(item.Symbol, resolve);
                })
            );
        });

        return Promise.all(listPromises)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    updateQuarterlyFinancialInfoAll = async () => {
        await this.updateQuarterlyFinancialInfoPartial(0, 500);
        await this.updateQuarterlyFinancialInfoPartial(500, 500);
        await this.updateQuarterlyFinancialInfoPartial(1000, 1000);
    }

    updateLastestFinancialReportsName = (symbol, type) => {
        axios({
            method: 'put',
            url: getLastestFinancialReportsNameUpdateUrl(symbol, type)
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    updateLastestFinancialReportsNameAll = () => {
        const listSymbols = [
            'ACB',
            'ABI',
            'AGR',
            'E1VFVN30',
            'FPT'
        ]
        listSymbols.map(item => {
            [1, 2, 3, 4].map(index => {
                this.updateLastestFinancialReportsName(item, index)
            })
        })
    }

    updateLastestFinancialReportsValue = (symbol, resolve) => {
        if (!symbol) return
        const { period } = this.state;
        axios({
            method: 'put',
            // url: getLastestFinancialReportsValueUpdateUrl(symbol, 1, 2019, period === 'quarterly' ? 4 : 0, period === 'quarterly' ? 32 : 8)
            url: getLastestFinancialReportsValueUpdateUrl(symbol, 1, 2020, period === 'quarterly' ? 4 : 0, period === 'quarterly' ? 4 : 0)
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    resolve && resolve(response.data)
                }
            })
            .catch(error => {
                console.log(error)
                resolve && resolve(error)
            })

        axios({
            method: 'put',
            // url: getLastestFinancialReportsValueUpdateUrl(symbol, 2, 2019, period === 'quarterly' ? 4 : 0, period === 'quarterly' ? 32 : 8)
            url: getLastestFinancialReportsValueUpdateUrl(symbol, 2, 2020, period === 'quarterly' ? 4 : 0, period === 'quarterly' ? 4 : 0)
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    resolve && resolve(response.data)
                }
            })
            .catch(error => {
                console.log(error)
                resolve && resolve(error)
            })

        axios({
            method: 'put',
            // url: getLastestFinancialReportsValueUpdateUrl(symbol, 3, 2019, period === 'quarterly' ? 4 : 0, period === 'quarterly' ? 32 : 8)
            url: getLastestFinancialReportsValueUpdateUrl(symbol, 3, 2020, period === 'quarterly' ? 4 : 0, period === 'quarterly' ? 4 : 0)
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    resolve && resolve(response.data)
                }
            })
            .catch(error => {
                console.log(error)
                resolve && resolve(error)
            })

        axios({
            method: 'put',
            // url: getLastestFinancialReportsValueUpdateUrl(symbol, 4, 2019, period === 'quarterly' ? 4 : 0, period === 'quarterly' ? 32 : 8)
            url: getLastestFinancialReportsValueUpdateUrl(symbol, 4, 2020, period === 'quarterly' ? 4 : 0, period === 'quarterly' ? 4 : 0)
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    resolve && resolve(response.data)
                }
            })
            .catch(error => {
                console.log(error)
                resolve && resolve(error)
            })
    }

    updateLastestFinancialReportsValuePartial = (start, count) => {
        let listPromises = [];
        const arr = cloneDeep(this.props.AllStocks);
        const arr1 = arr.slice(start, count)
        arr1.map(item => {
            item.Symbol && listPromises.push(
                new Promise(resolve => {
                    this.updateLastestFinancialReportsValue(item.Symbol, resolve);
                })
            );
        });

        return Promise.all(listPromises)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    updateLastestFinancialReportsValueAll = async () => {
        await this.updateLastestFinancialReportsValuePartial(0, 100);
        await this.updateLastestFinancialReportsValuePartial(100, 200);
        await this.updateLastestFinancialReportsValuePartial(200, 300);
        await this.updateLastestFinancialReportsValuePartial(300, 400);
        await this.updateLastestFinancialReportsValuePartial(400, 500);
        await this.updateLastestFinancialReportsValuePartial(500, 600);
        await this.updateLastestFinancialReportsValuePartial(600, 700);
        await this.updateLastestFinancialReportsValuePartial(700, 800);
        await this.updateLastestFinancialReportsValuePartial(800, 900);
        await this.updateLastestFinancialReportsValuePartial(900, 1000);
        await this.updateLastestFinancialReportsValuePartial(1000, 1100);
        await this.updateLastestFinancialReportsValuePartial(1100, 1200);
        await this.updateLastestFinancialReportsValuePartial(1200, 1300);
        await this.updateLastestFinancialReportsValuePartial(1300, 1400);
        await this.updateLastestFinancialReportsValuePartial(1400, 1500);
        await this.updateLastestFinancialReportsValuePartial(1500, 1600);
        await this.updateLastestFinancialReportsValuePartial(1600, 1700);
        await this.updateLastestFinancialReportsValuePartial(1700, 1800);
    }

    test = (symbol, resolve) => {
        const hostName = 'https://svr1.fireant.vn';
        const url = `${hostName}/api/Data/Finance/LastestFinancialReports?symbol=${symbol}&type=2&year=2020&quarter=0&count=5`
        axios({
            method: 'get',
            url
        })
            .then(response => {
                if (response.data && response.data.length) {
                    if ((response.data[3] || {}).Name === '2. Lãi trái phiếu được nhận ') {
                        xxx.push(symbol)
                    }
                    console.log(xxx)
                }
                resolve && resolve(response.data)

            })
            .catch(error => {
                console.log(error)
                resolve && resolve(error)
            })
    }

    testPartial = (start, count) => {
        let listPromises = [];
        const arr = cloneDeep(this.props.AllStocks);
        const arr1 = arr.slice(start, count)
        arr1.map(item => {
            item.Symbol && listPromises.push(
                new Promise(resolve => {
                    this.test(item.Symbol, resolve);
                })
            );
        });

        return Promise.all(listPromises)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    testAll = async () => {
        await this.testPartial(0, 300);
        await this.testPartial(300, 600);
        await this.testPartial(600, 900);
        await this.testPartial(900, 1200);
        await this.testPartial(1200, 1500);
        await this.testPartial(1500, 1800);
        console.log(583, xxx)
    }


    // RENDER PART

    renderRevenueTable = (isProfit) => {
        const columns = [
            {
                title: 'Quarter',
                render: (params) => {
                    return 'Quy ' + params.Quarter
                }
            },
            {
                title: '2016',
                render: (params) => {
                    return formatNumber((Number(params['2016']) || 0).toFixed(0))
                }
            },
            {
                title: '2017',
                render: (params) => {
                    return formatNumber((Number(params['2017']) || 0).toFixed(0))
                }
            },
            {
                title: '2018',
                render: (params) => {
                    return formatNumber((Number(params['2018']) || 0).toFixed(0))
                }
            },
            {
                title: '2019',
                render: (params) => {
                    return formatNumber((Number(params['2019']) || 0).toFixed(0))
                }
            },
        ];

        const { QuarterlyFinancialInfoArray, YearlyFinancialInfoArray } = this.state;
        const mappeddata = this.mapDataRevenueTable(QuarterlyFinancialInfoArray, YearlyFinancialInfoArray, isProfit);
        return <Table dataSource={mappeddata} columns={columns} pagination={false} />
    }

    renderRevenueQuarterChart = (isProfit) => {
        const index = isProfit ? 'ProfitAfterTax_MRQ' : 'NetSales_MRQ'
        const { QuarterlyFinancialInfoArray } = this.state;
        const data = cloneDeep(QuarterlyFinancialInfoArray).map(item => {
            item[index] = (item[index] / BILLION_UNIT).toFixed(2)
            item.Name = `Q${item.Quarter} ${item.Year}`
            return item
        }).sort((a, b) => {
            return a.Year !== b.Year ? a.Year - b.Year : a.Quarter - b.Quarter
        }).reverse().slice(0, 5).reverse()

        return (
            <div className="Financial-revenue-quarter-chart-container">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        // top: 50, right: 30, left: 20, bottom: 5,
                    }}
                >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="Name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={index} fill="lightblue" barSize={30} />
                </BarChart>
            </div>

        )
    }

    renderRevenueYearChart = (isProfit) => {
        const index = isProfit ? 'ProfitAfterTax' : 'Sales'
        const { YearlyFinancialInfoArray } = this.state;
        const data = cloneDeep(YearlyFinancialInfoArray).map(item => {
            item[index] = (Number(item[index]) / BILLION_UNIT).toFixed(0)
            return item
        }).sort((a, b) => a.Year - b.Year)
        return (
            <div className="Financial-revenue-year-chart-container">

                <BarChart
                    width={400}
                    height={300}
                    data={data}
                    margin={{
                        // top: 50, right: 30, left: 20, bottom: 5,
                    }}
                >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="Year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={index} fill="lightblue" barSize={30} />
                </BarChart>
            </div>
        )
    }

    renderLastestFinancialReports = () => {
        const { LastestFinancialReportsArray } = this.state;
        const columns = this.getColumn(LastestFinancialReportsArray);
        return (
            <Table dataSource={LastestFinancialReportsArray} columns={columns} pagination={false} size="small" />
        )
    }

    renderEvaluation = () => {
        const { LastestFinancialInfoObj } = this.state;
        const dataEvaluation = [
            {
                'title': 'P/E',
                'detail': (Number(LastestFinancialInfoObj.PE) || 0).toFixed(2)
            },
            {
                'title': 'P/S',
                'detail': (Number(LastestFinancialInfoObj.PS) || 0).toFixed(2)
            },
            {
                'title': 'P/B',
                'detail': (Number(LastestFinancialInfoObj.PB) || 0).toFixed(2)
            },
            {
                'title': 'EPS',
                'detail': (Number(LastestFinancialInfoObj.EPS) || 0).toFixed(2)
            }
        ]
        return (
            <div>
                <List
                    header={<div>ĐỊNH GIÁ</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={dataEvaluation}
                    renderItem={item => (
                        <List.Item>
                            <div className="row">
                                <div>{item.title}</div>
                                <div>{item.detail}</div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        )
    }

    renderFinancialPower = () => {
        const { LastestFinancialInfoObj } = this.state;

        const dataFinancialPower = [
            {
                'title': 'Thanh toán nhanh',
                'detail': (Number(LastestFinancialInfoObj.QuickRatio) || 0).toFixed(2)
            },
            {
                'title': 'Thanh toán hiện hành',
                'detail': (Number(LastestFinancialInfoObj.CurrentRatio) || 0).toFixed(2)
            },
            {
                'title': 'Tổng nợ/Vốn CSH',
                'detail': (Number(LastestFinancialInfoObj.TotalDebtOverEquity) || 0).toFixed(2)
            },
            {
                'title': 'Tổng nợ/Tổng tài sản',
                'detail': (Number(LastestFinancialInfoObj.TotalDebtOverAssets) || 0).toFixed(2)
            }
        ]
        return (
            <div>
                <List
                    header={<div>SỨC MẠNH TÀI CHÍNH</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={dataFinancialPower}
                    renderItem={item => (
                        <List.Item>
                            <div className="row">
                                <div>{item.title}</div>
                                <div>{item.detail}</div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        )
    }

    renderRunningAbility = () => {
        const { LastestFinancialInfoObj } = this.state;

        const dataRunningAbility = [
            {
                'title': 'Vòng quay tổng tài sản',
                'detail': (Number(LastestFinancialInfoObj.TotalAssetsTurnover) || 0).toFixed(2)
            },
            {
                'title': 'Vòng quay hàng tồn kho',
                'detail': (Number(LastestFinancialInfoObj.InventoryTurnover) || 0).toFixed(2)
            },
            {
                'title': 'Vòng quay các khoản phải thu',
                'detail': (Number(LastestFinancialInfoObj.ReceivablesTurnover) || 0).toFixed(2)
            }
        ]
        return (
            <div>
                <List
                    header={<div>KHẢ NĂNG HOẠT ĐỘNG</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={dataRunningAbility}
                    renderItem={item => (
                        <List.Item>
                            <div className="row">
                                <div>{item.title}</div>
                                <div>{item.detail}</div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        )
    }

    renderMakeProfitAbility = () => {
        const { LastestFinancialInfoObj } = this.state;

        const dataMakeProfitAbility = [
            {
                'title': 'Tỷ lệ lãi gộp',
                'detail': `${((Number(LastestFinancialInfoObj.GrossMargin) || 0) * 100).toFixed(2)}%`
            },
            {
                'title': 'Tỷ lệ lãi từ hoạt động KD',
                'detail': `${((Number(LastestFinancialInfoObj.OperatingMargin) || 0) * 100).toFixed(2)}%`
            },
            {
                'title': 'Tỷ lệ EBIT',
                'detail': `${((Number(LastestFinancialInfoObj.EBITMargin) || 0) * 100).toFixed(2)}%`
            },
            {
                'title': 'Tỷ lệ lãi ròng',
                'detail': `${((Number(LastestFinancialInfoObj.NetProfitMargin) || 0) * 100).toFixed(2)}%`
            }
        ]
        return (
            <div>
                <List
                    header={<div>KHẢ NĂNG SINH LỢI</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={dataMakeProfitAbility}
                    renderItem={item => (
                        <List.Item>
                            <div className="row">
                                <div>{item.title}</div>
                                <div>{item.detail}</div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        )
    }

    renderManagement = () => {
        const { LastestFinancialInfoObj } = this.state;

        const dataManagement = [
            {
                'title': 'ROA',
                'detail': `${((Number(LastestFinancialInfoObj.ROA) || 0) * 100).toFixed(2)}%`
            },
            {
                'title': 'ROE',
                'detail': `${((Number(LastestFinancialInfoObj.ROE) || 0) * 100).toFixed(2)}%`
            },
            {
                'title': 'ROIC',
                'detail': `${((Number(LastestFinancialInfoObj.ROIC) || 0) * 100).toFixed(2)}%`
            }
        ]
        return (
            <div>
                <List
                    header={<div>KHẢ NĂNG SINH LỢI</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={dataManagement}
                    renderItem={item => (
                        <List.Item>
                            <div className="row">
                                <div>{item.title}</div>
                                <div>{item.detail}</div>
                            </div>
                        </List.Item>
                    )}
                />
            </div>
        )
    }

    render() {
        const { period, isFinancialReports } = this.state;
        // return <div onClick={this.testAll}>test</div>
        if (isFinancialReports) {
            return (
                <div className="Financial bg-white">
                    <div>
                        <div className="header">
                            Bao cao tai chinh
                        </div>
                        <div>
                            <Button onClick={this.handleCloseFinancialReports}>Chi tieu tai chinh</Button>
                            <div>
                                <Button onClick={this.updateLastestFinancialReportsNameAll}>LastestFinancialReportsName</Button>
                            </div>
                            <div>
                                <Button onClick={() => this.updateLastestFinancialReportsValue(this.props.Symbol)}>LastestFinancialReportsValue</Button>
                                <Button onClick={this.updateLastestFinancialReportsValueAll}>Update all</Button>
                                {/* <Button onClick={() => this.updateLastestFinancialReportsValue('AAV')}>Update all</Button> */}
                            </div>
                        </div>
                        <div>
                            <Radio.Group value={period} onChange={this.handlePeriod}>
                                <Radio.Button value="quarterly">Hang quy</Radio.Button>
                                <Radio.Button value="yearly">Hang nam</Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className="Financial-reports">
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
                </div>
            )
        }
        return (
            <div className="Financial">
                <div className="Financial-left-container">
                    <div className="Financial-revenue bg-white">
                        <div>
                            <div className="header">
                                DOANH THU (TỶ)
                            </div>
                            <div>
                                <Button onClick={this.handleOpenFinancialReports}>Bao cao tai chinh</Button>
                                <div>
                                    <Button onClick={() => this.updateYearlyFinancialInfo(this.props.Symbol)}>YearlyFinancialInfo</Button>
                                    <Button onClick={this.updateYearlyFinancialInfoAll}>Update all</Button>
                                </div>
                                <div>
                                    <Button onClick={() => this.updateQuarterlyFinancialInfo(this.props.Symbol)}>QuarterlyFinancialInfo</Button>
                                    <Button onClick={this.updateQuarterlyFinancialInfoAll}>Update all</Button>
                                </div>

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
                    <div className="Financial-profit bg-white">
                        <div className="header">
                            LỢI NHUẬN (TỶ)
                        </div>
                        <div>
                            {this.renderRevenueTable(true)}
                            <div className="Financial-revenue-chart">
                                {this.renderRevenueQuarterChart(true)}
                                {this.renderRevenueYearChart(true)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Financial-right-container bg-white">
                    <div className="header">
                        CHỈ TIÊU TÀI CHÍNH
                        <Button onClick={() => this.updateLatestFinancialInfo(this.props.Symbol)}>update</Button>
                        <Button onClick={this.updateLatestFinancialInfoAll}>update all </Button>
                    </div>
                    <div className="Financial-criteria">
                        {this.renderEvaluation()}
                        {this.renderFinancialPower()}
                        {this.renderRunningAbility()}
                        {this.renderMakeProfitAbility()}
                        {this.renderManagement()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        Symbol: state.stock.Symbol,
        AllStocks: state.stock.AllStocks,
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Financial);