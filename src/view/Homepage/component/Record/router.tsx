import { IRouter } from '@routers/interface';

export const routerRecord: IRouter = {
  path: '/record',
  loader: import('./index'),
  exact: true,
  name: 'record.name', //translate here for breadcrumb and sidebar
};
