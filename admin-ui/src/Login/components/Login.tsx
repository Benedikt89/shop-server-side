import React from "react";
import {connect} from "react-redux";
import {loginUserThunk} from "../reducer/actions";
import {Link} from "react-router-dom";
import {getIsAuth} from "../reducer/selectors";
import {I_loginData} from "../auth-types";
import LoginForm from "./forms/LoginForm";

const LoginPage: React.FC = ({loginUserThunk}: any) => {

    const onSubmit = (data: I_loginData) => {
        loginUserThunk(data)
    };

    return (
        <div className="col-md-5">
            <LoginForm onSubmit={onSubmit} message={'Authorization page'}/>
            <Link to={"/forgotPassword"}>
                <div className="container">
                    Forgot your password?
                </div>
            </Link>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        isAuth: getIsAuth(state)
    }
};

export default connect(mapStateToProps, {loginUserThunk})(LoginPage);

