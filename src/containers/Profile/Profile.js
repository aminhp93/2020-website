import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import { Table, Button } from 'antd';
import { cloneDeep } from 'lodash';

import {
    getCompanyInfoUrl,
    getLastestFinancialInfoUrl,
    getSubCompaniesUrl,
    getCompanyOfficersUrl,
    getCompanyTransactionsUrl,
    getCompanyInfoUpdateUrl,
    getSubCompaniesUpdateUrl,
    getCompanyOfficersUpdateUrl,
    getCompanyTransactionsUpdateUrl,
} from '../../urls';

import { BILLION_UNIT } from '../../utils/unit';
import { formatNumber } from '../../utils/all';

const subCompaniesColumns = [
    {
        title: 'Cong ty con',
        dataIndex: 'CompanyName',
        key: 'CompanyName',
    },
    {
        title: 'Vốn điều lệ	',
        render: (params) => {
            return `${formatNumber(((params.CharterCapital || 0) / BILLION_UNIT).toFixed(0))} ty`
        }
    },
    {
        title: 'Tỷ lệ nắm giữ',
        render: (params) => {
            return `${(params.Ownership * 100).toFixed(0)}%`
        }
    },
]

const officersColumns = [
    {
        render: params => {
            console.log(params)
            return `${params.Name} | ${params.Position}`
        }
    }
]

const companyTransactionsColumns = [
    {
        title: 'Ngày',
        render: params => {
            return moment(params.ExecutionDate || '').format('DD/MM/YYYY');
        }
    },
    {
        title: 'Giao dịch',
        render: params => {
            return params.Type === 0 ? 'Mua' : 'Ban'
        }
    },
    {
        title: 'Cổ phiếu',
        dataIndex: 'Symbol',
        key: 'Symbol',
    },
    {
        title: 'KL',
        dataIndex: 'ExecutionVolume',
        key: 'ExecutionVolume',
    },
]

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CompanyInfoObj: {},
            LastestFinancialInfoObj: {},
            CompanyTransactionsArray: [],
            SubCompaniesArray: [],
            CompanyOfficersArray: [],
        }
    }

    componentDidMount() {
        this.crawlData();
    }

    componentDidUpdate(preProps) {
        console.log('componentDidUpdate Profile', this.props, preProps)
        if (this.props.Symbol !== preProps.Symbol) {
            this.crawlData();
        }
    }

    crawlData = () => {
        const { Symbol: symbol } = this.props;
        if (!symbol) return
        axios({
            method: 'get',
            url: getCompanyInfoUrl(symbol)
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        CompanyInfoObj: response.data
                    })
                }
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: getLastestFinancialInfoUrl(symbol)
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        LastestFinancialInfoObj: response.data
                    })
                }
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: getSubCompaniesUrl(symbol),
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        SubCompaniesArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))

        axios({
            method: 'get',
            url: getCompanyOfficersUrl(symbol),
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        CompanyOfficersArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))


        axios({
            method: 'get',
            url: getCompanyTransactionsUrl(symbol)
        })
            .then(response => {
                if (response.data) {
                    this.setState({
                        CompanyTransactionsArray: response.data
                    })
                }
            })
            .catch(error => console.log(error))
    }

    updateCompanyInfo = (symbol, resolve) => {
        if (!symbol) return;
        axios({
            method: 'put',
            url: getCompanyInfoUpdateUrl(symbol)
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    resolve && resolve(response.data)
                }
            })
            .catch(error => console.log(error))
    }

    updateCompanyInfoPartial = (start, count) => {
        let listPromises = [];
        const arr = cloneDeep(this.props.AllStocks);
        arr.splice(start, count)
        arr.map(item => {
            item.Symbol && listPromises.push(
                new Promise(resolve => {
                    this.updateCompanyInfo(item.Symbol, resolve);
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

    updateCompanyInfoAll = async () => {
        await this.updateCompanyInfoPartial(0, 500);
        await this.updateCompanyInfoPartial(500, 500);
        await this.updateCompanyInfoPartial(1000, 1000);
    }

    updateLastestFinancialInfo = () => {

    }

    updateLastestFinancialInfoAll = () => {

    }

    updateSubCompanies = (symbol, resolve) => {
        if (!symbol) return;
        axios({
            method: 'put',
            url: getSubCompaniesUpdateUrl(symbol)
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    resolve && resolve(response.data)
                }
            })
            .catch(error => console.log(error))
    }

    updateSubCompaniesPartial = (start, count) => {
        let listPromises = [];
        const arr = cloneDeep(this.props.AllStocks);
        arr.splice(start, count)
        arr.map(item => {
            item.Symbol && listPromises.push(
                new Promise(resolve => {
                    this.updateSubCompanies(item.Symbol, resolve);
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

    updateSubCompaniesAll = async () => {
        await this.updateSubCompaniesPartial(0, 500);
        await this.updateSubCompaniesPartial(500, 500);
        await this.updateSubCompaniesPartial(1000, 1000);
    }

    updateCompanyOfficers = (symbol, resolve) => {
        if (!symbol) return;
        axios({
            method: 'put',
            url: getCompanyOfficersUpdateUrl(symbol)
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    resolve && resolve(response.data)
                }
            })
            .catch(error => console.log(error))
    }

    updateCompanyOfficersPartial = (start, count) => {
        let listPromises = [];
        const arr = cloneDeep(this.props.AllStocks);
        arr.splice(start, count)
        arr.map(item => {
            item.Symbol && listPromises.push(
                new Promise(resolve => {
                    this.updateCompanyOfficers(item.Symbol, resolve);
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

    updateCompanyOfficersAll = async () => {
        await this.updateCompanyOfficersPartial(0, 500);
        await this.updateCompanyOfficersPartial(500, 500);
        await this.updateCompanyOfficersPartial(1000, 1000);
    }

    updateCompanyTransactions = (symbol, resolve) => {
        if (!symbol) return;
        axios({
            method: 'put',
            url: getCompanyTransactionsUpdateUrl(symbol)
        })
            .then(response => {
                console.log(response)
                if (response.data) {
                    resolve && resolve(response.data)
                }
            })
            .catch(error => console.log(error))
    }

    updateCompanyTransactionsPartial = (start, count) => {
        let listPromises = [];
        const arr = cloneDeep(this.props.AllStocks);
        arr.splice(start, count)
        arr.map(item => {
            item.Symbol && listPromises.push(
                new Promise(resolve => {
                    this.updateCompanyTransactions(item.Symbol, resolve);
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

    updateCompanyTransactionsAll = async () => {
        await this.updateCompanyTransactionsPartial(0, 500);
        await this.updateCompanyTransactionsPartial(500, 500);
        await this.updateCompanyTransactionsPartial(1000, 1000);
    }

    // RENDER PART

    renderDetailBasic = () => {
        const {
            CompanyInfoObj,
        } = this.state;
        const SymbolStock = CompanyInfoObj.Symbol || '';
        const ICBCode = CompanyInfoObj.ICBCode || '';
        const EstablishmentDate = moment(CompanyInfoObj.EstablishmentDate || '').format('DD/MM/YYYY');
        const CharterCapital = formatNumber(((CompanyInfoObj.CharterCapital || 0) / BILLION_UNIT).toFixed(0));
        const Employees = CompanyInfoObj.Employees || '';
        const Branches = CompanyInfoObj.Branches || '';
        return (
            <div>
                <div className="row">
                    <div>Ma SIC</div>
                    <div>{SymbolStock}</div>
                </div>
                <div className="row">
                    <div>Mã ngành ICB</div>
                    <div>{ICBCode}</div>
                </div>
                <div className="row">
                    <div>Năm thành lập</div>
                    <div>{EstablishmentDate}</div>
                </div>
                <div className="row">
                    <div>Vốn điều lệ</div>
                    <div>{CharterCapital} ty</div>
                </div>
                <div className="row">
                    <div>Số lượng nhân sự</div>
                    <div>{Employees}</div>
                </div>
                <div className="row">
                    <div>Số lượng chi nhánh	</div>
                    <div>{Branches}</div>
                </div>
            </div>
        )
    }

    renderDetailPublic = () => {
        const {
            CompanyInfoObj,
        } = this.state;
        const DateOfListing = moment(CompanyInfoObj.DateOfListing || '').format('DD/MM/YYYY');
        const Exchange = CompanyInfoObj.Exchange || '';
        const InitialListingPrice = formatNumber(CompanyInfoObj.InitialListingPrice || 0);
        const DateOfIssue = moment(CompanyInfoObj.DateOfIssue || '').format('DD/MM/YYYY');
        const ListingVolume = formatNumber(CompanyInfoObj.ListingVolume || 0);
        return (
            <div>
                <div className="row">
                    <div>Ngày niêm yết</div>
                    <div>{DateOfListing}</div>
                </div>
                <div className="row">
                    <div>Nơi niêm yết</div>
                    <div>{Exchange}</div>
                </div>
                <div className="row">
                    <div>Giá chào sàn</div>
                    <div>{InitialListingPrice}</div>
                </div>
                <div className="row">
                    <div>Ngày phát hành cuối</div>
                    <div>{DateOfIssue}</div>
                </div>
                <div className="row">
                    <div>KL đang niêm yết</div>
                    <div>{ListingVolume}</div>
                </div>
                <div className="row">
                    <div>GT niêm yết</div>
                    <div>21/11/2006</div>
                </div>
            </div>
        )
    }

    renderLeftStatistic = () => {
        const {
            LastestFinancialInfoObj,
        } = this.state;
        const MarketCapitalization = formatNumber(((LastestFinancialInfoObj.MarketCapitalization || 0) / BILLION_UNIT).toFixed(0));
        const SharesOutstanding = formatNumber(LastestFinancialInfoObj.SharesOutstanding || 0);
        const EPS = formatNumber((Number(LastestFinancialInfoObj.EPS) || 0).toFixed(0));
        const PE = formatNumber((Number(LastestFinancialInfoObj.PE) || 0).toFixed(0));
        return (
            <div className="Profile-statistic-left-container">
                <div className="row">
                    <div>Thị giá vốn</div>
                    <div>{MarketCapitalization} ty</div>
                </div>
                <div className="row">
                    <div>Số SLCP lưu hành</div>
                    <div>{SharesOutstanding}</div>
                </div>
                <div className="row">
                    <div>EPS</div>
                    <div>{EPS}</div>
                </div>
                <div className="row">
                    <div>P/E</div>
                    <div>{PE}</div>
                </div>
            </div>
        )
    }

    renderRightStatistic = () => {
        const {
            LastestFinancialInfoObj,
        } = this.state;
        const NetSales = formatNumber(((LastestFinancialInfoObj.NetSales || 0) / BILLION_UNIT).toFixed(0));
        const ProfitAfterIncomeTaxes = formatNumber(((LastestFinancialInfoObj.ProfitAfterIncomeTaxes || 0) / BILLION_UNIT).toFixed(0));
        const TotalAssets = formatNumber(((LastestFinancialInfoObj.TotalAssets || 0) / BILLION_UNIT).toFixed(0));
        const ROE = ((LastestFinancialInfoObj.ROE || 0) * 100).toFixed(2);
        return (
            <div className="Profile-statistic-right-container">
                <div className="row">
                    <div>Doanh thu (4 quý)</div>
                    <div>{NetSales} ty</div>
                </div>
                <div className="row">
                    <div>Lợi nhuận (4 quý)</div>
                    <div>{ProfitAfterIncomeTaxes} ty</div>
                </div>
                <div className="row">
                    <div>Tài sản (Quý gần nhất)</div>
                    <div>{TotalAssets} ty</div>
                </div>
                <div className="row">
                    <div>ROE (4 quý)</div>
                    <div>{ROE}%</div>
                </div>
            </div>
        )
    }

    renderSubCompanies = () => {
        const { SubCompaniesArray } = this.state;
        return (
            <Table dataSource={SubCompaniesArray} columns={subCompaniesColumns} pagination={false} />
        )
    }

    renderOfficers = () => {
        const { CompanyOfficersArray } = this.state;
        return (
            <Table dataSource={CompanyOfficersArray} columns={officersColumns} pagination={false} showHeader={false} />
        )
    }

    renderTransactions = () => {
        const { CompanyTransactionsArray } = this.state;
        return (
            <Table dataSource={CompanyTransactionsArray} columns={companyTransactionsColumns} pagination={false} />
        )
    }

    render() {
        const {
            CompanyInfoObj,
        } = this.state;
        const { Symbol: symbol } = this.props;
        const Overview = CompanyInfoObj.Overview || '';

        return <div className="Profile">
            <div className="Profile-left-container">
                <div className="Profile-introduction bg-white">
                    <div className="Profile-introduction-title header">
                        Gioi thieu
                        <div>
                            <Button onClick={() => this.updateCompanyInfo(symbol)}>CompanyInfo</Button>
                            <Button onClick={this.updateCompanyInfoAll}>Update All</Button>
                        </div>
                        <div>
                            <Button onClick={() => this.updateLastestFinancialInfo(symbol)}>LastestFinancialInfo</Button>
                            <Button onClick={this.updateLastestFinancialInfoAll}>Update All</Button>
                        </div>
                        <div>
                            <Button onClick={() => this.updateSubCompanies(symbol)}>SubCompanies</Button>
                            <Button onClick={this.updateSubCompaniesAll}>Update All</Button>
                        </div>
                        <div>
                            <Button onClick={() => this.updateCompanyOfficers(symbol)}>CompanyOfficers</Button>
                            <Button onClick={this.updateCompanyOfficersAll}>Update All</Button>
                        </div>
                        <div>
                            <Button onClick={() => this.updateCompanyTransactions(symbol)}>CompanyTransactions</Button>
                            <Button onClick={this.updateCompanyTransactionsAll}>Update All</Button>
                        </div>
                    </div>
                    <div className="Profile-introduction-container">
                        <div className="Profile-introduction-content">
                            {Overview}
                        </div>
                        <div className="Profile-introduction-detail">
                            <div className="Profile-introduction-detail-basic">
                                <div className="Profile-introduction-detail-basic-header">
                                    Thong tin co ban
                                </div>
                                {this.renderDetailBasic()}
                            </div>
                            <div className="Profile-introduction-detail-public">
                                <div className="Profile-introduction-detail-public-header">
                                    Thong tin niem yet
                                </div>
                                {this.renderDetailPublic()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Profile-statistic bg-white">
                    <div className="header">
                        Thong ke co ban
                    </div>
                    <div className="Profile-statistic-container">
                        {this.renderLeftStatistic()}
                        {this.renderRightStatistic()}
                    </div>
                </div>
                <div className="Profile-subcompanies bg-white">
                    <div className="header">
                        Cong ty con va lien ket
                    </div>
                    <div>
                        {this.renderSubCompanies()}
                    </div>
                </div>
            </div>
            <div className="Profile-right-container">
                <div className="Profile-officers bg-white">
                    <div className="header">
                        Ban lanh dao
                    </div>
                    <div>
                        {this.renderOfficers()}
                    </div>
                </div>
                <div className="Profile-transactions bg-white">
                    <div className="header">
                        Giao dich
                    </div>
                    <div>
                        {this.renderTransactions()}
                    </div>
                </div>
            </div>

        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);