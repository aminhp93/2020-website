import * as React from 'react'
import { connect } from 'react-redux';
import { List, Avatar, Input, Button } from 'antd';
import { debounce } from 'lodash';
import axios from 'axios';

import {
    getListNotesUrl,
    getUpdateNoteUrl,
    getCreateNoteUrl
} from '../../utils/request';
import {
    arrayToKeyValue
} from '../../utils/all';

class Note extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listNotesObj: [],
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
                    listNotesObj: arrayToKeyValue(response.data)
                })
            })
            .catch(error => {

            })
    }

    handleCreateNote = () => {
        const { listNotesObj } = this.state;

        axios({
            url: getCreateNoteUrl(),
            method: 'post',
            data: {
                content: this.state.newNoteContent
            }
        })
            .then(response => {
                listNotesObj[response.data.id] = response.data
                this.setState({
                    listNotesObj,
                    newNoteContent: ''
                })
            })
            .catch(error => {

            })
    }

    handleDeleteNote = (noteId) => {
        const { listNotesObj } = this.state;

        axios({
            url: getUpdateNoteUrl(noteId),
            method: 'delete',
        })
            .then(response => {
                delete listNotesObj[noteId]
                this.setState({
                    listNotesObj
                })
            })
            .catch(error => {

            })
    }

    render() {
        const { listNotesObj, allowEdit } = this.state;
        const listNotesArray = Object.values(listNotesObj)
        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={listNotesArray}
                    renderItem={item => (
                        <List.Item actions={allowEdit ? [<div onClick={() => this.handleDeleteNote(item.id)}>Delete</div>] : null}>
                            <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                description={<Input disabled={!allowEdit} onChange={e => this.handleChangeInput(e, item.id)} defaultValue={item.content} />}
                            />
                        </List.Item>
                    )}
                />
                {
                    allowEdit
                        ? (
                            <div className="flex">
                                <Input onChange={e => this.setState({ newNoteContent: e.target.value })} value={this.state.newNoteContent} />
                                <Button onClick={this.handleCreateNote}>Add note</Button>
                            </div>
                        )
                        : null
                }

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
