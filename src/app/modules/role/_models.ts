export interface IRole {
  id?: string | undefined;
  name: string | undefined;
  description?: string | undefined;
  concurrencyStamp?: string | null;
}
