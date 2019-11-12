import NotFound from './NotFound/NotFound';
import Login from './Login/Login';
import Stacks from './Stack/Stack';
import Dashboard from './Dashboard/Dashboard';
import ContentType from './ContentType/ContentType';
import ContentTypes from './ContentTypes/ContentTypes';
import Entries from './Entries/Entries';
import EntriesEdit from './EntriesEdit/EntriesEdit';
import EntryCreate from './EntryCreate/EntryCreate';
import Assets from './Assets/Assets';
import PublishQueue from './PublishQueue/PublishQueue';
import Releases from './Releases/Releases';
import alreadyLoggedIn from '../Middleware/alreadyLoggedIn';
import validStackId from '../Middleware/validStackId';
import validContentType from '../Middleware/validContentType';
import validEntryId from '../Middleware/validEntryId';
import GeneralComponent from './GeneralComponent/GeneralComponent';

const routes = [
  {
    path:"/login/*",
    component:NotFound,
    middleware: [],
    redirect: '',
    routes: [],
  },
  {
    path: '/login',
    component: Login,
    middleware: [],
    redirect: '',
    routes: [],
  },
  {
    path:"/stacks/*",
    component:NotFound,
    middleware: [],
    redirect: '',
    routes: [],
  },
  {
    path: '/stacks',
    component: Stacks,
    middleware: [alreadyLoggedIn],
    redirect: '/login',
    routes: [],
  },
  {
    path: '/stack',
    component: GeneralComponent,
    middleware: [alreadyLoggedIn, validStackId],
    redirect: '/stacks',
    routes: [
      {
        path: '/stack/:id/dashboard/*',
        component: NotFound,
        middleware: [],
        redirect: '',
        routes: [],
      },
      {
        path: '/stack/:id/dashboard',
        component: Dashboard,
        middleware: [],
        redirect: '',
        routes: [],
      },
      {
        path: '/stack/:id/content-types/*',
        component: NotFound,
        middleware: [],
        redirect: '',
        routes: [],
      },
      {
        path: '/stack/:id/content-types',
        component: ContentTypes,
        middleware: [],
        redirect: '',
        routes: [],
      },
      {
        path: '/stack/:id/content-type/:id/en-us',
        component: ContentType,
        middleware: [validContentType],
        redirect: '/stacks',
        routes: [
          {
            path: '/stack/:id/content-type/:id/en-us/entries/*',
            component: NotFound,
            middleware: [],
            redirect: '',
            routes: [],
          },
          {
            path: '/stack/:id/content-type/:id/en-us/entries',
            component: Entries,
            middleware: [],
            redirect: '',
            routes: [],
          },
          {
            path: '/stack/:id/content-type/:id/en-us/entry/:id/edit/*',
            component: NotFound,
            middleware: [],
            redirect: '',
            routes: [],
          },
          {
            path: '/stack/:id/content-type/:id/en-us/entry/:id/edit',
            component: EntriesEdit,
            middleware: [validEntryId],
            redirect: '/stacks',
            routes: [],
          },
          {
            path: '/stack/:id/content-type/:id/en-us/entry/create/*',
            component: NotFound,
            middleware: [],
            redirect: '',
            routes: [],
          },
          {
            path: '/stack/:id/content-type/:id/en-us/entry/create',
            component: EntryCreate,
            middleware: [],
            redirect: '',
            routes: [],
          },
        ],
      },
      {
        path: '/stack/:id/content-type/:id/en-us/*',
        component: NotFound,
        middleware: [],
        redirect: '',
        routes: [],
      },
      {
        path: '/stack/:id/assets/*',
        component: NotFound,
        middleware: [],
        redirect: '',
        routes: [],
      },
      {
        path: '/stack/:id/assets',
        component: Assets,
        middleware: [],
        redirect: '',
        routes: [],
      },
      {
        path: '/stack/:id/publish-queue/*',
        component: NotFound,
        middleware: [],
        redirect: '',
        routes: [],
      },
      {
        path: '/stack/:id/publish-queue',
        component: PublishQueue,
        middleware: [],
        redirect: '',
        routes: [],
      },
      {
        path: '/stack/:id/releases/list/*',
        component: NotFound,
        middleware: [],
        redirect: '',
        routes: [],
      },
      {
        path: '/stack/:id/releases/list',
        component: Releases,
        middleware: [],
        redirect: '',
        routes: [],
      },
    ],
  },
  {
    path:"/stack/*",
    component:NotFound,
    middleware: [],
    redirect: '',
    routes: [],
  },
  {
    path:"/*",
    component:NotFound,
    middleware:[],
    redirect:'',
    routes:[],
  }
];
export default routes;
