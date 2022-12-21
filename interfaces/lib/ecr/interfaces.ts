export interface ECRCfg {
    stackName: string;
    stackDescription: string;

    repos: ECRRepo[]

    existingRepos: ECRRepo[]
}

export interface ECRRepo {
    repositoryName: string;
    rules?: ECRRule[];
    lambdaContainer?: boolean;
    allowAccountAccess: string[];
    scanOnPush?: boolean;
}

export interface ECRRule {
    tagPrefix: string[];
    maxAge: number;
    maxImageCount: number;
}