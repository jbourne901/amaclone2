import {makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            display: "flex",
            flex: 0.2,
            backgroundColor: "blue",
            marginRight: "18px",
            padding: "20px",
            height: "200px",

        }
    }
});


export const CartTotal = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            CartTotal
        </div>
    );
}