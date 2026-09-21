import React, { useState, useRef, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import UploadWorkspace from './components/UploadWorkspace';
import LoadingState from './components/LoadingState';
import ReviewBanner from './components/ReviewBanner';
import DiagnosisView from './components/DiagnosisView';
import SiteReality from './components/SiteReality';
import PatchComparison from './components/PatchComparison';
import PatchDetail from './components/PatchDetail';
import CandidateRanking from './components/CandidateRanking';
import PatchPassport from './components/PatchPassport';
import ErrorBanner from './components/ErrorBanner';
import Footer from './components/Footer';
import { analyzeCivicImage } from './api/citypatchApi';
import gsap from 'gsap';

export default function App() {
  const [is3DActive, setIs3DActive] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [userContext, setUserContext] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedTierKey, setSelectedTierKey] = useState('smart');
  const [error, setError] = useState(null);

  // Draft Patch Passport State
  const [isPassportActive, setIsPassportActive] = useState(false);
  const [passportId, setPassportId] = useState('');
  const [passportCreatedAt, setPassportCreatedAt] = useState('');

  const resultsRef = useRef(null);
  const passportRef = useRef(null);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleToggle3D = () => {
    setIs3DActive((prev) => !prev);
  };

  const handleFileSelect = (file) => {
    if (!file) return;

    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.type)) {
      setError(new Error('CITYPATCH supports JPEG, PNG, and WebP images.'));
      return;
    }

    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
  };

  const handleRemoveFile = () => {
    if (previewUrl && previewUrl.startsWith('blob:')) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setIsPassportActive(false);
  };

  const handleScanClick = () => {
    const el = document.getElementById('workspace');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const data = await analyzeCivicImage(selectedFile, userContext);
      setResult(data);
      setIsPassportActive(false);

      // Smooth scroll to results command center
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          gsap.fromTo(
            resultsRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }
          );
        }
      }, 200);
    } catch (err) {
      setError(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Generate / Activate Draft Patch Passport
  const handlePreparePassport = () => {
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const newId = `CP-DRAFT-${todayStr}-${randomCode}`;
    const nowFormatted = new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    setPassportId(newId);
    setPassportCreatedAt(nowFormatted);
    setIsPassportActive(true);

    setTimeout(() => {
      const el = document.getElementById('patch-passport');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );
      }
    }, 150);
  };

  const currentTier = result?.patch_tiers?.[selectedTierKey];
  const currentSummary = result?.tier_summary?.[selectedTierKey];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Floating Glass Navigation */}
      <Navbar is3DActive={is3DActive} onToggle3D={handleToggle3D} />

      <main style={{ flex: 1 }}>
        {/* Page 1: Full-Screen Cinematic Hero */}
        <Hero is3DActive={is3DActive} onScanClick={handleScanClick} />

        {/* Page 2: Civic Scanner & Intake Workspace */}
        <UploadWorkspace
          selectedFile={selectedFile}
          previewUrl={previewUrl}
          userContext={userContext}
          setUserContext={setUserContext}
          onFileSelect={handleFileSelect}
          onRemoveFile={handleRemoveFile}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
        />

        {/* Cinematic Compilation Sequence */}
        {isAnalyzing && <LoadingState />}

        {/* Error Alert */}
        {error && <ErrorBanner error={error} onRetry={handleAnalyze} />}

        {/* Page 3: Results Command Center */}
        {result && (
          <section ref={resultsRef} className="results-section">
            <div className="app-container">
              {/* Mandatory Engineer Review Notice Banner */}
              <ReviewBanner
                requiresReview={result.requires_human_review}
                disclaimer={result.disclaimer}
              />

              {/* Scene Overview (Photo beside classification & summary) + Diagnosis Cards */}
              <DiagnosisView
                diagnosis={result.diagnosis}
                previewUrl={previewUrl}
              />

              {/* Site Reality: Constraints & Missing Information */}
              <SiteReality
                constraints={result.diagnosis?.constraints}
                missingInformation={result.diagnosis?.missing_information}
              />

              {/* Quick / Smart / Full Spatial Tier Selector */}
              <PatchComparison
                patchTiers={result.patch_tiers}
                tierSummaries={result.tier_summary}
                selectedTierKey={selectedTierKey}
                onSelectTier={setSelectedTierKey}
                onPreparePassport={handlePreparePassport}
              />

              {/* Selected Patch Specifications & Modules */}
              {currentTier && (
                <PatchDetail
                  selectedTier={currentTier}
                  summary={currentSummary}
                  tierName={currentTier.name || selectedTierKey}
                />
              )}

              {/* Why These Patches? Deterministic Candidate Ranking */}
              <CandidateRanking candidates={result.candidate_modules} />

              {/* P1: Draft Patch Passport & City-As-Software Lifecycle */}
              {isPassportActive && currentTier && (
                <PatchPassport
                  diagnosis={result.diagnosis}
                  selectedTier={currentTier}
                  summary={currentSummary}
                  tierName={currentTier.name || selectedTierKey}
                  passportId={passportId}
                  createdAt={passportCreatedAt}
                />
              )}
            </div>
          </section>
        )}
      </main>

      {/* Clean Minimal Footer */}
      <Footer />
    </div>
  );
}
