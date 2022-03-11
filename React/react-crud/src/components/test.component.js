import React, { Component } from "react";
import TestDataService from "../services/test.service";
import { styles } from "../css-common"
import { TextField, Button, withStyles } from "@material-ui/core";
class Test extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.getTest = this.getTest.bind(this);
        this.updateAvailable = this.updateAvailable.bind(this);
        this.updateTest = this.updateTest.bind(this);
        this.deleteTest = this.deleteTest.bind(this);
        this.state = {
            currentTest: {
                id: null,
                name: "",
                type: "",
                price: 0,
                rating: 0,
                warranty_years: 0,
                available: false
            },
            message: ""
        };
    }
    componentDidMount() {
        this.getTutorial(this.props.match.params.id);
    }
    onChangeName(e) {
        const name = e.target.value;
        this.setState(function (prevState) {
            return {
                currentTest: {
                    ...prevState.currentTest,
                    name: name
                }
            };
        });
    }
    onChangeType(e) {
        const type = e.target.value;
        this.setState(prevState => ({
            currentTest: {
                ...prevState.currentTest,
                type: type
            }
        }));
    }
    onChangePrice(e) {
        const price = e.target.value;
        this.setState(prevState => ({
            currentTest: {
                ...prevState.currentTest,
                price: price
            }
        }));
    }
    onChangeRating(e) {
        const warranty_years = e.target.value;
        this.setState(prevState => ({
            currentTest: {
                ...prevState.currentTest,
                warranty_years: warranty_years
            }
        }));
    }
    onChangeWarrantyYear(e) {
        const rating = e.target.value;
        this.setState(prevState => ({
            currentTest: {
                ...prevState.currentTest,
                rating: rating
            }
        }));
    }
    getTest(id) {
        TestDataService.get(id)
            .then(response => {
                this.setState({
                    currentTest: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    updateAvailable(status) {
        var data = {
            id: this.state.currentTest.id,
            name: this.state.currentTest.name,
            type: this.state.currentTest.type,
            price: this.state.currentTest.price,
            rating: this.state.currentTest.rating,
            warranty_years: this.state.currentTest.warranty_years,
            available: status

        };
        TestDataService.update(this.state.currentTest.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentTest: {
                        ...prevState.currentTest,
                        available: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    updateTest() {
        TestDataService.update(
            this.state.currentTest.id,
            this.state.currentTest
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The data was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    deleteTest() {
        TestDataService.delete(this.state.currentTest.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/test')
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        return(
            <div></div>
        )
    }
}
export default withStyles(styles)(Test)