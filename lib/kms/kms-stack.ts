import * as kms from 'aws-cdk-lib/aws-kms';
import { Stack, StackProps, aws_ssm, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class KmsStack extends Stack {
  encryptionKey: kms.Key
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.encryptionKey = new kms.Key(this, 'Key', {
      enableKeyRotation: true,
    });

    new aws_ssm.StringParameter(this, 'CMKKeyArn', {
      stringValue: this.encryptionKey.keyArn,
      parameterName: "/kms/cmkKeyArn",
    });
    new aws_ssm.StringParameter(this, 'CMKKeyId', {
      stringValue: this.encryptionKey.keyId,
      parameterName: "/kms/CmkKeyId",
    });

    new CfnOutput(this, 'key-arn', {
      value: this.encryptionKey.keyArn,
      exportName: 'keyArn'
    });
  }
  getKey():kms.Key{ // Export the key to be used by other stacks
    return this.encryptionKey
  }
}


