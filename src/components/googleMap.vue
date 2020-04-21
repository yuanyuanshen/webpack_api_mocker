<template>
  <div>
    <!--
            <h1>Map information</h1>
            Map center latitude:
            <input
                type="number"
                v-model="reportedCenter.lat"
                number
                @change="updateMapCenter"
            />
            <br />
            Map center longitude:
            <input
                type="number"
                v-model="reportedCenter.lng"
                number
                @change="updateMapCenter"
            />
            <br />
            Map bounds: {{ mapBounds | json }} <br />
            Map zoom: <input type="number" v-model="zoom" number /> <br />
        -->
    <div id="map"
         ref="vue-map"
         :style="myHeight"></div>
  </div>
</template>

<script>
import { range } from "lodash";
import { loadedGoogleMapsAPI } from "./manager";

export default {
  data () {
    return {
      myHeight: {
        height: "400px",
        with: "600px"
      },
      reportedCenter: {
        lat: 30,
        lng: 114
      }
    };
  },
  created () { },
  mounted () {
    loadedGoogleMapsAPI.then(() => {
      this.initMap();
    });
  },
  description: `In which a curved polyline is drawn on the map`,
  computed: {},
  methods: {
    initMap () {
      console.log(google);
      var map = (map = new google.maps.Map(
        document.getElementById("map"),
        {
          center: this.reportedCenter,
          zoom: 10
        }
      ));
      map.addListener('center_changed', function () {
        const center = map.getCenter();
        this.reportedCenter = {
          lat: center.lat(),
          lng: center.lng(),
        };
        console.log('改变地图中心点')
        console.log(center.lat())
        console.log(center.lng())
        console.log(this.reportedCenter)
      });
      map.addListener('click', function (e) {
        console.log('我在点击地图')
        console.log(e)
      });
      var marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: this.reportedCenter
      });
      // marker.addListener("click", toggleBounce);
      marker.setMap(map);
    }
  }
};
</script>
<style scoped>
#map {
  width: 600px;
  height: 400px;
}
</style>
