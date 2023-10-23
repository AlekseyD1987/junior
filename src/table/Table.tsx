import React from 'react';
import { connect } from 'react-redux';
import { fetchTable, changeTable } from '../actions/table';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Table.css';
import * as Icon from 'react-bootstrap-icons';
import { TableRow } from '../components/TableRow/TableRow';
import { Pagination } from '../components/Pagination/Pagination';
import { Search } from '../components/Search/Search';
import { RowInfo } from '../components/RowInfo/RowInfo';
import { Loading } from '../components/Loading/Loading';
import { WaitLoading } from '../components/WaitLoading/WaitLoading';
import AddForm from '../components/AddForm/AddForm';

type LoadTable = {
  table: any;
  isFinished: boolean;
  loading: boolean;
};
type FetchTable = {
  fetchTable(url: string): any[];
  changeTable(data: any): any[];
  table: any[];
  isFinished: boolean;
  loading: boolean;
};

class Table extends React.Component<FetchTable> {
  state = {
    url: '',
    start: 0,
    current: 1,
    step: 10,
    search: '',
    sort: {
      field: '',
      ask: false,
    },
    viewRow: null,
    viewModal: false,
  };

  renderPreload = () => {
    if (!this.props.isFinished && !this.props.loading) {
      return (
        <Loading
          getData={this.getData}
          smallData="http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
          bigData="http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
        />
      );
    } else if (this.props.loading) {
      return <WaitLoading />;
    }
  };

  renderTableHead = (data: any[]) => {
    let arrHead: any[] = [];
    for (let key in data[0]) {
      if (key !== 'address') {
        arrHead.push(
          <th key={key} onClick={() => this.setSort(key)}>
            {key}
            {this.state.sort.field === key && this.state.sort.ask ? (
              <Icon.CaretDownFill />
            ) : (
              <Icon.CaretUpFill />
            )}
          </th>,
        );
      } else {
        arrHead.push(<th key={key}>{key}</th>);
      }
    }
    return arrHead;
  };

  renderTable = (data: any[]) => {
    let arr: any[] = [];
    let len: number;
    let cls: string[];
    if (data.length > 0) {
      if (data.length - this.state.current * this.state.step > 0) {
        len = this.state.current * this.state.step;
      } else {
        len = data.length;
      }
      for (let i = this.state.start; i < len; i++) {
        this.state.viewRow === i ? (cls = ['TableRow', 'SelectedRow']) : (cls = ['TableRow']);
        /* return data.map((obj, i) => (
        <TableRow
          key={obj.id + '_' + obj.firstName}
          data={obj}
          num={i}
          rowInfo={this.rowInfo}
          cls={this.state.viewRow === i ? ['TableRow', 'SelectedRow'] : ['TableRow']}
        />
      )); */
        arr.push(
          <TableRow
            key={data[i].id + '_' + data[i].firstName}
            data={data[i]}
            num={i}
            rowInfo={this.rowInfo}
            cls={cls}
          />,
        );
      }
    }
    return arr;
  };

  getFilterd = (array: any[]) => {
    let arrayFiltered: any[] = [];
    for (let x = 0; x < array.length; x++) {
      if (this.state.search) {
        if (JSON.stringify(array[x]).indexOf(this.state.search) > -1) {
          arrayFiltered.push(array[x]);
        }
      } else {
        arrayFiltered.push(array[x]);
      }
    }
    return arrayFiltered;
  };

  paginationHandler = (page: number) => {
    if (this.state.current !== page) {
      this.setState({
        start: this.state.step * (page - 1),
        current: page,
        viewRow: null,
      });
    }
  };
  modalHandler = () => {
    this.setState({
      viewModal: !this.state.viewModal,
    });
    document.body.classList.toggle('hidden');
  };

  setSort = (key: string) => {
    this.setState({
      sort: {
        field: key,
        ask: !this.state.sort.ask,
      },
    });
  };

  sortTable = (table: any[]) => {
    if (this.state.sort.ask) {
      table.sort((a, b) => (a[this.state.sort.field] < b[this.state.sort.field] ? 1 : -1));
    } else {
      table.sort((a, b) => (a[this.state.sort.field] > b[this.state.sort.field] ? 1 : -1));
    }
    return table;
  };

  onSearch = (text: string) => {
    this.setState({
      search: text,
      start: 0,
      current: 1,
      viewRow: null,
    });
  };
  onAdd = (data: any, viewModal: boolean) => {
    this.modalHandler();
    this.props.changeTable([data, ...this.props.table]);
  };
  getData = (url: string) => {
    this.props.fetchTable(url);
  };

  rowInfo = (id: number) => {
    if (this.state.viewRow === id) {
      this.setState({
        viewRow: null,
      });
    } else {
      this.setState({
        viewRow: id,
      });
    }
  };

  render() {
    return (
      <div className="container">
        {this.renderPreload()}

        {this.props.isFinished ? (
          <div className="topButtons">
            <div className="addButton">
              <button className="btn btn-primary mb-2" onClick={this.modalHandler}>
                Добавить
              </button>
            </div>
            <Search onSearch={this.onSearch} />
          </div>
        ) : null}
        <div className="row">
          <table className="table">
            <thead>
              <tr>{this.renderTableHead(this.props.table)}</tr>
            </thead>
            <tbody>{this.renderTable(this.sortTable(this.getFilterd(this.props.table)))}</tbody>
          </table>
        </div>
        {this.props.isFinished && this.props.table.length > 0 ? (
          <Pagination
            length={this.getFilterd(this.props.table).length}
            current={this.state.current}
            paginationHandler={this.paginationHandler}
            rangePages={3}
          />
        ) : null}
        {this.state.viewRow !== null ? (
          <RowInfo row={this.props.table[this.state.viewRow]} />
        ) : null}
        {this.state.viewModal ? (
          <AddForm onAdd={this.onAdd} modalHandler={this.modalHandler} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (store: LoadTable) => {
  return {
    table: store.table.table,
    isFinished: store.table.isFinished,
    loading: store.table.loading,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchTable: (url: string) => dispatch(fetchTable(url)),
    changeTable: (arrayFiltered: any) => dispatch(changeTable(arrayFiltered)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
