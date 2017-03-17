import ConfigsPage from './views/configs-view';
import SettingsPage from './views/settings-view';

const routes = [
  /*{
    path: '/',
    exact: true,
    component: ConfigsPage
  },*/
  {
    path: '/configs',
    component: ConfigsPage
  },
  {
    path: '/settings',
    component: SettingsPage
  }
]

export default routes;