import React, { Component } from 'react';
import Sidebar from "../../sidebar";
import {Container, Card, Row, Col  } from 'react-bootstrap';
import Lottie from 'lottie-react-web';
import animation from '../../../animations/dash.json'
import { toast } from "react-toastify";

import  api from "../../../api";

import './style.css'

class Dash extends Component {

state ={
    teste: '',
    totalOrcamento:0,
    totalCliente:0,
    totalClienteNovos:0,
    totalProjetos:0,
    totalProjetosFinalizados:0,
}


pegaTodosOrcamento = async()=>{
    
        await api.get('/orcamento').then(response=>{
            
            this.setState({
                totalOrcamento: response.data.length
            })
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

totalCliente = async()=>{
    await api.get('/cliente').then(response=>{
        this.setState({
            totalCliente: response.data.length
        })
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



totalProjetos = async()=>{
    await api.get('/projeto').then(response=>{
        
        var Andamento = response.data.filter(data => data.status != 'Finalizado')
        
        var Finalizado = response.data.filter(data => data.status == 'Finalizado')
        

        this.setState({
            totalProjetos: response.data.length,
            totalProjetosFinalizados:Finalizado.length
        })
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


componentDidMount(){
    this.pegaTodosOrcamento()
    this.totalCliente()
    this.totalProjetos()

}




    render() {
        return (
            <Container fluid>
                <Row>
                    <Sidebar/>
                    <Col md={9}>
                        <div className="TituloPAgina">Dash</div>
                        <Row>
                            <Col md={4}>
                                <div className='cartaoDash'>
                                    <div className='topoCartao'>Total Clientes</div>
                                    <div className='bodyCardDash'>{this.state.totalCliente}</div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='cartaoDash'>
                                    <div className='topoCartao'>Total Projetos</div>
                                    <div className='bodyCardDash'>{this.state.totalProjetos}</div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='cartaoDash'>
                                    <div className='topoCartao'>Faturamento</div>
                                    <div className='bodyCardDash'>60</div>
                                </div>
                            </Col>
                        </Row>
                        <Row style={{marginTop:25}}>
                            <Col md={4}>
                                <div className='cartaoDash'>
                                    <div className='topoCartao'>Chamados</div>
                                    <div className='bodyCardDash'>60</div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <Lottie
                                    options={{
                                    animationData: animation
                                    }}
                                />
                            </Col>
                            <Col md={4}>
                                <div className='cartaoDash'>
                                   <div className='topoCartao'>Orçamentos</div>
                                   <div className='bodyCardDash'>{this.state.totalOrcamento}</div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                
            </Container>
        );
    }
}

export default Dash;