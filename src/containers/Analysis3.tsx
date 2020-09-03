import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import { get } from 'lodash';

import {
    getQuarterlyFinancialInfoColumnDefs
} from '../utils/columnDefs';
import {
    getCompanyInfoUrl,
    getQuarterlyFinancialInfoFilterUrl
} from '../utils/request';
import { IStock } from '../types'


interface IProps {
    selectedSymbol: string,
    stocks: IStock,
}

interface IState {
    modules: any,
    columnDefs: any,
    defaultColDef: any,
    rowData: any,
}

class Analysis3 extends React.Component<IProps, IState> {
    gridApi: any;
    gridColumnApi: any;

    constructor(props) {
        super(props);
        this.state = {
            modules: AllCommunityModules,
            columnDefs: [],
            defaultColDef: {
                flex: 1,
                filter: true,
                sortable: true,
            },
            rowData: [],
        }
    }

    componentDidMount() {
        this.crawData()
    }

    componentDidUpdate(preProps) {
        console.log('componentDidUpdate Analysis3', this.props, preProps)
        if (this.props.selectedSymbol !== preProps.selectedSymbol) {
            this.crawData();
        }
    }

    crawData = async () => {
        const { stocks, selectedSymbol } = this.props;
        let result = null;
        let CompanyInfoObj = null
        await axios({
            url: getCompanyInfoUrl(selectedSymbol),
            method: 'get',
        })
            .then(response => {
                CompanyInfoObj = response.data
            })
            .catch(error => {
                console.log(error)
            })
        if (!CompanyInfoObj) return

        await axios({
            method: 'post',
            url: getQuarterlyFinancialInfoFilterUrl(),
            data: {
                ICBCode: CompanyInfoObj.ICBCode,
            }
        })
            .then(response => {
                result = response
            })
            .catch(error => {
                console.log(error)
            })
        this.setState({
            columnDefs: getQuarterlyFinancialInfoColumnDefs(),
            rowData: result.data.filter(item => item.Year === 2019 && item.Quarter === 4).map(item => {
                item.Stock = stocks[item.Stock].Symbol
                return item
            }).sort((a, b) => b.TotalAssets_MRQ - a.TotalAssets_MRQ)
        })
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };

    render() {
        return (
            <div>
                <h1>Analysis3</h1>
                <div style={{ width: '100%', height: '100%' }}>
                    <div
                        id="myGrid"
                        style={{
                            height: '500px',
                        }}
                        className="ag-theme-alpine"
                    >
                        <AgGridReact
                            modules={this.state.modules}
                            columnDefs={this.state.columnDefs}
                            defaultColDef={this.state.defaultColDef}
                            onGridReady={this.onGridReady}
                            rowData={this.state.rowData}
                            onFirstDataRendered={params => params.api.sizeColumnsToFit()}
                        />
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Analysis3);