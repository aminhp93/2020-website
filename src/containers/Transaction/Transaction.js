import React from 'react';
import { List, Tabs } from 'antd';

import ChartTV from '../ChartTV/ChartTV';

const { TabPane } = Tabs;

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];
export default class Transaction extends React.Component {
    renderSummaryTransaction = () => {
        const dataSummaryTransaction = [
            {
                'title': 'Hiện tại',
                'detail': '48.15 0.05|0.10%'
            },
            {
                'title': 'Cao/Thấp',
                'detail': '50.00 | 45.20'
            },
            {
                'title': 'Khối lượng',
                'detail': '2,919,140'
            },
            {
                'title': 'Giá trị',
                'detail': '136.99 tỷ'
            },
            {
                'title': 'KLTB (10 ngày)',
                'detail': '2,287,579'
            }
        ]
        return (
            <div>
                <List
                    header={<div>GIAO DỊCH</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={dataSummaryTransaction}
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

    renderSummaryEvaluation = () => {
        const dataSummaryEvaluation = [
            {
                'title': 'Thị giá',
                'detail': '32,659.0 tỷ'
            },
            {
                'title': 'EPS',
                'detail': '4,623'
            },
            {
                'title': 'P/E',
                'detail': '10.42'
            },
            {
                'title': 'P/S',
                'detail': '1.14'
            },
            {
                'title': 'P/B',
                'detail': '2.11'
            }
        ]
        return (
            <div>
                <List
                    header={<div>ĐỊNH GIÁ</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={dataSummaryEvaluation}
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

    renderSummarySupplyDemand = () => {
        const dataSummarySupplyDemand = [
            {
                'title': 'Dư mua',
                'detail': '2,748,930'
            },
            {
                'title': 'Dư bán',
                'detail': '2,974,430'
            },
            {
                'title': 'KL Mua chủ động',
                'detail': '1,570,780'
            },
            {
                'title': 'KL Bán chủ động',
                'detail': '1,348,360'
            }
        ]
        return (
            <div>
                <List
                    header={<div>CUNG CẦU</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={dataSummarySupplyDemand}
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

    renderSummaryForeignInvestor = () => {
        const dataSummaryForeignInvestor = [
            {
                'title': 'KL NN Mua',
                'detail': '381,160'
            },
            {
                'title': 'KL NN Bán',
                'detail': '400,930'
            },
            {
                'title': 'GT NN Mua	',
                'detail': '19.59 tỷ'
            },
            {
                'title': 'GT NN Bán',
                'detail': '20.54 tỷ'
            }
        ]
        return (
            <div>
                <List
                    header={<div>GIAO DỊCH NĐTNN</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={dataSummaryForeignInvestor}
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

    renderOrderStatistic = () => {
        const dataDatMua = [
            {
                title: '',
                detail: [440, 48.15]
            },
            {
                title: '',
                detail: [440, 48.15]
            },
            {
                title: '',
                detail: [440, 48.15]
            }
        ]
        const dataDatBan = [
            {
                title: '',
                detail: [440, 48.15]
            },
            {
                title: '',
                detail: [440, 48.15]
            },
            {
                title: '',
                detail: [440, 48.15]
            }
        ]
        return (
            <React.Fragment>


                <List
                    header={<div>ĐẶT MUA</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={dataDatMua}
                    renderItem={item => (
                        <List.Item>
                            <div className="row">
                                <div>{item.title}</div>
                                <div>{item.detail[0]} - {item.detail[1]}</div>
                            </div>
                        </List.Item>
                    )}
                />
                <List
                    header={<div>ĐẶT BÁN</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={dataDatBan}
                    renderItem={item => (
                        <List.Item>
                            <div className="row">
                                <div>{item.title}</div>
                                <div>{item.detail[0]} - {item.detail[1]}</div>
                            </div>
                        </List.Item>
                    )}
                />
            </React.Fragment>
        )
    }

    render() {
        return <div className="Transaction">
            <div className="Transaction-left-container">
                <div className="Transaction-chartTV">
                    <ChartTV />
                    {/* chartTV */}
                </div>
                <div className="Transaction-summary">
                    <div className="row">
                        {this.renderSummaryTransaction()}
                        {this.renderSummaryEvaluation()}

                    </div>
                    <div className="row">
                        {this.renderSummarySupplyDemand()}
                        {this.renderSummaryForeignInvestor()}
                    </div>
                </div>
            </div>
            <div className="Transaction-right-container">
                <div className="Trasaction-order-statistic">
                    {this.renderOrderStatistic()}
                </div>
                <div className="Trasaction-order-deal-statistic">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Chi tiet" key="1">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab="Muc gia" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Toc do" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                        <TabPane tab="Cung cap" key="4">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    }
}