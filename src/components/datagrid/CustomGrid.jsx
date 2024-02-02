import PropTypes from "prop-types";
// import Card from "components/common/Card";
import { Card } from "@mui/material";
import Box from "components/common/Box";
import DataRenderer from "components/common/DataRenderer";
import DataGridBase from "./DataGridBase";
import Stack from "components/common/Stack";

const CustomDataGrid = (props) => {
	const {
		list,
		isLoading,
		isCalled,
		columnHeaderHeight,
		rowHeight,
		columns,
		rowCount,
		sx,
		pagination = true,
		header,
		footer,
	
		tableRowColor,
		onCellClick,
		getRowClassName,
		getRowId,
		checkboxSelection=false,
	} = props;
	return (
		<Card>
			<Stack>
				{header ? header() : <></>}
				<DataRenderer
					isLoading={isLoading}
					isCalled={isCalled}
					hasData={!!list.length}
					message="No Users Found"
					dataComponent={() => (
						<DataGridBase
							autoHeight
							rows={list}
							columnHeaderHeight={columnHeaderHeight}
							rowHeight={rowHeight}
							columns={columns}
							rowCount={rowCount}
							pagination={pagination}
							sx={{ ...sx }}
							checkboxSelection={checkboxSelection}
							onCellClick={onCellClick}
                            tableRowColor={tableRowColor}
							getRowClassName={getRowClassName}
							getRowId={getRowId}
						/>
					)}
				/>
				{footer ? footer() : <></>}
			</Stack>
		</Card>
	);
};

CustomDataGrid.defaultProps = {
	onViewClick: () => {},
};

CustomDataGrid.propTypes = {
	list: PropTypes.array.isRequired,
	count: PropTypes.number.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isCalled: PropTypes.bool.isRequired,
	onViewClick: PropTypes.func.isRequired,
	onCellClick: PropTypes.func,
	cellRenderer:PropTypes.func
};

export default CustomDataGrid;
