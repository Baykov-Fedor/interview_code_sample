import { makeStyles } from "@material-ui/core/styles";
import { font } from "styles";
import { separatorBorder } from "styles/commonStyles";
import theme from "styles/theme";

export const useStyles = makeStyles(({ palette, spacing }) => ({
	tabWrapper: {
		"& .ra-input > div:first-child": {
			width: "auto",
		},
	},
	tabHeader: {
		display: "flex",
		justifyContent: "space-between",
		padding: `${spacing(3)}px 0 ${spacing(2)}px`,
	},
	section: {
		borderTop: separatorBorder,
		padding: `${spacing(1.5)}px 0 ${spacing(2)}px`,
		width: "100%",
	},
	title: {
		color: palette.primary.main,
		textTransform: "uppercase",
		fontSize: font.size.small,
		fontWeight: font.weight.semiBold,
	},
	subtitle: {
		color: palette.secondary.light,
		fontSize: font.size.small,
		fontWeight: font.weight.light,
	},
	priceItem: {
		fontSize: font.size.regular,
		fontWeight: font.weight.light,
	},
	total: {
		fontSize: font.size.huge,
		fontWeight: font.weight.semiBold,
	},
	provider: {
		fontSize: font.size.large,
		width: "50%",
		alignSelf: "center",
	},
	wrap: {
		overflowWrap: "break-word",
	},
	bold: {
		fontWeight: font.weight.semiBold,
	},
	summary: {
		flexDirection: "column",
		marginLeft: spacing(2),
	},
	fieldsWrapper: {
		display: "flex",
		flexWrap: "wrap",
		marginBottom: spacing(1),
	},
	item: {
		fontSize: font.size.regular,
		color: palette.secondary.light,
	},
	name: {
		color: palette.primary.dark,
		fontWeight: font.weight.semiBold,
	},
	cost: {
		color: palette.primary.dark,
		flex: "1 1 20%",
		display: "flex",
		justifyContent: "flex-end",
	},
	parts: {
		borderTop: 0,
		marginTop: 0,
		paddingTop: 0,
		paddingBottom: spacing(0.5),
	},
	time: {
		fontSize: font.size.regular,
		fontWeight: font.weight.semiBold,
		paddingRight: spacing(0.5),
	},
	commentBody: {
		fontSize: font.size.regular,
		color: palette.secondary.light,
		wordBreak: "break-word",
		wordWrap: "break-word",
		hyphens: "auto",
	},
	tinyText: {
		fontSize: font.size.small,
	},
	downloadInvoiceButton: {
		marginLeft: spacing(1),
	},
	multilineTextField: {
		"& .MuiFilledInput-root": {
			height: "100px",
			paddingTop: 0,
			marginTop: theme.spacing(1),
		},
	},
}));
