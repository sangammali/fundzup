import PropTypes from 'prop-types';

import {
    Box,
    Typography,
    IconButton,
    Stack,
} from '@mui/material';
import { VisibilityOutlined } from '@mui/icons-material';

import DataRenderer from 'components/common/DataRenderer';
import DataGridBase from './DataGridBase';

const UsersDataGrid = (props) => {
    const { list, count, isLoading, isCalled, onViewClick } =
        props;
    
    const columns = [
        {
            field: 'name',
            width: 200,
            headerName: 'Name',
            valueGetter: ({ row }) => {
                return row?.name || '-';
            },
        },
        {
            field: 'contact',
            flex: 1,
            headerName: 'Contact Details',
            renderCell: ({ row }) => {
                if (!row?.contact?.email && !row?.contact?.phone) {
                    return '-';
                }
                return (
                    <Stack>
                        <Typography variant="body2" fontWeight={300}>{row?.contact?.email}</Typography>
                        <Typography variant="caption" fontWeight={300}>{row?.contact?.phone}</Typography>
                    </Stack>
                );
            },
        },
        {
            field: 'designation',
            width: 150,
            headerName: 'Designation',
            valueGetter: ({ row }) => {
                return row?.designation || '-';
            },
        },
        {
            field: 'address',
            flex: 1,
            headerName: 'Address',
            valueGetter: ({ row }) => {
                return row?.address || '-';
            },
        },
        {
            field: 'division',
            width: 150,
            headerName: 'Division',
            valueGetter: ({ row }) => {
                return row?.division || '-';
            },
        },
        {
            field: 'district',
            width: 150,
            headerName: 'District',
            valueGetter: ({ row }) => {
                return row?.district || '-';
            },
        },
        {
            field: 'view',
            width: 120,
            headerName: 'View Deliveries',
            renderCell: ({ row }) => {
                return <Stack sx={{ width: "100%" }} alignItems="center" justifyContent="center"><IconButton size="small" onClick={() => { onViewClick({ row }) }}><VisibilityOutlined /></IconButton></Stack>
            },
        },
    ];

    return (
        <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
            <DataRenderer
                isLoading={isLoading}
                isCalled={isCalled}
                hasData={!!list.length}
                message="No Users Found"
                sx={{ maxHeight: '300px' }}
                dataComponent={() => (
                    <DataGridBase
                        autoHeight
                        rows={list}
                        columnHeaderHeight={46}
                        rowHeight={46}
                        columns={columns}
                        rowCount={count}
                        sx={{ '--DataGrid-overlayHeight': '300px' }}
                    />
                )}
            />
        </Box>
    );
};

UsersDataGrid.defaultProps = {
    onViewClick: () => { },
};

UsersDataGrid.propTypes = {
    list: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isCalled: PropTypes.bool.isRequired,
    onViewClick: PropTypes.func.isRequired,
};

export default UsersDataGrid;
