import React, { Component } from 'react'
import { connect } from 'react-redux';
import { addNote } from '../../actions';
import moment from 'moment';

const mapStateToProps = state => {
    return {
        state: state
    }
}

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isSelected: "white",
            title: '',
            text: '',
            competed: false,
            color: "white",
            long: false
            
        };
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value}, () => {
            if(this.state.text.length > 107) {
                this.setState({long: true});
            }
        });
    }
    handleClick = (item) => {
        if(this.state.title && this.state.text){
            this.props.addNote(item);
            this.setState({
                isOpen: !this.state.isOpen,
                isSelected: "white",
                title: '',
                text: '',
                competed: false,
                color: "white",
                long: false
            });
        }
    }
    render() {
        return (
            <div className="col-md-4 col-sm-6">
                <div className={this.state.isSelected !== "whiteCircle" ? "single-note add-note " + this.state.isSelected : "single-note add-note white"}>
                    <input value={this.state.title} onChange={(e) => this.handleChange(e)} name="title" type="text" placeholder="Type a title ..."/> <small>Today: {moment().format('DD MMMM, YYYY')}</small>
                    <hr/> <textarea name="text" value={this.state.text} onChange={(e) => this.handleChange(e)} placeholder="Type a description ..."></textarea>
                    <div className="meta">
                        <span onClick= {() => this.setState({ isOpen: !this.state.isOpen})}><i className="fas fa-palette"></i></span> 
                        <span onClick={() => this.handleClick(this.state)}><i className="fas fa-check"></i></span>
                    </div>
                    <div className={this.state.isOpen ? "colors openDivs" : "colors"}>
                        <div onClick = {() => this.setState({ isSelected: "blue", color: "blue" })} className={ this.state.isSelected == "blue" ? "circle blue selected" : "circle blue"}></div>
                        <div onClick = {() => this.setState({ isSelected: "yellow", color: "yellow" })} className={ this.state.isSelected == "yellow" ? "circle yellow selected" : "circle yellow"}></div>
                        <div onClick = {() => this.setState({ isSelected: "red", color: "red" })} className={ this.state.isSelected == "red" ? "circle red selected" : "circle red"}></div>
                        <div onClick = {() => this.setState({ isSelected: "purple", color: "purple" })} className={ this.state.isSelected == "purple" ? "circle purple selected" : "circle purple"}></div>
                        <div onClick = {() => this.setState({ isSelected: "green", color: "green" })} className={ this.state.isSelected == "green" ? "circle green selected" : "circle green"}></div>
                        <div onClick = {() => this.setState({ isSelected: "whiteCircle", color: "white" })} className={ this.state.isSelected == "whiteCircle" ? "circle whiteCircle selected" : "circle whiteCircle"}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, { addNote })(Form);
