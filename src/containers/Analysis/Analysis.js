import React from 'react';
import { connect } from 'react-redux';
import { List, Table } from 'antd';
import moment from 'moment';

import {
    getAnalysisUrl
} from '../../request';

import {
    // setSymbol,
} from '../../actions/stock';
import axios from 'axios';

import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';


const data = [
    {
        'title': 'Level 1: Understand the detail of each row if financial reports'
    },
    {
        'title': 'Level 2: Analyze the indicator (PE, EPS, ROE, ROA)'
    },
    {
        'title': 'Level 3: Be aware of the financial fraud in financial report to be away from these stocks'
    },
    {
        'title': 'Level 4: Point out the opportunities in short term investment',
        'detail': [
            'Nha may sap het khau hao',
            'Loi nhuan dot bien tu hoan nhap du phong',
            'Loi nhuan tu viec ban giao du an',
            'Loi nhuan tu nhu cau tang cao dot bien',
            'Loi nhuan tu tich tru hang ton kho gia re',
            'Loi nhuan tu bien dong ty gia',
        ]
    },
    {
        'title': "Level 5: Big picture of business in real life",
        'detail': [
            'Tu phan tich bao cao tai chinh, danh gia: loi the canh tranh, vi the doanh nghiep',
            'Danh gia phong cach quan tri, kinh doanh, rui ro, doi xu voi co dong.. cua ban lanh dao --> ben vung cua doanh nghiep',
            'Suc khoe tai chinh trong tuong lai: ket qua kinh doanh, hieu qua kinh doanh, kha nang sinh loi dai han',
            'Danh gia 3 nam, 5 nam, 10 nam',
        ]
    },
    {
        'title': "Note",
        'detail': [
            'Bang financial info thuong update trong vong 3 thang --> danh gia tinh hinh doanh nghiep chung'
        ]
    }
];

class Analysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: AllCommunityModules,
            columnDefs: [

                {
                    headerName: 'StockObj',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        return params.data.StockObj && params.data.StockObj.Symbol
                    }
                },
                {
                    field: 'PriceClose',
                    headerName: 'PriceClose',
                    filter: 'agNumberColumnFilter',
                },
                {
                    field: 'MarketCap',
                    headerName: 'MarketCap',
                    filter: 'agNumberColumnFilter',
                },
                {
                    field: 'Volume',
                    headerName: 'Volume',
                    filter: 'agNumberColumnFilter',
                },
                {
                    field: 'TodayCapital',
                    headerName: 'TodayCapital',
                    filter: 'agNumberColumnFilter',
                },

            ],
            defaultColDef: {
                flex: 1,
                minWidth: 150,
                filter: true,
                sortable: true,
            },
            rowData: [],


        }

    }

    componentDidMount() {
        this.crawData();
    }

    mapData = (data) => {
        data.map(item => {
            item.TodayCapital = item.PriceClose * item.Volume
        })
        return data
    }

    crawData = async () => {
        let data1 = [];
        let data2 = []
        await axios({
            method: 'get',
            url: getAnalysisUrl(moment().add(-2, 'days').format('YYYY-MM-DD'))
        })
            .then(response => {
                console.log(response)
                data1 = response.data
            })
            .catch(error => {
                console.log(error)
            })
        await axios({
            method: 'get',
            url: getAnalysisUrl(moment().add(-3, 'days').format('YYYY-MM-DD'))
        })
            .then(response => {
                console.log(response)
                data2 = response.data

            })
            .catch(error => {
                console.log(error)
            })
        console.log(data1, data2)
        let result = [];
        for (let i = 0; i < data1.length; i++) {
            if ((data1[i].PriceClose > data2[i].PriceClose * 1.01) && (data1[i].PriceClose * data1[i].Volume > 1000000000)) {
                result.push(data1[i])
            }
        }
        this.setState({
            rowData: this.mapData(result)
        })
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        // const httpRequest = new XMLHttpRequest();
        // const updateData = data => {
        //     this.setState({ rowData: data });
        // };

        // httpRequest.open(
        //     'GET',
        //     'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
        // );
        // httpRequest.send();
        // httpRequest.onreadystatechange = () => {
        //     if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        //         updateData(JSON.parse(httpRequest.responseText));
        //     }
        // };
    };

    render() {
        return (
            <div className="Analysis">
                <List
                    header={<div>Analysis</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <div>
                                <li>{item.title}</li>
                                {
                                    item.detail && item.detail.map(i => {
                                        return <li>{i}</li>
                                    })
                                }
                            </div>
                        </List.Item>
                    )}
                />

                <div style={{ width: '100%', height: '100%' }}>
                    <div
                        id="myGrid"
                        style={{
                            height: '500px',
                            width: '800px',
                        }}
                        className="ag-theme-alpine"
                    >
                        <AgGridReact
                            modules={this.state.modules}
                            columnDefs={this.state.columnDefs}
                            defaultColDef={this.state.defaultColDef}
                            onGridReady={this.onGridReady}
                            rowData={this.state.rowData}
                        />
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
    // setSymbol
}

export default connect(mapStateToProps, mapDispatchToProps)(Analysis);