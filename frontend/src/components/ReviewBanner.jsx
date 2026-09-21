import React from 'react';
import { ShieldAlert } from 'lucide-react';

export default function ReviewBanner({ requiresReview, disclaimer }) {
  if (!requiresReview && !disclaimer) return null;

  return (
    <div className="review-banner">
      <ShieldAlert size={28} className="review-banner-icon" style={{ flexShrink: 0 }} />
      <div>
        <h4 className="review-banner-title">ENGINEER REVIEW REQUIRED</h4>
        <p className="review-banner-desc">
          CITYPATCH provides preliminary modular intervention options. Physical deployment requires site-specific professional review.
        </p>
        {disclaimer && (
          <p className="review-banner-disclaimer">
            {disclaimer}
          </p>
        )}
      </div>
    </div>
  );
}
