import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Player extends Component{

    constructor(props){
        super(props);

        this.state={
            agegroups:[],
            gender:[],
            city:[],
            nationality:[],
            player:[],
            modalTitle:"",
            PlayerId:0,
            PlayerName:"",
            PlayerUsername:"",
            Email:"",
            EmailPrivat:"",
            PhoneNumber:"",
            DateOfBirth:"",
            Gender:"",
            City:"",
            Nationality:"",
            Address:"",
            AgeGroups:"",
            DateOfJoining:"",
            PhotoFileName:"anonymous.PNG",
            PhotoPath:variables.PHOTO_URL
        }
    }

    refreshList(){

        fetch(variables.API_URL+'Player')
        .then(response=>response.json())
        .then(data=>{
            this.setState({player:data});
        });

        fetch(variables.API_URL+'AgeGroups')
        .then(response=>response.json())
        .then(data=>{
            this.setState({agegroups:data});
        });
        
        fetch(variables.API_URL+'Gender')
        .then(response=>response.json())
        .then(data=>{
            this.setState({gender:data});
        });
        
        fetch(variables.API_URL+'City')
        .then(response=>response.json())
        .then(data=>{
            this.setState({city:data});
        });

        fetch(variables.API_URL+'Nationality')
        .then(response=>response.json())
        .then(data=>{
            this.setState({nationality:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changePlayerName =(e)=>{
        this.setState({PlayerName:e.target.value});
    }
    changePlayerUsername =(e)=>{
        this.setState({PlayerUsername:e.target.value});
    }
    changeEmail =(e)=>{
        this.setState({Email:e.target.value});
    }
    changeEmailPrivat =(e)=>{
        this.setState({EmailPrivat:e.target.value});
    }
    changePhoneNumber =(e)=>{
        this.setState({PhoneNumber:e.target.value});
    }
    changeDateOfBirth =(e)=>{
        this.setState({DateOfBirth:e.target.value});
    }
    changeGender =(e)=>{
        this.setState({Gender:e.target.value});
    }
    changeCity =(e)=>{
        this.setState({City:e.target.value});
    }
    changeNationality =(e)=>{
        this.setState({Nationality:e.target.value});
    }
    changeAddress =(e)=>{
        this.setState({Address:e.target.value});
    }
    changeAgeGroups =(e)=>{
        this.setState({AgeGroups:e.target.value});
    }
    changeDateOfJoining =(e)=>{
        this.setState({DateOfJoining:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Player",
            PlayerId:0,
            PlayerName:"",
            PlayerUsername:"",
            Email:"",
            EmailPrivat:"",
            PhoneNumber:"",
            DateOfBirth:"",
            Gender:"",
            City:"",
            Nationality:"",
            Address:"",
            AgeGroups:"",
            DateOfJoining:"",
            PhotoFileName:"anonymous.PNG"
        });
    }
    editClick(plr){
        this.setState({
            modalTitle:"Edit Player",
            PlayerId:plr.PlayerId,
            PlayerName:plr.PlayerName,
            PlayerUsername:plr.PlayerUsername,
            Email:plr.Email,
            EmailPrivat:plr.EmailPrivat,
            PhoneNumber:plr.PhoneNumber,
            DateOfBirth:plr.DateOfBirth,
            Gender:plr.Gender,
            City:plr.City,
            Nationality:plr.Nationality,
            Address:plr.Address,
            AgeGroups:plr.AgeGroups,
            DateOfJoining:plr.DateOfJoining,
            PhotoFileName:plr.PhotoFileName
        });
    }

    createClick(){
        fetch(variables.API_URL+'Player',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                PlayerName:this.state.PlayerName,
                PlayerUsername:this.state.PlayerUsername,
                Email:this.state.Email,
                EmailPrivat:this.state.EmailPrivat,
                PhoneNumber:this.state.PhoneNumber,
                DateOfBirth:this.state.DateOfBirth,
                Gender:this.state.Gender,
                City:this.state.City,
                Nationality:this.state.Nationality,
                Address:this.state.Address,
                AgeGroups:this.state.AgeGroups,
                DateOfJoining:this.state.DateOfJoining,
                PhotoFileName:this.state.PhotoFileName
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'Player',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                PlayerId:this.state.PlayerId,
                PlayerName:this.state.PlayerName,
                PlayerUsername:this.state.PlayerUsername,
                Email:this.state.Email,
                EmailPrivat:this.state.EmailPrivat,
                PhoneNumber:this.state.PhoneNumber,
                DateOfBirth:this.state.DateOfBirth,
                Gender:this.state.Gender,
                City:this.state.City,
                Nationality:this.state.Nationality,
                Address:this.state.Address,
                AgeGroups:this.state.AgeGroups,
                DateOfJoining:this.state.DateOfJoining,
                PhotoFileName:this.state.PhotoFileName
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'Player/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    imageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'Player/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({PhotoFileName:data});
        })
    }

    render(){
        const {
            agegroups,
            player,
            modalTitle,
            PlayerId,
            PlayerName,
            PlayerUsername,
            Email,
            EmailPrivat,
            PhoneNumber,
            DateOfBirth,
            Gender,
            gender,
            City,
            city,
            Nationality,
            nationality,
            Address,
            AgeGroups,
            DateOfJoining,
            PhotoFileName
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Player
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            PlayerId
        </th>
        <th>
            PlayerName
        </th>
        <th>
            PlayerUsername
        </th>
        <th>
            Email
        </th>
        <th>
            EmailPrivat
        </th>
        <th>
            PhoneNumber
        </th>
        <th>
            DateOfBirth
        </th>
        <th>
            Gender
        </th>
        <th>
            City
        </th>
        <th>
            Nationality
        </th>
        <th>
            Address
        </th>
        <th>
            AgeGroups
        </th>
        <th>
            DateOfBirth
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {player.map(plr=>
            <tr key={plr.PlayerId}>
                <td>{plr.PlayerId}</td>
                <td>{plr.PlayerName}</td>
                <td>{plr.PlayerUsername}</td>
                <td>{plr.Email}</td>
                <td>{plr.EmailPrivat}</td>
                <td>{plr.PhoneNumber}</td>
                <td>{plr.DateOfBirth}</td>
                <td>{plr.Gender}</td>
                <td>{plr.City}</td>
                <td>{plr.Nationality}</td>
                <td>{plr.Address}</td>
                <td>{plr.AgeGroups}</td>
                <td>{plr.DateOfJoining}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(plr)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>

                <button type="button"
                className="btn btn-light mr-1"
                onClick={()=>this.deleteClick(plr.PlayerId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
    <div className="d-flex flex-row bd-highlight mb-3">
     
     <div className="p-2 w-50 bd-highlight">
    
        <div className="input-group mb-3">
            <span className="input-group-text">Player Name</span>
            <input type="text" className="form-control"
            value={PlayerName}
            onChange={this.changePlayerName}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Player Username</span>
            <input type="text" className="form-control"
            value={PlayerUsername}
            onChange={this.changePlayerUsername}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Email</span>
            <input type="text" className="form-control"
            value={Email}
            onChange={this.changeEmail}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">EmailPrivate</span>
            <input type="text" className="form-control"
            value={EmailPrivat}
            onChange={this.changeEmailPrivat}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">PhoneNumber</span>
            <input type="text" className="form-control"
            value={PhoneNumber}
            onChange={this.changePhoneNumber}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">DateOfBirth</span>
            <input type="date" className="form-control"
            value={DateOfBirth}
            onChange={this.changeDateOfBirth}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Gender</span>
            <select className="form-select"
            onChange={this.changeGender}
            value={Gender}>
                {gender.map(plr=><option key={plr.GenderId}>
                    {plr.GenderName}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">City</span>
            <select className="form-select"
            onChange={this.changeCity}
            value={City}>
                {city.map(plr=><option key={plr.CityId}>
                    {plr.CityName}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Nationality</span>
            <select className="form-select"
            onChange={this.changeNationality}
            value={Nationality}>
                {nationality.map(plr=><option key={plr.NationalityId}>
                    {plr.NationalityName}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Address</span>
            <input type="text" className="form-control"
            value={Address}
            onChange={this.changeAddress}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">AgeGroups</span>
            <select className="form-select"
            onChange={this.changeAgeGroups}
            value={AgeGroups}>
                {agegroups.map(plr=><option key={plr.AgeGroupsId}>
                    {plr.AgeGroupsName}
                </option>)}
            </select>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">DateOfJoining</span>
            <input type="date" className="form-control"
            value={DateOfJoining}
            onChange={this.changeDateOfJoining}/>
        </div>

     </div>
     <div className="p-2 w-50 bd-highlight">
         <img width="250px" height="250px"
         src={variables.PHOTO_URL+PhotoFileName}/>
         <input className="m-2" type="file" onChange={this.imageUpload}/>
     </div>
    </div>

    {PlayerId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

    {PlayerId!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}
   </div>

    </div>
    </div> 
    </div>


    </div>
        )
    }
}