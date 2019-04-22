import React from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
export default class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            workername:this.getInfo('name'),
            workerage:this.getInfo('age'),
            shiftStartHour:this.getHours()[0],
            shiftEndHour:this.getHours()[1],
            shiftdate:this.getDate(),
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
            if(this.props.shifts[this.props.id]){
                return this.props.shifts[this.props.id].workingHours
            }
        }
        else{
            if(this.props.shifts[this.props.id]){
                return this.props.shifts[this.props.id].datetime
            }
        }
    }

    handleWorkerName(event){
        this.setState({workername:event.target.value})
    }

    handleWorkerAge(event){
        this.setState({workerage:event.target.value})
    }

    handleshiftStartHour(event){
        this.setState({shiftStartHour:event.target.value})
    }


    handleshiftEndHour(event){
        this.setState({shiftEndHour:event.target.value})
    }

    handleShiftDate(event){
        this.setState({shiftdate:event.target.value})
    }

    editWorker(){
        let url = 'http://localhost:8080/editworker?id=' + this.props.id + '&name=' + this.state.workername + '&age=' + this.state.workerage;
        fetch(url)
    }

    editShift(){
        let date = new Date(this.state.shiftdate);
        let datesec = date.getTime();
        let startHour = this.state.shiftStartHour;
        let endHour = this.state.shiftEndHour;
        let url = 'http://localhost:8080/editshift?id=' + this.props.id + '&startHour=' + startHour + '&endHour=' + endHour + '&date=' + datesec;
        fetch(url);
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
                <Link href="/">
                <Button type='submit' onClick={() => {
                                        this.editWorker()
                                    }}>Edit</Button>
                </Link>
            </form>
        )
    }


    getHours(){
        if(this.getShiftInfo('workhours')){
            let hours = this.getShiftInfo('workhours').split('-');
            return hours
        }
        let hours1 = [0,0]
        return hours1
    }

    getDate(){
        let date = new Date(this.getShiftInfo('date'));
        let string = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        return string

    }


    shifts(){
        return(
            <form>
                <label>Start Hour:
                    <input type="text" name="name" value={this.state.shiftStartHour} onChange={this.handleshiftStartHour.bind(this)}/>
                </label>
                <p></p>
                <label>End Hour:
                    <input type="text" name="name" value={this.state.shiftEndHour} onChange={this.handleshiftEndHour.bind(this)}/>
                </label>
                <p></p>
                <label>Date:
                    <input type="text" name="age" value={this.state.shiftdate} onChange={this.handleShiftDate.bind(this)}></input>
                </label>
                <p></p>
                <Link href="/">
                <Button type='submit' onClick={() => {
                                        this.editShift()
                                    }}>Edit</Button>
                </Link>
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