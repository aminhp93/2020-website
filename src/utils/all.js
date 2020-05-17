export const LATEST_FINANCIAL_REPORTS = {
    TYPE_1: 'Can doi ke toan',
    TYPE_2: 'Ket qua kinh doanh',
    TYPE_3: 'Luu chuyen tien te - Truc tiep',
    TYPE_4: 'Luu chuyen tien te - Gian tiep',
}

export function formatNumber(num) {
    if (!num) return num
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function mapColorPriceChange(data) {
    if (!data) return ''
    if (data >= 6) {
        return 'purple'
    } else if (0 < data && data < 6) {
        return 'green'
    } else if (data === 0) {
        return 'white'
    } else if (-6 < data && data < 0) {
        return 'red'
    } else if (data <= -6) {
        return 'blue'
    }
}

export function mapArrayToKeyValue(data) {
    let result = {}
    data.map(item => {
        result[item.id] = item
    })
    return result
}

export function mapDataTwoDate(data1, data2, allStocks) {
    if (!data1 || !data2 || !allStocks) return []
    let data1Obj = {};
    let data2Obj = {};
    data1.map(item => {
        data1Obj[item.Stock] = item
    })
    data2.map(item => {
        data2Obj[item.Stock] = item
    })
    console.log(allStocks, data1, data2, data1Obj, data2Obj)
    for (let i = 0; i < data1.length; i++) {
        data1[i].TodayCapital = Number((data1[i].PriceClose * data1[i].DealVolume / 1000000000).toFixed(0))
        data1[i].MarketCap = Number((data1[i].MarketCap / 1000000000).toFixed(0))
        if (!data2Obj[data1[i].Stock]) {

        } else {
            const data2Item = data2Obj[data1[i].Stock]
            data1[i].YesterdayPriceClose = data2Item.PriceClose
            data1[i].PriceChange = Number(((data1[i].PriceClose - data2Item.PriceClose) * 100 / data2Item.PriceClose).toFixed(1))
            data1[i].YesterdayVolumeClose = data2Item.DealVolume
            data1[i].VolumeChange = Number(((data1[i].DealVolume - data2Item.DealVolume) * 100 / data2Item.DealVolume).toFixed(1))
        }
        data1[i].Stock = allStocks[data1[i].Stock].Symbol


    }
    return data1;
}

export const arrayToKeyValue = (array, key = 'id') =>
    Object.fromEntries(array.map(item => [item[key], item]))

export const mapDataImportantIndexes = (dataType1, dataType2, dataType3, dataType4, dataType5) => {
    if (!dataType1 || !dataType2) return []
    let result = []

    // GET INFO
    const taiSanNganHan = dataType1.filter(i => i.ID === 101)[0]
    const noNganHan = dataType1.filter(i => i.ID === 30101)[0]
    const hangTonKho = dataType1.filter(i => i.ID === 10104)[0]
    const tienVsTuongDuongTien = dataType1.filter(i => i.ID === 10101)[0]
    const loiNhuanTruocThue = dataType2.filter(i => i.ID === 15)[0]
    const chiPhiLayVay = dataType2.filter(i => i.ID === 701)[0]
    const noVay = dataType1.filter(i => i.ID === 301)[0]
    const noVayDaiHan = dataType1.filter(i => i.ID === 30102)[0]
    const noVayNganHan = dataType1.filter(i => i.ID === 30101)[0]
    const VCSH = dataType1.filter(i => i.ID === 302)[0]
    const tongCongNguonVon = dataType1.filter(i => i.ID === 4)[0]
    const doanhThuThuan = dataType2.filter(i => i.ID === 3)[0]
    const phaiThuNganHanKhachHang = dataType1.filter(i => i.ID === 1010301)[0]
    const phaiThuDaiHanKhachHang = dataType1.filter(i => i.ID === 1020101)[0]
    const phaiTraNguoiBanNganHan = dataType1.filter(i => i.ID === 302)[0]
    const phaiTraNguoiBanDaiHan = dataType1.filter(i => i.ID === 302)[0]
    const tongCongTaiSan = dataType2.filter(i => i.ID === 2)[0]
    const loiNhuanGop = dataType1.filter(i => i.ID === 15)[0]
    const LNST = dataType1.filter(i => i.ID === 19)[0]
    const PriceClose = dataType4[0].PriceClose
    const PB = dataType5.PB

    const yearsArray = [2014, 2015, 2016, 2017, 2018, 2019]

    // INDEX 1
    let tyLeThanhToanHienHanhValues = [];
    let tyLeThanhToanNhanhValues = [];
    let tyLeThanhToanTucThoiValues = [];
    let khaNangThanhToanLaiVayValues = [];
    // INDEX 2
    let tyLeNoVay_VCSHValues = []
    let tyLeNovayDaiHan_VCSHValues = []
    let tyLeNoVayNganHan_VCSHValues = []
    // INDEX 3
    let soVongQuayHangTonKhoValues = []
    let soVongQuayPhaiThuKhachHangValues = []
    let soVongQuayPhaiTraNguoiBanValues = []
    let vongQuayTienMatValues = []
    let vongQuayTaiSanValues = []
    // INDEX 4
    let bienLoiNhuanGopValues = []
    let ROSValues = []
    let ROAValues = []
    let ROEValues = []
    let heSoDonBayTaiChinhValues = []
    let EPSValues = []
    // INDEX 5
    let tyLeChiTraCoTucValues = []
    let tySuatCoTucValues = []
    // INDEX 6
    let PEValues = []
    let PBValues = []

    yearsArray.map(i => {
        const taiSanNganHanValue = taiSanNganHan && taiSanNganHan.Values && taiSanNganHan.Values.filter(j => j.Year === i)[0].Value
        const noNganHanValue = noNganHan && noNganHan.Values && noNganHan.Values.filter(j => j.Year === i)[0].Value
        const hangTonKhoValue = hangTonKho && hangTonKho.Values && hangTonKho.Values.filter(j => j.Year === i)[0].Value
        const tienVsTuongDuongTienValue = tienVsTuongDuongTien && tienVsTuongDuongTien.Values && tienVsTuongDuongTien.Values.filter(j => j.Year === i)[0].Value
        const loiNhuanTruocThueValue = loiNhuanTruocThue && loiNhuanTruocThue.Values && loiNhuanTruocThue.Values.filter(j => j.Year === i)[0].Value
        const chiPhiLayVayValue = chiPhiLayVay && chiPhiLayVay.Values && chiPhiLayVay.Values.filter(j => j.Year === i)[0].Value
        const noVayValue = noVay && noVay.Values && noVay.Values.filter(j => j.Year === i)[0].Value
        const noVayDaiHanValue = noVayDaiHan && noVayDaiHan.Values && noVayDaiHan.Values.filter(j => j.Year === i)[0].Value
        const noVayNganHanValue = noVayNganHan && noVayNganHan.Values && noVayNganHan.Values.filter(j => j.Year === i)[0].Value
        const VCSHValue = VCSH && VCSH.Values && VCSH.Values.filter(j => j.Year === i)[0].Value
        const tongCongNguonVonValue = tongCongNguonVon && tongCongNguonVon.Values && tongCongNguonVon.Values.filter(j => j.Year === i)[0].Value
        const doanhThuThuanValue = doanhThuThuan && doanhThuThuan.Values && doanhThuThuan.Values.filter(j => j.Year === i)[0].Value
        const phaiThuNganHanKhachHangValue = phaiThuNganHanKhachHang && phaiThuNganHanKhachHang.Values && phaiThuNganHanKhachHang.Values.filter(j => j.Year === i)[0].Value
        const phaiThuDaiHanKhachHangValue = phaiThuDaiHanKhachHang && phaiThuDaiHanKhachHang.Values && phaiThuDaiHanKhachHang.Values.filter(j => j.Year === i)[0].Value
        const phaiTraNguoiBanNganHanValue = phaiTraNguoiBanNganHan && phaiTraNguoiBanNganHan.Values && phaiTraNguoiBanNganHan.Values.filter(j => j.Year === i)[0].Value
        const phaiTraNguoiBanDaiHanValue = phaiTraNguoiBanDaiHan && phaiTraNguoiBanDaiHan.Values && phaiTraNguoiBanDaiHan.Values.filter(j => j.Year === i)[0].Value
        const tongCongTaiSanValue = tongCongTaiSan && tongCongTaiSan.Values && phaiTraNguoiBanDaiHan.Values.filter(j => j.Year === i)[0].Value
        const loiNhuanGopValue = loiNhuanGop && loiNhuanGop.Values && phaiTraNguoiBanDaiHan.Values.filter(j => j.Year === i)[0].Value
        const LNSTValue = LNST && LNST.Values && LNST.Values.filter(j => j.Year === i)[0].Value

        let dataType3Indexes = dataType3.filter(j => Number(j.Year) === i)

        // INDEX 1
        tyLeThanhToanHienHanhValues.push({
            Year: i,
            Quarter: 0,
            // Value: (taiSanNganHanValue && noNganHanValue) ? taiSanNganHanValue / noNganHanValue : null
            Value: dataType3Indexes.length && dataType3Indexes[0].CurrentRatio
        })
        tyLeThanhToanNhanhValues.push({
            Year: i,
            Quarter: 0,
            // Value: (taiSanNganHanValue && noNganHanValue && hangTonKhoValue) ? (taiSanNganHanValue - hangTonKhoValue) / noNganHanValue : null
            Value: dataType3Indexes.length && dataType3Indexes[0].QuickRatio
        })
        tyLeThanhToanTucThoiValues.push({
            Year: i,
            Quarter: 0,
            Value: (tienVsTuongDuongTienValue && noNganHanValue) ? tienVsTuongDuongTienValue / noNganHanValue : null
        })
        khaNangThanhToanLaiVayValues.push({
            Year: i,
            Quarter: 0,
            Value: (loiNhuanTruocThueValue && chiPhiLayVayValue) ? (loiNhuanTruocThueValue + chiPhiLayVayValue) / chiPhiLayVayValue : null
        })
        // INDEX 2
        tyLeNoVay_VCSHValues.push({
            Year: i,
            Quarter: 0,
            Value: (noVayValue && VCSHValue) ? noVayValue / VCSHValue : null
        })
        tyLeNovayDaiHan_VCSHValues.push({
            Year: i,
            Quarter: 0,
            Value: (noVayDaiHanValue && VCSHValue) ? noVayDaiHanValue / VCSHValue : null
        })
        tyLeNoVayNganHan_VCSHValues.push({
            Year: i,
            Quarter: 0,
            Value: (noVayNganHanValue && VCSHValue) ? noVayNganHanValue / VCSHValue : null
        })
        // INDEX 3

        // let soVongQuayHangTonKho = (tongCongNguonVonValue && hangTonKhoValue) ? tongCongNguonVonValue / hangTonKhoValue : null
        // let soVongQuayPhaiThuKhachHang = (doanhThuThuanValue && (phaiThuNganHanKhachHangValue || phaiThuNganHanKhachHangValue === 0) && (phaiThuDaiHanKhachHangValue || phaiThuDaiHanKhachHangValue === 0)) ? doanhThuThuanValue / (phaiThuNganHanKhachHangValue + phaiThuDaiHanKhachHangValue) : null
        let soVongQuayPhaiTraNguoiBan = (tongCongNguonVonValue && (phaiTraNguoiBanNganHanValue || phaiTraNguoiBanNganHanValue === 0) && (phaiTraNguoiBanDaiHanValue || phaiTraNguoiBanDaiHanValue === 0)) ? tongCongNguonVonValue / (phaiTraNguoiBanNganHanValue + phaiTraNguoiBanDaiHanValue) : null
        let vongQuayTienMat = (
            dataType3Indexes.length
            && dataType3Indexes[0].InventoryTurnover
            && dataType3Indexes[0].ReceivablesTurnover
            && soVongQuayPhaiTraNguoiBan
        )
            ? (360 / dataType3Indexes[0].InventoryTurnover + 360 / dataType3Indexes[0].ReceivablesTurnover + 360 / soVongQuayPhaiTraNguoiBan)
            : null
        soVongQuayHangTonKhoValues.push({
            Year: i,
            Quarter: 0,
            Value: dataType3Indexes.length && dataType3Indexes[0].InventoryTurnover
        })
        soVongQuayPhaiThuKhachHangValues.push({
            Year: i,
            Quarter: 0,
            Value: dataType3Indexes.length && dataType3Indexes[0].ReceivablesTurnover
        })
        soVongQuayPhaiTraNguoiBanValues.push({
            Year: i,
            Quarter: 0,
            Value: soVongQuayPhaiTraNguoiBan
        })
        vongQuayTienMatValues.push({
            Year: i,
            Quarter: 0,
            Value: vongQuayTienMat
        })
        vongQuayTaiSanValues.push({
            Year: i,
            Quarter: 0,
            Value: dataType3Indexes.length && dataType3Indexes[0].AssetsTurnover
            // (doanhThuThuanValue && tongCongTaiSanValue) ? doanhThuThuanValue / tongCongTaiSanValue : null
        })
        // INDEX 4
        bienLoiNhuanGopValues.push({
            Year: i,
            Quarter: 0,
            Value: dataType3Indexes.length && dataType3Indexes[0].GrossMargin
        })
        ROSValues.push({
            Year: i,
            Quarter: 0,
            Value: (LNSTValue && doanhThuThuanValue) ? LNSTValue / doanhThuThuanValue : null
        })
        ROAValues.push({
            Year: i,
            Quarter: 0,
            Value: dataType3Indexes.length && dataType3Indexes[0].ROA
        })
        ROEValues.push({
            Year: i,
            Quarter: 0,
            Value: dataType3Indexes.length && dataType3Indexes[0].ROE
        })
        heSoDonBayTaiChinhValues.push({
            Year: i,
            Quarter: 0,
            Value: (dataType3Indexes.length && dataType3Indexes[0].ROE && dataType3Indexes[0].ROA) ? dataType3Indexes[0].ROE / dataType3Indexes[0].ROA : null
        })
        EPSValues.push({
            Year: i,
            Quarter: 0,
            Value: dataType3Indexes.length && dataType3Indexes[0].DilutedEPS
        })
        // INDEX 5
        // INDEX 6
        PEValues.push({
            Year: i,
            Quarter: 0,
            Value: (PriceClose && dataType3Indexes.length && dataType3Indexes[0].DilutedEPS) ? PriceClose / dataType3Indexes[0].DilutedEPS : null
        })
        PBValues.push({
            Year: i,
            Quarter: 0,
            Value: PB
        })


    })

    // INDEX 1
    // result.push(taiSanNganHan)
    // result.push(noNganHan)
    result.push({
        ID: "tyLeThanhToanHienHanh",
        Name: "tyLeThanhToanHienHanh",
        Values: tyLeThanhToanHienHanhValues
    })

    // result.push(taiSanNganHan)
    // result.push(noNganHan)
    result.push({
        ID: "tyLeThanhToanNhanh",
        Name: "tyLeThanhToanNhanh",
        Values: tyLeThanhToanNhanhValues
    })

    // result.push(taiSanNganHan)
    // result.push(noNganHan)
    result.push({
        ID: "tyLeThanhToanTucThoi",
        Name: "tyLeThanhToanTucThoi",
        Values: tyLeThanhToanTucThoiValues
    })


    // result.push(taiSanNganHan)
    // result.push(noNganHan)
    result.push({
        ID: "khaNangThanhToanLaiVay",
        Name: "khaNangThanhToanLaiVay",
        Values: khaNangThanhToanLaiVayValues
    })

    // INDEX 2
    // result.push(noVay)
    // result.push(VCSH)
    result.push({
        ID: "tyLeNoVay_VCSH",
        Name: "tyLeNoVay_VCSH",
        Values: tyLeNoVay_VCSHValues
    })

    // result.push(noVayDaiHan)
    // result.push(VCSH)
    result.push({
        ID: "tyLeNovayDaiHan_VCSH",
        Name: "tyLeNovayDaiHan_VCSH",
        Values: tyLeNovayDaiHan_VCSHValues
    })

    // result.push(noVayNganHan)
    // result.push(VCSH)
    result.push({
        ID: "tyLeNoVayNganHan_VCSH",
        Name: "tyLeNoVayNganHan_VCSH",
        Values: tyLeNoVayNganHan_VCSHValues
    })

    // INDEX 3
    // result.push(tongCongNguonVon)
    // result.push(hangTonKho)
    result.push({
        ID: "soVongQuayHangTonKho",
        Name: "soVongQuayHangTonKho",
        Values: soVongQuayHangTonKhoValues
    })

    // result.push(doanhThuThuan)
    // result.push(phaiThuNganHanKhachHang)
    // result.push(phaiThuDaiHanKhachHang)
    result.push({
        ID: "soVongQuayPhaiThuKhachHang",
        Name: "soVongQuayPhaiThuKhachHang",
        Values: soVongQuayPhaiThuKhachHangValues
    })

    // result.push(tongCongNguonVon)
    // // result.push(phaiTraNguoiBanNganHan)
    // result.push(phaiTraNguoiBanDaiHan)
    result.push({
        ID: "soVongQuayPhaiTraNguoiBan",
        Name: "soVongQuayPhaiTraNguoiBan",
        Values: soVongQuayPhaiTraNguoiBanValues
    })

    result.push({
        ID: "vongQuayTienMat",
        Name: "vongQuayTienMat",
        Values: vongQuayTienMatValues
    })

    // result.push(doanhThuThuan)
    // result.push(tongCongTaiSan)
    result.push({
        ID: "vongQuayTaiSan",
        Name: "vongQuayTaiSan",
        Values: vongQuayTaiSanValues
    })

    // INDEX 4
    result.push({
        ID: "bienLoiNhuanGop",
        Name: "bienLoiNhuanGop",
        Values: bienLoiNhuanGopValues
    })
    result.push({
        ID: "ROS",
        Name: "ROS",
        Values: ROSValues
    })
    result.push({
        ID: "ROA",
        Name: "ROA",
        Values: ROAValues
    })
    result.push({
        ID: "ROE",
        Name: "ROE",
        Values: ROEValues
    })
    result.push({
        ID: "heSoDonBayTaiChinh",
        Name: "heSoDonBayTaiChinh",
        Values: heSoDonBayTaiChinhValues
    })
    result.push({
        ID: "EPS",
        Name: "EPS",
        Values: EPSValues
    })

    // INDEX 5

    // INDEX 6
    result.push({
        ID: "PE",
        Name: "PE",
        Values: PEValues
    })
    result.push({
        ID: "PB",
        Name: "PB",
        Values: PBValues
    })

    return result
}