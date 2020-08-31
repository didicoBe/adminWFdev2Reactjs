import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "./components/pages/login";
import Dash from "./components/pages/dash";




const Routes = ()=>(
    <div>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route path="/dash" component={Dash}></Route> 
            </Switch>
        </BrowserRouter>
    </div>
);



export default Routes;