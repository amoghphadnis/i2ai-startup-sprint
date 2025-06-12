// src/pages/UnicornClub.jsx
import React, { useState, useMemo } from 'react';
import './UnicornClub.css';
import unicorns from '../data/unicorn_club.json';

export default function UnicornClub() {
  // filter & sort state
  const [search, setSearch] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('All Industries');
  const [filterCountry, setFilterCountry] = useState('All Countries');
  const [filterValuation, setFilterValuation] = useState('All Valuations');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // derive filter options
  const industries = useMemo(
    () => ['All Industries', ...new Set(unicorns.map(u => u.Industry || ''))],
    []
  );
  const countries = useMemo(
    () => ['All Countries', ...new Set(unicorns.map(u => u.Country || ''))],
    []
  );

  // apply filters and sorting
  const entries = useMemo(() => {
    let list = unicorns;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        u =>
          u.Company.toLowerCase().includes(q) ||
          u.Industry.toLowerCase().includes(q) ||
          u.Country.toLowerCase().includes(q)
      );
    }
    if (filterIndustry !== 'All Industries') list = list.filter(u => u.Industry === filterIndustry);
    if (filterCountry !== 'All Countries') list = list.filter(u => u.Country === filterCountry);
    if (filterValuation !== 'All Valuations') {
      const minVal = Number(filterValuation.replace(/\D/g, ''));
      list = list.filter(u => u['Valuation ($B)'] >= minVal);
    }
    if (sortKey) {
      list = [...list].sort((a, b) => {
        const aVal = a[sortKey], bVal = b[sortKey];
        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return list;
  }, [search, filterIndustry, filterCountry, filterValuation, sortKey, sortOrder]);

  // pagination calculations
  const totalPages = Math.ceil(entries.length / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return entries.slice(start, start + itemsPerPage);
  }, [entries, currentPage]);

  const resetAll = () => {
    setSearch(''); setFilterIndustry('All Industries'); setFilterCountry('All Countries');
    setFilterValuation('All Valuations'); setSortKey(null); setSortOrder('asc'); setCurrentPage(1);
  };

  // windowed page numbers around current
  const pageNumbers = [];
  const delta = 2; // pages on either side
  const left = Math.max(1, currentPage - delta);
  const right = Math.min(totalPages, currentPage + delta);
  for (let i = left; i <= right; i++) pageNumbers.push(i);

  return (
    <div className="unicorn-page">
        <div className="filters">
        <input
          type="text"
          placeholder="Search for companies, industries, countries..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={filterIndustry} onChange={e => setFilterIndustry(e.target.value)}>
          {industries.map(i => <option key={i}>{i}</option>)}
        </select>
        <select value={filterCountry} onChange={e => setFilterCountry(e.target.value)}>
          {countries.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={filterValuation} onChange={e => setFilterValuation(e.target.value)}>
          <option>All Valuations</option>
          <option>10</option>
          <option>50</option>
          <option>100</option>
          <option>200</option>
        </select>

        <div className="sort-group">
          <button onClick={() => { setSortKey('Rank'); setSortOrder('asc'); }}>Rank: Asc</button>
          <button onClick={() => { setSortKey('Rank'); setSortOrder('desc'); }}>Rank: Desc</button>
          <button onClick={() => { setSortKey('Company'); setSortOrder('asc'); }}>Company: A-Z</button>
          <button onClick={() => { setSortKey('Company'); setSortOrder('desc'); }}>Company: Z-A</button>
          <button onClick={() => { setSortKey('Valuation ($B)'); setSortOrder('asc'); }}>Valuation: Low</button>
          <button onClick={() => { setSortKey('Valuation ($B)'); setSortOrder('desc'); }}>Valuation: High</button>
          <button onClick={() => { setSortKey('Country'); setSortOrder('asc'); }}>Country: A-Z</button>
          <button onClick={() => { setSortKey('Country'); setSortOrder('desc'); }}>Country: Z-A</button>
          <button onClick={resetAll}>Reset</button>
        </div>
        </div>
      <div className="table-card">
        <div className="table-header">
            <span>Rank</span>
            <span>Company</span>
            <span>Valuation ($B)</span>
            <span>Country</span>
            <span>Industry</span>
        </div>
        {paginated.map(u => (
          <div key={u.Rank} className="table-row">
            <span>{u.Rank}</span>
            <span>{u.Company}</span>
            <span>{u['Valuation ($B)']}</span>
            <span>{u.Country}</span>
            <span>{u.Industry}</span>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        >‹ Prev</button>

        {/* first page and left ellipsis */}
        {left > 1 && (
          <>
            <button onClick={() => setCurrentPage(1)}>1</button>
            {left > 2 && <span className="dots">...</span>}
          </>
        )}

        {/* windowed pages */}
        {pageNumbers.map(page => (
          <button
            key={page}
            className={page === currentPage ? 'active' : ''}
            onClick={() => setCurrentPage(page)}
          >{page}</button>
        ))}

        {/* right ellipsis and last page */}
        {right < totalPages && (
          <>
            {right < totalPages - 1 && <span className="dots">...</span>}
            <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
          </>
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        >Next ›</button>
      </div>
    </div>
  );
}
