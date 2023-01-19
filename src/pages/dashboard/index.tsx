import { DashboardView } from '../../views/dashboard/Dashboard'
import { DashboardLayout } from '../../views/dashboard/Layout';
import type { TCustomPage } from '../_app';

const DashboardPage: TCustomPage = () => {
  return (
    <>
      <DashboardView />
    </>
  )
}

DashboardPage.Layout = DashboardLayout

export default DashboardPage;
