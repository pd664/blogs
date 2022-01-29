import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Homepostpreview from './components/posts/homepostpreview'
import './styles/paginate.css'
// Example items, to simulate fetching from another resources.


function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
      
        currentItems.map((post, key) => {
            let a = post.postbody;
            let b = a.search('<img src="');
            let c;
            if (b !== -1) {
              c = a.indexOf(">", b);
            }

            return (
              <div>
                <Homepostpreview
                  key={key}
                  post={post.postbody}
                  title={post.posttitle}
                  img={a.substring(b, c + 1)}
                  authourid={post.authourid}
                  authourname={post.authourname}
                  postid={post.id}
                />
              </div>
            );
          })}
    </>
  );
}

function PaginatedItems({ itemsPerPage, items }) {
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      {/* <div className="container mt-4"> */}
      <ReactPaginate
        breakLabel="..."
        // breakClassName="abc"
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={'pagination'} 
        subContainerClassName={'pages pagination'} 
        activeClassName={'active'}
      />
      {/* </div> */}
    </>
  );
}

export default PaginatedItems