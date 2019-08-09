import React,{Component} from 'react';

class Square extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: null,
    }
  }
  render(){
    return (
      <button 
        className='square' 
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    )
  }   
}

class Board extends Component {
  renderSquare(i){
    return <Square 
      value={this.props.squares[i]}
      onClick = {() => this.props.onClick(i)}
      key={i}
    />;
  }
  render(){
    let liList = (length) => {
      var res = [];
      for (var i = 0; i < length; i++) {
          res.push(this.renderSquare(i))
      }
      return res
    }
    return (
      <div>
        <div className="board-row">
          {liList(9)}
        </div>
    
      </div>
    );
  }
}

class Game extends Component {
  constructor(props){
    super(props);
    this.state = {
      history:[
        {squares:Array(9).fill(null)}
      ],
      xIsNext:true,
      stepNumber:0,
    }
  }
  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1];
    const squares = current.squares.slice();
    let liList = document.querySelectorAll('li');
    liList.forEach(function(item,index){
      let classList = item.classList;
      if(classList.contains('active-li')){
        classList.remove("active-li");
      }
    })
    if (caculatorWinner(squares) || squares[i]) {  
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }
  jumpTo(step){
    let liList = document.querySelectorAll('li');
    liList.forEach(function(item,index){
      let classList = item.classList;
      if(classList.contains('active-li')){
        classList.remove("active-li");
      }
    })
    document.querySelectorAll('li')[step].classList.add("active-li");
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = caculatorWinner(current.squares);
    const moves = history.map((step, move) => {
      let squares = step.squares.slice(),arr = [];
      squares.forEach((item,index) => {
        let temp = index + 1;
        if(arr.length < 9){
          if(item === 'X'){
            arr.push({
              "X":[Math.ceil(temp/3),((temp%3 === 0) ? 3 : temp%3)]
            })
          }
          else if(item === 'O'){
            arr.push({
              "O":[Math.ceil(temp/3),((temp%3 === 0) ? 3 : temp%3)]
            })
          }
        }
      })

     


      const desc = move ? 
        'Go to move #' + move :
        'Go to start';
      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
          <span>坐标系:  {JSON.stringify(arr)}</span>
        </li>
      )
    })
    let status;
    if(winner){
      status = 'winner:' + winner.symbol;
    }
    else{
      status = "Next player: "+ (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick = {(i) => {this.handleClick(i)}}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
function caculatorWinner(squares){
  let lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for(let i=0;i<lines.length;i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return {
        symbol:squares[a],
        point:lines[i]
      }
    }
  }
  return null
}






export default Game;
