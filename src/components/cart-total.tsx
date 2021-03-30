import {makeStyles, Theme} from "@material-ui/core";
import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flex: 0.2,
            backgroundColor: "white",
            marginRight: "18px",
            padding: "20px",
            height: "200px",
        },
        subtotal: {
            marginBottom: "16px",
        },
        button: {
            backgroundColor: "#f0c14b",
            width: "100%",
            padding: "4px 8px",
            border: "2px solid #a88734",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#ddb347",
            }
        }
    }
});

export interface ICartTotalProps {
    cartQty: number;
    cartTotal: number;
}

export const CartTotal = (props: ICartTotalProps) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <h2 className={classes.subtotal}>Subtotal: ({props.cartQty} items): {" "}
                <NumberFormat value={props.cartTotal} displayType={"text"} thousandSeparator prefix={"$"} />
            </h2>
            <hr />
            <button className={classes.button}>Proceed to checkout</button>
        </div>
    );
}