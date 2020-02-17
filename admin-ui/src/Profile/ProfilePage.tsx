import React, {useState} from "react";
import {connect} from "react-redux";
import WithModal from "../Common/Modals/Modal";
import Popover from "../Common/Modals/Popover";

interface I_connectedProps {
    firstName: string | null
    phone: string | null
}

const ProfilePage: React.FC<I_connectedProps> = (props: I_connectedProps) => {
    let [isModalOpened, setIsModalOpened] = useState(false);
    let [isPopoverOpened, setPopoverOpened] = useState(false);
    return (
        <div>
            {props.phone ? <div>You are logged in {props.phone}</div> : <div>You are not logged in, please log in!</div>}
            <button onClick={() => {setIsModalOpened(true)}}>openModal</button>
            <WithModal visible={isModalOpened} onHide={() => {setIsModalOpened(false)}}>
                <h1>asd</h1>
            </WithModal>
            <Popover visible={isPopoverOpened} content={<span>POPOVER</span>}>
                <button onClick={ () => {setPopoverOpened(true)} }>popopver</button>
            </Popover>
        </div>
    )
};

const mapStateToProps = (state: any) => {
    return {
        firstName: state.auth.userData.firstName,
        phone: state.auth.userData.phone
    }
};

export default connect(mapStateToProps,{})(ProfilePage);