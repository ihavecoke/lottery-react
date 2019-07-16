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
    return <div className={`prize ${extraClassName}`}>
      <p className="item">{this.prize.name}</p>
    </div>
  }
}

export default Slot;