/**
 * CITYPATCH API Client
 *
 * All network interaction lives here.
 * Connects to the FastAPI backend via Vite proxy (/api/* -> http://127.0.0.1:8000/*).
 */

const API_BASE = '/api';

/**
 * Checks backend health status.
 * @returns {Promise<{ status: string, service: string, version: string }>}
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE}/health`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Core responded with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      error.message || 'CITYPATCH backend is currently offline. Start the local API and try again.'
    );
  }
}

/**
 * Sends a civic scene image and optional context to the analysis pipeline.
 * @param {File} imageFile - JPEG, PNG, or WebP image file
 * @param {string} userContext - Optional notes / context from citizen
 * @returns {Promise<Object>} The complete pipeline diagnosis & patch tier response
 */
export async function analyzeCivicImage(imageFile, userContext = '') {
  if (!imageFile) {
    throw new Error('Please select or drop an image of a civic space.');
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(imageFile.type)) {
    throw new Error('CITYPATCH currently supports JPEG, PNG and WebP images.');
  }

  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('user_context', userContext.trim());

  let response;
  try {
    response = await fetch(`${API_BASE}/analyze`, {
      method: 'POST',
      body: formData
    });
  } catch (networkError) {
    throw new Error(
      'CITYPATCH backend is currently offline. Start the local API and try again.'
    );
  }

  if (!response.ok) {
    let errorDetail = `Analysis failed with status ${response.status}`;
    try {
      const errorJson = await response.json();
      if (errorJson && errorJson.detail) {
        errorDetail = errorJson.detail;
      }
    } catch (_) {
      // response was not JSON
    }

    if (response.status === 503 || errorDetail.includes("temporarily unavailable") || errorDetail.includes("temporarily busy")) {
      throw new Error("Gemini is temporarily busy. CITYPATCH is ready — please retry in a moment.");
    } else if (response.status === 400) {
      throw new Error(errorDetail || 'Invalid image or upload parameters.');
    } else if (response.status === 500) {
      throw new Error('An unexpected internal error occurred during analysis. Please try again.');
    } else {
      throw new Error(errorDetail);
    }
  }

  return await response.json();
}

/**
 * Formats a number or range into Indian Rupee notation (e.g. ₹25,000).
 * @param {number} value
 * @returns {string}
 */
export function formatINR(value) {
  if (value === null || value === undefined || isNaN(value)) return '₹0';
  return '₹' + Math.round(value).toLocaleString('en-IN');
}

/**
 * Formats a min/max cost object into INR range string.
 * @param {{ min: number, max: number }} costObj
 * @returns {string}
 */
export function formatCostRange(costObj) {
  if (!costObj || typeof costObj.min !== 'number' || typeof costObj.max !== 'number') {
    return 'Cost unavailable';
  }
  return `${formatINR(costObj.min)} – ${formatINR(costObj.max)}`;
}

/**
 * Formats a min/max hour object into hour range string.
 * @param {{ min: number, max: number }} hoursObj
 * @returns {string}
 */
export function formatHoursRange(hoursObj) {
  if (!hoursObj || typeof hoursObj.min !== 'number' || typeof hoursObj.max !== 'number') {
    return 'Hours unavailable';
  }
  return `${hoursObj.min}h – ${hoursObj.max}h`;
}

/**
 * Formats snake_case identifiers into human-readable Title Case strings.
 * @param {string} str
 * @returns {string}
 */
export function humanize(str) {
  if (!str) return '';
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}
