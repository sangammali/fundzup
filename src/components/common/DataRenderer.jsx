import PropTypes from 'prop-types';

import { Box, Stack, Typography } from '@mui/material';
import Loader from './Loader';

const DataRenderer = (props) => {
    const {
        // image,
        message,
        dataNotFoundSx,
        isLoading,
        isCalled,
        hasData,
        dataComponent,
        sx,
    } = props;

    return (
        <Box sx={{ position: 'relative', minHeight: '160px', ...sx }}>
            {isLoading ? (
                <Loader loading position="absolute" />
            ) : (
                <>
                    {isCalled && !hasData ? (
                        <Stack
                            alignItems="center"
                            justifyContent="center"
                            sx={dataNotFoundSx}
                            spacing={2}
                        >
                            {/* <img src={image} style={{ width: 64 }} /> */}
                            <Typography color="warning">{message}</Typography>
                        </Stack>
                    ) : (
                        dataComponent()
                    )}
                </>
            )}
        </Box>
    );
};

DataRenderer.defaultProps = {
    image: '/assets/images/data_not_found_icon_inverse.svg',
    message: 'No Data Found.',
    dataNotFoundSx: {},
};

DataRenderer.propTypes = {
    image: PropTypes.string,
    message: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    isCalled: PropTypes.bool.isRequired,
    hasData: PropTypes.bool.isRequired,
    dataComponent: PropTypes.func.isRequired,
    dataNotFoundSx: PropTypes.shape({}),
    sx: PropTypes.shape({}),
};

export default DataRenderer;
