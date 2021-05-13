import React, { Component } from 'react'

import './styles.css'

export default class Conversor extends Component {

    constructor(props) {
        super(props)

        this.state = {
            moedaA_valor: "",
            moedaB_valor: 0
        }

        this.apiKey = '4e4357d1fa8ff99ff22c'

        this.converter = this.converter.bind(this)
    }

    atualizarValorMoedaA(event) {
        this.setState({ moedaA_valor: event.target.value})
    }

    converter() {
        let de_para = `${this.props.moedaA}_${this.props.moedaB}`
        let url = `http://free.currencyconverterapi.com/api/v5/convert?q=${de_para}&compact=y&apiKey=${this.apiKey}`

    
        fetch(url).then(res => {
            return res.json()
        }).then(json => {
            let cotacao = json[de_para].val
            let moedaB_valor = (parseFloat(this.state.moedaA_valor) * cotacao).toFixed(2)
            this.setState({ moedaB_valor })
        })
    }

    render() {
        return (
            <div className="conversor">
                <h2>{this.props.moedaA} para {this.props.moedaB}</h2>
                <input  type="number" onChange={(event) => this.atualizarValorMoedaA(event)}></input>
                <input type="button" value="Converter" onClick={this.converter}></input>
                <h2>{this.state.moedaB_valor}</h2>
            </div>
        )
    }
}