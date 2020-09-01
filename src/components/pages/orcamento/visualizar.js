import React, { Component } from 'react';
import Sidebar from "../../sidebar";
import {Container, Card, Row, Col,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

import  api from "../../../api";

class VisualizarOrcamento extends Component {
    state={
        id:'',
        data:[],
        historico:[],
        mensagem:'',
        status:''
    }


    //pega dados do orcamento
    pegaDadosId = async(id)=>{
        await api.get('/orcamento/'+id).then(response=>{
            this.setState({
                data:response.data[0]
            })
            return  true
        }).catch((erro)=>{
            return false
        })
    }

    //pega historico do orcamento
    pegaHistorico = async (id)=>{
        await api.get('/historico/'+id).then(response=>{
            this.setState({
                historico:response.data
            })
            return  true
        }).catch((erro)=>{
            return false
        })
    }



    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //add novo historico
    addNovoHistorico = async(e,id)=>{
        e.preventDefault()
        const dados = { 
            idOrcamento: id,
            mensagem: this.state.mensagem,
            usuario: this.state.nome,
            status: this.state.status,           
        }


        await api.post('/historico', dados).then(response=>{
            this.pegaDadosId(id)
            this.pegaHistorico(id)
            this.setState({
                mensagem:'',
                status:''
            })
            toast.success('😁 Historico Salvo com sucesso!', {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            });

           
        }).catch((erro)=>{
            toast.error('🥺 Erro ao enviar, entre em contato com o suporte!', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
        })
    }

    //qndo o componente estiver pronto executa
    componentDidMount(){
        const id  = this.props.match.params.id
        this.pegaHistorico(id)
        this.pegaDadosId(id)
        
    }

    render() {
        return (
            <Container fluid>
            <ToastContainer/>
                <Row>
                    <Sidebar/>
                    <Col md={9}>
                        <div className="TituloPAgina">{this.state.data.email}</div>
                        <div className="barra">
                            <div>Dados complementares</div>
                            <div><Link to="/orcamento" className="btnWFPadrao">Voltar</Link></div>
                        </div>
                        <Row>
                            <Col md={12}>
                                <div className="CartaoCorpo">
                                    <Row>
                                        <Col md={3}>
                                            <div className="boxDadosCliente">
                                                <div style={{fontSize:30}}>Contato</div>
                                                <div>{this.state.data.nome}</div>
                                                <div>{this.state.data.email}</div>
                                                <div>{this.state.data.telefone}</div>
                                                <div>Pref. Ctt.: {this.state.data.prefctt}</div>
                                                <div>Solicitado em : <br/>{this.state.data.data}</div>
                                            </div>
                                        </Col>
                                        <Col md={9}>
                                            <div className="boxDadosEmpresa">
                                                <div>Historico</div>
                                                
                                            </div>
                                            <div style={{height:350,overflow:'auto'}}>
                                            {
                                                this.state.historico.map((resultado)=>{
                                                    var data = new Date(resultado.data)
                                                    return(
                                                        <div key={resultado.id} style={{borderBottom:'1px solid #da50d5'}}>
                                                            <Card style={{backgroundColor:'#fff0',border:0}}>
                                                                <Card.Header style={{color:'#fff',textAlign:'right', fontSize:12,border:0,borderBottom:'1px solid',display:'flex',justifyContent:'space-between'}}>
                                                                        <div>Status:.{resultado.status}</div>
                                                                        <div>Data:.{data.toLocaleDateString()}</div>
                                                                </Card.Header>
                                                                <Card.Body>
                                                                    <Card.Title>Ocorrência</Card.Title>
                                                                        {resultado.mensagem}
                                                                    <Card.Text>
                                                                        
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </div>
                                                    )
                                                })
                                            }
                                            </div>
                                            
                                        </Col>
                                    </Row>
                                </div>

                            </Col>
                        </Row>
                        <div className="barra" style={{marginTop:30}}>
                            <div>Add Historico</div>
                        </div>
                        <Row style={{marginBottom:60}}>
                            <Col md={5}>
                                <div className="CartaoCorpo">
                                    <Row>
                                        <Col >
                                            <Form className="formulario">
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Selecione o novo status </Form.Label>
                                                    <Form.Control as="select" name="status" onChange={(e)=>this.onChange(e)}>
                                                        <option>aguardando contato</option>
                                                        <option>sem contato com cliente</option>
                                                        <option>Orçamento enviado</option>
                                                        <option>Orçamento aprovado</option>
                                                        <option>Orçamento não aprovado</option>                                            
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Escreva a nova ocorrência</Form.Label>
                                                    <Form.Control as="textarea" rows="3" name="mensagem" value={this.state.mensagem} onChange={(e)=>this.onChange(e)} />
                                                </Form.Group>
                                                <Link to='#' className="btnWFPadrao" onClick={(e)=>this.addNovoHistorico(e,this.state.data.id)}>
                                                    Enviar
                                                </Link>
                                            </Form>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default VisualizarOrcamento;