import React from 'react';
import { connect } from 'react-redux';

import {
    setSymbol,
} from '../../actions/stock';


class Analysis extends React.Component {
    render() {
        return (
            <div>
                Analysis
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