import React from 'react'

function Pagination({perPage, total, paginate}) {

  const pageNumbers = [];

  for(let i=1; i<=Math.ceil(total/perPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <ul className="d-flex pagination">
      {pageNumbers.map((n, index) => (
        <li key={index} onClick={() => paginate(n)} className="page">
          {n}
        </li>
      ))}
    </ul>
  );
}

export default Pagination