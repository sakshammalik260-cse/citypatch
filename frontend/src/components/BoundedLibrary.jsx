import React, { useState } from 'react';
import { Layers, ShieldCheck, Info } from 'lucide-react';
import { humanize } from '../api/citypatchApi';

// 12 bounded prototype civic intervention modules from data/civic_modules.json
const BOUNDED_MODULES = [
  {
    category: 'pedestrian_safety',
    title: 'Pedestrian Safety',
    modules: [
      { id: 'CP001', name: 'Modular Pedestrian Refuge Island', solves: ['unsafe_crossing', 'long_crossing_distance', 'pedestrian_vehicle_conflict'], hours: '4-12h' },
      { id: 'CP002', name: 'Solar Safety Bollard', solves: ['unsafe_crossing', 'poor_visibility', 'pedestrian_vehicle_conflict'], hours: '1-3h' },
      { id: 'CP003', name: 'Raised Crossing Module', solves: ['unsafe_crossing', 'long_crossing_distance', 'pedestrian_vehicle_conflict', 'poor_visibility'], hours: '6-16h' },
    ]
  },
  {
    category: 'accessibility',
    title: 'Accessibility',
    modules: [
      { id: 'CP004', name: 'Modular Accessibility Ramp', solves: ['accessibility_barrier', 'broken_walkway'], hours: '3-10h' },
      { id: 'CP005', name: 'Tactile Guidance Path', solves: ['accessibility_barrier', 'broken_walkway'], hours: '3-12h' },
      { id: 'CP006', name: 'Accessible Walkway Module', solves: ['accessibility_barrier', 'broken_walkway', 'pedestrian_vehicle_conflict'], hours: '6-20h' },
    ]
  },
  {
    category: 'heat_public_space',
    title: 'Heat & Public Space',
    modules: [
      { id: 'CP007', name: 'Solar Shade Canopy', solves: ['missing_shade', 'missing_seating'], hours: '6-16h' },
      { id: 'CP008', name: 'Modular Bench', solves: ['missing_seating'], hours: '1-4h' },
      { id: 'CP009', name: 'Planter Barrier', solves: ['pedestrian_vehicle_conflict', 'missing_shade'], hours: '1-5h' },
    ]
  },
  {
    category: 'water_drainage',
    title: 'Water & Drainage',
    modules: [
      { id: 'CP010', name: 'Permeable Paver Module', solves: ['waterlogging', 'poor_drainage', 'broken_walkway'], hours: '6-20h' },
      { id: 'CP011', name: 'Modular Rain Garden', solves: ['waterlogging', 'poor_drainage'], hours: '6-20h' },
      { id: 'CP012', name: 'Surface Drainage Channel', solves: ['waterlogging', 'poor_drainage'], hours: '4-16h' },
    ]
  }
];

export default function BoundedLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredCategories = selectedCategory === 'all'
    ? BOUNDED_MODULES
    : BOUNDED_MODULES.filter(c => c.category === selectedCategory);

  return (
    <div className="bounded-library-card" aria-label="Bounded Civic Patch Library">
      <div className="bounded-library-header">
        <div>
          <div className="library-pill">BOUNDED INFRASTRUCTURE CATALOGUE</div>
          <h3 className="bounded-library-title">BOUNDED CIVIC PATCH LIBRARY (12 PROTOTYPE MODULES)</h3>
          <p className="bounded-library-sub">
            CITYPATCH currently operates over a bounded prototype library of 12 modular civic interventions. Gemini is strictly prohibited from inventing arbitrary or unverified physical objects.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="category-filter-row">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`filter-pill ${selectedCategory === 'all' ? 'pill-active' : ''}`}
          >
            All (12)
          </button>
          {BOUNDED_MODULES.map(cat => (
            <button
              key={cat.category}
              type="button"
              onClick={() => setSelectedCategory(cat.category)}
              className={`filter-pill ${selectedCategory === cat.category ? 'pill-active' : ''}`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Categories and Modules */}
      <div className="bounded-grid">
        {filteredCategories.map(cat => (
          <div key={cat.category} className="bounded-category-block">
            <div className="category-block-title">
              <span className="category-dot" />
              <span>{cat.title.toUpperCase()}</span>
            </div>

            <div className="module-item-list">
              {cat.modules.map(mod => (
                <div key={mod.id} className="bounded-module-row">
                  <div className="module-row-main">
                    <span className="module-id-badge font-mono">{mod.id}</span>
                    <span className="module-row-name">{mod.name}</span>
                  </div>
                  <div className="module-row-meta">
                    <div className="module-solves-tags">
                      {mod.solves.map((p, idx) => (
                        <span key={idx} className="solves-tag">{humanize(p)}</span>
                      ))}
                    </div>
                    <span className="module-hours-badge" title="Estimated installation time">{mod.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="bounded-footer-note">
        <Info size={14} className="text-teal" />
        <span>
          Prototype estimates from <code>data/civic_modules.json</code>. All modules are precast, modular, dry-assembly components designed for non-destructive rapid urban deployment.
        </span>
      </div>
    </div>
  );
}

