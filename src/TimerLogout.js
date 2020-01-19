import React from 'react';

class TimerLogout extends React.Component {
    date = new Date(2019, 0, 1);

    i=this.date.getSeconds()

    state = { date: this.date };

    componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000,
      );
    }

    componentWillUnmount() {
      clearInterval(this.timerID);
    }

    tick() {
      if (this.props.useUser) {
        this.i++;
      }
      if (this.i > 10) {
        this.props.setUseUser('');
        localStorage.setItem('logout', Date.now());
        this.i = this.date.getSeconds();
      }
      this.setState({
        date: new Date(2019, 0, 1, 0, 0, this.i),
      });
    }

    render() {
      if (this.props.useUser) {
        return (
          <div>
            <h2>{this.state.date.toLocaleTimeString()}</h2>
          </div>
        );
      }
      return null;
    }
}

export default TimerLogout;
