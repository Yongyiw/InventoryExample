import React, { Component } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addItem } from "../../actions/items";

export class Form extends Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired
  };

  state = {
    name: "",
    description: "",
    amount: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { name, description, amount } = this.state;
    const item = { name, description, amount };
    this.props.addItem(item);
    this.setState({
      name: "",
      email: "",
      message: ""
    });
  };

  render() {
    const { name, description, amount } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Item</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              className="form-control"
              type="text"
              name="description"
              onChange={this.onChange}
              value={description}
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <textarea
              className="form-control"
              type="text"
              name="amount"
              onChange={this.onChange}
              value={amount}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addItem }
)(Form);
