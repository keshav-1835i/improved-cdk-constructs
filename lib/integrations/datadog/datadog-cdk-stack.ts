import { Stack } from "aws-cdk-lib";
import { Secret } from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";
import { Datadog } from "datadog-cdk-constructs-v2";
import { DatadogStackProps } from "../../../interfaces/lib/integrations/datadog/intefaces";

type DatadogStackPropsWithDefaults = Required<Pick<DatadogStackProps, "nodeLayerVersion" | "pythonLayerVersion" | "enableDatadogTracing" |
    "flushMetricsToLogs" | "site" | "datadogEnv" | "datadogTags">> & Partial<Pick<DatadogStackProps, "apiKeySecretArn">>;

function applyDefaultsToProps(props: DatadogStackProps): DatadogStackPropsWithDefaults {
    return Object.assign({}, props, {
        "nodeLayerVersion": 78,
        "pythonLayerVersion": 58,
        "extensionLayerVersion": 22,
        "enableDatadogTracing": true,
        "flushMetricsToLogs": true,
        "site": "datadoghq.com",
        "datadogEnv": "",
        "service": "",
        "datadogTags": ""
    })
}

export class DatadogStack extends Stack {

    datadogCDK: Datadog

    constructor(scope: Construct, id: string, props?: DatadogStackProps) {
        super(scope, id, props);

        const apiKeySecret = props!.apiKeySecret || "/account/datadog/api-key";

        const propsWDefaults: DatadogStackPropsWithDefaults = applyDefaultsToProps(props!)
        propsWDefaults.apiKeySecretArn = Secret.fromSecretNameV2(this, 'APIKeySecret', apiKeySecret).secretFullArn

        this.datadogCDK = new Datadog(this, "DatadogIntegration", propsWDefaults);

        // datadogCDK.addLambdaFunctions([f])
    }
}