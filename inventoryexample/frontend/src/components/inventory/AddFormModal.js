import React from "react";
import PropTypes from "prop-types";
import { addItem } from "../../actions/items";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const styles = theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content"
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing.unit
  },
  fab: {
    margin: theme.spacing.unit,
    top: "auto",
    right: theme.spacing.unit,
    bottom: theme.spacing.unit,
    left: "auto",
    position: "fixed",
    zindex: 6
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  }
});
class AddFormModal extends React.Component {
  static propTypes = {
    addItem: PropTypes.func.isRequired
  };

  state = {
    open: false,
    fullWidth: true,

    // formdata
    name: "",
    number: "",
    description: "",
    url: "",
    amount: ""
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name, number, description, url, amount } = this.state;
    const item = { name, number, description, url, amount };
    this.props.addItem(item);

    this.setState({
      open: false,
      name: "",
      number: "",
      description: "",
      url: "",
      amount: ""
    });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { name, number, description, url, amount } = this.state;
    return (
      <React.Fragment>
        <Fab
          color="primary"
          onClick={this.handleClickOpen}
          aria-label="Add"
          className={classes.fab}
        >
          <AddIcon />
        </Fab>

        <Dialog
          fullWidth={this.state.fullWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">Add An New Item</DialogTitle>
          <DialogContent>
            <form className={classes.container} autoComplete="off">
              <TextField
                required
                id="name"
                variant="outlined"
                label="Item Name"
                type="text"
                margin="normal"
                defaultValue={name}
                className={classes.textField}
                autoFocus
                onChange={this.onChange}
                fullWidth
              />
              <TextField
                required
                id="number"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                label="Item No."
                type="number"
                defaultValue={number}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">#</InputAdornment>
                  )
                }}
                onChange={this.onChange}
                fullWidth
              />
              <TextField
                id="amount"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                label="Item Amount"
                defaultValue={amount}
                onChange={this.onChange}
                fullWidth
                type="number"
              />

              <TextField
                required
                id="url"
                className={classes.textField}
                margin="normal"
                label="Item Image URL"
                type="url"
                defaultValue={url}
                onChange={this.onChange}
                fullWidth
              />
              <TextField
                id="description"
                className={classes.textField}
                multiline
                rows="4"
                margin="normal"
                variant="outlined"
                label="Description"
                type="text"
                defaultValue={description}
                onChange={this.onChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
            <Button onClick={this.onSubmit} color="default">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
export default connect(
  null,
  { addItem }
)(withStyles(styles)(AddFormModal));
