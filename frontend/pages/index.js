import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
const fetch = require("isomorphic-fetch");
import Link from 'next/link';

export default class Fabric extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workername:"Name",
            workerage:0,
            shiftStartHour:0,
            shiftEndHour:0,
            shiftdate: "yyyy-MM-dd",
            workerid:"Id of worker",
            shiftid:"Id of shift",
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
                            <tr key={worker.id}>
                                <td>{worker.id}</td>
                                <td>{worker.name}</td>
                                <td>{worker.age}</td>
                                <td>
                                <Button type='submit' onClick={() => {
                                        this.deleteWorker(worker.id)
                                    }}>-</Button>
                                </td>
                                <Link as={`/edit/?table=workers&id=${worker.id}`} href={`/edit/?table=workers&id=${worker.id}`}>
                                    <Button type='submit'>Edit</Button>
                                </Link>
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
                    <th>Id:</th>
                    <th>Working Hours</th>
                    <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.shifts.map(shift =>(
                            shift.available ? (
                            <tr key={this.props.shifts.indexOf(shift)}>
                                <td>{this.props.shifts.indexOf(shift)}</td>
                                <td>{shift.workingHours}</td>
                                <td>{shift.datetime}</td>
                                <td>
                                <Button type='submit' onClick={() => {
                                        this.deleteShift(this.props.shifts.indexOf(shift))
                                    }}>-</Button>
                                </td>
                                <td>
                                <Link as={`/edit/?table=shifts&id=${this.props.shifts.indexOf(shift)}`} 
                                    href={`/edit/?table=shifts&id=${this.props.shifts.indexOf(shift)}`}>
                                    <Button type='submit'>Edit</Button>
                                </Link>
                                </td>
                            </tr>
                            ) : (null)
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
        fetch(url),{
            method:"GET",
            headers:{
                mode:'cors',
            }
        };
    }

    deleteWorker(id){
        let bool = true;
        for(let i = 0;i<this.props.workersInShift;i++){
            if(this.props.workersInShift[i].workerid === id){
                bool = false;
            }
        }
        if(bool){
        let url = 'http://localhost:8080/del?type=workers&id=' + id;
        fetch(url);
        }

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
        if(this.state.workerid === "Id of worker" || this.state.shiftid === "Id of shift"){
        }
        else{
            if(this.props.shifts[this.state.shiftid] && this.props.shifts[this.state.shiftid].available){
            let wid = this.state.workerid;
            let sid = this.state.shiftid;
            let url = 'http://localhost:8080/addworkinshift?workerId=' + wid + '&shiftId=' + sid;
            console.log("VALID")
            fetch(url);
            }
            else{
                console.log("Not valid ids")
            }
        }
    }

    workerexists(id){
        let bool = false;
        for(let i = 0; i < this.props.workers.length;i++){
            if(this.props.workers[i].id === id){
                bool = true;
            }
        }

        return bool
    }


    handleworkerid(event){
        this.setState({workerid:event.target.value})
    }

    handleshiftid(event){
        this.setState({shiftid:event.target.value})
    }

    workersinShift(){
        return(
            <div>
                <h1>Workers In Shift</h1>
                <form>
                <label>Worker:
                    <input type="text" name="worker" value={this.state.workerid} onChange={this.handleworkerid.bind(this)}></input>
                </label>
                <p></p>
                <label>Shift:
                    <input type="text" name="shift" value={this.state.shiftid} onChange={this.handleshiftid.bind(this)}></input>
                </label>
                <p></p>
                <Button type='submit' onClick={() => {
                                        this.addWorkerinShift()
                                    }}>+</Button>
            </form>
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
                                <tr key={this.props.workersInShift.indexOf(workshift)}>
                                    <td>{this.getWorkerName(workshift.workerId)}</td>
                                    <td>{this.getWorkingHours(workshift.shiftId)}</td>
                                    <td>{this.getWorkDate(workshift.shiftId)}</td>
                                    <td>
                                    <Button type='submit' onClick={() => {
                                        this.deleteWorkerInShift(this.props.workersInShift.indexOf(workshift))
                                    }}>-</Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </Table>
                </div>
        )
    }


    render(){
    return (<div className='container'>
    <style jsx>{`

        .container{
            justify-content:center;
            align-items:center;
        }

        .workercss{
        }

        .shiftcss{
        }

        .workerinshift{
        }
    
    `}</style>
    <div className='workercss'>
        {this.workers()}
    </div>
    <div className='shiftcss'>
        {this.shifts()}
    </div>
    <div className='workerinshift'>
        {this.workersinShift()}
    </div>
    </div>)
    }
}
