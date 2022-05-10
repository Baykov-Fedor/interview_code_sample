import React from 'react';
import { Chip, makeStyles } from '@material-ui/core';
import { font } from 'styles';

export const PaymentStatusChip = ({
  name,
  fontColor,
  backgroundColor,
}: {
  name: string;
  fontColor: string;
  backgroundColor: string;
}) => {
  const classes = useChipStyles({ fontColor, backgroundColor });

  return <Chip label={name} classes={classes} />;
};

export const useChipStyles = makeStyles(({ spacing }) => ({
  root: (props: any) => ({
    fontSize: font.size.small,
    height: 'auto',
    borderRadius: '4px',
    background: props.backgroundColor,
    margin: `0 ${spacing(1)}px`,
  }),
  label: (props: any) => ({
    textTransform: 'capitalize',
    letterSpacing: '0.5px',
    paddingLeft: spacing(0.5),
    paddingRight: spacing(0.5),
    color: props.fontColor,
  }),
}));
