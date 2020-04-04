import React from 'react';
import { Tabs } from 'antd';

import OverviewAnalysis from './OverviewAnalysis';
import Analysis1 from './Analysis1';
import Analysis2 from './Analysis2';
import Analysis3 from './Analysis3';

const { TabPane } = Tabs;
class Analysis extends React.Component {
    render() {
        return (
            <div className="Analysis">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Overview Analysis" key="1">
                        <OverviewAnalysis />
                    </TabPane>
                    <TabPane tab="CP trong ngay" key="2">
                        <Analysis1 />
                    </TabPane>
                    <TabPane tab="CP cung nganh" key="3">
                        <Analysis2 />
                    </TabPane>
                    <TabPane tab="Phan tich BCTC" key="4">
                        <Analysis3 />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Analysis;