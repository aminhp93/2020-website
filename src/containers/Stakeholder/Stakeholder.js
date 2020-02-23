import React from 'react';
import axios from 'axios';
import { Tabs, Table } from 'antd';
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

export default class Stakeholder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MajorHoldersArray: [],
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: getMajorHoldersUrl()
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
            url: getMajorHolderTransactionsUrl(),
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
            url: getMajorHolderTransactionsRangeUrl()
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
                        Co cau co dong
                    </div>
                </div>
                <div className="Stakeholder-bottom-container bg-white">
                    Giao dich co dong lon
                </div>
            </div>
        )
    }
}