import React from 'react';
import {componentErrorLogger} from "../utils/errorLogger";


const MISSING_ERROR = 'Error was swallowed during propagation.';

export const withErrorBoundary = <BaseProps extends {}>(
    BaseComponent: React.ComponentType<BaseProps>
) => {
    type HocProps = {
        // here you can extend hoc with new props
    };
    type HocState = {
        readonly error: Error | null | undefined;
    };

    return class Hoc extends React.Component<HocProps, HocState> {

        // Enhance component name for debugging and React-Dev-Tools
        static displayName = `withErrorBoundary(${BaseComponent.name})`;


        // reference to original wrapped component
        static readonly WrappedComponent = BaseComponent;

        readonly state: HocState = {
            error: undefined,
        };

        componentDidCatch(error: Error | null, info: object) {
            this.setState({error: error || new Error(MISSING_ERROR)});
            this.logErrorToCloud(error, info);
        }

        logErrorToCloud = (error: Error | null, info: object) => {
            componentErrorLogger(error);
            console.log(info);
            // TODO: send error report to service provider
        };

        render() {
            const {children, ...restProps} = this.props;
            const {error} = this.state;

            if (error) {
                return <BaseComponent {...(restProps as BaseProps)} />;
            } else
            return children;
        }
    };
};