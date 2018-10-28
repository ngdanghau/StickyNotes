import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
    getNote
} from '../actions'
import PropTypes from 'prop-types'
import moment from 'moment';

const mapStateToProps = state => {
    return {
        _note: state.notes.note  
    }
}

class SharedNote extends Component {
    componentDidMount() {
        document.getElementById("header").className +=  " shared-note";
        document.getElementsByTagName("img")[0].src = "/assets/img/Group12.svg";
        document.getElementsByTagName("h2")[0].innerText = "Shared Note";
        document.getElementsByTagName("title")[0].innerText = "Shared Note";
    }

    componentWillMount() {
        this.props.getNote(this.props.match.params.id)
    }    

    render() {
        const { _id, title, text, color, completed,created_date } = this.props._note
        return ( 
            <div id="notes" className="notes">
                <div className="container">
                    <div key={_id} className="col-md-offset-4 col-sm-offset-2 col-md-4 col-sm-8">
                        <div className={"single-note shared " + color}>
                            <h2 className={ completed ? "isDone" : ""}>{title}</h2> <small>Last update: {moment(created_date).format('DD MMMM, YYYY')}</small>
                            <hr/>
                            <p className={ completed ? "isDone" : ""}>{text}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
/*function mapStateToProps (state, ownProps) {
    const article_id = ownProps.match.params.id
    let article = {}
    state.articles.articles.forEach((_article)=>{
        if(article_id == _article._id) {
            article = _article
        }
    })
    return { article }
}*/
export default connect(mapStateToProps, { 
    getNote
})(SharedNote);