import { makeStyles } from "@material-ui/core/styles";
import { defaultBorder } from "styles/commonStyles";
import { font } from "styles";

export const useStyles = makeStyles((theme) => ({
  form: {
    backgroundColor: theme.palette.common.white,
  },
  subtitle: {
    fontWeight: font.weight.bold,
    color: theme.palette.primary.main,
  },
  section: {
    display: "flex",
    flexDirection: "column",
    padding: `0 ${theme.spacing(3)}px`,
    paddingTop: theme.spacing(2),
    borderBottom: defaultBorder,
  },
  company: {
    paddingTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  driver: {
    borderBottom: 0,
  },
  subtitleWrapper: {
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  active: {
    color: theme.palette.primary.main,
  },
}));
