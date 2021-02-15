'use strict';
import React, {Component} from 'react';

const e = React.createElement;

class HelloComponent extends Component {
  constructor(props){
    super(props);
    this.state = { text: "헬로웅" };
  }

  render(){
    return e(
      <span>{this.state.text}</span>
    );
  }

}

// const domContainer2 = document.querySelector("#hello");
// ReactDOM.render(e(Hello), domContainer2);

//export default HelloAbc;
