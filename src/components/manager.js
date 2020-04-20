export const loadedGoogleMapsAPI = new Promise((resolve, reject) => {
  console.log('resolve')
  console.log(resolve)
  window['GoogleMapsInit'] = resolve;

  let GMap = document.createElement('script');

  GMap.setAttribute('src',
    `https://maps.googleapis.com/maps/api/js?key=AIzaSyDJW4jsPlNKgv6jFm3B5Edp5ywgdqLWdmc&callback=GoogleMapsInit&region=IN`);

  document.body.appendChild(GMap);
});