const DEFAULT_MODE_DESKTOP = true;
const MOBILE_MAX_WIDTH = 767;
const DESKTOP_MIN_WIDTH = 768;
const DESKTOP_MENU_MIN_WIDTH = 1000;
const DEFAULT_WIDTH = 768;
const HD_WIDTH = 1440;


function isMobile() {
  if (!global.window) return !DEFAULT_MODE_DESKTOP;
  return window.innerWidth < DESKTOP_MIN_WIDTH;
}
function isDesktop() {
  if (!global.window) return DEFAULT_MODE_DESKTOP;
  return window.innerWidth > MOBILE_MAX_WIDTH;
}
function isDesktopMenu() {
  if (!global.window) return DEFAULT_MODE_DESKTOP;
  return window.innerWidth > DESKTOP_MENU_MIN_WIDTH;
}

export default {
  defaultWidth: DEFAULT_WIDTH,
  desktopWidth: DESKTOP_MIN_WIDTH,
  mobileWidth: MOBILE_MAX_WIDTH,
  hdWidth: HD_WIDTH,
  isDesktop,
  isMobile,
  isDesktopMenu
};