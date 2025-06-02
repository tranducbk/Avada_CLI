import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '@assets/loadables/Home/Home';
import NotFound from '@assets/loadables/NotFound/NotFound';
import Samples from '@assets/loadables/Samples/Samples';
import Settings from '@assets/loadables/Settings/Settings';
import OptionalScopes from '@assets/loadables/OptionalScopes/OptionalScopes';
import {routePrefix} from '@assets/config/app';
import Loading from '@assets/components/Loading';
import Tables from '@assets/loadables/Tables/Tables';

const FullscreenPageA = React.lazy(() => import('../pages/FullscreenPageA'));

// eslint-disable-next-line react/prop-types
const Routes = ({prefix = routePrefix}) => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route exact path={prefix + '/'} component={Home} />
      <Route exact path={prefix + '/samples'} component={Samples} />
      <Route exact path={prefix + '/settings'} component={Settings} />
      <Route exact path={prefix + '/fullscreen-page-a'} component={FullscreenPageA} />
      <Route exact path={prefix + '/optional-scopes'} component={OptionalScopes} />
      <Route exact path={prefix + '/tables'} component={Tables} />
      <Route exact path={prefix + '/tables/:tab(simple|action)'} component={Tables} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
