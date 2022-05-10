import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { InvoiceBlock } from './index';

interface PriceSectionProps {
  formattedTotalCost: string;
  totalLaborCost: string;
  totalPartsCost: string;
  travelCost: string;
  fuelCost: string;
}

export const PriceSection = ({
  formattedTotalCost,
  totalLaborCost,
  totalPartsCost,
  travelCost,
  fuelCost,
}: PriceSectionProps) => {
  const classes = useStyles();

  return (
    <Box display="flex">
      <InvoiceBlock title="Price">
        <Box display="flex" flexDirection="column">
          <Typography className={classes.subtitle}>Total amount due</Typography>
          <Typography className={classes.total}>{formattedTotalCost}</Typography>
        </Box>
      </InvoiceBlock>
      <InvoiceBlock title="Price summary" className={classes.summary}>
        <PriceItem label="Labor">{totalLaborCost}</PriceItem>
        <PriceItem label="Parts">{totalPartsCost}</PriceItem>
        <PriceItem label="Call-out (travel)">{travelCost}</PriceItem>
        <PriceItem label="Fuel">{fuelCost}</PriceItem>
      </InvoiceBlock>
    </Box>
  );
};

const PriceItem = ({ label, children }: { label: string; children: any }) => {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography className={classes.priceItem}>{label}</Typography>
      <Typography className={classes.priceItem}>{children}</Typography>
    </Box>
  );
};
