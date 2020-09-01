import React, { Component } from 'react';
import Sidebar from "../../sidebar";
import {Container,  Row, Col,InputGroup ,FormControl,ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
//filtro
import SearchResults from 'react-filter-search';

import  api from "../../../api";




class Suporte extends Component {
    state={
        value:'',
        data:[]
    }

    handleChange = event => {
        const { value } = event.target;
        this.setState({ value });
    };


    pegaTickets = async(idCliente)=>{
        await api.get('/suporte').then(response=>{
            var Andamento = response.data.filter(data => data.status !== 'Resolvido')
            console.log(Andamento)
            this.setState({
                data:Andamento,
            })
            if(Andamento.length > 0){
                this.setState({loading:false})
            }
            
        }).catch(e=>{
             console.log(e);
        })  
    }

    componentDidMount(){
        this.pegaTickets()
    }


    render() {
        return (
            <Container fluid>
                <Row>
                    <Sidebar/>
                    <Col md={9}>
                        <div className="TituloPAgina">Suporte</div>
                        <div className="barra">
                            <div>Tickets em aberto</div>
                            <div><Link to="/suportefinalizado" className="btnWFPadrao">Finalizados</Link></div>
                        </div>
                        <Row>
                            <Col md={12}>
                                <div className="CartaoCorpo" style={{marginBottom:50}}>
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
                                            data={this.state.data}
                                            renderResults={results => (
                                                <div>
                                                {results.map(el => (
                                                    <ListGroup.Item key={el.id}>
                                                        <div style={{display:'flex',justifyContent:'space-between'}}>
                                                            <div>{el.id} - {el.assunto}</div>
                                                            <Link className="btnWFPadrao" style={{fontSize:20}} to={'/orcamentovisualizar/'+el.id}>visualizar</Link>                                                            
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

export default Suporte;