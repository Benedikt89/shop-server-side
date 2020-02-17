import React from "react";
import {connect} from "react-redux";
import {registerUser} from "../reducer/actions";
import {getIsAuth} from "../reducer/selectors";
import {I_loginData} from "../auth-types";
import LoginForm from "./forms/LoginForm";

const RegisterPage: React.FC = ({registerUser}: any) => {

    const onSubmit = (data: I_loginData) => {
        console.log(data);
        registerUser(data)
    };

    return (
        <div className="container col-md-5">
            <LoginForm onSubmit={onSubmit} message={"Register page"}/>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        isAuth: getIsAuth(state)
    }
};

export default connect(mapStateToProps, {registerUser})(RegisterPage);

