import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  decrement = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };

  render() {
    const { name, location } = this.props;
    const { count } = this.state;
    return (
      <div className="user-class">
        <h2>Name: {name}</h2>
        <h3>Location: {location}</h3>
        <h4>count:{count}</h4>
        <button
          className="bg-red-600
         text-white rounded px-2"
          onClick={this.increment}
        >
          Count +
        </button>
        <button onClick={this.decrement} className="bg-blue-600 rounded px-2 text-white ml-2">
         Count -
        </button>
      </div>
    );
  }
}

export default UserClass;
