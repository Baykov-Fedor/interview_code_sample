import { Box, Typography } from "@material-ui/core";
import { useStyles } from "./styles";

export const ContactLabel = ({ text }: { text: string }) => {
  const classes = useStyles();

  return (
    <Box className={classes.subtitleWrapper}>
      <Typography variant="button" className={classes.subtitle}>
        {text}
      </Typography>
    </Box>
  );
};
