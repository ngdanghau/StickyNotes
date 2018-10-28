import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadNotes, completedNote, removeNote, changeColorNote, updateNote } from '../actions';
import moment from 'moment';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const mapStateToProps = state => {
    return {
        notes: state.notes.notes,
        note: state.notes.note,
        type: state.notes.type
    }
}

class NoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isSelected: '',
            idcopied: '',
            copied: false,
            isEdit: false,
            idEdit: "",
            title: '',
            text: '',
            completed: false,
            color: "white",
            long: false,
            _id: ''
        };
    }
    componentWillMount() {
        this.props.loadNotes()
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value}, () => {
            if(this.state.text.length > 107) {
                this.setState({long: true});
            }
        });
        
    }
    handleCompleted = (item) => {
        this.props.completedNote(item._id,item.completed);
    }
    handleRemove = (item) => {
        this.props.removeNote(item);
    }
    handleChangeColor = (id,color) => {
        this.props.changeColorNote(id,color);
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    handleCopy = (item) => {
        this.setState({copied: !this.state.copied, idcopied: item._id})
        setTimeout(function(){
            this.setState({copied: !this.state.copied, idcopied: ''})
        }.bind(this), 3000);
    }
    handleEdit = (item) => {
        this.setState({
            isEdit: !this.state.isEdit, 
            idEdit: item._id,
            title: item.title,
            text: item.text,
            completed: item.completed,
            color: item.color,
            long: item.long,
            _id: item._id
        })
    }
    handleClick = (item) => {
        if(this.state.title && this.state.text){
            this.props.updateNote(item);
            this.setState({
                isEdit: !this.state.isEdit, 
                idEdit: '',
                isSelected: "white",
                title: '',
                text: '',
                completed: false,
                color: "white",
                long: false,
                _id: ""
            });
        }
    }
    editColor = (note, color) => {
        this.props.changeColorNote(note._id,color);
        this.setState({ 
            color: color,
            isOpen: !this.state.isOpen
         });
    }
    renderList() {
       if(this.props.note){
           if(this.props.type == "COMPLETED_NOTE"){
                this.props.notes.map((item) => {
                    if(item._id == this.props.note._id){
                        item.completed = this.props.note.completed;
                    }
                });
            }else if(this.props.type == "ADD_NOTE"){
                this.props.notes.unshift(this.props.note);
                this.props.updateNote(this.props.note);
            }else if(this.props.type == "REMOVE_NOTE"){
                this.props.notes.splice(this.props.notes.findIndex(e => e._id === this.props.note._id),1);
            }else if( this.props.type == "CHANGE_COLOR_NOTE"){
                this.props.notes.map((item) => {
                    if(item._id == this.props.note._id){
                        item.color = this.props.note.color;
                    }
                });
            }else if(this.props.type == "UPDATE_NOTE"){
                this.props.notes.map((item) => {
                    if(item._id == this.props.note._id){
                        item.title = this.props.note.title;
                        item.text = this.props.note.text;
                        item.completed = this.props.note.completed;
                        item.color = this.props.note.color;
                        item.long = this.props.note.long;
                    }
                });
            }
       }
       return this.props.notes.map((item) => {
            return(
                <div key={item._id} className="col-md-4 col-sm-6">
                    <div className={"single-note " + item.color}><span onClick={() => this.handleCompleted(item)} className="notDone"><i className={ item.completed ? "fa-check-square fas" : "fa-check-square far"}></i></span>
                        {
                            this.state.isEdit && this.state.idEdit == item._id ?  
                                <input defaultValue={item.title} onChange={(e) => this.handleChange(e)} name="title" type="text" placeholder="Type a title ..."/>
                            :
                                <h2 className={ item.completed ? "isDone" : ""}>{item.title}</h2>
                        }
                        <small>Last update: {moment(item.created_date).format('DD MMMM, YYYY')}</small>
                        <hr/>
                        {
                            this.state.isEdit && this.state.idEdit == item._id ?  
                                <textarea defaultValue={item.text} onChange={(e) => this.handleChange(e)} name="text" placeholder="Type a description ..."></textarea>
                            :
                                <p className={ item.completed ? "isDone" : ""}>{item.text}</p>
                        }
                        
                        <div className="meta">
                            {
                                this.state.isEdit && this.state.idEdit == item._id ?  
                                <span onClick={() => this.handleClick(this.state)}><i className="fas fa-check"></i></span>
                                :
                                    <span onClick = {() => this.handleEdit(item)}><i className="fas fa-pencil-alt"></i></span> 
                            }
                            <span onClick = {() => this.setState({ isOpen: !this.state.isOpen, isSelected: item._id})}><i className="fas fa-palette"></i></span> 
                            <span onClick = {() => this.handleRemove(item)}><i className="far fa-trash-alt"></i></span>
                            <CopyToClipboard text={`${location.href}share/${item._id}`}
                             onCopy={() => this.handleCopy(item)}>
                            <span><i className="fas fa-link"></i></span>
                            </CopyToClipboard>   
                        </div>
                        <div className={ this.state.isOpen && this.state.isSelected == item._id ? "colors openDivs" : "colors"}>
                            {
                                this.state.isEdit ? 
                                    <React.Fragment>
                                        <div onClick = {() => this.editColor(item, "blue")} className={ this.state.color == "blue" ? "circle blue selected" : "circle blue"}></div>
                                        <div onClick = {() => this.editColor(item, "yellow")} className={ this.state.color == "yellow" ? "circle yellow selected" : "circle yellow"}></div>
                                        <div onClick = {() => this.editColor(item, "red")} className={ this.state.color == "red" ? "circle red selected" : "circle red"}></div>
                                        <div onClick = {() => this.editColor(item, "purple")} className={ this.state.color == "purple" ? "circle purple selected" : "circle purple"}></div>
                                        <div onClick = {() => this.editColor(item, "green")} className={ this.state.color == "green" ? "circle green selected" : "circle green"}></div>
                                        <div onClick = {() => this.editColor(item, "white")} className={ this.state.color == "whiteCircle" ? "circle whiteCircle selected" : "circle whiteCircle"}></div>
                                    </React.Fragment>
                                : 
                                    <React.Fragment>
                                        <div onClick = {() => this.handleChangeColor(item._id, "blue")} className={ item.color == "blue" ? "circle blue selected" : "circle blue"}></div>
                                        <div onClick = {() => this.handleChangeColor(item._id, "yellow")} className={ item.color == "yellow" ? "circle yellow selected" : "circle yellow"}></div>
                                        <div onClick = {() => this.handleChangeColor(item._id, "red")} className={ item.color == "red" ? "circle red selected" : "circle red"}></div>
                                        <div onClick = {() => this.handleChangeColor(item._id, "purple")} className={ item.color == "purple" ? "circle purple selected" : "circle purple"}></div>
                                        <div onClick = {() => this.handleChangeColor(item._id, "green")} className={ item.color == "green" ? "circle green selected" : "circle green"}></div>
                                        <div onClick = {() => this.handleChangeColor(item._id, "white")} className={ item.color == "white" ? "circle whiteCircle selected" : "circle whiteCircle"}></div>
                                    </React.Fragment>
                                
                            }
                        </div>
                        <div className={this.state.copied && this.state.idcopied == item._id ? "copied openDivs" : "copied"}>
                            link is copied !
                        </div>
                    </div>
                </div>
            );
        });
    }
    render() {
        return (
            <React.Fragment>
                {this.renderList()}
            </React.Fragment>
        )
    }
}


export default connect( mapStateToProps, { loadNotes, completedNote, removeNote, changeColorNote, updateNote })(NoteList);
