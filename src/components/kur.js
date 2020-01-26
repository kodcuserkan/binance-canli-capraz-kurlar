import React, { Component } from 'react'
import 'bootswatch/dist/slate/bootstrap.min.css';


const url = "https://www.binance.com/exchange-api/v1/public/asset-service/product/currency";

class kur extends Component {

    constructor() {
        super()
        this.state = {
            kurBilgisi: null,
            isActive: false
        }
    }

    getKurlar = async () => {

        setInterval(async () => {
            const kurlar = await fetch(url);
            const kurlarJson = await kurlar.json();
            console.log(kurlarJson.data)

            this.setState({
                kurBilgisi: kurlarJson.data
            })
            return kurlarJson.data;

        }, 60000);

    }

    firstMountKurlar = async () => {

        const kurlar = await fetch(url);
        const kurlarJson = await kurlar.json();
        console.log(kurlarJson.data)

        this.setState({
            kurBilgisi: kurlarJson.data
        })
        return kurlarJson.data;


    }
    componentDidMount() {

        this.setState({
            kurBilgisi: this.firstMountKurlar()
        })
        setTimeout(() => {

        }, 1000);
        this.getKurlar();
    }



    render() {

        console.log(this.state);

        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col"><h2>Çapraz Kur</h2></th>
                            <th scope="col"><h2>Simge</h2></th>
                            <th scope="col"><h2>Oran</h2></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.isActive ? this.state.kurBilgisi.map(m => {
                                return (
                                    <tr className="table-dark" key={Math.random()}>
                                        <th scope="row">{m.pair}</th>
                                        <td>{m.symbol}</td>
                                        <td>{m.rate}</td>
                                    </tr>
                                )
                            }) : null
                        }


                    </tbody>
                </table>

                <button type="button" className="btn btn-warning" onClick={this.onClick = () => { this.setState({ isActive: !this.state.isActive }) }}>{this.state.isActive ? "Gizle" : "Getir"}</button>
            </div>
        )
    }
}

export default kur;