import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <div className="header" id="header">
        <div className="container">
          <div className="col-md-3 col-sm-5">
            <a href="index.html">
              <h2>Sticky Notes</h2>
            </a>
          </div>
          <div className="col-md-6 col-md-push-3 col-sm-7">
            <div className="hold-img">
              <img src="/assets/img/Group10.svg" alt=""/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
