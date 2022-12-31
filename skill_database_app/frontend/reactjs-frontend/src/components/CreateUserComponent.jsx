import React, { Component } from 'react'
import UserService from '../services/UserService';

class CreateUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            Name: '',
            Skill: '',
            Domain: '',
            Years: '',
            Level: 'Basic',
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSkillHandler = this.changeSkillHandler.bind(this);
        this.changeDomainHandler = this.changeDomainHandler.bind(this);
        this.changeYearsHandler = this.changeYearsHandler.bind(this);
        this.changeLevelHandler = this.changeLevelHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            UserService.getUserById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({Name: user.Name,
                    Skill: user.Skill,
                    Domain : user.Domain,
                    Years : user.Years,
                    Level : user.Level
                });
            });
        }        
    }
    saveOrUpdateUser = (e) => {
        e.preventDefault();
        let user = {Name: this.state.Name, Skill: this.state.Skill, Domain: this.state.Domain, Years: this.state.Years, Level:this.state.Level};
        console.log('user => ' + JSON.stringify(user));

        // step 5
        if(this.state.id === '_add'){
            UserService.createUser(user).then(res =>{
                this.props.history.push('/users');
            });
        }else{
            UserService.updateUser(user, this.state.id).then( res => {
                this.props.history.push('/users');
            });
        }
    }
    
    changeNameHandler= (event) => {
        this.setState({Name: event.target.value});
    }

    changeSkillHandler= (event) => {
        this.setState({Skill: event.target.value});
    }

    changeDomainHandler= (event) => {
        this.setState({Domain: event.target.value});
    }

    changeYearsHandler= (event) => {
        this.setState({Years: event.target.value});
    }

    changeLevelHandler= (event) => {
        console.log("level Selected!!")
        this.setState({Level: event.target.value});
    }

    cancel(){
        this.props.history.push('/users');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add User</h3>
        }else{
            return <h3 className="text-center">Update User</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Name: </label>
                                            <input type="text" required placeholder="Please enter your Name" name="Name" className="form-control" 
                                                value={this.state.Name} onChange={this.changeNameHandler} />
                                        </div>
                                        <div className = "form-group">
                                            <label> Skill: </label>
                                            <input type="text" required placeholder="Please enter your Skill" name="Skill" className="form-control" 
                                                value={this.state.Skill} onChange={this.changeSkillHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Domain: </label>
                                            <input type="text" required placeholder="Please enter your Domain" name="Domain" className="form-control" 
                                                value={this.state.Domain} onChange={this.changeDomainHandler} />
                                        </div>
                                        <div className = "form-group">
                                            <label> Years: </label>
                                            <input type="text" required placeholder="Please enter your Years" name="Years" className="form-control" 
                                                value={this.state.Years} onChange={this.changeYearsHandler} />
                                        </div>
                                        <div className = "form-group">
                                        <label>Skill Level: </label>
                                        <div className="container">
                                            <div className="row">
                                            <div className="col-md-3"></div>
                                            <div className="col-md-6">
                                                <select value={this.state.Level} onChange={this.changeLevelHandler}>
                                                <option value="Basic">Basic</option>
                                                    <option value="Intermediate">Intermediate</option>
                                                    <option value="Expert">Expert</option>
                                                </select>
                                                </div>
                                                <div className="col-md-4"></div>
                                              </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateUser}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateUserComponent
