import React from 'react';
import { List } from 'antd';

const data = [
    {
        'title': 'Analyis 1',
        'detail': [
            'Danh sach nhung CP trong ngay voi gia tri > 5 ty, ChangePrice > 1%'
        ]
    },
    {
        'title': 'Analysis 2',
        'detail': [
            'Danh sach nhung CP cung nganh',
            'So sanh gia hien tai voi gia 1/1/2020 de xem anh huong cua corona',
            'Hien tai se dung 7 nhom nganh chinh: chung khoan: VND, ngan hang: VCB, dau khi: PVD, thuc pham: VNM, CNTT: FPT, BDS: VIC, hang khong: VJC'
        ]
    },
    {
        'title': 'Analysis 3',
        'detail': [
            'Phan tich BCTC cua nhung CP cung nganh - VND',
        ]
    },
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
    },
    {
        'title': "Crawdata1",
        'detail': [
            'Lay du lieu hang ngay nhung CP TodayCapital > 5 ty, %Change in Price > 1%'
        ]
    },
    {
        'title': "Crawdata2",
        'detail': [
            '1. So sanh DN cung nganh: 10DN von hoa lon nhat trong tung nganh',
            '2. 7 nganh chinh: chung khoan: VND, ngan hang: VCB, dau khi: PVD, thuc pham: VNM, CNTT: FPT, BDS: VIC, hang khong: VJC',
            '3. Anh huong cua tung nganh trong khung hoang',
            '4. Nganh nao chiu thiet hai nhat: Nguyen nhan, muc do thiet hai, tiem nang phat trien',
            '5. So sanh von hoa thi truong hien tai va cach day 2 thang',
            '6. 1 so CP tiem nang: BID, MBB, CTG, SHB, ACB, VCB, STB, TCB, AST, SSI, HCM, SHS, MSN, PVD, PVS, BVH, PNJ, GAS, PLX, MWG, VNM, HPG, VJC, FPT'
        ]
    }
];


class OverviewAnalysis extends React.Component {
    render() {
        return (
            <div className="OverviewAnalysis">
                <List
                    header={<div>Analysis</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <div className="OverviewAnalysis-item">
                                <li className='OverviewAnalysis-title'>{item.title}</li>
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

export default OverviewAnalysis;