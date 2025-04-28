import styled from 'styled-components';

interface Props extends SimpleComponent {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationWrapper = styled.div``;

function Pagination({ totalPages, currentPage, onPageChange }: Props) {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages - 1, totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 2, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        );
      }
    }
    return pages;
  };
  return (
    <PaginationWrapper className="w-full flex items-center justify-between space-x-2 my-4">
      <div className='w-[10rem]'>
        {currentPage !== 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border flex items-center cursor-pointer rounded-full border-gray-200 bg-white text-gray-400"
          >
            ← Previous
          </button>
        )}
      </div>
      <div className="flex gap-2">
        {getPageNumbers().map((num, index) =>
          typeof num === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(num)}
              className={`px-3 py-2 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer ${
                currentPage === num
                  ? 'bg-gray-50 text-gray-800'
                  : 'bg-white text-gray-600'
              }`}
            >
              {num}
            </button>
          ) : (
            <span key={index} className="px-2 py-2 text-gray-500">
              {num}
            </span>
          ),
        )}
      </div>
      <div  className='w-[10rem] justify-end flex'>
        {currentPage !== totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border flex items-center cursor-pointer rounded-full border-gray-200 bg-white text-gray-400"
          >
            Next →
          </button>
        )}
      </div>
    </PaginationWrapper>
  );
}

export default Pagination;
