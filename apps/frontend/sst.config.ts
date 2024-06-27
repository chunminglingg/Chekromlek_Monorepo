import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import { HostedZone, IHostedZone } from "aws-cdk-lib/aws-route53";
import { Certificate, ICertificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";

const ROOT_DOMAIN_NAME = "chekromlek.com";
const DOMAIN_NAME = `${ROOT_DOMAIN_NAME}`;

export default {
  config(_input) {
    return {
      name: "chekromlek",
      region: "us-east-1",
      requestTimeout: 70000
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const hostedZone: IHostedZone = HostedZone.fromLookup(stack, "HostedZone", {
        domainName: ROOT_DOMAIN_NAME,
      });

      const certificate: ICertificate = new Certificate(stack, "Certificate", {
        domainName: DOMAIN_NAME,
        subjectAlternativeNames: [`www.${DOMAIN_NAME}`],
        validation: CertificateValidation.fromDns(hostedZone),
      });

      const site = new NextjsSite(stack, "NextJS", {
        customDomain: {
          domainName: DOMAIN_NAME,
          domainAlias: `www.${DOMAIN_NAME}`,
          cdk: {
            hostedZone,
            certificate,
          },
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
