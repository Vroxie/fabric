import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
const fetch = require("isomorphic-fetch");

export default class Fabric extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workername:"Name",
            workerage:0,
            shiftStartHour:0,
            shiftEndHour:0,
            shiftdate: "yyyy-MM-dd"
        };
    }

    static async getInitialProps(){
        let workerurl = 'http://localhost:8080/workers';
        let shifturl = 'http://localhost:8080/shifts';
        let workerinShiftUrl = 'http://localhost:8080/workersinshift';
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

        const workerinShiftRes = await fetch(workerinShiftUrl,{
            method:"GET",
            headers:{
                mode:'cors',
            }
        })
        const workerinShiftBody = await workerinShiftRes.json();

        return {
            workers:workerBody,
            shifts:shiftBody,
            workersInShift:workerinShiftBody
        }
    }


    handleWorkerName(event){
        this.setState({workername:event.target.value})
    }

    handleWorkerAge(event){
        this.setState({workerage:event.target.value})
    }

    workers(){
        return (
            <div>
            <h1>Workers</h1>
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
                                        this.addWorker()
                                    }}>+</Button>
            </form>
            <Table className='tablis' striped bordered hover style={{
                tableLayout:"fixed",
                fontFamily:"Helvetica"
            }}>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.workers.map(worker =>(
                            <tr>
                                <td>{worker.id}</td>
                                <td>{worker.name}</td>
                                <td>{worker.age}</td>
                                <Button type='submit' onClick={() => {
                                        this.deleteWorker(worker.id)
                                    }}>-</Button>
                            </tr>
                        ))
                    }
                </tbody>
                </Table>
            </div>
        )
    }

    handleStartHour(event){
        this.setState({shiftStartHour:event.target.value})
    }

    handleEndHour(event){
        this.setState({shiftEndHour:event.target.value})
    }

    handleshiftDate(event){
        this.setState({shiftdate:event.target.value})
    }

    shifts(){
        return (
            <div>
            <h1>Shifts</h1>
            <form>
                <label>StartHour:
                    <input type="text" name="startHour" value={this.state.shiftStartHour} onChange={this.handleStartHour.bind(this)}></input>
                </label>
                <p></p>
                <label>EndHour:
                    <input type="text" name="endHour" value={this.state.shiftEndHour} onChange={this.handleEndHour.bind(this)}></input>
                </label>
                <p></p>
                <label>Date:
                    <input type="text" name="date" value={this.state.shiftdate} onChange={this.handleshiftDate.bind(this)}></input>
                </label>
                <p></p>
                <Button type='submit' onClick={() => {
                                        this.addShift()
                                    }}>+</Button>
            </form>
            <Table className='tablis' striped bordered hover style={{
                tableLayout:"fixed",
                fontFamily:"Helvetica"
            }}>
                <thead>
                    <tr>
                    <th>Working Hours</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.shifts.map(shift =>(
                            <tr>
                                <td>{shift.workingHours}</td>
                                <td>{shift.datetime}</td>
                                <Button type='submit' onClick={() => {
                                        this.deleteShift(this.props.shifts.indexOf(shift))
                                    }}>-</Button>
                            </tr>
                        ))
                    }
                </tbody>
                </Table>
            </div>
        )
    }

    booleantoYesOrNo(bool){
        if(bool){
            return "yes"
        }
        else{
            return "no"
        }
    }

    getWorkerName(id){
        let name;
        for(let i=0; i<this.props.workers.length;i++){
            if(this.props.workers[i].id === id){
                name = this.props.workers[i].name;
            }
        }

        return name
    }

    getWorkingHours(id){
        return this.props.shifts[id].workingHours
    }

    getWorkDate(id){
        return this.props.shifts[id].datetime
    }

    deleteWorkerInShift(id){
        let url = 'http://localhost:8080/del?type=workinshift&id=' + id;
        console.log(url)
        fetch(url),{
            method:"GET",
            headers:{
                mode:'cors',
            }
        };
    }

    deleteWorker(id){
        let url = 'http://localhost:8080/del?type=workers&id=' + id;
        fetch(url);
    }

    deleteShift(id){
        let url = 'http://localhost:8080/del?type=shifts&id=' + id;
        fetch(url);
    }

    addWorker(){
        if(this.state.workername === "Name" || this.state.workerage === 0){

        }
        else{
            let url = 'http://localhost:8080/addworker?name=' + this.state.workername + '&age=' + this.state.workerage
            fetch(url);
            this.forceUpdate()
        }
    }

    addShift(){
        if((this.state.shiftStartHour === 0 || this.state.shiftStartHour === this.state.shiftEndHour) || this.state.shiftEndHour === 0){
            if(this.state.datetime === "yyyy-MM-dd"){
            }
        }
        else{
            let startHour = this.state.shiftStartHour;
            let endHour = this.state.shiftEndHour;
            let date = new Date(this.state.shiftdate);
            let d = date.getTime();

            let url = 'http://localhost:8080/addshift?startHour=' + startHour + '&endHour=' + endHour + '&date=' + d;
            fetch(url);
            this.forceUpdate()
        }

    }

    addWorkerinShift(){

    }

    workersinShift(){
        return(
            <div>
                <h1>Workers In Shift</h1>
                <Button type='submit' onClick={() => {
                                        this.addWorkerinShift()
                                    }}>+</Button>
                <Table className='tablis' striped bordered hover style={{
                    tableLayout:"fixed",
                    fontFamily:"Helvetica"
                }}>
                    <thead>
                        <tr>
                        <th>Worker</th>
                        <th>Work hours</th>
                        <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.workersInShift.map(workshift =>(
                                <tr>
                                    <td>{this.getWorkerName(workshift.workerId)}</td>
                                    <td>{this.getWorkingHours(workshift.shiftId)}</td>
                                    <td>{this.getWorkDate(workshift.shiftId)}</td>
                                    <Button type='submit' onClick={() => {
                                        this.deleteWorkerInShift(this.props.workersInShift.indexOf(workshift))
                                    }}>-</Button>
                                </tr>
                            ))
                        }
                    </tbody>
                    </Table>
                </div>
        )
    }


    render(){
    return (<div>
    {this.workers()}
    {this.shifts()}
    {this.workersinShift()}
    </div>)
    }
}
