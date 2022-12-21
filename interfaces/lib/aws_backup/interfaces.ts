export interface BackupStackProps {
  stackName: string;
  backups: BackupStack[];
}

export interface BackupStack {
  name: string;
  rule_schedule: string;
}