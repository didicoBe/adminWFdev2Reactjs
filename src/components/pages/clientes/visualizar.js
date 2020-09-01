import React, { Component } from 'react';
import Sidebar from "../../sidebar";
import {Container, ListGroup, Row, Col,InputGroup,FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer } from "react-toastify";
//filtro
import SearchResults from 'react-filter-search';

import  api from "../../../api";

class ClienteVisualizar extends Component {
    state={
        nome:'',
        id:'',
        data:[],
        projetos:[],
        value:''
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };

    pegaProjetos = (idcliente)=>{
        api.get('/projeto/'+idcliente).then(response=>{
            this.setState({
                projetos:response.data
            })
           
        }).catch((erro)=>{
           console.log("erro ao pegar projetos")
        })
    }

    pegadadosCliente = (id)=>{
        api.get('/cliente/'+id).then(response=>{
            this.setState({
                data:response.data[0]
            })
            return  true
        }).catch((erro)=>{
            return false
        })
    }

    componentDidMount(){
        const id  = this.props.match.params.id
        this.setState({
            id:id
        })
        this.pegadadosCliente(id)
        this.pegaProjetos(id)
    }


    render() {
        return (
            <Container fluid>
            <ToastContainer/>
                <Row>
                    <Sidebar/>
                    <Col md={9}>
                        <div className="TituloPAgina">{this.state.data.nomeFantasia}</div>
                        <div className="barra">
                            <div>Dados complementares</div>
                            <div><Link to="/clientes" className="btnWFPadrao">Voltar</Link></div>
                        </div>
                        <Row>
                            <Col md={12}>
                                <div className="CartaoCorpo">
                                    <Row>
                                        <Col md={3}>
                                            <div className="boxDadosCliente">
                                                <div style={{fontSize:30}}>Contato</div>
                                                <div>{this.state.data.nomeResponsavel}</div>
                                                <div>{this.state.data.emailResponsavel}</div>
                                                <div>{this.state.data.telefoneResponsavel}</div>
                                                <div>{this.state.data.celular}</div>
                                                <div>{this.state.data.cpfResponsavel}</div>
                                            </div>
                                        </Col>
                                        <Col md={9}>
                                            <div className="boxDadosEmpresa">
                                                <div>CNPJ: {this.state.data.cnpj}</div>
                                                <div>Razão Social: {this.state.data.razaoSocial}</div>
                                            </div>
                                            <div className="TituloForm">
                                                Endereço
                                            </div>
                                            <div style={{display:'flex', justifyContent:'space-between',color:'#da50d5',fontSize:20}}>
                                                <div>{this.state.data.rua}</div>
                                                <div>{this.state.data.numero}</div>
                                                <div>{this.state.data.bairro}</div>
                                            </div>
                                            <div style={{display:'flex', justifyContent:'space-between',color:'#da50d5',fontSize:20}}>
                                                <div>{this.state.data.cep}</div>
                                                <div>{this.state.data.cidade}</div>
                                                <div>{this.state.data.estado}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>  
                        <div className="barra" style={{marginTop:20}}>
                            <div>Projetos</div>
                            <div><Link to={"/clientecadastrarproj/" + this.state.id} className="btnWFPadrao">Cadastrar Novo</Link></div>
                        </div>
                        <Row>
                            <Col md={12}>
                               
                                <div className="CartaoCorpo">
                                    <div>
                                        <InputGroup className="col-md-2 float-right">
                                            <FormControl
                                                placeholder="Pesquisa"
                                                aria-label="Pesquisa"
                                                aria-describedby="basic-addon2"
                                                value={this.state.value} onChange={this.handleChange}
                                                style={{borderRadius:'15px 0px 0px 15px', border:'1px solid #da50d5',borderRight:'0px'}}
                                            />
                                            <InputGroup.Append>
                                                <InputGroup.Text id="basic-addon2" style={{backgroundColor:'#fff',border:'1px solid #da50d5',borderRadius:'0px 15px 15px 0px',borderLeft:'0px'}}>
                                                    <FontAwesomeIcon icon={faSearch} color="#7b347f" style={{marginRight:10}}/>
                                                </InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </div>
                                    <div className="segundaBarraCartao">
                                            <div>Nome</div>
                                            <div>Visualizar</div>
                                        </div>
                                    <div className="lista">
                                        <SearchResults
                                            value={this.state.value}
                                            data={this.state.projetos}
                                            renderResults={results => (
                                                <div>
                                                {results.map(el => (
                                                    <ListGroup.Item key={el.id}>
                                                        <div style={{display:'flex',justifyContent:'space-between'}}>
                                                            <div>{el.nome}</div>
                                                            
                                                            <Link className="btnWFPadrao" style={{fontSize:20}} to={'/clientevisualizaproj/'+el.id+'/'+this.state.id}>visualizar</Link>
                                                            
                                                            
                                                        </div>
                                                        
                                                    </ListGroup.Item>
                                                ))}
                                                </div>
                                            )}
                                        />
                                    </div>
                                </div>
                            </Col>
                        </Row>                       
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default ClienteVisualizar;