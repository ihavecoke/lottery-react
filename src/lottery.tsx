import React from 'react';
import ReactDOM from 'react-dom';

class Prize extends React.Component {
  prize: any;
  state = {};

  constructor(props) {
    super(props);
    this.prize = props.prize;
  }

  render() {
    //@ts-ignore
    const {extraClassName} = this.props;
    return <div className={`prize ${extraClassName}`}>
      <p className="item">{this.prize.name}</p>
    </div>
  }
}

const prizes = [
  {name: "Alvarado", type: 'prize'},
  {name: "Alvarado", type: 'prize'},
  {name: "Alvarado", type: 'prize'},
  {name: "Alvarado", type: 'prize'},
  {name: "Draw", type: 'luckyBtn'},
  {name: "Alvarado", type: 'prize'},
  {name: "Alvarado", type: 'prize'},
  {name: "Alvarado", type: 'prize'},
  {name: "Alvarado", type: 'prize'}
];

class LotteryApp extends React.Component {
  state = {
    // 0,1,2,5,8,7,6,3
    currentRound: [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ]
  };
  currentRoundTimes = 0;
  currentRoundIndex = 0;
  rolling: boolean;
  rollingID: number;

  constructor(props) {
    super(props);
  }

  roll = () => {
    if (!this.rolling) {
      this.rolling = true;
      this.updateMatrix();
      // @ts-ignore
      this.rollingID = setInterval(this.updateMatrix, 100)
    } else {
      clearInterval(this.rollingID);
      this.currentRoundTimes = 0;
      this.rolling = false;
    }
  };

  rollingMatrix() {
    let matrix = Array(9).fill(0);
    matrix.splice(this.calculateRoundIndex(), 1, 1);
    this.incrRoundTimes();
    return matrix
  }

  //rolling order
  calculateRoundIndex() {
    return [0, 1, 2, 5, 8, 7, 6, 3][this.currentRoundTimes]
  }

  incrRoundTimes() {
    if ((this.currentRoundTimes + 1) % 9 == 0) {
      this.currentRoundTimes = 0;
    } else {
      this.currentRoundTimes += 1;
    }
  }

  updateMatrix = () => {
    //@ts-ignore
    this.setState({
      currentRound: this.rollingMatrix()
    });
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(JSON.stringify(this.state.currentRound))
  }

  prizeExtraClassName(index: number) {
    return this.state.currentRound[index] ? "high-light" : ""
  }

  render() {
    return <div className="lottery-container" onClick={this.roll}>
      {prizes.map((prize, index) => {
        return <Prize prize={prize} key={index} extraClassName={this.prizeExtraClassName(index)}/>
      })}
    </div>
  }
}

ReactDOM.render(<LotteryApp/>, document.getElementById('root'));