import React, { Component } from 'react';
import Sidebar from "../../sidebar";
import {Container,  Row, Col,ProgressBar,Card,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  api from "../../../api";
import { ToastContainer ,toast } from "react-toastify";
import { faCaretSquareUp, faLaptopCode} from '@fortawesome/free-solid-svg-icons'
import { faGoogleDrive, faGithub } from "@fortawesome/free-brands-svg-icons"
import InputRange from 'react-input-range'


class Visualizaproj extends Component {

    state={
        idProj:'',
        data:[],
        statusPRojN:0,
        menssagem:'',
        status:'',
        historico:[],
        idCli:''
    }

    pegadadosProjeto = (idProj,idCliente)=>{
        api.get('/projeto/unico/'+idProj+'/'+idCliente).then(response=>{
            this.setState({
                data:response.data[0],
                statusPRojN:response.data[0].progresso,
                status: response.data[0].status
            })
            return  true
        }).catch((erro)=>{
            return false
        })
    }

    //mudar
    onChange(e) {
        if(e.target.value === 'Finalizado'){
            this.setState({
                statusPRojN:100
            })
        }
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    //updateProgresso
    updateProgresso = async()=>{
        const dados = { 
            id: this.state.idProj,
            progresso: this.state.statusPRojN,    
            status:this.state.status 
        }

        await api.put('/projeto', dados).then(response=>{
            
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

    //add novo historico
    addNovoHistorico = async(e)=>{


        e.preventDefault()
        const dados = { 
            idProjeto: this.state.idProj,
            mensagem: this.state.mensagem,
            usuarioSis: this.state.nome,
            status: this.state.status, 
            idCliente:this.state.idCli          
        }


        await api.post('/projeto-historico', dados).then(response=>{
            this.updateProgresso()
            this.pegaHistorico(this.state.idProj,this.state.idCli)
            this.setState({
                mensagem:'',
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

    //pega historico do orcamento
    pegaHistorico = async (id,idCliente)=>{
        await api.get('/projeto-historico/'+id+'/'+idCliente).then(response=>{
            this.setState({
                historico:response.data
            })
            return  true
        }).catch((erro)=>{
            return false
        })
    }


    componentDidMount(){
        
        const idCli = this.props.match.params.idcli
        const id  = this.props.match.params.id
        this.setState({
            idProj:id,
            idCli:idCli
        })
        this.pegadadosProjeto(id,idCli)
        this.pegaHistorico(id,idCli)
    }


    render() {
        return (
            <Container fluid>
                <ToastContainer/>
                <Row>
                    <Sidebar/>
                    <Col md={9}>
                        <div className="TituloPAgina">{this.state.data.nome}</div>
                        <div className="barra">
                            <div>Status: {this.state.data.status}</div>
                            <div><Link to={"/clientevisualizar/"+this.state.idCli} className="btnWFPadrao">Voltar</Link></div>
                        </div>
                        <Row>
                            <Col md={12}>
                                <div className="CartaoCorpo">
                                    <div className="segundaBarraCartao" style={{marginTop:0, borderBottom:0}}>
                                        <div>Data Inicio: <span style={{color:'#fff'}}>{this.state.data.dataInicio}</span></div>
                                        <div>Data entrega: <span style={{color:'#fff'}}>{this.state.data.dataEntrega}</span></div>
                                    </div>
                                    <div className="segundaBarraCartao" style={{marginTop:0, borderBottom:0}}>
                                        <div>Valor: <span style={{color:'#fff'}}>{this.state.data.valor}</span></div>
                                        <div>Forma Pag: <span style={{color:'#fff'}}>{this.state.data.formaDePagamento}</span></div>
                                    </div>
                                    <div className='subtitulo'>Progresso</div>
                                    <div><ProgressBar now={this.state.statusPRojN} label={`${this.state.statusPRojN}%`} /></div>
                                    <div className='subtitulo'>Sobre o projeto</div>
                                    <div className="sobreoprojbox">
                                        {this.state.data.descritivo}
                                    </div>
                                    <div className='subtitulo' style={{marginBottom:20}}>Links Externos</div>
                                    <Row>
                                        <Col md={3}>
                                            <a href={this.state.data.GoogleDrive} rel="noopener noreferrer" target="_blank" style={{textDecoration:'none'}} >
                                            <Card className="text-center cartaoExterno" >
                                                <Card.Body>
                                                    <FontAwesomeIcon icon={faGoogleDrive}  style={{fontSize:60}}/>
                                                    <div style={{fontWeight:500}}>Google drive</div>
                                                </Card.Body>
                                            </Card>
                                            </a>
                                        </Col>
                                        <Col md={3}>
                                            <a href={this.state.data.github} rel="noopener noreferrer" target="_blank" style={{textDecoration:'none'}} >
                                            <Card className="text-center cartaoExterno">
                                                <Card.Body>
                                                    <FontAwesomeIcon icon={faGithub}  style={{fontSize:60}}/>
                                                    <div style={{fontWeight:500}}>GitHub</div>
                                                </Card.Body>
                                            </Card>
                                            </a>
                                        </Col>
                                        <Col md={3}>
                                            <a href={this.state.data.vercel} rel="noopener noreferrer" target="_blank" style={{textDecoration:'none'}} >
                                            <Card className="text-center cartaoExterno">
                                                <Card.Body>
                                                    <FontAwesomeIcon icon={faCaretSquareUp}  style={{fontSize:60}}/>
                                                    <div style={{fontWeight:500}}>Vercel</div>
                                                </Card.Body>
                                            </Card>
                                            </a>
                                        </Col>
                                        <Col md={3}>
                                            <a href={this.state.data.urlDominio} rel="noopener noreferrer" target="_blank" style={{textDecoration:'none'}} >
                                            <Card className="text-center cartaoExterno">
                                                <Card.Body>
                                                    <FontAwesomeIcon icon={faLaptopCode}  style={{fontSize:60}}/>
                                                    <div style={{fontWeight:500}}>Url site</div>
                                                </Card.Body>
                                            </Card>
                                            </a>
                                        </Col>
                                    </Row>
                                </div>
                                

                                <Row style={{marginBottom:60}}>
                                    <Col md={4}>
                                        <div className="barra" style={{marginTop:20}}>
                                            Adicionar Historico
                                        </div>
                                        <div className="CartaoCorpo">
                                            <Form>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Selecione o novo status do projeto </Form.Label>

                                                    <InputRange
                                                        maxValue={100}
                                                        minValue={0}
                                                        value={parseInt(this.state.statusPRojN)}
                                                        onChange={value => this.setState({ statusPRojN : value })}
                                                        
                                                    />
                                                    
                                                </Form.Group>
                                                <Form.Group controlId="exampleForm.ControlSelect1">
                                                    <Form.Label>Selecione o novo status </Form.Label>
                                                    <Form.Control as="select" name="status" onChange={(e)=>this.onChange(e)}>
                                                        <option>Iniciado</option>
                                                        <option>Em Andamento</option>
                                                        <option>Finalizado</option>                                           
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                                    <Form.Label>Escreva a nova ocorrência</Form.Label>
                                                    <Form.Control as="textarea" rows="3" name="mensagem" value={this.state.mensagem} onChange={(e)=>this.onChange(e)} />
                                                </Form.Group>
                                                <Link to='#' className="btnWFPadrao" onClick={(e)=>this.addNovoHistorico(e)}>
                                                    Salvar
                                                </Link>
                                            </Form>
                                        </div>
                                    </Col>

                                    <Col md={8}>
                                        <div className="barra" style={{marginTop:20}}>
                                            Historico
                                        </div>
                                        <div className="CartaoCorpo" style={{height:350,overflow:'auto'}}>

                                             {
                                                this.state.historico.map((resultado)=>{
                                                    var data = new Date(resultado.data)
                                                    return(
                                                        <div className="historicoOrcamento"  key={resultado.id} style={{borderBottom:'1px solid #da50d5'}}>
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
                                
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Visualizaproj;