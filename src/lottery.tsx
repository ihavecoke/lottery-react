import React from 'react';
import ReactDOM from 'react-dom';

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

class SpeedControl {
  currentSpeed: number;
  startTimeoutId: number;

  constructor(props) {
    //@ts-ignore
    this.currentSpeed = props.currentSpeed || 1000
  }

  defaultSpeed() {
    return [
      500, 450, 400, 350, 300, 250, 200, 150,
      100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100,
      100, 150, 200, 250, 300, 350, 400, 450,
      150, 200, 250, 300, 350, 400, 450, 500
    ]
  }

  setDeceleratingTimeout = (callback, gutterTime, times, type) => {
    clearTimeout(this.startTimeoutId);
    let internalCallback = function (tick, counter, control) {
      let internalCallbackId;
      return function () {
        clearTimeout(internalCallbackId);
        let speed = control.currentSpeed;
        if (--tick >= 0) {
          speed = control.defaultSpeed()[++counter];
          control.currentSpeed = speed;
          console.log("speed", control.currentSpeed, "count:", counter);
          internalCallbackId = window.setTimeout(internalCallback, speed);
          callback();
        }
      }
    }(times, 0, this);
    this.startTimeoutId = window.setTimeout(internalCallback, gutterTime);
  };

  speedUp(callback) {
    this.setDeceleratingTimeout(callback, 100, 48, "up")
  }

  speedDown(callback) {
    this.setDeceleratingTimeout(callback, 100, 48, "down")
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
  rolling: boolean;
  rollingID: number;
  speedControl: SpeedControl;

  constructor(props) {
    super(props);
    this.speedControl = new SpeedControl({currentSpeed: 1000});
  }

  roll = () => {
    if (!this.rolling) {
      this.rolling = true;
      this.updateMatrix();
      this.speedControl.speedUp(this.updateMatrix);
      // @ts-ignore
      // this.rollingID = setInterval(this.updateMatrix, 100)
    } else {
      this.speedControl.speedDown(this.updateMatrix);
      // clearInterval(this.rollingID);
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