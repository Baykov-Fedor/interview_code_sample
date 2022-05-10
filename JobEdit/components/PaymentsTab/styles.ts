import { makeStyles } from "@material-ui/core/styles";
import { boldDefaultBorder, extraBoldBorder } from "styles/commonStyles";
import { colors, font } from "styles";

export const useStyles = makeStyles(({ spacing, palette }) => ({
  title: {
    fontSize: font.size.large,
    fontWeight: font.weight.semiBold,
    paddingBottom: spacing(2),
    borderBottom: boldDefaultBorder,
  },
  header: {
    "& th": {
      height: "auto",
      borderBottom: extraBoldBorder,
      padding: `${spacing(2)}px 0`,
      textTransform: "uppercase",
      fontWeight: font.weight.medium,
      fontSize: font.size.regular,
    },
  },
  table: {
    "& tr": {
      background: palette.common.white,
    },
  },
  body: {
    "& th": {
      borderBottom: 0,
      height: "34px",
      width: "30%",
    },
  },
  amount: {
    fontWeight: font.weight.bold,
  },
  balanceTitle: {
    fontWeight: font.weight.medium,
  },
  balanceAmount: {
    fontWeight: font.weight.bold,
    color: palette.primary.main,
  },
  charge: {
    width: "150px",
  },
  stripeForm: {
    animation: "fade 200ms ease-out",
    marginBottom: "24px",
    width: "65%",
    "& input,\nbutton": {
      WebkitAppearance: "none",
      MozAppearance: "none",
      appearance: "none",
      outline: "none",
      borderStyle: "none",
    },
    "& .FormRow": {
      display: ["-ms-flexbox", "flex"],
      msFlexAlign: "center",
      alignItems: "center",
      marginLeft: "15px",
    },
    "& .FormRowLabel": {
      width: "15%",
      minWidth: "70px",
      padding: "11px 0",
      color: "black",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
    "& .FormRowInput": {
      fontSize: "16px",
      width: "100%",
      color: "black",
      padding: "11px 15px 11px 0",
      backgroundColor: "transparent",
      animation: "1ms void-animation-out",
    },
    "& .StripeElement--webkit-autofill": {
      background: "transparent !important",
    },
    "& .StripeElement": { width: "100%", padding: "11px 15px 11px 0" },
    "& .SubmitButton": {
      display: "block",
      fontSize: "16px",
      width: "100%",
      height: "40px",
      backgroundColor: colors.fadingLightGreen,
      borderRadius: "0px 0px 4px 4px",
      color: palette.common.white,
      fontWeight: 500,
      cursor: "pointer",
      transition: "all 100ms ease-in-out",
      willChange: "transform, background-color, box-shadow",
    },
    "& .SubmitButton:active": {
      backgroundColor: palette.primary.main,
      boxShadow: `0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),\n    inset 0 1px 0 ${palette.primary.main}`,
      transform: "scale(0.99)",
    },
    "& .SubmitButton:hover": {
      backgroundColor: colors.sparklingLightGreen,
    },
    "& .SubmitButton:disabled": {
      opacity: 0.5,
      cursor: "default",
      backgroundColor: colors.rollingStone,
      boxShadow: "none",
    },
    "& .ErrorMessage": {
      color: palette.error.main,
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      fontSize: "13px",
      marginTop: "64px",
      transform: "translateY(-15px)",
      animation: "fade 150ms ease-out",
      animationDelay: "50ms",
      animationFillMode: "forwards",
      willChange: "opacity, transform",
      width: "30%",
    },
    "& .ErrorMessage svg": { display: "none" },
    "& .Result": {
      marginTop: "50px",
      textAlign: "center",
      animation: "fade 200ms ease-out",
    },
    "& .ResultTitle": {
      color: palette.common.white,
      fontWeight: 500,
      marginBottom: "8px",
      fontSize: "17px",
      textAlign: "center",
    },
  },
  formGroup: {
    padding: "0",
    willChange: "opacity, transform",
    borderRadius: "4px 4px 0px 0px",
    border: `1px solid ${palette.primary.light}`,
    margin: "0",
  },
  addPayment: {
    width: "150px",
  },
  actionWrapper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    justifyContent: "flex-end",
  },
  paymentItem: {
    "& th": {
      textTransform: "capitalize",
    },
    "&:hover": {
      background: colors.catskillWhite,
      "& $deleteButton": {
        display: "flex",
      },
    },
  },
  deleteButton: {
    display: "none",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "absolute",
    top: 0,
    bottom: 0,
    padding: 0,
    color: palette.error.main,
    "&:hover": {
      background: "transparent",
    },
  },
  amountError: {
    color: palette.error.main,
    paddingLeft: spacing(2),
  },
}));
