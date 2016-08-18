/**
 * @name ImagePreloader
 * @param images {Array|String} - Single image URL or Array containing the URL of all the images to preload.
 * @param progressCallback {Function} - Function to call whenever progress changes.
 *
 * Options object:
 * @returns {Promise} - Promise resolves when all images are loaded, and returns array containing all the images
 */
function ImagePreloader(images, progressCallback = null) {
  let imageArray = images;
  if (images && typeof images === 'string') {
    // Wrap String in Array
    imageArray = [images];
  }

  // Invalid source provided for images
  if (!imageArray || imageArray instanceof Array === false) {
    return Promise.reject(new Error('You must provide a list of image paths'));
  }

  // Vars
  const totalImages = imageArray.length;
  let imagesLoaded = 0;
  let currentIndex = 0;
  let imageElements = [];
  imageElements.length = totalImages;
  let promises = [];

  /**
   * Create the promises
   */
  for (let i = 0; i < totalImages; i++) {
    promises.push(configurePromises(i));
  }

  /**
   * Start preloading images
   */
  for (let i = 0; i < totalImages; i++) {
    preload();
  }

  /**
   * Set the image src to start loading.
   */
  function preload() {
    if (currentIndex < imageArray.length) {
      const img = imageElements[currentIndex];
      img.src = imageArray[currentIndex];
      currentIndex++; // Increment index
    }
  }

  /**
   * Construct promises for all the image sources.
   * @param index
   * @returns {Promise}
   */
  function configurePromises(index) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => {
        img.onload = null;
        img.onerror = null;

        updateProgress();
        resolve(img);
      };

      img.onerror = () => {
        img.onload = null;
        img.onerror = null;

        updateProgress();
        reject(new Error(`Failed to load: ${img.src}`));
      };

      // Save the img, so we can can set the src when ready to load.
      imageElements[index] = img;
    });
  }

  /**
   * Report progress whenever an image is loaded.
   */
  function updateProgress() {
    imagesLoaded += 1;
    if (typeof progressCallback === 'function') {
      progressCallback(imagesLoaded / totalImages);
    }

    preload();
  }

  /**
   * Return Promise that resolves once all images are loaded or an error occured.
   */
  return Promise.all(promises).then(() => {
    // Return imageElements to ensure order is maintained.
    const result = imageElements;

    // Cleanup
    imageElements = null;
    promises = null;

    return result;
  });
}

export default ImagePreloader;
