import {makeStyles, Theme} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            background: theme.palette.background.default,
            zIndex: 100,
            height: "300px",
            flex: 1,
            border: "1px solid red",
            padding: "20px",
            margin: "10px",
        },
        title: {

        },
        price: {

        },
        rating: {

        },
        image: {

        },
        addToCart: {

        },
    }
});

export const Product = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <p className={classes.title}>
                Ipad Pro
            </p>
            <p className={classes.price}>
                $999.99
            </p>
            <div className={classes.rating}>
                
            </div>
            <img className={classes.image} />
            <div className={classes.addToCart}>
                Add to Cart
            </div>
        </div>
    )
}
