import {makeStyles, Theme} from "@material-ui/core";
import {Product} from "./product";


const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            maxWidth: "1500px",
            margin: "0 auto",
            width: "100%",
        },
        banner: {
            background: "url(https://i.imgur.com/SYHeuYM.jpg)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            minHeight: "600px",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",
            zIndex: 1,
        },
        content: {
            background: theme.palette.background.default,
            paddingLeft: "10px",
            paddingRight: "10px",
            marginTop: "-350px",
            zIndex: 100,
            display: "flex",
        },
    }
});


export const Home = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div className={classes.banner}>

            </div>
            <div className={classes.content}>
                home
                <Product />
                <Product />
            </div>
        </div>
    )
}