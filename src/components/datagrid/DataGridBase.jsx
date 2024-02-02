import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import { LinearProgress } from "@mui/material";

const DataGridBase = (props) => {
  const {
    rows,
    columns,
    rowCount,

    autoHeight,
    columnHeaderHeight,
    columnVisibilityModel,
    checkboxSelection,

    disableColumnFilter,
    disableColumnMenu,
    disableColumnSelector,
    disableDensitySelector,
    disableRowSelectionOnClick,
    disableVirtualization,

    getCellClassName,
    getRowClassName,
    hideFooter,
    loading,
    pagination = true,

    // onRowSelectionModelChange,
    // pageSizeOptions,
    // paginationMode,
    // paginationModel,
    // onPaginationModelChange,

    rowHeight,
    sortingMode,
    sortModel,
    onSortModelChange,
    sx,
    onCellClick,
    cellRenderer,
    getRowId
  } = props;
  console.log("sxxx", sx);
  const _sx = {
    "&.MuiDataGrid-root": {
      fontWeight: "light",
      maxWidth: "100%",
      borderRadius: 0,
      " .MuiDataGrid-cell:focus-within": {
        outline: "none !important",
      },

      "& .MuiDataGrid-columnHeader": {
        backgroundColor: "#E5EEFF",
        color: "#242424",
        fontSize: "12px",
        fontWeight: 500,
        "& .MuiDataGrid-columnSeparator": {
          display: "none",
        },
        "& .MuiDataGrid-checkboxInput": {
          color: "white",
        },
        "& .MuiDataGrid-sortIcon": {
          color: "white",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontSize: "0.8125rem",
          fontWeight: 400,
        },
      },

      "& .MuiDataGrid-row": {
        // "&.even_row": {},
        // "&.odd_row": {
        // 	backgroundColor: "#F1F1F1",
        // },
        "& .MuiDataGrid-withBorderColor": {
          borderColor: "rgba(0,0,0,0.12)",
        },
      },

      "& .MuiDataGrid-footerContainer": {
        minHeight: 46,
        height: 46,
        display: pagination ? "block" : "none",
      },
    },
    ...sx,
  };

  return (
    <DataGrid
      autoHeight={autoHeight}
      rows={rows}
      columns={columns}
      rowCount={rowCount}
      columnHeaderHeight={columnHeaderHeight}
      columnVisibilityModel={columnVisibilityModel}
      checkboxSelection={checkboxSelection}
      disableColumnFilter={disableColumnFilter}
      disableColumnMenu={disableColumnMenu}
      disableColumnSelector={disableColumnSelector}
      disableDensitySelector={disableDensitySelector}
      disableRowSelectionOnClick={disableRowSelectionOnClick}
      disableVirtualization={disableVirtualization}
      getCellClassName={getCellClassName}
      getRowClassName={getRowClassName}
      hideFooter={hideFooter}
      loading={loading}
      // onRowSelectionModelChange={onRowSelectionModelChange}
      // pageSizeOptions={pageSizeOptions}
      // paginationMode={paginationMode}
      // paginationModel={paginationModel}
      // onPaginationModelChange={onPaginationModelChange}
      rowHeight={rowHeight}
      sortingMode={sortingMode}
      sortModel={sortModel}
      onSortModelChange={onSortModelChange}
      sx={_sx}
      slots={{
        loadingOverlay: LinearProgress,
      }}
      onCellClick={onCellClick}
      cellRenderer={cellRenderer}
      getRowId={getRowId}
    />
  );
};

DataGridBase.defaultProps = {
  autoHeight: false,
  
  rowCount: null,
  columnHeaderHeight: 46,
  columnVisibilityModel: {
    id: false,
  },
  checkboxSelection: false,
  disableColumnFilter: true,
  disableColumnMenu: true,
  disableColumnSelector: true,
  disableDensitySelector: true,
  disableRowSelectionOnClick: true,
  disableVirtualization: true,
  getRowClassName: (params) =>
    params.indexRelativeToCurrentPage % 2 === 0 ? "even_row" : "odd_row",
  hideFooter: false,
  paginationMode: "client",
  paginationModel: { page: 0, perPage: 10 },
  pageSizeOptions: [10, 25, 50, 100],
  rowHeight: 36,
  sortingMode: "client",
};

DataGridBase.propTypes = {
  autoHeight: PropTypes.bool,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  rowCount: PropTypes.number,
  columnHeaderHeight: PropTypes.number,
  columnVisibilityModel: PropTypes.shape({}),
  checkboxSelection: PropTypes.bool,
  disableColumnFilter: PropTypes.bool,
  disableColumnMenu: PropTypes.bool,
  disableColumnSelector: PropTypes.bool,
  disableDensitySelector: PropTypes.bool,
  disableRowSelectionOnClick: PropTypes.bool,
  disableVirtualization: PropTypes.bool,
  getCellClassName: PropTypes.func,
  getRowClassName: PropTypes.func,
  hideFooter: PropTypes.bool,
  loading: PropTypes.bool,

  onRowSelectionModelChange: PropTypes.func,
  pageSizeOptions: PropTypes.array,
  paginationMode: PropTypes.oneOf(["client", "server"]),
  paginationModel: PropTypes.shape({
    page: PropTypes.number,
    perPage: PropTypes.number,
  }),
  onPaginationModelChange: PropTypes.func,
  rowHeight: PropTypes.number,
  sortingMode: PropTypes.oneOf(["client", "server"]),
  sortModel: PropTypes.array,
  onSortModelChange: PropTypes.func,
  sx: PropTypes.shape({}),
  onCellClick: PropTypes.func,
  cellRenderer: PropTypes.func,
};

export default DataGridBase;
