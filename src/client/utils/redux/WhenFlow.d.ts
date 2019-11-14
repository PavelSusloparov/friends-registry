import { MaybeFunction } from "./MaybeFunction";
import * as React from "react";
import { FlowStep } from "./ReduxHelpers";
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
export declare type WhenFlowProps = WhenFlowEquals | WhenFlowNotEquals;
export declare const WhenFlow: React.MemoExoticComponent<(props: WhenFlowProps) => JSX.Element>;
export {};
