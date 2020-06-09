import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { Button, Tabs, Radio } from 'antd';
import { AgGridReact } from '@ag-grid-community/react';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

import {
    getYearlyFinancialInfo,
    getQuarterlyFinancialInfo,
    getLastestFinancialInfo,
    getLastestFinancialReports,
} from '../reducers/stocks';

import { BILLION_UNIT } from '../utils/unit';
import { LATEST_FINANCIAL_REPORTS, mapDataLatestFinancialReport } from '../utils/all'
import { getLastestFinancialReportsColumnDefs } from '../utils/columnDefs';
import { IStock, IAnalysisType } from '../types'

const { TabPane } = Tabs;


interface IProps {
    selectedSymbol: string,
    stocks: IStock,
    getYearlyFinancialInfo: any,
    getQuarterlyFinancialInfo: any,
    getLastestFinancialInfo: any,
    getLastestFinancialReports: any,
}

interface IState {
    YearlyFinancialInfoArray: any,
    QuarterlyFinancialInfoArray: any,
    LastestFinancialReportsArray: any,
    isFinancialReports: boolean,
    period: string,
    lastestFinancialReportsType: string,
    LastestFinancialInfoObj: any,
    defaultColDef: any,
    analysisType: IAnalysisType
}

class Financial extends React.Component<IProps, IState> {
    gridApi: any;
    gridColumnApi: any;

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
            defaultColDef: {
                flex: 1,
                filter: true,
                sortable: true,
                resizable: true
            },
            analysisType: null
        }
    }

    componentDidMount() {
        this.crawlData();
    }

    componentDidUpdate(preProps) {
        if (this.props.selectedSymbol !== preProps.selectedSymbol) {
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

    getLastestFinancialReports = async () => {
        const { lastestFinancialReportsType } = this.state;
        let type_index = 1
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
        try {
            const res = await this.props.getLastestFinancialReports({ financialType: type_index, year, quarter })
            this.setState({
                LastestFinancialReportsArray: res.data
            })
        } catch (error) {
            console.log(error)
        }
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
            this.getLastestFinancialReports()
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

    handlePeriod = e => {
        this.setState({ period: e.target.value }, () => {
            this.getLastestFinancialReports()
        });
    };

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };

    handleAnalysisType = e => {
        this.setState({ analysisType: e.target.value }, () => {
            // 
        })
    }

    // RENDER PART

    renderLastestFinancialReports = () => {
        const { LastestFinancialReportsArray, defaultColDef, period, lastestFinancialReportsType, analysisType } = this.state;
        return <div style={{ width: '100%', height: '100%' }}>
            <div
                id="myGrid"
                style={{
                    height: '1000px',
                }}
                className="ag-theme-alpine"
            >
                <AgGridReact
                    modules={[
                        ClientSideRowModelModule,
                        RowGroupingModule,
                        MenuModule,
                        ColumnsToolPanelModule,
                        SetFilterModule,

                    ]}
                    columnDefs={getLastestFinancialReportsColumnDefs(period, lastestFinancialReportsType, analysisType)}
                    enableRangeSelection={true}
                    animateRows={true}
                    defaultColDef={defaultColDef}
                    onGridReady={this.onGridReady}
                    autoGroupColumnDef={{ minWidth: 200 }}
                    rowData={mapDataLatestFinancialReport(LastestFinancialReportsArray, null, lastestFinancialReportsType)}
                    onFirstDataRendered={params => params.api.sizeColumnsToFit()}
                    groupDefaultExpanded={3}
                />
            </div>
        </div>
    }

    render() {
        const { period, analysisType } = this.state;
        return (
            <div className="Financial bg-white">
                <div style={{ width: '100%' }}>
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
                        <Radio.Group value={analysisType} onChange={this.handleAnalysisType}>
                            <Radio.Button value="tyTrong">Ty trong</Radio.Button>
                            <Radio.Button value="chieuNgang">Chieu ngang</Radio.Button>
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
}

const mapStateToProps = state => {
    return {
        selectedSymbol: get(state, 'selectedSymbol'),
        stocks: get(state, 'stocks'),
    }
}

const mapDispatchToProps = {
    getYearlyFinancialInfo,
    getQuarterlyFinancialInfo,
    getLastestFinancialInfo,
    getLastestFinancialReports
}

export default connect(mapStateToProps, mapDispatchToProps)(Financial);