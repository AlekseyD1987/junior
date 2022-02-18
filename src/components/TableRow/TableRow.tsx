import React from 'react'
import './TableRow.css'
import 'bootstrap/dist/css/bootstrap.min.css'

type TableData = {
  data: {
    id: number;
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: {
      streetAddress: string,
      city: string,
      state: string,
      zip: number
    },
    description: string
  },
  rowInfo(id: number): any
  num: number,
  cls: string[]
}

export const TableRow: React.FC<TableData> = props => {   
  const onRowHandler = (row: number) => {	    
    props.rowInfo(row)   
  }
  return (
    <tr className={props.cls.join(' ')} onClick={() => onRowHandler(props.num)}>
      <th scope="row">{props.data.id}</th>
      <td>{props.data.firstName}</td>
      <td>{props.data.lastName}</td>
      <td>{props.data.email}</td>
      <td>{props.data.phone}</td>      
      <td>
        {props.data.address.streetAddress}<br/>
        {props.data.address.city}<br/>
        {props.data.address.state}<br/>
        {props.data.address.zip}<br/>
      </td>
      <td>{props.data.description}</td>
    </tr> 
  )
}
