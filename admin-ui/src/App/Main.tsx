import React, {Component} from 'react';
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {AppStateType} from "../redux/store";
import style from './Main.module.css';
import {fetchData} from "./reducer/api-actions";
import {getAppError, getIsFetching} from "./reducer/selectors";
import Preloader from "../Common/Preloader";
import {connect} from "react-redux";
import {Redirect, Route, RouteComponentProps, Switch, withRouter} from "react-router";
import LoginPage from "../Login/components/Login";
import ProfilePage from "../Profile/ProfilePage";
import RecoverPassword from "../Login/components/RecoverPasswordPage";
import {withErrorBoundary} from "../Common/ErrorBoundary";
import {ErrorMessage} from "../Common/ErrorMessage";
import {getIsAuth} from "../Login/reducer/selectors";
import {logOut} from "../Login/reducer/actions";
import OrdersPage from "../Orders/Components/OrdersPage";
import {createBrowserHistory as createHistory} from 'history'

const history = createHistory();
const ErrorMessageWithErrorBoundary =
    withErrorBoundary(ErrorMessage);

interface I_props {
    title?: string
}

interface I_connectedProps {
    isAuth: boolean | null
    error: string | null
    appError: string | null
    isFetching: boolean
}

interface I_dispatchedProps {
    fetchData: () => void,
    logOut: () => void
}

interface I_MainProps extends I_props, I_connectedProps, I_dispatchedProps, RouteComponentProps<{}> {
}

class Main extends Component<I_MainProps> {

    componentDidMount() {
    }

    componentDidUpdate(prevProps: Readonly<I_MainProps>, prevState: Readonly<{}>, snapshot?: any): void {
        //fetch after login
        if (this.props.isAuth !== prevProps.isAuth) {
            this.props.fetchData();
        }
    }

    render() {
        let {appError, isFetching} = this.props;
        return (
            <div>
                <Header alert={appError} isAuth={this.props.isAuth} logOut={this.props.logOut}/>
                <div className={style.mainWrapper}>
                    {isFetching ?
                        <Preloader/>
                        :
                        <Switch>
                            <Route exact path="/"
                                   render={() => <Redirect to={"/orders"}/>}/>
                            <Route path="/login" render={() => <LoginPage/>}/>
                            <Route path="/orders" render={() => <OrdersPage/>}/>
                            <Route path="/profile" render={() =>
                                <ErrorMessageWithErrorBoundary>
                                    <ProfilePage/>
                                </ErrorMessageWithErrorBoundary>
                            }/>
                            <Route path="/forgotPassword" render={() => <RecoverPassword/>}/>
                            <Route path="*" render={() => <div>Error 404</div>}/>
                        </Switch>
                    }
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): I_connectedProps => {
    return {
        isAuth: getIsAuth(state),
        error: null,
        appError: getAppError(state),
        isFetching: getIsFetching(state),
    }
};

let ComposedComponent = connect(
    mapStateToProps, {fetchData, logOut}
)(Main);

export default withRouter(ComposedComponent);