import { makeStyles } from '@material-ui/core/styles';
import { colors, font } from 'styles';
import theme from 'styles/theme';

export const useStyles = makeStyles(({ spacing, palette }) => ({
  pinIcon: {
    width: '42px',
    marginRight: spacing(2),
  },
  boldText: {
    fontWeight: font.weight.semiBold,
  },
  title: {
    fontSize: font.size.default,
    fontWeight: font.weight.semiBold,
    lineHeight: '20px',
  },
  errorTitle: {
    color: palette.error.main,
  },
  serviceAreaIcon: {
    width: spacing(2),
    height: spacing(2),
    marginRight: spacing(1),
    color: palette.primary.main,
  },
  statValue: {
    marginLeft: spacing(0.5),
    marginRight: spacing(0.5),
    color: palette.common.black,
    fontWeight: font.weight.semiBold,
  },
  statLabel: {
    display: 'flex',
    alignItems: 'center',
    width: '33%',
    color: colors.rollingStone,
    lineHeight: '16px',
    marginBottom: spacing(1),
    fontSize: font.size.regular,
  },
  dot: {
    display: 'inline-block',
    width: '6px',
    height: '6px',
    backgroundColor: palette.primary.main,
    borderRadius: '100%',
  },
  redDot: {
    backgroundColor: palette.error.main,
  },
  greenDot: {
    backgroundColor: palette.primary.main,
  },
  loader: {
    marginRight: spacing(2),
  },
  container: {
    background: colors.catskillWhite,
  },
  locationDetailsWrapper: {
    display: 'flex',
    marginTop: spacing(3),
    alignItems: 'end',
  },
  locationDetailsSelect: {
    minWidth: '160px',
  },
  locationNotes: {
    marginLeft: spacing(2),
    marginTop: spacing(-1),
    flex: 1,
    '& div.MuiInputBase-root': {
      height: '60px',
    },
  },
  locationSection: {
    backgroundColor: colors.lightGreen,
  },
  rateType: {
    fontWeight: font.weight.bold,
    marginLeft: theme.spacing(1.5),
    lineHeight: '16px',
  },
  disclaimerTitle: {
    fontWeight: font.weight.bold,
    lineHeight: '16px',
  },
  disclaimerText: {
    color: theme.palette.text.secondary,
    fontWeight: font.weight.light,
    marginBottom: theme.spacing(1.5),
  },
  serviceIssue: {
    '& MuiFormControl-root > div.MuiInputBase-root': {
      height: '76px',
    },
  },
}));
