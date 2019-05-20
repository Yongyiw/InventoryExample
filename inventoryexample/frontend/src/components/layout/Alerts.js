import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";

import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Item Name: ${error.msg.name.join()}`);
      if (error.msg.number)
        alert.error(`Item Number: ${error.msg.number.join()}`);
      if (error.msg.amount)
        alert.error(`Item Amount: ${error.msg.amount.join()}`);
      if (error.msg.url) alert.error(`Item Image Url: ${error.msg.url.join()}`);
      if (error.msg.description)
        alert.error(`Item description: ${error.msg.description.join()}`);
    }

    if (message !== prevProps.message) {
      if (message.deleteItem) alert.success(message.deleteItem);
      if (message.addItem) alert.success(message.addItem);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts));
