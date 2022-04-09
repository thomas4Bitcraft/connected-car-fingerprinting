export const getScreen = () => {
  return {
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    screen_depth: window.screen.colorDepth,
    screen_availTop: window.screen.availTop,
    screen_availLeft: window.screen.availLeft,
    screen_availHeight: window.screen.availHeight,
    screen_availWidth: window.screen.availWidth,
    screen_left: window.screen.left,
    screen_top: window.screen.top,
    window_outer_height: window.outerHeight,
    window_outer_width: window.outerWidth,
    window_inner_width: window.innerWidth,
    window_screenX: window.screenX,
    client_width: document.body.clientWidth,
    screen_pixel_depth: screen.pixelDepth,
    window_device_pixel_ratio: window.devicePixelRatio,
  }
}
