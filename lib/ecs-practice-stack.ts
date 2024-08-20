import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";

export class EcsPracticeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, {
      env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
      },
      ...props,
    });


    const vpcId = this.node.tryGetContext("vpcId");
    const vpc = ec2.Vpc.fromLookup(this, "DefaultVPC", { vpcId: vpcId });
    const cluster = new ecs.Cluster(this, "Cluster", { vpc });

    // VPCエンドポイントを追加
    new ec2.InterfaceVpcEndpoint(this, "EcrApiEndpoint", {
      vpc,
      service: ec2.InterfaceVpcEndpointAwsService.ECR,
    });

    new ec2.InterfaceVpcEndpoint(this, "EcrDkrEndpoint", {
      vpc,
      service: ec2.InterfaceVpcEndpointAwsService.ECR_DOCKER,
    });

    new ec2.GatewayVpcEndpoint(this, "S3Endpoint", {
      vpc,
      service: ec2.GatewayVpcEndpointAwsService.S3,
    });

    new ec2.InterfaceVpcEndpoint(this, 'CloudWatchLogsEndpoint', {
      vpc,
      service: ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_LOGS,
    });

    const repository = ecr.Repository.fromRepositoryName(
      this,
      "EcsPractice",
      "ecs-practice"
    );

    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "FargateService",
      {
        cluster,
        taskImageOptions: {
          image: ecs.ContainerImage.fromEcrRepository(repository),
        },
        runtimePlatform: {
          cpuArchitecture: ecs.CpuArchitecture.ARM64
        },
        publicLoadBalancer: true,
      }
    );
  }
}
