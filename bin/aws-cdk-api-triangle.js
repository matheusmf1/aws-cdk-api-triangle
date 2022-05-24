#!/usr/bin/env node
const cdk = require('aws-cdk-lib');
const { AwsCdkApiTriangleStack } = require('../lib/aws-cdk-api-triangle-stack');

const app = new cdk.App();
new AwsCdkApiTriangleStack(app, 'AwsCdkApiTriangleStack');
