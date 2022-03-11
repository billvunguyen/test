import React, { Component } from "react";
import TestDataService from "../services/test.service";
import { TextField, Button, withStyles, FormGroup, FormControlLabel,Checkbox } from "@material-ui/core"
import { styles } from "../css-common"
class AddTest extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeWarrantyYear = this.onChangeWarrantyYear.bind(this);
        this.onChangeAvailable = this.onChangeAvailable.bind(this);
        this.saveTest = this.saveTest.bind(this);
        this.newTest = this.newTest.bind(this);
        this.state = {
            id: null,
            name: "",
            type: "",
            price: 0,
            rating: 0,
            warranty_years: 0,
            available: false
        };
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeType(e) {
        this.setState({
            type: e.target.value
        });
    }
    onChangePrice(e) {
        this.setState({
            price: e.target.value
        });
    }
    onChangeRating(e) {
        this.setState({
            rating: e.target.value
        });
    }
    onChangeWarrantyYear(e) {
        this.setState({
            warranty_years: e.target.value
        });
    }
    onChangeAvailable() {
        this.setState({
            available: true,
        });
    }

    saveTest() {
        var data = {
            name: this.state.name,
            type: this.state.type,
            price: this.state.price,
            rating: this.state.rating,
            warranty_year: this.state.warranty_years,
            available: this.state.available
        };
        TestDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    type: response.data.type,
                    price: response.data.price,
                    rating: response.data.rating,
                    warranty_years: response.data.warranty_years,
                    available: response.data.available,

                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    newTest() {
        this.setState({
            id: null,
            name: "",
            type: "",
            price: 0,
            rating: 0,
            warranty_years: 0,
            available: false
        });
    }
    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                {this.state.submitted ? (
                    <div className={classes.form}>
                        <h4>You submitted successfully!</h4>
                        <Button
                            size="small"
                            color="primary"
                            variant="contained"
                            onClick={this.newTutorial}>
                            Add
                        </Button>
                    </div>
                ) : (
                        <div className={classes.form}>
                            <div className={classes.textField}>
                                <TextField
                                    label="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    required
                                />
                            </div>
                            <div className={classes.textField}>
                                <TextField
                                    label="Type"
                                    name="type"
                                    value={this.state.type}
                                    onChange={this.onChangeType}
                                    required
                                />
                            </div>
                            <div className={classes.TextField}>
                                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    label="Price"
                                    name="price"
                                    value={this.state.price}
                                    onChange={this.onChangePrice}
                                    required
                                />
                            </div>
                            <div className={classes.TextField}>
                                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    label="Rating"
                                    name="rating"
                                    value={this.state.rating}
                                    onChange={this.onChangeRating}
                                    required
                                />
                            </div>
                            <div className={classes.TextField}>
                                <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    label="Warranty Years"
                                    name="warranty_years"
                                    value={this.state.warranty_years}
                                    onChange={this.onChangeWarrantyYear}
                                    required
                                />
                            </div>
                            <div>
                                <FormGroup>
                                    <FormControlLabel 
                                        control={<Checkbox />} 
                                        label="Available" 
                                        value={this.state.available}
                                        onChange={this.onChangeAvailable}
                                    />
                                </FormGroup>
                            </div>
                            <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={this.saveTest}>
                                Submit
                            </Button>
                        </div>
                    )}
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(AddTest)