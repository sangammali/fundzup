import React from "react";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from "@mui/material";
import Stack from "./Stack";
import Image from "./Image";
import Box from "./Box";
import Loader from "./Loader";

import { withStyles } from "@mui/styles";
import cx from "classnames";
import { ConstructionOutlined } from "@mui/icons-material";

class TableM extends React.Component {
  constructor(props) {
    super(props);
    this.defaults = {
      rowsPerPage: 25,
      rowsPerPageOptions: [10, 25, 50, 100],
    }
    this.state = {
      data: [],
      secondaryRow: [],
      count: 0,
      page: 0,
      rowsPerPage: this.defaults.rowsPerPage,
      editIndex: null,
      isInitialized: false,
      dataChangedCounter: 0,
      refresh: false,
      error: '',
    }
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate() {
    const {
      data = [],
      dataChangedCounter = 0,
      refreshTable = false,
      localPagination,
      page = 0,
      rowsPerPage = this.defaults.rowsPerPage,
    } = this.props;
    if (!this.state.isInitialized) {
      this.init();
    } else if (this.state.dataChangedCounter !== dataChangedCounter) {
      let rows = JSON.parse(JSON.stringify(data));

      if (localPagination) {
        rows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
      }

      this.setState({
        data: rows.map(r => ({
          isEditing: false,
          rowData: r
        })),
        dataChangedCounter,
      }, ()=> this.init());
    } else if (refreshTable) {
      this.setState({ page: 0, rowsPerPage: this.defaults.rowsPerPage }, () => {
        this.props.onPageChange && this.props.onPageChange(this.state.page + 1, this.state.rowsPerPage)
      });
    }
  }

  init() {
    const {
      data,
      count,
      page = 0,
      rowsPerPage = this.defaults.rowsPerPage,
      localPagination = false,
      dataChangedCounter = 0,
    } = this.props;
    

    let rows = JSON.parse(JSON.stringify(data[page] || []));
    let rowsCount = 0;

    if (data.constructor === Array) {
      rows = JSON.parse(JSON.stringify(data));
      rowsCount = count || rows.count || rows.length || 0;
    }

    if (data.data) {
      rows = JSON.parse(JSON.stringify(data.data[page]));
      rowsCount = data.count;
      if (data.data.constructor === Array) {
        rows = JSON.parse(JSON.stringify(data.data));
        rowsCount = data.count;
      }
    }

    if (localPagination) {
      rows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }

    if (rows.length && rowsCount) {
      this.setState({
        data: rows.map(r => ({
          isEditing: false,
          rowData: r
        })),
        count: rowsCount,
        page,
        rowsPerPage,
        isInitialized: true,
        dataChangedCounter,
      })
    }
  }

  handlePageChange = (e, newPage) => {
    this.setState({ page: newPage }, () => {
      this.props.onPageChange && this.props.onPageChange(this.state.page + 1, this.state.rowsPerPage);
    });
  }

  handleRowsPerPageChange = (e) => {
    this.setState({
      page: 0,
      rowsPerPage: parseInt(e.target.value),
    }, () => {
      this.props.onPageChange && this.props.onPageChange(this.state.page + 1, this.state.rowsPerPage)
    })
  }

  handleRowEdit = (index) => {
    const data = this.state.data.map((d, i) => {
      if (i === index) {
        return {
          ...d,
          isEditing: true
        }
      } else {
        return {
          ...d,
          isEditing: false,
        }
      }
    })
    this.setState({ data, editIndex: index });
  }

  handleRowSave = (rowData) => {
    let isDataModified = false;
    const data = this.state.data.map((d, i) => {
      if (i === this.state.editIndex) {
        Object.keys(d.rowData).forEach(k => {
          if (d.rowData[k] !== rowData[k]) {
            isDataModified = true;
          }
        });
        return {
          rowData,
          isEditing: false,
          isDataModified
        }
      }
      return d;
    })
    this.setState({ data, editIndex: null }, () => {
      if (isDataModified) {
        this.handleDataChange();
      }
    })
  }

  handleDataChange = () => {
    let updatedData;
    const{extactUpdatedData=false}= this.props
    if(extactUpdatedData){
      updatedData = this.state.data.filter((row)=>{
        if(Object.keys(row).includes('isDataModified') && row.isDataModified){
          return row.rowData;
        }
      });
    }
    else{
      updatedData= this.state.data.map(({rowData})=> rowData)
    }
    this.props.onDataChange(updatedData)
  }


  render() {
    const {
      pagination,
      paginationTop,
      paginationBottom,
      rowsPerPageOptions = this.defaults.rowsPerPageOptions,

      loading = false,
      columns = [],
      classes,
      classNames = {},
      getSecondaryRowContent = null,
      secondaryDataPosition = 'bottom',
      shouldRenderSecondaryRow,
      tableProps = {},

      tbl_wrapper_sx
    } = this.props;

    const {
      data,
      count,
      page,
      rowsPerPage,
      dataChangedCounter
    } = this.state;

    return (
      <>
        {pagination || paginationTop ? (
          <TablePagination
            component="div"
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage="Per Page:"
            rowsPerPageOptions={rowsPerPageOptions}
            onPageChange={this.handlePageChange}
            onRowsPerPageChange={this.handleRowsPerPageChange}
          />
        ) : null}

        <TableContainer 
          className={cx({ 
            [classes.tableContainer]: true, 
            [classNames.tableContainer]: classNames.tableContainer })} 
            sx={{ overflow: loading ? 'hidden' : 'auto',...tbl_wrapper_sx }}>

          <Table
            className={cx({ [classes.table]: true, [classNames.table]: classNames.table })}
            {...tableProps}
          >
            <TableHead
              className={cx({ [classes.tableHead]: true, [classNames.tableHead]: classNames.tableHead })}
            >
              <TableRow
                className={cx({ [classes.tableHeadRow]: true, [classNames.tableHeadRow]: classNames.tableHeadRow })}
              >
                {columns.map((c, i) => (
                  <TableCell
                    key={`${c.field}_${i}`}
                    className={cx({ [classes.tableHeadCell]: true, [classNames.tableHeadCell]: classNames.tableHeadCell })}
                    style={c.style || {}}
                  >
                    {c.headerComponent ? c.headerComponent(c, i, columns) : c.headerText}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody
              className={cx({ [classes.tableBody]: true, [classNames.tableBody]: classNames.tableBody })}
              sx={{ display: loading ? 'none' : 'table-row-group' }}
            >
              {data.map(({ rowData, isEditing }, i) => {
                return (
                  <React.Fragment key={`row_${Math.random()}_${i}`}>
                    {getSecondaryRowContent && secondaryDataPosition === 'top' ? (
                      <SecondaryRow
                        classes={classes}
                        classNames={classNames}
                        rowIndex={i}
                        rowData={rowData}
                        colsData={columns}
                        getSecondaryRowContent={getSecondaryRowContent}
                        shouldRenderSecondaryRow={shouldRenderSecondaryRow}
                      />
                    ) : null}

                    <Row
                      isEditing={isEditing}
                      rowIndex={i}
                      editData={rowData}
                      colsData={columns}
                      onSave={this.handleRowSave}
                      onEdit={() => this.handleRowEdit(i)}
                      classes={classes}
                      classNames={classNames}
                    />

                    {getSecondaryRowContent && secondaryDataPosition === 'bottom' ? (
                      <SecondaryRow
                        classes={classes}
                        classNames={classNames}
                        rowIndex={i}
                        rowData={rowData}
                        colsData={columns}
                        getSecondaryRowContent={getSecondaryRowContent}
                        shouldRenderSecondaryRow={shouldRenderSecondaryRow}
                      />
                    ) : null}
                  </React.Fragment>
                )
              })}
            </TableBody>
          </Table>

          {loading ? (
            <Box
              sx={{ width: "100%", position: "relative", minHeight: "300px" }}
            >
              <Loader position="absolute" loading={loading} />
            </Box>
          ) : null}
        </TableContainer>

        {pagination || paginationBottom ? (
          <TablePagination
            component="div"
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage="Per Page:"
            rowsPerPageOptions={rowsPerPageOptions}
            onPageChange={this.handlePageChange}
            onRowsPerPageChange={this.handleRowsPerPageChange}
          />
        ) : null}
      </>
    )
  }
}

const Row = (props) => {
  const {
    isEditing,
    rowIndex,
    editData,
    colsData,
    onSave,
    onEdit,
    classes,
    classNames
  } = props;

  let initObj = {};
  colsData.forEach(col => {
    initObj[col.field] = "";
  })

  // const [rowHasError, setRowHasError] = React.useState(false);
  const [rowData, setRowData] = React.useState(editData ? Object.assign({}, initObj, editData) : initObj);

  const handleSave = () => {
    onSave(rowData);
  }

  const handleChange = (e) => {
    const updatedData = Object.assign({}, rowData, {
      [e.target.name]: e.target.value
    });
    setRowData(updatedData);
  }
  const checkColEditable = (col, rowData) => {
    if (typeof col.editable === "function") {
      if (rowData.hasOwnProperty('isTransactionEditable')) {
        return rowData.isTransactionEditable ? col.editable(rowData) : false
      }
      else {
        return false
      }
    }
    return col.editable
  }

  return (
    // <TableRow style={{ backgroundColor: rowData?.stockErrorMessage ? '#d44c4c1c' : '#00000' }}
    <TableRow 
      className={cx({ [classes.tableBodyRow]: true, [classNames.tableBodyRow]: classNames.tableBodyRow })}
    >
      {colsData.map((col, i) => {
        const editable= checkColEditable(col,rowData)
        return isEditing && editable ? (
          <TableCell
            key={`edit_${col.field}_${i}`}
            className={cx({
              [classes.tableBodyCell]: true,
              [classes.tableBodyEditableCell]: checkColEditable(col, rowData),
              [classNames.tableBodyCell]: classNames.tableBodyCell
            })}
          >
            <RowInput
              onChange={handleChange}
              onBlur={handleSave}
              rowData={rowData}
              colData={col}
              value={rowData[col.field]}
              name={col.field}
              error={col.error}
              validation={col.validation}
            // childHasError={(bool) => setRowHasError(bool)}
            />
          </TableCell>
        ) : (
          <TableCell
            key={`view_${col.field}_${i}`}
            className={cx({
              [classes.tableBodyCell]: true,
              [classes.tableBodyEditableCell]: checkColEditable(col, rowData),
              [classNames.tableBodyCell]: classNames.tableBodyCell,
            })}
            style={col.style || {}}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              {col.bodyCellComponent ? col.bodyCellComponent(rowData[col.field], rowData, rowIndex, i) : rowData[col.field]}
              {colsData.filter(c => checkColEditable(c, rowData)).length && i === colsData.length - 1 ? (
                <Image
                  src="/svgs/table_edit.svg"
                  height="20px"
                  width="20px"
                  style={{ cursor: "pointer" }}
                  onClick={onEdit}
                />
              ) : null}
            </Stack>
          </TableCell>
        )
      })}
    </TableRow>
  )
}

const RowInput = (props) => {
  const {
    name,
    value,
    error,
    rowData,
    validation,
    // childHasError,
    colData,
    ...restProps
  } = props;

  const [hasError, setHasError] = React.useState(false);
  const handleChange = (e) => {
    const hasError = validation(e.target.value, rowData);
    if (hasError) {
      // childHasError(true);
      setHasError(true);
    } else {
      // childHasError(false);
      setHasError(false);
    }
    props.onChange(e);
  }

  return (
    <div>
      <input
        name={name}
        value={value || ""}
        onChange={handleChange}
        autoFocus={colData.autoFocus}
        style={{
          border: hasError ? `1px solid red !important` : `1px solid #e0e0e0 !important`,
          padding: '5px 10px',
          width: 130,
        }}
        {...restProps}
      />
    </div>
  )
}

const SecondaryRow = (props) => {
  const {
    getSecondaryRowContent = null,
    colsData,
    rowData,
    rowIndex,
    classes,
    classNames = {},
    shouldRenderSecondaryRow,
  } = props;

  const [rowHasError, setRowHasError] = React.useState(false);

  const colSpan = Object.keys(colsData).length;

  if (shouldRenderSecondaryRow && shouldRenderSecondaryRow(rowData, rowIndex, colsData) === false) {
    return null;
  }

  return (
    <>
      {getSecondaryRowContent.constructor === Function ? (
        <TableRow
          className={cx({ [classes.tableBodyRow]: true, [classNames.tableBodyRow]: classNames.tableBodyRow })}
        >
          <TableCell
            className={cx({ [classes.tableBodyCell]: true, [classNames.tableBodyCell]: classNames.tableBodyCell })}
            colSpan={colSpan}
          >
            {getSecondaryRowContent(rowData, rowIndex, colsData)}
          </TableCell>
        </TableRow>
      ) : (null)}

    </>

  )
}

const styles = (theme) => ({
  tableContainer: {},
  table: {},
  tableHead: {},
  tableHeadRow: {},
  tableHeadCell: {
    backgroundColor: '#EEF4FA',
    color: '#A2A7AE',
    ...theme.typography.small,
  },
  tableBody: {},
  tableBodyRow: {},
  tableBodyCell: {
    verticalAlign: 'initial',
    color: theme.palette.text.primary,
    padding: '12px',
    ...theme.typography.small,
  },
  tableBodyEditableCell: {
    width: 130,
  }
});

export default withStyles(styles, { withTheme: true })(TableM);