import React from 'react';
import { Box } from '@material-ui/core';

export const JobFormWrapper = (props: any) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      maxWidth="700px"
      minWidth="600px"
      boxShadow="4px 0 5px -2px rgb(0 0 0 / 30%)"
      zIndex="1"
    >
      {props.children}
    </Box>
  );
};
