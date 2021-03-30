import {makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
    return {
        container: {
            width: "100%",
            height: "100vh",
            backgroundColor: "#f8f8f8",
            display: "grid",
            placeItems: "center",
        },
        content: {
            padding: "100px",
            borderRadius: "5px",
            boxShadow: "0 1px 3px gray",
            backgroundColor: "white",
            textAlign: "center",
        },
        amazonLogo: {
            height: "200px",
            width: "400px",
            marginBottom: "40px",
        },
        loginButton: {
            marginTop: "50px",
            backgroundColor: "#f0c14b",
            height: "40px",
            borderRadius: "4px",
            border: "2px solid #a88734",
            fontSize: "16px",
            padding: "4px 8px 4px 8px",
            cursor: "pointer",
        }
    }
});

export interface ILoginProps {
    onLogin: () => void;
}

export const Login = (props: ILoginProps) => {



    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <img src={"https://download.logo.wine/logo/Amazon_(company)/Amazon_(company)-Logo.wine.png"}
                     className={classes.amazonLogo}
                />
                <h1>Sign into Amazon</h1>
                <button className={classes.loginButton}
                    onClick={props.onLogin}>
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}