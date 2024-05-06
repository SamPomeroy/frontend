import React, { Component } from 'react'
import Grocery from '../Grocery/Grocery'
import axios from 'axios'
import Button from '../Button'
import './List.css'

export class List extends Component {
    state = {
        list: [],
        input: ""
    }
    async componentDidMount(){
        try {
            const allGroceries = await axios.get("http://localhost:3000/grocery/get-all-groceries")
            this.setState({
                list: allGroceries.data.payload
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleOnChange = (event) => {
        this.setState({
            input: event.target.value
        })
    }

    handleOnSubmit = async (event) => {
        event.preventDefault()
        const foundItem = this.state.list.some(el=>el.grocery === this.state.input)
        if(foundItem){
            this.setState({
                message: "Item already listed"
            })
        }
        if(this.state.message && !foundItem){
            this.setState({
                message: ""
            })
        }
        try {
            if(this.state.input !== "" && !foundItem){
                const newGrocery = await axios.post("http://localhost:3000/grocery/create-grocery", {
                    grocery: this.state.input
                })
                let newArray = [...this.state.list, newGrocery.data.payload]
                this.setState({
                    list: newArray
                })
                this.setState({
                    input: ""
                })
            }
        } catch (error) {
            console.log(error);
        }
    }  

    handlePurchased = async (id, purchased)=>{
        try {
            await axios.put(`http://localhost:3000/grocery/update-grocery/${id}`, {
                purchased: !purchased
            })
        } catch (error) {
            console.log(error);
        }

        let updatedArray = this.state.list.map((grocery)=>{
            if(grocery._id === id){
                grocery.purchased = !grocery.purchased
            }
            return grocery
        })
        this.setState({
            list: updatedArray
        })
    }

   handleOnDelete = async(id)=>{
        try {
            await axios.delete(`http://localhost:3000/grocery/delete-grocery/${id}`)
        } catch (error) {
            console.log(error);
        }
        let updatedArray = this.state.list.filter((grocery)=>grocery._id !== id)
        this.setState({
            list: updatedArray
        })
    }

    handleOnEdit = async(id, editedInput)=>{
        try {
            await axios.put(`http://localhost:3000/grocery/update-grocery/${id}`, {
                grocery: editedInput
            })
        } catch (error) {
            console.log(error);
        }
        let updatedArray = this.state.list.map((grocery)=>{
            if(grocery._id === id){
                grocery.grocery = editedInput
            }
            return grocery
        })
        this.setState({
            list: updatedArray
        })
    }

    sortByDateOldestToNewest = () =>{
        console.log('oldest first')
        const updatedArray = this.state.list.sort((a, b)=>new Date(a.date)- new Date(b.date))
        console.log(updatedArray)
        this.setState({
            list: updatedArray
        })
    }

    sortByDateNewestToOldest = () =>{
        console.log('newest first')
        console.log(this.state.list)
        const updatedArray = this.state.list.sort((a, b)=>new Date(b.date)- new Date(a.date))
        this.setState({
            list: updatedArray
        })
    }

    sortByPurchased = ()=> {
        let updatedArray = this.state.list.sort((x, y)=>{
            return (x.purchased===y.purchased)? 0 : x.purchased? -1 : 1
        })
        this.setState({
            list: updatedArray
        })
    }

    sortByUnpurchased = () => {
        let updatedArray = this.state.list.sort((x, y)=>{
            return (x.purchased === y.purchased)? 0 : x.purchased? 1 : -1
        })
        this.setState({
            list: updatedArray
        })
    }

    render() {
    return (
      <div className='main'>
        <div className="form-div">
            <form className='form'>
                
                <input className='text-input' type="text" onChange={this.handleOnChange} value={this.state.input}/>
                <Button clickFunc={this.handleOnSubmit} text={"ADD"} />
                
            </form>
            {this.state.message ? <p style={{textAlign: 'center'}}>{this.state.message}</p> : ""}
        </div>
        <div className="list-div">
            <div className="sort-div">
                <Button clickFunc={this.sortByDateOldestToNewest} text={"Oldest to Newest"} />
                <Button clickFunc={this.sortByDateNewestToOldest} text={"Newest to Oldest"} />
                <Button clickFunc={this.sortByPurchased} text={"Purchased"} />
                <Button clickFunc={this.sortByUnpurchased} text={"Unpurchased"} />
            </div>
            <ul>
                {this.state.list.map((grocery)=>{
                    return (
                        <Grocery key={grocery._id} grocery={grocery} handleOnDelete={this.handleOnDelete} handlePurchased={this.handlePurchased} handleOnEdit={this.handleOnEdit} />
                    )
                })}
            </ul>
        </div>
      </div>
    )
  }
}

export default List