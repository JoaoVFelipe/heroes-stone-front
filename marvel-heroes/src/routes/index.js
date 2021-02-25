import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import HeroesList from '../pages/Heroes/HeroesList';
import HeroDetail from '../pages/Heroes/HeroDetail';
import ComicsList from '../pages/Comics/ComicsList';
import ComicDetail from '../pages/Comics/ComicDetail';

const Routes = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/comics" exact component={ComicsList} />
        <Route path="/comics/:id" exact component={ComicDetail} />
        <Route path="/heroes" exact component={HeroesList} />
        <Route path="/heroes/:id" component={HeroDetail} />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
    </Switch>
);

export default Routes;