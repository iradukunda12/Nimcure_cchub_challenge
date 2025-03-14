export interface Column {
  key: string;
  header: string;
}

export interface TableProps<T extends { [key: string]: string | undefined; hospital_id?: string }> {
  readonly columns: Column[];
  readonly data: T[];
}