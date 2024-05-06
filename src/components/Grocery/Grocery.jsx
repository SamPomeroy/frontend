import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Grocery.css'

export class Grocery extends Component {
    
    state = {
        isEditable: false,
        editInput: this.props.grocery.grocery
    }

    handleOnChange = (event) => {
        this.setState({
            editInput: event.target.value
        })
    }

    handleEditOnClick = (event) => {
        if(event.target.innerText === "Done" && this.state.editInput){
            this.props.handleOnEdit(this.props.grocery._id, this.state.editInput)
        }
        this.setState({
            isEditable: !this.state.isEditable,
            editInput: this.props.grocery.grocery
        })
    }

  render() {
    const { grocery, purchased, _id, date} = this.props.grocery
    const { handlePurchased, handleOnDelete } = this.props
    return (
      <div className='grocery-div'>
        <div className="list">
        {
            this.state.isEditable ? <input type="text" value={this.state.editInput} onChange={this.handleOnChange} /> : <li className={`li style ${purchased ? "li-style-isDone" : ""}`} >{grocery}</li>
        }
        </div>
        <div className="button-div">
            <button id="edit" onClick={this.handleEditOnClick} >{this.state.isEditable ? "Done" : "Edit"}</button>
            <button id="purchased" onClick={()=>handlePurchased(_id, purchased)} >Purchased</button>
            <button id="delete" onClick={()=>handleOnDelete(_id)} >Delete</button>
        </div>
      </div>
    )
  }
}

Grocery.propTypes = {
    grocery: PropTypes.object.isRequired,
    handleOnDelete: PropTypes.func.isRequired,
    handleOnEdit: PropTypes.func.isRequired,
    handlePurchased: PropTypes.func.isRequired
}

export default Grocery