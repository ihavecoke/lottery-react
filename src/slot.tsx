import React from 'react';
import ReactDOM from 'react-dom';

class Slot extends React.Component {
  prize: any;
  constructor(props) {
    super(props);
    this.prize = props.prize;
  }

  render() {
    //@ts-ignore
    const {extraClassName} = this.props;
    const isStartDrawBtn = this.prize.type =="luckyBtn";
    let className = `${extraClassName} ${isStartDrawBtn ? 'trigger-btn' : ''}`;
    return <div className={`prize ${className}`}>
      <p className="item">{this.prize.name}</p>
    </div>
  }
}

export default Slot;