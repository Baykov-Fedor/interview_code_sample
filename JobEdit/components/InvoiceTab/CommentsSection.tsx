import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { useStyles } from './styles';
import { InvoiceBlock } from './index';
import { IInvoiceCommentDto } from 'pages/Jobs/JobEdit/components/InvoiceTab/Invoice.interfaces';

interface CommentsSectionProps {
  formattedComments?: IInvoiceCommentDto[];
}

export const CommentsSection = ({ formattedComments }: CommentsSectionProps) => {
  const classes = useStyles();
  if (!formattedComments) return <InvoiceBlock title="Comments">-</InvoiceBlock>;

  return (
    <InvoiceBlock title="Comments">
      {formattedComments.map((comment, i) => (
        <Box display="flex" flexWrap="nowrap" flexDirection="row" key={i}>
          <Box>
            <Typography variant="body2" className={classes.time}>
              {`${comment.createdAt} |`}
            </Typography>
          </Box>
          <Box flex={1}>
            <Typography variant="body2" className={classes.commentBody}>
              {comment.text}
            </Typography>
          </Box>
        </Box>
      ))}
    </InvoiceBlock>
  );
};
