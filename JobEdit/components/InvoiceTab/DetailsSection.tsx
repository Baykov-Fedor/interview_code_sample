import React from 'react';
import classnames from 'classnames';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { InvoiceBlock } from './index';
import {
  IInvoiceServiceDto,
  IInvoiceVehicleDto,
} from 'pages/Jobs/JobEdit/components/InvoiceTab/Invoice.interfaces';

interface DetailsSectionProps {
  companyName: string;
  dispatcherName: string;
  driverName: string;
  referenceNumber: string;
  vehicleDescription: string;
  vehicle?: IInvoiceVehicleDto;
  locationAddress: string;
  service?: IInvoiceServiceDto;
  customerNotes: string;
}

export const DetailsSection = ({
  companyName,
  dispatcherName,
  driverName,
  referenceNumber,
  vehicleDescription,
  vehicle,
  locationAddress,
  customerNotes,
}: DetailsSectionProps) => {
  const classes = useStyles();

  return (
    <InvoiceBlock title="job details">
      <Box className={classes.fieldsWrapper}>
        <DetailItem title="Company" description={companyName} />
        <DetailItem title="Dispatcher" description={dispatcherName} />
        <DetailItem title="Driver" description={driverName} />
        <DetailItem title="Reference number" description={referenceNumber} />
        <DetailItem title="Vehicle" description={vehicleDescription} />
        <DetailItem title="VIN / Serial number" description={vehicle?.vehicleSerialNumber} />
        <DetailItem title="Unit number" description={vehicle?.vehicleUnitNumber} />
        <DetailItem title="Vehicle type" description={vehicle?.vehicleType} />
        <DetailItem title="Vehicle location" description={locationAddress} width="100%" boldText />
        <DetailItem
          title="Customer notes"
          description={customerNotes}
          width="100%"
          marginBottom={0}
        />
      </Box>
    </InvoiceBlock>
  );
};

export const DetailItem = ({
  title,
  description,
  width = '25%',
  boldText,
  marginBottom = 1.5,
}: {
  title: string;
  description?: string;
  width?: string;
  boldText?: boolean;
  marginBottom?: number;
}) => {
  const classes = useStyles();

  return (
    <Box flex={`1 1 ${width}`} mb={marginBottom}>
      <Typography className={classes.subtitle}>{title}</Typography>
      <Typography
        variant="subtitle2"
        className={classnames(classes.wrap, boldText && classes.bold)}
      >
        {description || '-'}
      </Typography>
    </Box>
  );
};
