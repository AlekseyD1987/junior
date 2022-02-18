import React, {useState} from 'react'
import './Search.css'

type SearchData = {
  onSearch(text: string): void
}

export const Search: React.FC<SearchData> = props => {
  const [searchData, setData] = useState<string>('');

  const onEditInput = (e:React.ChangeEvent<HTMLInputElement>) => {		 
    const {value} = e.currentTarget
    setData(value)
  }

  const onSearchHandler = () => {		 
    props.onSearch(searchData);
  }
  return (
    <div className="Search">
      <div className="form-group">
        <input type="text" className="form-control" id="search"  placeholder="Введите слово или фразу" onChange={onEditInput} value={searchData}/>
      </div>   
      <button className="btn btn-primary mb-2" onClick={onSearchHandler}>Найти</button>          
    </div>
  )
}
