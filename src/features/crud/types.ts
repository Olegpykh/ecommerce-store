export type CrudResult =
  | { id: number; title: string }
  | { id: number; isDeleted: boolean; deletedOn: string };
