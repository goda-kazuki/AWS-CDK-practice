import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'

export class AwsCdkStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        console.log(lambda.Code.fromAsset('lambda'));

        const helloLambda = new lambda.Function(this, 'HelloHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hello.handler'
        });
        const sampleApiGateway = new apigw.LambdaRestApi(this, 'Endpoint', {
            handler: helloLambda
        })
        console.log(sampleApiGateway);
    }
}
