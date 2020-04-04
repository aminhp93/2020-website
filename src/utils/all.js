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

    console.log(allStocks, data1)
    for (let i = 0; i < data1.length; i++) {
        data1[i].Stock = allStocks[data1[i].Stock].Symbol
        data1[i].TodayCapital = Number((data1[i].PriceClose * data1[i].DealVolume / 1000000000).toFixed(0))
        data1[i].MarketCap = Number((data1[i].MarketCap / 1000000000).toFixed(0))
        if (!data2[i]) {

        } else {
            data1[i].YesterdayPriceClose = data2[i].PriceClose
            data1[i].PriceChange = Number(((data1[i].PriceClose - data2[i].PriceClose) * 100 / data2[i].PriceClose).toFixed(1))
            data1[i].YesterdayVolumeClose = data2[i].DealVolume
            data1[i].VolumeChange = Number(((data1[i].DealVolume - data2[i].DealVolume) * 100 / data2[i].DealVolume).toFixed(1))
        }

    }
    return data1;
}