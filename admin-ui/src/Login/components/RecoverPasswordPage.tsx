import React from "react";
import {connect} from "react-redux";

import {recoverPassword} from "../reducer/actions";

const mapStateToProps = (state: any) => {
    return {
    }
}

const RecoverPassword = ({recoverPassword}: any) => {
    const onSubmit = (dataForm: any) => {
        let message = recoverPassword(dataForm.email);
        alert(dataForm)
    }
    return <RecoverPassword onSubmit={onSubmit}/>
}


export default connect(mapStateToProps,{recoverPassword})(RecoverPassword);