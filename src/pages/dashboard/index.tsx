import { DashboardIndexLayout } from '../../views/dashboard/index/_layout';
import { DashboardIndexView } from '../../views/dashboard/index/_view';
import type { TCustomPage } from '../_app';

const DashboardIndexPage: TCustomPage = () => {
  return (
    <>
      <DashboardIndexView />
    </>
  )
}

DashboardIndexPage.Layout = DashboardIndexLayout

export default DashboardIndexPage;
