import React from 'react'
import './RowInfo.css'

type RowData = {
  row: {
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
}

export const RowInfo: React.FC<RowData> = props => {
  return (
    <div className="RowInfo">
      Выбран пользователь <b>{props.row['firstName']} {props.row['lastName']}</b><br/>
      Описание: {props.row['description']}<br/>
      Адрес проживания: <b>{props.row.address['streetAddress']} </b><br/>
      Город: <b>{props.row.address['city']} </b><br/>
      Провинция/штат: <b>{props.row.address['state']} </b><br/>
      Индекс:  <b>{props.row.address['zip']} </b><br/>  
    </div>
  )
}
