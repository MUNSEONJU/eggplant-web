
export class Hello extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: "헬로웅" , liked : false};
  }

  render(){
    return React.createElement(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'aaaaaaa'
      );
    }
}
  // <span>{this.state.text}</span>
