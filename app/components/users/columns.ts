import type { UserInfoType } from '@/schemas/user.schema';

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  widthClass?: string;
  render?: (row: T) => string | number | boolean | null | undefined | any;
}

export const userColumns: TableColumn<UserInfoType>[] = [
  {
    key: 'userNo',
    header: 'ID',
    widthClass: 'w-[180px]',
  },
  {
    key: 'userNm',
    header: 'Name',
    widthClass: 'w-[160px]',
  },
  {
    key: 'emlAddr',
    header: 'Email',
    widthClass: 'w-[240px]',
  },
  {
    key: 'actions',
    header: 'Actions',
    render: (row) => ({
      to: `/users/${row.userNo}`,
      label: 'View',
    }),
  },
];
