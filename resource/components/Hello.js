'use strict';
import React, {Component} from 'react';

const e = React.createElement;

class HelloComponent extends Component {
  constructor(props){
    super(props);
    this.state = { text: "헬로웅" , liked : false};
  }

  render(){
    /* return e(
      <span>{this.state.text}</span>
    ); */
    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'ㅎㅇ'
    );
  }
}

export {HelloComponent}
// const domContainer2 = document.querySelector("#hello");
// ReactDOM.render(e(Hello), domContainer2);

//export default HelloAbc;
