import React, { Component } from 'react';
import Form from '../components/Form';
import NoteList from './noteList';

export default class App extends Component {
  render() {
    return (
        <div id="notes" className="notes">
            <div className="container">
                <Form/>
                <div>
                    <NoteList/>
                </div>
            </div>
        </div>
    );
  }
}