import React, { Component } from 'react';
import Sidebar from "../../sidebar";
import {Container,  Row, Col,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer ,toast } from "react-toastify";

import  api from "../../../api";


class Cadastrarproj extends Component {
    state={
        nome:'',
        idCliente:'',
        nomeprojeto:'',
        dataEntrega:'',
        descritivo:'',
        vercel:'',
        github:'',        
        GoogleDrive:'',
        formaDePagamento:'',
        valor:'',
        Url:''
    }

    onChange(e) {
            this.setState({
                [e.target.name]: e.target.value
        })
    }
    
    componentDidMount(){
        const id  = this.props.match.params.id
        this.setState({
            idCliente:id
        })
    }

    async onSubmit(e) {
        var idCli = this.state.idCliente
        const form = new FormData();

        form.set('idCliente',this.state.idCliente)
        form.set('nome',this.state.nomeprojeto)
        form.set('dataEntrega',this.state.dataEntrega)
        form.set('vercel',this.state.vercel)
        form.set('descritivo',this.state.descritivo)
        form.set('github',this.state.github)
        form.set('GoogleDrive',this.state.GoogleDrive)
        form.set('formaDePagamento',this.state.formaDePagamento)
        form.set('valor',this.state.valor)
        form.set('urlDominio',this.state.Url)
        form.append('logo', document.getElementById("logo").files[0])
        const headers = { 
            'Content-Type': 'multipart/form-data' 
        };
       
        await api.post('http://wfdesenvolvimento.com.br/api/projeto', form,{headers})
            .then(response => {
                this.setState({
                    idCliente:'',
                    logo:'',
                    nomeprojeto: '',
                    dataEntrega: '',
                    descritivo: '',
                    vercel: '',
                    github: '',        
                    GoogleDrive: '',
                    formaDePagamento: '',
                    valor: '',
                })
                toast.success('😁 Projeto salvo com sucesso!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                },
                this.props.history.push('/clientevisualizar/'+idCli));
                

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
                        <div className="TituloPAgina">Novo Projeto</div>
                        <div className="barra">
                            <div>Dados para novo projeto</div>
                            <div><Link to={"/clientevisualizar/" + this.state.idCliente } className="btnWFPadrao">Voltar</Link></div>
                        </div>
                        <Row>
                            <Col md={12}>
                                <div className="CartaoCorpo">
                                <Form className="formulario">
                                   <Form.Row>

                                        <Form.Group as={Col} md={4}>
                                            <Form.File accept="image/png" label="Logo" name="logo" id="logo" onChange={(e)=>this.onChange(e)} value={this.state.logo} />
                                        </Form.Group>

                                        <Form.Group as={Col} md={4} >
                                            <Form.Label>Nome do Projeto</Form.Label>
                                            <Form.Control type="text" placeholder="Nome do projeto"  name="nomeprojeto" id="nomeprojeto" onChange={(e)=>this.onChange(e)} value={this.state.nomeprojeto}  />
                                        </Form.Group>
                                        

                                        <Form.Group as={Col} md={4}>
                                            <Form.Label>Data de entrega</Form.Label>
                                            <Form.Control type="date" placeholder="data de entrega" name="dataEntrega" id="dataEntrega" onChange={(e)=>this.onChange(e)} value={this.state.dataEntrega} />
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Group >
                                        <Form.Label>Descritivo</Form.Label>
                                        <Form.Control as="textarea" rows="4" name="descritivo" id="descritivo" onChange={(e)=>this.onChange(e)} value={this.state.descritivo} />
                                    </Form.Group>


                                    <Form.Row>
                                        <Form.Group as={Col} md={4} >
                                            <Form.Label>Valor</Form.Label>
                                            <Form.Control type="number" name="valor" id="valor" onChange={(e)=>this.onChange(e)} value={this.state.valor}  />
                                        </Form.Group>
                                        <Form.Group as={Col} md={4}>
                                            <Form.Label>Tipo de pagamento</Form.Label>
                                            <Form.Control as="select" name="formaDePagamento" id="formaDePagamento" onChange={(e)=>this.onChange(e)} value={this.state.formaDePagamento} >
                                                <option>50% / 50%</option>
                                                <option>Avista 10% desc</option>
                                                <option>Cartão de credito</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} md={3} >
                                            <Form.Label>Vercel Url</Form.Label>
                                            <Form.Control name="vercel" id="vercel" onChange={(e)=>this.onChange(e)} value={this.state.vercel}   />
                                        </Form.Group>

                                        <Form.Group as={Col} md={3} >
                                            <Form.Label>Github Url</Form.Label>
                                            <Form.Control  name="github" id="github" onChange={(e)=>this.onChange(e)}  value={this.state.github} />
                                        </Form.Group>

                                        <Form.Group as={Col} md={3} >
                                            <Form.Label>GoogleDrive Url</Form.Label>
                                            <Form.Control  name="GoogleDrive" id="GoogleDrive" onChange={(e)=>this.onChange(e)} value={this.state.GoogleDrive} />
                                        </Form.Group>
                                        <Form.Group as={Col} md={3} >
                                            <Form.Label>Url do site</Form.Label>
                                            <Form.Control  name="Url" id="Url" onChange={(e)=>this.onChange(e)} value={this.state.Url} />
                                        </Form.Group>
                                    </Form.Row>


                                    <Link to='#' className="btnWFPadrao" onClick={(e)=>this.onSubmit(e)}>
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

export default Cadastrarproj;