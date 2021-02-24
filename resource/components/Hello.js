
export default class Hello extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text: "",
      num : 0
    };

    console.log("construct. props is ", props);

    this.changeText = this.changeText.bind(this);
    this.changeNum = this.changeNum.bind(this);
  }

  changeText(e)
  {
    this.setState({
      text : e.target.value
    });

    if( typeof this.props.funcText != "undefined" )
    {
      this.props.funcText(this.state.text);
    }
  }

  changeNum(e)
  {
    this.setState({
      num : e.target.value
    });
    
    if( typeof this.props.funcNum != "undefined" )
    {
      this.props.funcNum(this.state.num);
    }
  }

  render(){
    return (
      <div>
        <p>hello component!</p>
        <div>
          영화명 : <input type="text" value={this.state.text} onChange={this.changeText}/>
        </div>
        <div>
          상영횟수 : <input type="text" value={this.state.num} onChange={this.changeNum}/>
        </div>
      </div>
    )
  }
}
