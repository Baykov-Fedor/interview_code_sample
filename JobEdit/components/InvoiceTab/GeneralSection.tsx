import React from 'react';
import { Box } from '@material-ui/core';
import { useStyles } from './styles';
import { InvoiceBlock } from './index';
import { DetailItem } from './DetailsSection';

interface GeneralSectionProps {
  providerName: string;
  bookedOn: string;
  formattedJobNumber: string;
}

export const GeneralSection = ({
  providerName,
  bookedOn,
  formattedJobNumber,
}: GeneralSectionProps) => {
  const classes = useStyles();

  return (
    <InvoiceBlock title="Provider">
      <Box display="flex">
        <Box className={classes.provider}>{providerName}</Box>
        <DetailItem title="Booked on" description={bookedOn} width="25%" marginBottom={0} />
        <DetailItem
          title="Job number"
          description={formattedJobNumber}
          width="25%"
          marginBottom={0}
          boldText
        />
      </Box>
    </InvoiceBlock>
  );
};
