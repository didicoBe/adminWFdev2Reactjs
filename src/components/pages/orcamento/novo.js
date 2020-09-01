import React, { Component } from 'react';
import Sidebar from "../../sidebar";
import {Container, Row, Col,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer ,toast } from "react-toastify";

import  api from "../../../api";

class NovoOrcamento extends Component {
    state={
        nomeCli:'',
        telefone:'',
        mail:'',
        tiposerv:'',
        tipodev:'',
        ctt:'',
        conhece:'cadastro admin'
    }


    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async onSubmit(e) {
        
        const dados = { 
                        nome: this.state.nomeCli,
                        telefone: this.state.telefone,
                        email: this.state.mail,
                        tiposervico: this.state.tiposerv,
                        tipodev: this.state.tipodev,
                        prefctt: this.state.ctt,
                        comonosconheceu: this.state.conhece
        }
       
        await api.post('http://wfdesenvolvimento.com.br/api/orcamento', dados)
            .then(response => {
                this.setState({
                    nomeCli:'',
                    telefone:'',
                    mail:'',
                    tiposerv:'',
                    tipodev:'',
                    ctt:'',
                    conhece:''
                })
                toast.success('😁 Orçamento enviado com sucesso!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });

            })
            .catch(error => {
                toast.error('🥺 Erro ao enviar, veja se preencheu todos os campos obrigatórios!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                console.error('aqui', error);
            });


    }




    render() {
        return (
             <Container fluid>
                <ToastContainer/>
                <Row>
                    <Sidebar/>
                    <Col md={9}>
                        <div className="TituloPAgina">Novo Orcamento</div>
                        <div className="barra">
                            <div>Cadastrar novo orçamento</div>
                            <div><Link to="/orcamento" className="btnWFPadrao">Voltar</Link></div>
                        </div>
                        <Row>
                            <Col md={12}>
                                <div className="CartaoCorpo">
                                    <Form className="formulario">
                                        <div className='TituloForm'>Dados principais</div>
                                        <Form.Row>
                                            
                                            <Form.Group as={Col} >
                                                <Form.Control type="text" value={this.state.nomeCli} placeholder="Nome Cliente*" name="nomeCli" id="nomeCli" onChange={(e)=>this.onChange(e)}  />
                                            </Form.Group>

                                            <Form.Group as={Col} >
                                                <Form.Control type="text" value={this.state.telefone} placeholder="Telefone*" name="telefone" id="telefone" onChange={(e)=>this.onChange(e)}  />
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Control type="email" value={this.state.mail} placeholder="E-mail*" name="mail" id="mail" onChange={(e)=>this.onChange(e)}  />
                                            </Form.Group>
                                        </Form.Row>
                                        <div className='TituloForm'>Dados complementares</div>
                                        <Form.Row>
                                            <Form.Group as={Col}>
                                                <Form.Control  as="select" name="tiposerv" id="tiposerv" onChange={(e)=>this.onChange(e)} >
                                                    <option>Tipo de serviço* </option>
                                                    <option>Aplicativo Mobile</option>
                                                    <option>Site institucional/landpage</option>
                                                    <option>Loja Virtual</option>
                                                    <option>Software/Integração</option>
                                                    <option>Outros</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Control as="select"  name="tipodev" id="tipodev" onChange={(e)=>this.onChange(e)} >
                                                    <option>Tipo de desenvolvimento*</option>
                                                    <option>Criação do zero</option>
                                                    <option>Manutenção e Ajustes</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group as={Col} >
                                                <Form.Control as="select"  name="ctt" id="ctt" onChange={(e)=>this.onChange(e)} >
                                                    <option>Como nos conheceu*</option>
                                                    <option>Telefone</option>
                                                    <option>E-mail</option>
                                                    <option>Whatsapp</option>
                                                </Form.Control>
                                            </Form.Group>

                                            
                                        </Form.Row>

                                        <div style={{marginTop:30}}></div>
                                        <Link  to='#' className="btnWFPadrao" onClick={()=>this.onSubmit()}>
                                            Salvar
                                        </Link>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default NovoOrcamento;