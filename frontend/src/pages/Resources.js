// Resources page
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getResources } from '../services/api';
import ResourceCard from '../components/ResourceCard';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    search: ''
  });

  useEffect(() => {
    fetchResources();
  }, [filters]);

  const fetchResources = async () => {
    try {
      const res = await getResources(filters);
      setResources(res.data);
    } catch (err) {
      console.error('Error fetching resources:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return <div className="container">Loading resources...</div>;
  }

  return (
    <section className="resources">
      <div className="container">
        <div className="section-title">
          <h2>Learning Resources</h2>
          <p>Explore our curated collection of free educational materials</p>
        </div>

        {/* Filters */}
        <div className="filters">
          <input
            type="text"
            placeholder="Search resources..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="form-input"
          />
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="form-select"
          >
            <option value="all">All Categories</option>
            <option value="mathematics">Mathematics</option>
            <option value="science">Science</option>
            <option value="programming">Programming</option>
            <option value="languages">Languages</option>
            <option value="humanities">Humanities</option>
            <option value="arts">Arts</option>
            <option value="business">Business</option>
            <option value="test-prep">Test Preparation</option>
          </select>
        </div>

        {/* Resources Grid */}
        <div className="resource-grid">
          {resources.map(resource => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resources;