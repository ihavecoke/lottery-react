import React from 'react';
import ReactDOM from 'react-dom';
import Roller from './roller';

class Prize extends React.Component {
  prize: any;
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
    positionMatrix: [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ]
  };
  currentActivePrizeID: number;
  finallyPrizePosition: number;
  roller: Roller;

  constructor(props) {
    super(props);
    this.roller = new Roller({});
    window.addEventListener("roller.rolling", (customEvent) => {
      // @ts-ignore
      this.currentActivePrizeID = customEvent.detail.rollingPosition;
      let matrix = Array(9).fill(0);
      matrix.splice(this.currentActivePrizeID, 1, 1);
      //@ts-ignore
      this.setState({
        positionMatrix: matrix
      });
    });
    window.addEventListener("roller.rollingOver", (customEvent) => {
      // @ts-ignore
      this.finallyPrizePosition = customEvent.detail.rollingPosition;
    })
  }

  roll = () => {
    this.roller.start()
  };

  prizeExtraClassName(index: number) {
    return this.state.positionMatrix[index] ? "high-light" : ""
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