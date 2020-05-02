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