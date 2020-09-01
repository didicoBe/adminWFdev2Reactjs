import React, { Component } from 'react';
import Sidebar from "../../sidebar";
import {Container, Row, Col,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer ,toast } from "react-toastify";

import  api from "../../../api";

import './style.css'

class NovoCliente extends Component {
    state ={
        nome:'',
        cnpj:'',
        nomeFantasia:'',
        razaoSocial:'',
        celular:'',
        nomeResponsavel:'',
        emailResponsavel:'',
        telefoneResponsavel:'',
        cpfResponsavel:'',
        dataNascimento:'',
        rua:'',
        numero:'',
        bairro:'',
        cidade:'',
        estado:'',
        cep:'',
        login:'',
        senha:'',
        permissao:'Cliente'
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async onSubmit(e) {
        const dados = { 
            cnpj:this.state.cnpj,
            nomeFantasia:this.state.nomeFantasia,
            razaoSocial:this.state.razaoSocial,
            celular:this.state.celular,
            nomeResponsavel:this.state.nomeResponsavel,
            emailResponsavel:this.state.emailResponsavel,
            telefoneResponsavel:this.state.telefoneResponsavel,
            cpfResponsavel:this.state.cpfResponsavel,
            dataNascimento:this.state.dataNascimento,
            rua:this.state.rua,
            numero:this.state.numero,
            bairro:this.state.bairro,
            cidade:this.state.cidade,
            estado:this.state.estado,
            cep:this.state.cep,
            
        }
       
        await api.post('http://wfdesenvolvimento.com.br/api/cliente', dados)
            .then(response => {
                console.log(response.data)
                const dadosUser ={
                    email:this.state.login,
                    senha:this.state.senha,
                    permissao:this.state.permissao,
                    nome:this.state.nomeResponsavel,
                    idCliente:response.data.id

                }
                this.setState({
                    cnpj:'',
                    nomeFantasia:'',
                    razaoSocial:'',
                    celular:'',
                    nomeResponsavel:'',
                    emailResponsavel:'',
                    telefoneResponsavel:'',
                    cpfResponsavel:'',
                    dataNascimento:'',
                    rua:'',
                    numero:'',
                    bairro:'',
                    cidade:'',
                    estado:'',
                    cep:''
                })
                
                api.post('http://wfdesenvolvimento.com.br/api/usuario', dadosUser).then(response=>{
                    toast.success('😁 Cliente cadastrado com sucesso !', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });

                }).catch(error =>{
                    toast.error('🥺 Erro ao salvar Usuario, Já cadastrado', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    console.error('aqui', error);
                })


                

            })
            .catch(error => {
                toast.error('🥺 Cliente já cadastrado!', {
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
                        <div className="TituloPAgina">Novo Cliente</div>
                        <div className="barra">
                            <div>Cadastrar novo cliente</div>
                            <div><Link to="/clientes" className="btnWFPadrao">Voltar</Link></div>
                        </div>
                        <Row>
                            <Col md={12}>
                                <div className="CartaoCorpo">
                                <Form className="formulario">
                                    <div className='TituloForm'>Empresa</div>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="CNPJ*" name="cnpj" id="cnpj" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="Nome Fantasia*" name="nomeFantasia" id="nomeFantasia" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="Razao Social*" name="razaoSocial" id="razaoSocial" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="Nome Resp*" name="nomeResponsavel" id="nomeResponsavel" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="Telefone Resp*" name="telefoneResponsavel" id="telefoneResponsavel" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="Celular Resp*" name="celular" id="celular" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>  
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Control type="email" placeholder="E-mail* Resp" name="emailResponsavel" id="emailResponsavel" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="Cpf Resp*" name="cpfResponsavel" id="cpfResponsavel" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Control type="date" placeholder="Campo Obrigatorio*" name="dataNascimento" id="dataNascimento" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                    </Form.Row>


                                    <div className='TituloForm'>Endereço</div>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="Rua*" name="rua" id="rua" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="N°*" name="numero" id="numero" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="Bairro*" name="bairro" id="bairro" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="Cidade*" name="cidade" id="cidade" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="Estado*" name="estado" id="estado" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="Cep*" name="cep" id="cep" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                    </Form.Row>

                                    <div className='TituloForm'>Login e Senha</div>
                                    <Form.Row>
                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="Login*" name="login" id="login" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>

                                        <Form.Group as={Col}>
                                            <Form.Control type="text" placeholder="Senha*" name="senha" id="senha" onChange={(e)=>this.onChange(e)}  />
                                        </Form.Group>
                                    </Form.Row>




                                    <div style={{marginTop:20}}></div>
                                    <Link to='#' className="btnWFPadrao" onClick={()=>this.onSubmit()} style={{marginTop:10,fontSize:20}}>
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

export default NovoCliente;