import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { getItems, deleteItem } from "../../actions/items";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import MaxWidthDialog from "../material-ui/MaxWidthDialog";
import SimpleCard from "../material-ui/SimpleCard";

import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const no_image_url =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: "image", label: "" },
  { id: "amount", label: "Amount" },
  {
    id: "name",
    label: "Name"
  },
  {
    id: "number",
    label: "Item #"
  },
  {
    id: "description",
    label: "Descripition"
  },
  {
    id: "action",
    label: ""
  }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align="left"
                padding="dense"
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-end" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class ItemsEnhancedTable extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }

  state = {
    order: "asc",
    orderBy: "name",
    selected: [],
    openedModal: null,
    page: 0,
    rowsPerPage: 5
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleRowImageClick = (event, id) => {
    this.setState({ openedModal: id });
  };

  handleImageModalClose = (event, id) => {
    this.setState({ openedModal: null });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, items } = this.props;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={items.length}
            />
            <TableBody>
              {stableSort(items, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow hover tabIndex={-1} key={n.id}>
                      <TableCell component="th" scope="row" padding="none">
                        <div
                          style={{
                            marginLeft: 3,
                            marginTop: 4,
                            marginBottom: 6
                          }}
                          onClick={event =>
                            this.handleRowImageClick(event, n.id)
                          }
                        >
                          <img
                            style={{
                              alignSelf: "center",
                              height: 120,
                              width: 120,
                              padding: 4,
                              borderWidth: 1,
                              borderRadius: 20,
                              boxShadow: "2px 2px 1px #aaaaaa"
                            }}
                            src={n.url === null ? no_image_url : n.url}
                            alt="img"
                          />
                        </div>

                        <Dialog
                          onClose={event =>
                            this.handleImageModalClose(event, n.id)
                          }
                          open={this.state.openedModal === n.id ? true : false}
                          aria-labelledby="max-width-dialog-title"
                        >
                          <DialogTitle id="max-width-dialog-title">
                            <Typography
                              className={classes.title}
                              color="textSecondary"
                              gutterBottom
                            >
                              Item: {n.name} #{n.number}
                            </Typography>
                          </DialogTitle>
                          <DialogContent>
                            <SimpleCard>
                              <img
                                style={{
                                  alignSelf: "center",
                                  borderWidth: 1,
                                  width: "100%"
                                }}
                                src={n.url === null ? no_image_url : n.url}
                                alt="img"
                              />
                            </SimpleCard>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              onClick={this.handleImageModalClose}
                              color="primary"
                            >
                              Close
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                      <TableCell align="left" style={{ width: 100 }}>
                        {n.amount}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        align="left"
                        style={{ width: 100 }}
                      >
                        {n.name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        {n.number}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        {n.description}
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        <Fab
                          onClick={this.props.deleteItem.bind(this, n.id)}
                          aria-label="Delete"
                        >
                          <DeleteIcon />
                        </Fab>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

ItemsEnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  items: state.items.items
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(withStyles(styles)(ItemsEnhancedTable));
