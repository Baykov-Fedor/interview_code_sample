import { Box, Typography } from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';
import { IServiceResponse } from 'api/api.interfaces';

import { HelperText } from 'pages/Jobs/HelperText';
import { defaultBorder } from 'styles/commonStyles';
import theme from 'styles/theme';
import { useStyles } from './style';

interface RateTypeInfoProps {
  service: IServiceResponse;
}

export const RateTypeInfo = ({ service }: RateTypeInfoProps) => {
  const classes = useStyles();

  const helperText = 'Based on the pricing setup for this service.';
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      border={defaultBorder}
      p={1.5}
      boxSizing="border-box"
    >
      <Box display="flex" alignItems="center" style={{ color: theme.palette.primary.main }}>
        <Typography variant="overline" className={classes.rateType}>
          {`$${service.rateValue} flat rate`}
        </Typography>
      </Box>
      <HelperText icon={HelpOutline} text={helperText} />
    </Box>
  );
};
