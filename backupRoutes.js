import NotFound from './NotFound/NotFound';
import Login from './Login/Login';
import Stacks from './Stack/Stack';
import Dashboard from './Dashboard/Dashboard';
import ContentType from './ContentType/ContentType';
import Entries from './Entries/Entries';
import EntriesEdit from './EntriesEdit/EntriesEdit';
import EntryCreate from './EntryCreate/EntryCreate';
import Assets from './Assets/Assets';
import PublishQueue from './PublishQueue/PublishQueue';
import Releases from './Releases/Releases';
import Index from './Index/Index';
import alreadyLoggedIn from '../Middleware/alreadyLoggedIn';
import validStackId from '../Middleware/validStackId';
import validContentType from '../Middleware/validContentType';
import validEntryId from '../Middleware/validEntryId';
import GeneralComponent from './GeneralComponent/GeneralComponent';

const routes = [
  {
    path:'/login/*',
    component:NotFound,
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/',
    component: Index,
    middleware:[alreadyLoggedIn],
    redirect:"/login",
    routes: [
      {
        path:'/stacks/*',
        component:NotFound
      },
      {
        path:'/stacks',
        component:Stacks,
      },
      {
        path:'/stack',
        component:GeneralComponent,
        routes:[
          {
            path: `/stack/:id/dashboard`,
            component: Dashboard,
            middleware: [validStackId],
            redirect: '/stacks',
            routes: [
              {
                path: `/stack/:id/dashboard/*`,
                component: NotFound,
              },
            ],
          },
          {
            path: `/stack/:id/content-types`,
            component: ContentType,
            middleware: [validStackId],
            redirect: '/stacks',
            routes: [
              {
                path: `/stack/:id/content-types/:id/en-us/entries`,
                component: Entries,
                middleware: [validContentType],
                redirect: '/stacks',
                routes: [
                  {
                    path: `/stack/:id/content-types/:id/en-us/entries/*`,
                    component: NotFound,
                  },
                ],
              },
              {
                path: `/stack/:id/content-types/:id/en-us/entry/:id/edit`,
                component: EntriesEdit,
                middleware: [validContentType, validEntryId],
                redirect: '/stacks',
                routes: [
                  {
                    path: `/stack/:id/content-types/:id/en-us/entry/:id/edit/*`,
                    component: NotFound,
                  },
                ],
              },
              {
                path: `/stack/:id/content-types/:id/en-us/entry/create`,
                component: EntryCreate,
                middleware: [validContentType],
                redirect: '/stacks',
                routes: [
                  {
                    path: `/stack/:id/content-types/:id/en-us/entry/create/*`,
                    component: NotFound,
                  },
                ],
              },
              {
                path: `/stack/:id/content-types/*`,
                component: NotFound,
              },
              {
                path: `/login`,
                component: Login,
              },
            ],
          },
          {
            path: `/stack/:id/assets`,
            component: Assets,
            middleware: [validStackId],
            redirect: '/stacks',
            routes: [
              {
                path: `/stack/:id/assets/*`,
                component: NotFound,
              },
            ],
          },
          {
            path: `/stack/:id/publish-queue`,
            component: PublishQueue,
            middleware: [validStackId],
            redirect: '/stacks',
            routes: [
              {
                path: `/stack/:id/publish-queue/*`,
                component: NotFound,
              },
            ],
          },
          {
            path: `/stack/:id/releases/list`,
            component: Releases,
            middleware: [validStackId],
            redirect: '/stacks',
            routes: [
              {
                path: `/stack/:id/releases/list/*`,
                component: NotFound,
              },
            ],
          },
          {
            path: `/stack/*`,
            component: NotFound,
          },
        ]
      },
      {
        path: `/login`,
        component: Login,
      },
      {
        path:`/*`,
        component:NotFound,
      },
    ],
  },
];
console.log("from routes file");
export default routes;