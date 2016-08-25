const SCRIPT_MAP = new Map();

/**
 * Load external script, and return a promise that resolves once the script is ready.
 * @param url
 * @returns {Promise}
 */
function load(url) {
  if (!url) return Promise.reject(new Error('No URL supplied to script loader'));
  // Check if script is already loading/loaded
  let promise = SCRIPT_MAP.get(url);

  if (!promise) {
    // Create new Promise that creates a new script tag and sets the src to the URL
    promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.classList.add('async-script');
      script.src = url;
      script.onload = () => resolve(url);
      script.onerror = () => reject(`Failed to load: ${script.src}`);
      document.body.appendChild(script);
    });

    SCRIPT_MAP.set(url, promise);
  }

  return promise;
}

function clearPromises() {
  SCRIPT_MAP.clear();
}

export default {
  clearPromises,
  load
};