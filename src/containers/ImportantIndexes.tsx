import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { List, Avatar, Pagination, Modal, Tabs } from 'antd';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';

const { TabPane } = Tabs;


interface IProps {

}

interface IState {
    modules: any,
    columnDefs: any,
    defaultColDef: any,
    rowData: any,
}

class ImportantIndexes extends React.Component<IProps, IState> {
    gridApi: any;
    gridColumnApi: any;

    constructor(props) {
        super(props);
        this.state = {
            modules: AllCommunityModules,
            columnDefs: this.getColumnDefs(),
            defaultColDef: {
                flex: 1,
                filter: true,
                sortable: true,
            },
            rowData: [
            ]
        }
    }

    getColumnDefs = () => {
        // [
        //     {
        //         headerName: 'Ty le thanh toan hien hanh',
        //         field: 'tyLeThanhToanHienHanh',
        //     },
        //     {
        //         headerName: 'Ty le thanh toan nhanh',
        //         field: 'tyLeThanhToanNhanh',
        //     },
        //     {
        //         headerName: 'Ty le thanh toan tuc thoi',
        //         field: 'tyLeThanhToanTucThoi',
        //     },
        //     {
        //         headerName: 'Ty le thanh toan lai vay',
        //         field: 'tyLeThanhToanLaiVay',
        //     },
        // ]
        const yearsArray = [2014, 2015, 2016, 2017, 2018, 2019]
        let result = [{
            headerName: 'Title',
            cellRenderer: (params) => {
                return params.Name
            }
        }]
        yearsArray.map(year => (
            result.push({
                headerName: JSON.stringify(year),
                cellRenderer: (params) => {
                    return 123
                }
            })
        ))
        return result
    }

    crawData = () => {
        this.setState({
            rowData: [
                {
                    Date: ''
                },
                {
                    Date: ''
                }
            ]
        })
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.crawData();
    };

    render() {
        const { modules, columnDefs, defaultColDef, rowData } = this.state;

        return (
            <div>
                <div>6 nhom chi so co Ban</div>
                <Tabs defaultActiveKey='1'>
                    <TabPane tab="1. Nhom chi so phan anh kha nang thanh toan" key="1">
                        <div>{`1. Ty le thanh toan hien hanh = Tai san ngan han / No ngan han`}</div>
                        <div>{`< 1 ==> kha nang thanh toan yeu`}</div>
                        <div>{`> 1 ==> chua chac da tot, doanh nghiep chua su dung tai san hieu qua`}</div>
                        <br />
                        <div>{`2. Ty le thanh toan nhanh = (Tai san ngan han - hang ton kho) / No ngan han`}</div>
                        <div>{`Cang cao cang on dinh ve mat tai chinh`}</div>
                        <br />
                        <div>{`3. Ty le thanh toan tuc thoi = Tien vs tuong duong tien / No ngan han`}</div>
                        <div>{`Huu ich trong thoi ky khung hoang: Hang ton kho khong tieu thu duoc + khoan phai thu kho thu hoi`}</div>
                        <br />
                        <div>{`4. Kha nang thanh toan lai vay = Loi nhuan truoc lai vay (EBIT) / lai vay phai tra`}</div>

                        <div style={{ width: '100%', height: '100%' }}>
                            <div
                                id="myGrid"
                                style={{
                                    height: '500px',
                                }}
                                className="ag-theme-alpine"
                            >
                                <AgGridReact
                                    modules={modules}
                                    columnDefs={columnDefs}
                                    defaultColDef={defaultColDef}
                                    onGridReady={this.onGridReady}
                                    rowData={rowData}
                                    onFirstDataRendered={params => params.api.sizeColumnsToFit()}
                                />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="2. Nhom chi so phan anh co cau tai san - nguon von" key="2">

                    </TabPane>
                    <TabPane tab="3. Nhom chi so hieu suat hoat dong" key="3">

                    </TabPane>
                    <TabPane tab="4. Nhom chi so hieu qua hoat dong" key="4">

                    </TabPane>
                    <TabPane tab="5. Nhom chi so phan phoi loi nhuan" key="5">

                    </TabPane>
                    <TabPane tab="6. Nhom chi so gia thi truong" key="6">

                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        selectedSymbol: get(state, 'selectedSymbol'),
        stocks: get(state, 'stocks'),
        lastUpdatedDate: get(state, 'lastUpdatedDate')
    }

}

const mapDispatchToProps = {


}

export default connect(mapStateToProps, mapDispatchToProps)(ImportantIndexes);
