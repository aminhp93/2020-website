import React from 'react';
import axios from 'axios';
import { Table } from 'antd';
import {
    getCompanyInfoUrl,
    getLastestFinancialInfoUrl,
    getSubCompaniesUrl,
    getCompanyOfficersUrl,
    getCompanyTransactionsUrl,
} from '../../request';

const subCompaniesColumns = [
    {
        title: 'Cong ty con',
        dataIndex: 'CompanyName',
        key: 'CompanyName',
    },
    {
        title: 'Vốn điều lệ	',
        dataIndex: 'CharterCapital',
        key: 'CharterCapital',
    },
    {
        title: 'Tỷ lệ nắm giữ',
        dataIndex: 'Ownership',
        key: 'Ownership',
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
        dataIndex: 'ExecutionDate',
        key: 'ExecutionDate',
    },
    {
        title: 'Giao dịch',
        // dataIndex: 'Type',
        // key: 'Type',
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

export default class Profile extends React.Component {
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
        axios({
            method: 'get',
            url: getCompanyInfoUrl()
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
            url: getLastestFinancialInfoUrl()
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
            url: getSubCompaniesUrl(),
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
            url: getCompanyOfficersUrl(),
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
            url: getCompanyTransactionsUrl()
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

    renderDetailBasic = () => {
        const {
            CompanyInfoObj,
        } = this.state;
        const Symbol = CompanyInfoObj.Symbol || '';
        const ICBCode = CompanyInfoObj.ICBCode || '';
        const EstablishmentDate = CompanyInfoObj.EstablishmentDate || '';
        const CharterCapital = CompanyInfoObj.CharterCapital || '';
        const Employees = CompanyInfoObj.Employees || '';
        const Branches = CompanyInfoObj.Branches || '';
        return (
            <div>
                <div className="row">
                    <div>Ma SIC</div>
                    <div>{Symbol}</div>
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
                    <div>{CharterCapital}</div>
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
        const DateOfListing = CompanyInfoObj.DateOfListing || '';
        const Exchange = CompanyInfoObj.Exchange || '';
        const InitialListingPrice = CompanyInfoObj.InitialListingPrice || '';
        const DateOfIssue = CompanyInfoObj.DateOfIssue || '';
        const ListingVolume = CompanyInfoObj.ListingVolume || '';
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
        const MarketCapitalization = LastestFinancialInfoObj.MarketCapitalization || '';
        const SharesOutstanding = LastestFinancialInfoObj.SharesOutstanding || '';
        const EPS = LastestFinancialInfoObj.EPS || '';
        const PE = LastestFinancialInfoObj.PE || '';
        return (
            <div className="Profile-statistic-left-container">
                <div className="row">
                    <div>Thị giá vốn</div>
                    <div>{MarketCapitalization}</div>
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
        const NetSales = LastestFinancialInfoObj.NetSales || '';
        const ProfitAfterIncomeTaxes = LastestFinancialInfoObj.ProfitAfterIncomeTaxes || '';
        const TotalAssets = LastestFinancialInfoObj.TotalAssets || '';
        const ROE = LastestFinancialInfoObj.ROE || '';
        return (
            <div className="Profile-statistic-right-container">
                <div className="row">
                    <div>Doanh thu (4 quý)</div>
                    <div>{NetSales}</div>
                </div>
                <div className="row">
                    <div>Lợi nhuận (4 quý)</div>
                    <div>{ProfitAfterIncomeTaxes}</div>
                </div>
                <div className="row">
                    <div>Tài sản (Quý gần nhất)</div>
                    <div>{TotalAssets}</div>
                </div>
                <div className="row">
                    <div>ROE (4 quý)</div>
                    <div>{ROE}</div>
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
            <Table dataSource={CompanyOfficersArray} columns={officersColumns} pagination={false} />
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
            LastestFinancialInfoObj,
            CompanyTransactionsArray,
            SubCompaniesArray,
            CompanyOfficersArray
        } = this.state;
        const Overview = CompanyInfoObj.Overview || '';

        return <div className="Profile">
            <div className="Profile-left-container">
                <div className="Profile-introduction bg-white">
                    <div className="Profile-introduction-title">
                        Gioi thieu
                    </div>
                    <div className="Profile-introduction-container">
                        <div className="Profile-introduction-content">
                            {Overview}
                        </div>
                        <div className="Profile-introduction-detail">
                            <div className="Profile-introduction-detail-basic">
                                <div>
                                    Thong tin co ban
                                </div>
                                {this.renderDetailBasic()}
                            </div>
                            <div className="Profile-introduction-detail-public">
                                <div>
                                    Thong tin niem yet
                                </div>
                                {this.renderDetailPublic()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Profile-statistic bg-white">
                    <div>
                        Thong ke co ban
                    </div>
                    <div className="Profile-statistic-container">
                        {this.renderLeftStatistic()}
                        {this.renderRightStatistic()}
                    </div>
                </div>
                <div className="Profile-subcompanies bg-white">
                    <div>
                        Cong ty con va lien ket
                    </div>
                    <div>
                        {this.renderSubCompanies()}
                    </div>
                </div>
            </div>
            <div className="Profile-right-container">
                <div className="Profile-officers bg-white">
                    <div>
                        Ban lanh dao
                    </div>
                    <div>
                        {this.renderOfficers()}
                    </div>
                </div>
                <div className="Profile-transactions bg-white">
                    <div>
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