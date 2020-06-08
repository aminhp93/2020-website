import * as React from 'react'
import { connect } from 'react-redux';
import { List, Input, Button } from 'antd';
import { debounce } from 'lodash';
import axios from 'axios';
import moment from 'moment';

import {
    getListNotesUrl,
    getUpdateNoteUrl,
    getCreateNoteUrl
} from '../../utils/request';
import {
    arrayToKeyValue
} from '../../utils/all';
import ReactHtmlParser from 'react-html-parser';

const MarkdownIt = require('markdown-it');

const { TextArea } = Input;

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
        const { listNotesObj } = this.state;

        axios({
            url: getUpdateNoteUrl(noteId),
            method: 'patch',
            data: {
                content
            }
        })
            .then(response => {
                listNotesObj[noteId] = response.data
                this.setState({
                    listNotesObj
                })
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

    parseMarkdown = (data) => {
        const md = new MarkdownIt();

        return ReactHtmlParser(md.render(data))
    }

    renderDescription = (item) => {
        const { allowEdit } = this.state;
        if (allowEdit) {
            return <TextArea onChange={e => this.handleChangeInput(e, item.id)} defaultValue={item.content} />
        } else {
            return <div>{this.parseMarkdown(item.content)}</div>
        }
    }

    render() {
        const { listNotesObj, allowEdit } = this.state;
        const listNotesArray = Object.values(listNotesObj)
        return (
            <div className='Note'>
                <div className='Note-body'>
                    <List
                        itemLayout="horizontal"
                        dataSource={listNotesArray}
                        renderItem={item => (
                            <List.Item actions={allowEdit ? [<div onClick={() => this.handleDeleteNote(item.id)}>Delete</div>] : null}>
                                <List.Item.Meta
                                    description={
                                        <div className="flex">
                                            <div className="Note-created-time">{moment(item.created).format('YYYY-MM-DD')}</div>
                                            {this.renderDescription(item)}
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                </div>
                <div className="Note-footer">
                    {
                        allowEdit
                            ? (
                                <div className="flex">
                                    <TextArea onChange={e => this.setState({ newNoteContent: e.target.value })} value={this.state.newNoteContent} />
                                    <div>
                                        <Button onClick={this.handleCreateNote}>Add note</Button>
                                    </div>

                                </div>
                            )
                            : null
                    }
                    <Button className='Note-allow-button' onClick={() => this.setState({ allowEdit: !allowEdit })}>{allowEdit ? 'Disable edit' : 'Allow edit'}</Button>

                </div>
                <h1>Pusher Test</h1>
                <p>
                    Try publishing an event to channel <code>my-channel</code>
                    with event name <code>my-event</code>.
                </p>

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
