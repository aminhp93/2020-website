import React from 'react';
import { connect } from 'react-redux';
import { DatePicker, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';

import {
    mapColorPriceChange,
    formatNumber,
    mapArrayToKeyValue,
    mapDataTwoDate
} from '../../utils/all';
import {
    getConfigGetCreateUrl,
    getStockFilter,
    getCompanyInfoUrl
} from '../../request';

import {
    // setSymbol,
} from '../../actions/stock';

import AnalysisComponent from '../../components/Analysis';

const { RangePicker } = DatePicker;


class Analysis3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.crawData();
    }

    componentDidUpdate(preProps) {
        console.log('componentDidUpdate Analysis3', this.props, preProps)
        if (this.props.Symbol !== preProps.Symbol) {
            this.crawData();
        }
    }

    crawData = () => {

    }

    render() {
        return (
            <div>
                <div>
                    <h1>
                        Analysis3
                    </h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Analysis3);