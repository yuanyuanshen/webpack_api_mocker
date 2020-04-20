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
        <div id="map" ref="vue-map" :style="myHeight"></div>
    </div>
</template>

<script>
import { range } from "lodash";
import { loadedGoogleMapsAPI } from "./manager";

export default {
    data() {
        return {
            myHeight: {
                height: "400px",
                with: "600px"
            }
        };
    },
    created() {},
    mounted() {
        loadedGoogleMapsAPI.then(() => {
            this.initMap();
        });
    },
    description: `In which a curved polyline is drawn on the map`,
    computed: {},
    methods: {
        initMap() {
            console.log(google);
            var map = (map = new google.maps.Map(
                document.getElementById("map"),
                {
                    center: { lat: 30, lng: 114 },
                    zoom: 10
                }
            ));
            var marker = new google.maps.Marker({
                map: map,
                position: { lat: 30, lng: 114 }
            });
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
