import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as apigw from 'aws-cdk-lib/aws-apigateway'
import {HitCounter} from "./hitcounter";
import {TableViewer} from "cdk-dynamo-table-viewer";


export class AwsCdkStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const helloLambda = new lambda.Function(this, 'HelloHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('lambda'),
            handler: 'hello.handler'
        });

        const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
            downstream: helloLambda
        })

        new apigw.LambdaRestApi(this, 'Endpoint', {
            handler: helloWithCounter.handler
        });

        new TableViewer(this, 'ViewHitCounter', {
            title: 'Hello Hits',
            table: helloWithCounter.table,
            sortBy: '-hits'
        })


        console.log(lambda.Code.fromAsset('lambda'));
    }
}
