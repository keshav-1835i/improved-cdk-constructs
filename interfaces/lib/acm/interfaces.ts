export interface ACMStackProps {
  stackName: string;
  stackDescription: string;

  acms?: ACMProps[];

  cdnAcms?: string[]
}

export interface ACMProps {
  name: string;
  certificateName: string;
  subjectAlternativeDomainNames: string[];
  hostedZoneDomainName: string
  global: boolean
}