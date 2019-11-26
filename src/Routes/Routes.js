import NotFound from '../Component/NotFound/NotFound';
import Index from '../Component/Index/Index';
import Login from '../Component/Login/Login';
import Stacks from '../Component/Stack/Stack';
import Dashboard from '../Component/Dashboard/Dashboard';
import ContentType from '../Component/ContentType/ContentType';
import ContentTypes from '../Component/ContentTypes/ContentTypes';
import Entries from '../Component/Entries/Entries';
import EntriesEdit from '../Component/EntriesEdit/EntriesEdit';
import EntryCreate from '../Component/EntryCreate/EntryCreate';
import Assets from '../Component/Assets/Assets';
import PublishQueue from '../Component/PublishQueue/PublishQueue';
import Releases from '../Component/Releases/Releases';
import alreadyLoggedIn from '../Middleware/alreadyLoggedIn';
import validStackId from '../Middleware/validStackId';
import validContentType from '../Middleware/validContentType';
import validEntryId from '../Middleware/validEntryId';
import GeneralComponent from '../Component/GeneralComponent/GeneralComponent';

const routes = [
  {
    path:"/login/*",
    component:NotFound,
    middleware: [],
    redirect: '',
    routes: [],
    resolveAll:true,
  },
  {
    path: '/login',
    component: Login,
    middleware: [],
    redirect: '',
    routes: [],
    resolveAll:true,
  },
  {
    path:"/stacks/*",
    component:NotFound,
    middleware: [],
    redirect: '',
    routes: [],
    resolveAll:true,
  },
  {
    path: '/stacks',
    component: Stacks,
    middleware: [alreadyLoggedIn],
    redirect: '/login',
    routes: [],
    resolveAll:true,
  },
  {
    path: '/stack/:id',
    component: GeneralComponent,
    middleware: [alreadyLoggedIn],
    redirect: '/stacks',
    routes: [
      {
        path: '/stack/:id/dashboard/*',
        component: NotFound,
        middleware: [],
        redirect: '',
        routes: [],
        resolveAll:true,
      },
      {
        path: '/stack/:id/dashboard',
        component: Dashboard,
        middleware: [validStackId],
        redirect: '',
        routes: [],
        resolveAll:true,
      },
      {
        path: '/stack/:id/content-types/*',
        component: NotFound,
        middleware: [],
        redirect: '',
        routes: [],
        resolveAll:true,
      },
      {
        path: '/stack/:id/content-types',
        component: ContentTypes,
        middleware: [validStackId],
        redirect: '',
        routes: [],
        resolveAll:true,
      },
      {
        path: '/stack/:id/content-type/:id/en-us',
        component: ContentType,
        middleware: [validStackId,validContentType],
        redirect: '',
        routes: [
          {
            path: '/stack/:id/content-type/:id/en-us/entries/*',
            component: NotFound,
            middleware: [],
            redirect: '',
            routes: [],
            resolveAll:true,
          },
          {
            path: '/stack/:id/content-type/:id/en-us/entries',
            component: Entries,
            middleware: [],
            redirect: '',
            routes: [],
            resolveAll:true,
          },
          {
            path: '/stack/:id/content-type/:id/en-us/entry/:id/edit/*',
            component: NotFound,
            middleware: [],
            redirect: '',
            routes: [],
            resolveAll:true,
          },
          {
            path: '/stack/:id/content-type/:id/en-us/entry/:id/edit',
            component: EntriesEdit,
            middleware: [validEntryId],
            redirect: '',
            routes: [],
            resolveAll:true,
          },
          {
            path: '/stack/:id/content-type/:id/en-us/entry/create/*',
            component: NotFound,
            middleware: [],
            redirect: '',
            routes: [],
            resolveAll:true,
          },
          {
            path: '/stack/:id/content-type/:id/en-us/entry/create',
            component: EntryCreate,
            middleware: [],
            redirect: '',
            routes: [],
            resolveAll:true,
          },
        ],
        resolveAll:true,
      },
      {
        path: '/stack/:id/content-type/:id/en-us/*',
        component: NotFound,
        middleware: [],
        redirect: '',
        routes: [],
        resolveAll:true,
      },
      {
        path: '/stack/:id/assets/*',
        component: NotFound,
        middleware: [],
        redirect: '',
        routes: [],
        resolveAll:true,
      },
      {
        path: '/stack/:id/assets',
        component: Assets,
        middleware: [],
        redirect: '',
        routes: [],
        resolveAll:true,
      },
      {
        path: '/stack/:id/publish-queue/*',
        component: NotFound,
        middleware: [],
        redirect: '',
        routes: [],
        resolveAll:true,
      },
      {
        path: '/stack/:id/publish-queue',
        component: PublishQueue,
        middleware: [],
        redirect: '',
        routes: [],
        resolveAll:true,
      },
      {
        path: '/stack/:id/releases/list/*',
        component: NotFound,
        middleware: [],
        redirect: '',
        routes: [],
        resolveAll:true,
      },
      {
        path: '/stack/:id/releases/list',
        component: Releases,
        middleware: [],
        redirect: '',
        routes: [],
        resolveAll:true,
      },{
        path:"/stack/*",
        component:NotFound,
        middleware: [],
        redirect: '',
        routes: [],
        resolveAll:true,
      },
    ],
    resolveAll:true,
  },
  {
    path:"/stack/*",
    component:NotFound,
    middleware: [],
    redirect: '',
    routes: [],
    resolveAll:true,
  },
  {
    path:"/*",
    component:NotFound,
    middleware:[],
    redirect:'',
    routes:[],
    resolveAll:true,
  },
  {
    path:"/",
    component:Index,
    middleware:[],
    redirect:'',
    routes:[],
    resolveAll:true,
  },
];
export default routes;
