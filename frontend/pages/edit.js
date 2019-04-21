import React from 'react';
import Button from 'react-bootstrap/Button';
export default class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workername:this.getInfo('name'),
            workerage:this.getInfo('age'),
        };
    }


    static async getInitialProps(context){
        let workerurl = 'http://localhost:8080/workers';
        let shifturl = 'http://localhost:8080/shifts';
        const workerRes = await fetch(workerurl,{
            method:"GET",
            headers:{
                mode:'cors',
            }
        })
        const workerBody = await workerRes.json();

        const shiftRes = await fetch(shifturl,{
            method:"GET",
            headers:{
                mode:'cors',
            }
        })
        const shiftBody = await shiftRes.json();
        return {
            workers:workerBody,
            shifts:shiftBody,
            id:context.query.id,
            table:context.query.table
        }
    }

    getInfo(info){
        for(let i=0;i<this.props.workers.length;i++){
            if(this.props.workers[i].id == this.props.id){
                if(info === 'name'){
                    return this.props.workers[i].name
                }
                else{
                    return this.props.workers[i].age
                }
            }
        }
    }

    getShiftInfo(info){
        if(info === 'workhours'){
            return this.props.shifts[this.props.id].workingHours
        }
        else{
            return this.props.shifts[this.props.id].datetime
        }
    }

    handleWorkerName(event){
        this.setState({workername:event.target.value})
    }

    handleWorkerAge(event){
        this.setState({workerage:event.target.value})
    }

    handleshiftworkerhours(event){
        this.setState({shiftworkhours:event.target.value})
    }

    handleShiftDate(event){
        this.setState({shiftdate:event.target.value})
    }

    editWorker(){
        let url = 'http://localhost:8080/editworker?id=' + this.props.id + '&name=' + this.state.workername + '&age=' + this.state.workerage;
        fetch(url)
    }

    editShift(){
      
    }


    workers(){
        return(
            <form>
                <label>Name:
                    <input type="text" name="name" value={this.state.workername} onChange={this.handleWorkerName.bind(this)}/>
                </label>
                <p></p>
                <label>Age:
                    <input type="text" name="age" value={this.state.workerage} onChange={this.handleWorkerAge.bind(this)}></input>
                </label>
                <p></p>
                <Button type='submit' onClick={() => {
                                        this.editWorker()
                                    }}>Edit</Button>
            </form>
        )
    }

    shifts(){
        return(
            <form>
                <label>Work Hours:
                    <input type="text" name="name" value={this.state.shiftworkhours} onChange={this.handleshiftworkerhours.bind(this)}/>
                </label>
                <p></p>
                <label>Date:
                    <input type="text" name="age" value={this.state.shiftdate} onChange={this.handleShiftDate.bind(this)}></input>
                </label>
                <p></p>
                <Button type='submit' onClick={() => {
                                        this.editShift()
                                    }}>Edit</Button>
            </form>
        )
    }
    

    render(){
        if(this.props.table === 'workers'){
            return(
                <div>
                    <h1>EDIT Worker</h1>
                    {this.workers()}
    
                </div>
            )
        }
        else{
            return(
                <div>
                    <h1>EDIT Shift</h1>
                    {this.shifts()}

                </div>
            )
        }
    }
}