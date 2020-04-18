import * as React from 'react'
import { connect } from 'react-redux';
import { List, Avatar, Input, Button } from 'antd';
import { debounce } from 'lodash';
import axios from 'axios';

import {
    getListNotesUrl,
    getUpdateNoteUrl
} from '../../utils/request.js';


class Note extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            noteListArray: [],
            allowEdit: false
        }
        this.sendRequest = debounce(this.sendRequest, 300)
    }

    handleChangeInput = (e, noteId) => {
        this.sendRequest(e.target.value, noteId)

    }

    sendRequest = (content, noteId) => {
        axios({
            url: getUpdateNoteUrl(noteId),
            method: 'patch',
            data: {
                content
            }
        })
            .then(response => {

            })
            .catch(error => {

            })
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: getListNotesUrl()
        })
            .then(response => {
                this.setState({
                    noteListArray: response.data
                })
            })
            .catch(error => {

            })
    }

    handleDeleteNote = (noteId) => {
        axios({
            url: getUpdateNoteUrl(noteId),
            method: 'delete',
        })
            .then(response => {

            })
            .catch(error => {

            })
    }

    render() {
        const { noteListArray, allowEdit } = this.state;
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={noteListArray}
                    renderItem={item => (
                        <List.Item actions={allowEdit ? [<div onClick={() => this.handleDeleteNote(item.id)}>Delete</div>] : null}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description={<Input disabled={!allowEdit} onChange={e => this.handleChangeInput(e, item.id)} defaultValue={item.content} />}
                            />
                        </List.Item>
                    )}
                />
                <Button onClick={() => this.setState({ allowEdit: !allowEdit })}>{allowEdit ? 'Disable edit' : 'Allow edit'}</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {


    return state;
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Note)
