class Roller {
  rollingTimes: number = 0; //目前转了多少次
  currentRollingPosition: number = 0; //当前正处理于激活状态的奖品栏id默认0，表示左上角第一个元素。可选择的值：0,1,2,5,8,7,6,3
  rollingCycleNumber: number; //转动基本次数即至少需要转动多少次再进入抽奖环节,默认转3.5圈
  isRolling = false; //是否开始旋转
  acceleratedSpeed: number; //加速旋转的速度，每次减少的等待时间
  decelerateSpeed: number; //减速旋转的速度，每次叠加的等待时间
  currentRollSpeed: number; //默认的速度
  maxSpeed: number; //默认的最快速度毫秒
  finallyRollingPosition: number; //最后停下的位置
  rollingTimeOutID: any; //间隔时间
  cycleRound: number; //总共需要转多少圈
  rollingPositions = [0, 1, 2, 5, 8, 7, 6, 3]; //从左上角向右顺时针依次旋转

  constructor(args: any) {
    this.currentRollSpeed = args.currentRollSpeed || 200;
    this.acceleratedSpeed = args.acceleratedSpeed || 30;
    this.decelerateSpeed = args.decelerateSpeed || 50;
    this.cycleRound = args.cycleRound || 3.5;
    this.rollingCycleNumber = this.cycleRound * 8; //转一圈需要8次,默认转3.5圈
    this.finallyRollingPosition = args.finallyRollingPosition || 7;
    this.maxSpeed = args.maxSpeed || 80;
  }

  dispatchRollingEvent() {
    let rollingEventName = new CustomEvent('roller.rolling', {detail: {rollingPosition: this.currentRollingPosition}});
    window.dispatchEvent(rollingEventName)
  }

  dispatchRollingOverEvent() {
    let rollingOverEventName = new CustomEvent('roller.rollingOver', {detail: {rollingPosition: this.finallyRollingPosition}});
    window.dispatchEvent(rollingOverEventName)
  }

  start = () => {
    if (this.isRolling)
      return;
    this.rolling()
  };

  rolling() {
    this.incrRollingVar();
    this.dispatchRollingEvent();
    this.loopRolling()
  }

  loopRolling() {
    //当3.5圈跑完后，对比当前转到的位置和最终需要停留的位置是否相同。相同就说明中了
    if ((this.rollingTimes > this.rollingCycleNumber) && (this.finallyRollingPosition == this.currentRollingPosition)) {
      this.dispatchRollingOverEvent();
      this.reset();
    } else {
      this.calculateSpeed();
      this.rollingTimeOutID = setTimeout(() => {
        clearTimeout(this.rollingTimeOutID);
        this.rolling()
      }, this.currentRollSpeed)
    }
  }

  incrRollingVar() {
    this.isRolling = true;
    this.currentRollingPosition = this.rollingPositions[this.rollingTimes % 9];
    this.rollingTimes += 1;
  }

  calculateSpeed() {
    if (this.rollingTimes < this.rollingCycleNumber) {
      this.currentRollSpeed -= this.acceleratedSpeed;  //加快旋转速度
    } else {
      this.currentRollSpeed += this.decelerateSpeed; //减小旋转速度
    }
    //限制最快速度保证视觉的特效，太快了会出现闪一下的情况
    if (this.currentRollSpeed < this.maxSpeed) {
      this.currentRollSpeed = this.maxSpeed;
    }
  }

  reset() {
    this.isRolling = false;
    this.rollingTimes = 0;
    this.currentRollingPosition = 0;
    clearTimeout(this.rollingTimeOutID);
  }
}

export default Roller;