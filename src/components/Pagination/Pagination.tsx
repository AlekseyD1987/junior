import React from 'react';
import './Pagination.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type NaviData = {
  length: number;
  current: number;
  paginationHandler(page: number): void;
  rangePages: number;
};

export const Pagination: React.FC<NaviData> = (props) => {
  const currentPage = (page: number) => {
    let classes: string = 'page-item';
    if (props.current === page) {
      classes = 'page-item active';
    }
    return classes;
  };

  const renderNavi = () => {
    const arr: any[] = [];
    const total = Math.ceil(props.length / 10);
    let left = props.current - props.rangePages;
    let right = props.current + props.rangePages;

    // left pages + current
    if (props.current - props.rangePages > 1) {
      arr.push(
        <li key={'page_1'} className="page-item">
          <span className="page-link" onClick={() => changePage(1)}>
            1
          </span>
        </li>,
      );
    }
    for (let j = left; j <= props.current; j++) {
      if (j > 0) {
        arr.push(
          <li key={'page_' + j} className={currentPage(j)}>
            <span className="page-link" onClick={() => changePage(j)}>
              {j}
            </span>
          </li>,
        );
      }
    }
    // right pages
    for (let j = props.current + 1; j <= right; j++) {
      if (j <= total) {
        arr.push(
          <li key={'page_' + j} className="page-item">
            <span className="page-link" onClick={() => changePage(j)}>
              {j}
            </span>
          </li>,
        );
      }
    }
    if (props.current + props.rangePages < total) {
      arr.push(
        <li key={'page_' + total} className="page-item">
          <span className="page-link" onClick={() => changePage(total)}>
            {total}
          </span>
        </li>,
      );
    }

    return arr;
  };
  const changePage = (page: number) => {
    props.paginationHandler(page);
  };

  return (
    <div className="row">
      <div className="Pagination">
        <nav>
          <ul className="pagination pagination-lg">{renderNavi()}</ul>
        </nav>
      </div>
    </div>
  );
};
