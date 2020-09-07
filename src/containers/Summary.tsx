import React from 'react';
import { get, uniqBy } from 'lodash';
import { connect } from 'react-redux';
import { Table } from 'antd';

import {
    getYearlyFinancialInfo,
    getQuarterlyFinancialInfo,
    getLastestFinancialInfo,
} from '../reducers/stocks';
import { BILLION_UNIT } from '../utils/unit';
import { formatNumber, } from '../utils/all'


interface IProps {
    selectedSymbol: string,
    getYearlyFinancialInfo: any,
    getQuarterlyFinancialInfo: any,
    getLastestFinancialInfo: any,
}

interface IState {
    QuarterlyFinancialInfoArray: any,
    YearlyFinancialInfoArray: any,
    LastestFinancialInfoObj: any,
}

class Summary extends React.Component<IProps, IState> {
    constructor(props) {
        super(props);
        this.state = {
            QuarterlyFinancialInfoArray: [],
            YearlyFinancialInfoArray: [],
            LastestFinancialInfoObj: {}
        }
    }

    componentDidMount() {
        this.crawlData();
    }

    componentDidUpdate(preProps) {
        if (this.props.selectedSymbol !== preProps.selectedSymbol) {
            this.crawlData();
        }
    }

    crawlData = async () => {
        try {
            const res1 = await this.props.getYearlyFinancialInfo()
            let YearlyFinancialInfoArray = res1.data
            const res2 = await this.props.getQuarterlyFinancialInfo()
            let QuarterlyFinancialInfoArray = res2.data
            const res3 = await this.props.getLastestFinancialInfo()
            let LastestFinancialInfoObj = res3.data
            if (YearlyFinancialInfoArray && QuarterlyFinancialInfoArray && LastestFinancialInfoObj) {
                this.setState({
                    YearlyFinancialInfoArray,
                    QuarterlyFinancialInfoArray,
                    LastestFinancialInfoObj
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    renderRevenueTable = (isProfit = false) => {
        const columns = [
            {
                title: 'Quarter',
                render: (params) => {
                    return 'Quy ' + params.Quarter
                }
            }
        ];

        const { QuarterlyFinancialInfoArray, YearlyFinancialInfoArray } = this.state;
        const mappedData = this.mapDataRevenueTable(QuarterlyFinancialInfoArray, YearlyFinancialInfoArray, isProfit);
        let keys = uniqBy(QuarterlyFinancialInfoArray.map(i => i.Year)).sort((a, b) => a - b)
        keys.map((i, index) => {
            const pushObj = {
                title: String(i),
                render: (params) => {
                    if (index === keys.length - 1) {
                        let className = '';
                        if (Number(params[i]) > Number(params[keys[index - 1]])) {
                            className = 'green';
                        } else if (Number(params[i]) < Number(params[keys[index - 1]])) {
                            className = 'red';
                        }
                        return <div className={className}>{formatNumber((Number(params[i]) || 0).toFixed(0))}</div>
                    } else {
                        return formatNumber((Number(params[i]) || 0).toFixed(0))
                    }

                }
            }
            columns.push(pushObj)
        })
        return <Table dataSource={mappedData} columns={columns} pagination={false} />
    }

    mapDataRevenueTable = (data, data2, isProfit) => {
        if (!data || !data2) return []
        let result = [];

        let keys = uniqBy(data.map(i => i.Year)).sort((a, b) => a - b)
        for (let j = 1; j < keys.length + 1; j++) {
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
        const indexTotal = isProfit ? 'ProfitAfterTax' : 'Sales';
        const obj: any = { 'Quarter': 'total' };
        keys.map(i => obj[i] = data2.filter(item => item.Year === i).length && (data2.filter(item => item.Year === i)[0][indexTotal] / BILLION_UNIT).toFixed(2))
        result.push(obj)
        return result
    }

    render() {
        return <div className="Summary">
            <div>Doanh thu</div>
            {this.renderRevenueTable()}
            <div>Loi nhuan</div>
            {this.renderRevenueTable(true)}

        </div>
    }
}

const mapStateToProps = state => {
    return {
        selectedSymbol: get(state, 'selectedSymbol'),
    }
}

const mapDispatchToProps = {
    getYearlyFinancialInfo,
    getQuarterlyFinancialInfo,
    getLastestFinancialInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
