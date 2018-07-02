import React, { Component } from "react";
import axios from "axios";

import Button from '../Buttons/Buttons'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            randomTrivia: {},
            currentFact: "Start Now",
            favorites: [],
            update: ""
        };
        this.getRandomFact = this.getRandomFact.bind(this);
        this.saveFact = this.saveFact.bind(this);
        this.deleteFact = this.deleteFact.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.sendUpdate = this.sendUpdate.bind(this);
    }

    componentDidMount() {
        axios.get("/api/random").then(response => {
            this.setState({
                randomTrivia: response.data
            });
        });
    }

    getRandomFact() {
        this.setState({
            currentFact: this.state.randomTrivia[
                Math.floor(Math.random() * Math.floor(100))
            ]
        });
    }

    saveFact(fact) {
        axios.post("/api/save", { fact }).then(response => {
            this.setState({
                favorites: response.data
            });
        });
    }

    deleteFact(id) {
        axios.delete(`/api/delete/${id}`).then(response => {
            this.setState({
                favorites: response.data
            });
        });
    }
    handleUpdate(e) {
        this.setState({
            update: e.target.value
        });
    }
    sendUpdate(index, newText) {
        axios.put(`/api/update/${index}`, { newText }).then(response => {
            this.setState({
                favorites: response.data
            });
        });
    }

    // updateFact(id) {
    //   axios.update(`/api/update/${id}`).then(response => {
    //     this.setState({
    //       currentFact: " "
    //     });
    //   });
    // }

    render() {
        const favList = this.state.favorites.map((fact, index) => {
            return (
                <Button key={index} update={this.state.update} index={index} fact={fact} sendUpdate={this.sendUpdate} deleteFact={this.deleteFact} handleUpdate={this.handleUpdate} />
            );
        });

        return (
            <div>
                <div>
                    <h1>{this.state.currentFact}</h1>
                    <button onClick={() => this.getRandomFact()}>Randomize</button>
                    <button onClick={() => this.saveFact(this.state.currentFact)}>
                        Save Fact
          </button>
                </div>
                <div>{favList}</div>
            </div>
        );
    }
}

export default Home;
