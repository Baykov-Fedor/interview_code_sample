import { Box } from "@material-ui/core";

export const FormFieldsWrapper = (props: any) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      flexGrow={1}
      overflow="auto"
      height="0px"
      {...props}
    >
      {props.children}
    </Box>
  );
};
