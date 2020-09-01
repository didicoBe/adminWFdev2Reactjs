import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from "./components/pages/login";
import Dash from "./components/pages/dash";
import Clientes from "./components/pages/clientes";
import NovoCliente from "./components/pages/clientes/novo";
import ClienteVisualizar from "./components/pages/clientes/visualizar";
import Clientevisualizaproj from "./components/pages/clientes/visualizaproj";
import Clientecadastrarproj from "./components/pages/clientes/cadastrarproj";
import Orcamento from "./components/pages/orcamento";
import OrcamentoNovo from "./components/pages/orcamento/novo";
import OrcamentoVisualizar from "./components/pages/orcamento/visualizar";
import Suporte from "./components/pages/suporte";
import SuporteFinalizado from "./components/pages/suporte/finalizados";






const Routes = ()=>(
    <div>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}></Route>
                <Route path="/dash" component={Dash}></Route> 
                <Route path="/clientes" component={Clientes}></Route>
                <Route path="/novocliente" component={NovoCliente}></Route>
                <Route path="/clientevisualizar/:id" component={ClienteVisualizar}></Route>
                <Route path="/clientevisualizaproj/:id/:idcli" component={Clientevisualizaproj}></Route>
                <Route path="/clientecadastrarproj/:id" component={Clientecadastrarproj}></Route>
                <Route path="/orcamento" component={Orcamento}></Route>
                <Route path="/orcamentonovo" component={OrcamentoNovo}></Route>
                <Route path="/orcamentovisualizar/:id" component={OrcamentoVisualizar}></Route>
                <Route path="/suporte" component={Suporte}></Route>
                <Route path="/suportefinalizado" component={SuporteFinalizado}></Route>
                
            </Switch>
        </BrowserRouter>
    </div>
);



export default Routes;