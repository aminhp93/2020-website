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
                    <TabPane tab="1. kha nang thanh toan" key="1">
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
                    <TabPane tab="2. co cau tai san - nguon von" key="2">
                        <div>{`Ty le no vay/VCSH`}</div>
                        <div>{`Ty le No vay dai han/VCSH`}</div>
                        <div>{`Ty le no ngan han/VCSH`}</div>
                        <div>{`Ty le no vay/VCSH > 150% ==> Doanh nghiep thuong xuyen phai tra no vay, lieu dong tien doanh nghiep du tra no goc + lai`}</div>
                        <div>{`Ty suat loi nhuan tao ra tu nguon von vay > Chi phi lai vay(Lai suat)`}</div>
                        <div>{`Nha dau tu danh gia cao CP tang truong ==> Ban lanh dao danh doi gia tri co phan cua co dong lay su tang truong ==> loi nhuan tren von dau tu thap hon chi phi von DN huy dong duoc`}</div>
                        <div>{`Loi nhuan DN tang truong hang nam nhung gia tri cua co dong dang bi bao mon`}</div>
                        <div>{`Co the danh gia tang truong tot: ROCE (ty suat loi nhuan/tong von huy dong) > WACC (chi phi su dung von binh quan)`}</div>
                    </TabPane>
                    <TabPane tab="3. hieu suat hoat dong" key="3">
                        <div>{`So vong quay hang ton kho = Gia von hang ban / Hang ton kho binh quan`}</div>
                        <div>{`Phu thuoc vao dac diem DN: thong thuong so vong quay hang ton kho lon ==> to chuc + quan ly hang ton kho tot, DN rut ngan thoi gian kinh doanh, giam luong von bo vao hang ton kho`}</div>
                        <div>{`So vong quay hang ton kho thap ==> DN du tru qua nhieu vat tu ==> u dong hang ton kho, tinh hinh tieu thu san pham cua DN khong kha quan`}</div>
                        <div>{`So ngay 1 vong quay hang ton kho = 360/vong quay hang ton kho`}</div>
                        <div>{`LUU Y: chi su dung voi DN san xuat, thuong mai hang hoa, co ty trong hang ton kho tren tai san cao`}</div>
                        <div>{`LUU Y: chi so sanh DN cung nganh, co ban chat luu kho hang hoa tuong dong`}</div>
                        <div>{`So vong quay phai thu khach hang = DN ban hang/Phai thu khach hang binh quan`}</div>
                        <div>{`Vong quay cang nhieu ==> DN phai thu hoi cac khoan phai thu de chuyen hoa tien mat cang nhanh ==> suc khoe + hieu qua kinh doanh cua DN, DN khong bi khach hang chiem dung qua nhieu von`}</div>
                        <div>{`Ky thu tien khach hang binh quan = 360 / vong quay phai thu khach hang`}</div>
                        <div>{`Sau bao lau tu khi ban hang DN thu duoc tien ban hang, phu thuoc nhieu vao chinh sach ban hang + to chuc cua DN`}</div>
                        <div>{`So vong quay phai tra nguoi ban = Gia von hang ban / Phai tra nguoi ban binh quan`}</div>
                        <div>{`So ngay phai tra nguoi ban binh quan = 360 / so vong quay phai tra nguoi ban`}</div>
                        <div>{`So ngay phai tra nguoi ban cang cao cang tot, DN co nhieu thoi gian dung tien vao hoat dong kinh doanh`}</div>
                        <br />
                        <div>{`Tip 1: Vong quay tien mat`}</div>
                        <div>{`Vong quay tien mat = So ngya 1 vong quay hang ton kho + Ky thu tien khach hang binh quan - so ngay phai tra nguoi ban binh quan`}</div>
                        <div>{`Vong quay tien mat cang thap ==> DN su dung tien cang tot, so sanh DN trong cung nganh, cung linh vuc`}</div>
                        <div>{`So sanh voi xu huong vong quay tien mat trong qua khu (3-5 nam)`}</div>
                        <div>{`Dau hieu tich cuc khi vong quay tien mat giam dan`}</div>
                        <div>{`Vong quay tai san (Vong quay toan bo von) = Doanh thu thuan/Tong tai san binh quan`}</div>
                        <div>{`Warrent buffet thich DN co vong quay tai san cao ==> co the tao ra dong tien tang truong cho co dong ma khong can dau tu lien tuc vao tai san qua nhieu`}</div>
                    </TabPane>
                    <TabPane tab="4. hieu qua hoat dong" key="4">
                        <div>{`Bien loi nhuan gop =  Loi nhuan gop / Doanh thu thuan`}</div>
                        <div>{`Bien LNG > 30%: Loi the canh tranh ben vung, < 10%: khong co loi the canh tranh`}</div>
                        <div>{`Ty suat loi nhuan tren doanh thu (ROS) = Loi nhuan sau thue/Doanh thu thuan`}</div>
                        <div>{`LNST / DT > 15%: Huong loi tu loi the canh tranh dai han, <10%: canh tranh khoc liet, loi the canh tranh thap`}</div>
                        <div>{`Ty suat LNST tren tai san (ROA) = Loi nhuan sau thue / Tong tai san binh quan`}</div>
                        <div>{`Ty suat LNST tren VCSH (ROE) = Loi nhuan sau thue / VCSH binh quan`}</div>
                        <div>{`Cach 1: Lua chon co phieu qua toc do tang truong`}</div>
                        <div>{`VN: MWG ROE > 40%, tang truong kep 53%`}</div>
                        <div>{`Toc do tang truong = ROE * Ty le tai dau tu`}</div>
                        <div>{`Cach 2: Danh gia kha nang tao gia tri cho co dong`}</div>
                        <div>{`ROE < Ke (chi phi su dung VCSH) ==> Hoat dong kem hieu qua. VD: MWG ROE = 38.7%, Ke = 9.6%`}</div>
                        <div>{`Cach 3: Tim DN co loi the canh tranh ben vung`}</div>
                        <div>{`VD: cp Vinh Hoan: cung la xuat khau ca tra, nhung xuat khau sang thi truong My ==> gia > 50% so voi thi truong khac ==> loi the canh tranh ben vung`}</div>
                        <div>{`Bonus: Mo hinh Dupont: ROE = Ty suat loi nhuan rong * Vong quay tai san * Don bay tai chinh`}</div>
                        <div>{`Ty suat LN rong = LNST / Doanh thu`}</div>
                        <div>{`Vong quay tai san = Doanh thu / Tong tai san`}</div>
                        <div>{`Vong quay tai san tang ==> DN ngay cang thu duoc nhieu doanh thu tu tai san san co`}</div>
                        <div>{`Don bay tai chinh = Tong tai san / VCSH`}</div>
                        <div>{`Don bay tai chinh tang ==> DN dang vay no nhieu de thuc day hoat dong san xuat kinh doanh`}</div>
                        <div>{`VD: Ton Hoa Sen, he so don bay tai chinh cao, vong quay tai san giam `}</div>
                        <div>{`VD: Hoa Phat, he so don bay tai chinh giam, vong quay tai san tang, LNST tang`}</div>
                        <div>{`Thu nhap 1 co phan thuong (EPS) = (LNST - co tuc co dong uu dai)/So co phan thuong luu hanh`}</div>
                        <br />
                        <div>{`Tip2: Su dung EPS de danh gia chat luong loi nhuan tang truong qua cac thoi ky`}</div>
                        <div>{`%EPS = (EPS1 - EPS0) / EPS0`}</div>
                    </TabPane>
                    <TabPane tab="5. phan phoi loi nhuan" key="5">
                        <div>{`Ty le chi tra co tuc = Co tuc 1 co phan / EPS`}</div>
                        <br />
                        <div>{`Tip 3: Ty le chi tra co tuc bao nhieu la hop ly?`}</div>
                        <div>{`1. DN duoc bo sung nguon von cho hoat dong kinh doanh`}</div>
                        <div>{`2. DN dam bao giu vung duoc ty suat loi nhuan tren von (ROE)`}</div>
                        <div>{`Ty suat co tuc = Co tuc 1 co phan / Gia thi truong 1 co phan`}</div>
                    </TabPane>
                    <TabPane tab="6. gia thi truong" key="6">
                        <div>{`P/E = Gia thi truong / EPS`}</div>
                        <div>{`Nha dau tu hay thi truong san sang tra bao nhieu de lay 1 dong thu nhap cua DN`}</div>
                        <div>{`P/B = Gia thi truong / Gia tri so sach 1 co phan thuong`}</div>
                        <div>{`Moi quan he P/B vs ROE`}</div>
                        <div>{`Anh huong P/B: ty suat loi nhuan / VCSH (ROE) ==> ROE cang cao, P/B cang lon ==> tim DN co ROE cao nhung P/B thap so voi toan nganh`}</div>
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
