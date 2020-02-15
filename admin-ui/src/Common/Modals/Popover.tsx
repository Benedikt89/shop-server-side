import React, {ReactNode} from "react";
import Popover from "react-bootstrap/Popover";

interface I_Props {
    visible: boolean
    content: React.ReactNode
    children?: ReactNode
    color?: string
}

const WithPopover: React.FC<I_Props> = ({visible, content, children, color}: I_Props) => {
    return (
        <Popover id="popover-basic">
            <Popover.Title as="h3">Popover right</Popover.Title>
            <Popover.Content>
                {children}
            </Popover.Content>
        </Popover>
    )
};
export default WithPopover;
