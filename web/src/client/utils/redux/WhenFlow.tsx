import {getValue, MaybeFunction} from "./MaybeFunction";
import * as React from "react";
import {Fragment} from "react";
import {FlowStep} from "./ReduxHelpers";

export interface WhenFlowChildFunctionArgs {
    isMatch: boolean;
}

interface WhenFlowBaseProps {
    children: MaybeFunction<any, WhenFlowChildFunctionArgs>;
    flow: FlowStep;
}

interface WhenFlowEquals extends WhenFlowBaseProps {
    equals: FlowStep;
}

interface WhenFlowNotEquals extends WhenFlowBaseProps {
    notEquals: FlowStep;
}

export type WhenFlowProps = WhenFlowEquals | WhenFlowNotEquals;

const WhenFlowBase = (props: WhenFlowProps) => {
    let isMatch: boolean;

    if ("equals" in props) {
        isMatch = props.flow === props.equals;
    } else {
        isMatch = props.flow !== props.notEquals;
    }

    const children: React.ReactElement = getValue(props.children, {isMatch});

    if (typeof props.children === "function") {
        if (children) {
            return <Fragment>{children}</Fragment>;
        }

        return null;
    }

    if (!isMatch) {
        return null;
    }

    return <Fragment>{children}</Fragment>;
};

export const WhenFlow = React.memo(WhenFlowBase);
