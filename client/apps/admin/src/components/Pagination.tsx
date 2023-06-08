import React from 'react';

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const createClass = (current: number, index: number | string) => {
  if (current + '' == index) {
    return 'px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white';
  }
  return 'px-3 py-2 ml-0  text-gray-500 bg-white border border-gray-300  hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white';
};
interface PageItemProps {
  index: string | number;
  current: number;
  onPageChange?: (page: number) => void;
}

function PageItem({ index, current, onPageChange }: PageItemProps) {
  return (
    <li>
      <button
        aria-current="page"
        className={createClass(current, index)}
        onClick={() => onPageChange && onPageChange(Number(index))}
      >
        {index}
      </button>
    </li>
  );
}

function Pagination({ totalPage, currentPage, onPageChange }: PaginationProps) {
  console.log('render pagination');
  if (totalPage <= 8) {
    return (
      <nav aria-label="Page navigation example">
        <ul className="inline-flex text-base -space-x-px">
          {Array.from({ length: totalPage }, (_, i) => (
            <PageItem
              key={i}
              index={i + 1}
              current={currentPage}
              onPageChange={onPageChange}
            />
          ))}
        </ul>
      </nav>
    );
  }
  const pages: React.ReactNode[] = [];
  if (currentPage <= 3) {
    for (let i = 1; i <= 4; i++) {
      pages.push(
        <PageItem
          key={i}
          index={i}
          current={currentPage}
          onPageChange={onPageChange}
        />
      );
    }
    pages.push(<PageItem key={5} index={'...'} current={currentPage} />);
    for (let i = totalPage - 1; i <= totalPage; i++) {
      pages.push(
        <PageItem
          key={i}
          index={i}
          current={currentPage}
          onPageChange={onPageChange}
        />
      );
    }
    return (
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">{pages}</ul>
      </nav>
    );
  }
  if (currentPage >= totalPage - 2) {
    for (let i = 1; i <= 2; i++) {
      pages.push(
        <PageItem
          key={i}
          index={i}
          current={currentPage}
          onPageChange={onPageChange}
        />
      );
    }
    pages.push(<PageItem key={-2} index={'...'} current={currentPage} />);
    for (let i = totalPage - 4; i <= totalPage; i++) {
      pages.push(
        <PageItem
          key={i}
          index={i}
          current={currentPage}
          onPageChange={onPageChange}
        />
      );
    }
    return (
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">{pages}</ul>
      </nav>
    );
  }
  for (let i = 1; i <= 2; i++) {
    pages.push(
      <PageItem
        key={i}
        index={i}
        current={currentPage}
        onPageChange={onPageChange}
      />
    );
  }
  if (currentPage > 3) {
    pages.push(<PageItem key={-1} index={'...'} current={currentPage} />);
  }
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    pages.push(
      <PageItem
        key={i}
        index={i}
        current={currentPage}
        onPageChange={onPageChange}
      />
    );
  }
  if (currentPage < totalPage - 3) {
    pages.push(<PageItem key={-2} index={'...'} current={currentPage} />);
  }
  for (let i = totalPage - 1; i <= totalPage; i++) {
    pages.push(
      <PageItem
        key={i}
        index={i}
        current={currentPage}
        onPageChange={onPageChange}
      />
    );
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px">{pages}</ul>
    </nav>
  );
}

const MemoPagination = React.memo(Pagination);
export default MemoPagination;
