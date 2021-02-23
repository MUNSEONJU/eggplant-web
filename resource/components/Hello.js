
export default class Hello extends React.Component {
  constructor(props){
    super(props);
    this.state = { text: "test text" , liked : false};
  }

  render(){
    return (
      <span>컴포넌트 데이터 : <input type="text" value="{this.state.text}"/> </span>
    )
  }
}
