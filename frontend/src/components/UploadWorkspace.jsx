import React, { useRef, useState } from 'react';
import { UploadCloud, RefreshCw, X, AlertTriangle, ArrowRight } from 'lucide-react';

export default function UploadWorkspace({
  selectedFile,
  previewUrl,
  userContext,
  setUserContext,
  onFileSelect,
  onRemoveFile,
  onAnalyze,
  isAnalyzing,
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  const handleLoadDemo = async (e) => {
    e.stopPropagation();
    try {
      const res = await fetch('/demo_civic_scene.jpg');
      if (!res.ok) throw new Error('Demo asset unavailable');
      const blob = await res.blob();
      const file = new File([blob], 'demo_civic_scene.jpg', { type: 'image/jpeg' });
      onFileSelect(file);
    } catch (err) {
      console.error('Failed to load demo image', err);
    }
  };

  return (
    <section id="workspace" className="scanner-section">
      <div className="app-container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">SPATIAL CIVIC SCANNER</span>
          <h2 className="section-heading">Ingest Civic Space</h2>
          <p className="section-desc">
            Provide a clear photograph of a street, pedestrian walkway, transit stop, or public space for automated structural diagnosis.
          </p>
        </div>

        {/* Spatial Hardware Scanner Grid */}
        <div className="scanner-grid">
          {/* Left Column: Architectural Hardware Frame */}
          <div className="scanner-hardware-frame">
            {/* Corner Bracket Hardware Markers */}
            <span className="bracket-tl" />
            <span className="bracket-tr" />
            <span className="bracket-bl" />
            <span className="bracket-br" />

            {/* Hidden Native File Input (Never visible) */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
              onChange={handleFileInput}
            />

            {!previewUrl ? (
              /* Before Upload: Empty Dropzone */
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="scanner-empty-zone"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && fileInputRef.current?.click()}
                aria-label="Upload civic space image"
              >
                <div className="scanner-icon-circle">
                  <UploadCloud size={36} />
                </div>

                <div className="scanner-empty-title">DROP A CIVIC SPACE</div>
                <div className="scanner-empty-formats">JPEG &bull; PNG &bull; WEBP</div>
                <div className="scanner-browse-pill">Click anywhere or drag photo here</div>

                <div style={{ marginTop: '0.85rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>or</span>
                  <button
                    type="button"
                    onClick={handleLoadDemo}
                    className="btn-ctrl"
                    style={{ fontSize: '0.72rem', padding: '0.3rem 0.75rem', pointerEvents: 'auto' }}
                  >
                    Load Demo Photo
                  </button>
                </div>
              </div>
            ) : (
              /* After Upload: Image Viewport with Scanning Beam */
              <div className="scanner-image-viewport">
                <img
                  src={previewUrl}
                  alt="Uploaded Civic Space"
                  className="scanner-loaded-img"
                />

                <div className="scanner-laser" />

                {/* Header Controls Overlay */}
                <div className="scanner-image-controls">
                  <div className="scanner-file-tag" title={selectedFile?.name}>
                    {selectedFile?.name || 'civic_space.jpg'}
                  </div>

                  <div className="scanner-action-buttons">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-ctrl"
                      title="Replace image"
                    >
                      <RefreshCw size={12} />
                      <span>Replace</span>
                    </button>
                    <button
                      onClick={onRemoveFile}
                      className="btn-ctrl btn-ctrl-danger"
                      title="Remove image"
                      aria-label="Remove image"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Context & Analyze Action */}
          <div className="scanner-context-frame">
            <div>
              <label htmlFor="user-context" className="context-label">
                Anything CITYPATCH should know?
              </label>
              <p className="context-help">
                Add optional behavioral or seasonal observations (e.g. foot traffic density, seasonal flooding, vehicle speeds).
              </p>

              <textarea
                id="user-context"
                value={userContext}
                onChange={(e) => setUserContext(e.target.value)}
                placeholder="e.g. Students use this walkway heavily between classes. Area floods during monsoon rains."
                className="context-textarea"
              />
            </div>

            <div className="context-notice">
              <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                Context supports analysis but is not automatically treated as visually verified evidence.
              </div>
            </div>

            <button
              onClick={onAnalyze}
              disabled={!selectedFile || isAnalyzing}
              className="btn-analyze"
            >
              <span>ANALYZE WITH CITYPATCH</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
