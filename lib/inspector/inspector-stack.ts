import {  aws_inspector, Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {InspectorProps} from "../../interfaces/lib/inspector/interfaces";

export class InspectorStack extends Stack {

  constructor(scope: Construct, id: string, props?: InspectorProps) {
    super(scope, id, props);
    const cfnAssessmentTarget = new aws_inspector.CfnAssessmentTarget(this, 'MyCfnAssessmentTarget', /* all optional props */ {
      assessmentTargetName: props?.assessmentName,
    });
  }
}