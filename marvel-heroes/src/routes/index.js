import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import ViewProfile from '../pages/Profile/ViewProfile';
import CreateProfile from '../pages/Profile/CreateProfile';
import EditProfile from '../pages/Profile/EditProfile';
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
        <Route path="/heroes/:id" exact component={HeroDetail} />
        <Route path="/login" exact component={Login} />
        <Route path="/profile" exact component={ViewProfile} />
        <Route path="/profile/create" exact component={CreateProfile} />
        <Route path="/profile/edit" exact component={EditProfile} />
    </Switch>
);

export default Routes;