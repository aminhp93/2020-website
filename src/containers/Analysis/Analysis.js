import React from 'react';
import { connect } from 'react-redux';
import { List } from 'antd';

import {
    // setSymbol,
} from '../../actions/stock';

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