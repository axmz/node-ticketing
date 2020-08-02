import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/buildClient'
import Header from '../components/header'

const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div className="container">
            <Header currentUser={currentUser} />
            <Component {...pageProps} currentUser={currentUser} />
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    const { Component, ctx } = appContext

    const client = buildClient(ctx)
    const { data } = await client.get("/api/users/currentuser")

    let pageProps = {}
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx, client, data)
    }

    return { pageProps, ...data }
}

export default AppComponent