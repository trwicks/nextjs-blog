import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from '@aws-cdk/aws-s3';
import * as s3Deployment from '@aws-cdk/aws-s3-deployment'
import * as route53 from 'aws-cdk-lib/aws-route53'

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    

    const hostedZone = new route53.PublicHostedZone(this, 'PublicHostedZone', {
      zoneName: 'timw.',
    })
    // The code that defines your bucket s3
    const bucketName = "blog-timw-codes"
    const myBucket = new s3.Bucket(this, bucketName, {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,        
      websiteIndexDocument: "index.html"
    });

      // The code that defines your deployment
    const deployment = new s3Deployment.BucketDeployment(this, "deployStaticWebsite", {
        sources: [s3Deployment.Source.asset("../app/out")],
        destinationBucket: myBucket
    });
  }
}
