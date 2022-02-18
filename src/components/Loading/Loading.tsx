import React from 'react'
import './Loading.css'

type LoadingData = {
  getData(url: string): void,
  smallData: string,
  bigData: string
}

export const Loading: React.FC<LoadingData> = props => { 
  const onLoadingHandler = (url: string) => {		 
    props.getData(url);
  }
  return (
    <div className="Loading">        
      <button className="btn btn-primary mb-2" onClick={() => onLoadingHandler(props.smallData)}>Загрузить Small Data</button>
      <button className="btn btn-primary mb-2" onClick={() => onLoadingHandler(props.bigData)}>Загрузить Big Data</button>             
    </div>
  )
}
