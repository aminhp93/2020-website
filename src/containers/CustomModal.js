import React from 'react';
import { Modal } from 'antd';
import { get } from 'lodash';
import { connect } from 'react-redux';

import {
    closeModal,
} from '../actions/modal';

class CustomModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);

    };

    handleCancel = e => {
        console.log(e);
        this.props.closeModal();
    };

    render() {
        const { modal } = this.props;
        const { isOpen } = modal;
        return (
            <Modal
                title="Basic Modal"
                visible={isOpen}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        modal: get(state, 'modal') || {}
    }

}

const mapDispatchToProps = {
    closeModal
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomModal);
