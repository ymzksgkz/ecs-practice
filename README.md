CDK を使うのが初めての場合、初回に必要なコマンド
zenn の記事を参考にしたので、初回〜デプロイまでに必要なコマンドは下記参照のこと
https://zenn.dev/hirokisakabe/articles/73d7d30a0e2ec8

**スタック名**: EcsPracticeStack

テンプレートを作成する時引数に vpcId を渡す必要がある
```shell
$ cdk synth -c vpcId=<デプロイする VPC の ID>
```

デプロイ
```shell
$ cdk deploy EcsPracticeStack
```

お片付け
```shell
$ cdk destroy EcsPracticeStack
```

以下 CDK デフォルトの文言

--- 

# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template
