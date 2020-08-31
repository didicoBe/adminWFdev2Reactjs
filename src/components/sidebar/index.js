import React, { Component } from 'react';
import { Col, Image  } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire,faColumns,  faMoneyBillWave, faTicketAlt } from '@fortawesome/free-solid-svg-icons'
import { faWpforms } from '@fortawesome/free-brands-svg-icons'
import './style.css'
import { Link, Redirect } from 'react-router-dom';
import { toast } from "react-toastify";

import  api from "../../api";


class Sidebar extends Component {

    state={
        sair:false
    }

    sair = async()=>{
        const login = localStorage.getItem('login');
        const token = localStorage.getItem('token');
        
       const retorno =  await api.get('/logout/'+login+'/'+token).then(response=>{
            //localStorage.clear();
            console.log(login)
            console.log(token)
            return true
            
        }).catch(e=>{
            
            
            console.log(e);
            return false
        })

        if(retorno){
            localStorage.clear();
            this.setState({sair:true})
            
        }else{
            toast.error('🥺 Erro sair falar com os programadores', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }




       
    }

    validaOnline = ()=>{
        const login = localStorage.getItem('login');
        const token = localStorage.getItem('token');
        const nome = localStorage.getItem('nome');

        var resposta = false


        
        if(login === null || token === null){
            this.setState({
                sair: true,
                
            })
            return resposta

        }else{
            resposta = api.get('/login/valida/'+login+'/'+token).then(response=>{
                this.setState({
                    sair: false,
                
                })
               

                return  true
            }).catch((erro)=>{
                this.setState({
                    sair: true,
                    
                })
                return true
            })
    
            return resposta
            
        }
    }

    componentDidMount(){
        this.validaOnline()
    }



    render() {
        if(this.state.sair){
            return(
                <Redirect push to="/" />
            )
        }else{
            return (
                <Col md={3}>
                    <div  className='side'>
                        <div style={{display:"flex",alignContent:'center',alignItems:'center',}}>
                            <div className='logo'>
                                <Image src="/img/logoMobi.png" alt="WFDev" fluid className="imgAva"/>
                            </div>
                            <div style={{marginLeft:15}}>
                                <div style={{fontFamily: 'Molot'}}>Admin</div>
                                <div style={{fontFamily: 'Molot',cursor:'pointer'}} onClick={()=>this.sair()}>Sair</div>
                            </div>                        
                        </div>
                        <hr style={{margin:35,backgroundColor:'#fff'}}/>
                        <div className="menu">
                            <Link to="/dash"><FontAwesomeIcon icon={faColumns}  /> Dash</Link>
                            <Link to="#"><FontAwesomeIcon icon={faFire}  /> Clientes</Link>
                            <Link to="#"><FontAwesomeIcon icon={faWpforms}  /> Orcamento</Link>
                            <Link to="#"><FontAwesomeIcon icon={faMoneyBillWave}  /> Financeiro</Link>
                            <Link to="#"><FontAwesomeIcon icon={faTicketAlt}  /> Suporte</Link>
                        </div>
                    </div>
                </Col>
            );
        }
    }
}

export default Sidebar;