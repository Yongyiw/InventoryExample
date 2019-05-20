import React, { Fragment } from "react";
import AddFormModal from "./AddFormModal";
import ItemEnhancedTable from "./ItemEnhancedTable";

export default function Dashboard() {
  return (
    <Fragment>
      <AddFormModal />
      <ItemEnhancedTable />
    </Fragment>
  );
}
