import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
    top: "auto",
    right: 3 * theme.spacing.unit,
    bottom: 3 * theme.spacing.unit,
    left: "auto",
    position: "fixed",
    zindex: 6
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

function FloatingAddButtons(props) {
  const { classes } = props;
  return (
    <div>
      <Fab color="primary" aria-label="Add" className={classes.fab}>
        <AddIcon />
      </Fab>
    </div>
  );
}

FloatingAddButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FloatingAddButtons);
