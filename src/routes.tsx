import { Route, BrowserRouter } from 'react-router-dom';

import { Home } from './Home';
import { Task } from './Task';

const Routes = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/:slug" component={Task} />
    </BrowserRouter>
  );
};

export default Routes;
