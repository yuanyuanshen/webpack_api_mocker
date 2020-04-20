<template>
    <div>
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
        <GmapMap
            :style="myHeight"
            :zoom="zoom"
            :map-type-id="mapType"
            :center="center"
            ref="map"
            :options="{ scrollwheel: scrollwheel }"
            @click="clicked"
            @drag="drag++;"
            @bounds_changed="update('bounds', $event);"
            @center_changed="update('reportedCenter', $event);"
        >
            <GmapMarker v-if="start" :position="start.latLng" label="S" />
            <GmapMarker v-if="end" :position="end.latLng" label="E" />
            <GmapPolyline v-if="curvedPath" :path="curvedPath" />
            <GmapCircle
                v-if="displayCircle"
                :bounds="circleBounds"
                :center="reportedCenter"
                :radius="10000"
                :options="{ editable: true }"
                @radius_changed="updateCircle('radius', $event);"
                @bounds_changed="updateCircle('bounds', $event);"
            ></GmapCircle>
        </GmapMap>
    </div>
</template>

<script>
import { range } from "lodash";

export default {
    data() {
        return {
            myHeight: {
                height: "400px",
                with: "600px"
            },
            mapBounds: {},
            drag: 0,
            scrollwheel: true,
            mapType: "roadmap",
            zoom: 10,
            center: {
                lat: 30,
                lng: 114
            },
            // center: {
            //     lat: 48.8538302,
            //     lng: 2.2982161
            // },
            displayCircle: true,
            reportedCenter: {
                lat: 30,
                lng: 114
            },
            circleBounds: {},
            start: null,
            end: null
        };
    },
    description: `
  In which a curved polyline is drawn on the map
  `,
    computed: {
        curvedPath() {
            /*
        FIXME: This formula will work for short distances away from
          the poles. It will not work once the curvature of the earth is
          too great
      */
            if (this.start && this.end) {
                return range(100).map(i => {
                    const tick = i / 99;

                    /* Bezier curve -- set up the control points */
                    const dlat =
                        this.end.latLng.lat() - this.start.latLng.lat();
                    const dlng =
                        this.end.latLng.lng() - this.start.latLng.lng();

                    const cp1 = {
                        lat:
                            this.start.latLng.lat() + 0.33 * dlat + 0.33 * dlng,
                        lng: this.start.latLng.lng() - 0.33 * dlat + 0.33 * dlng
                    };

                    const cp2 = {
                        lat: this.end.latLng.lat() - 0.33 * dlat + 0.33 * dlng,
                        lng: this.end.latLng.lng() - 0.33 * dlat - 0.33 * dlng
                    };

                    /* Bezier curve formula */
                    return {
                        lat:
                            tick * tick * tick * this.start.latLng.lat() +
                            3 * ((1 - tick) * tick * tick) * cp1.lat +
                            3 * ((1 - tick) * (1 - tick) * tick) * cp2.lat +
                            (1 - tick) *
                                (1 - tick) *
                                (1 - tick) *
                                this.end.latLng.lat(),
                        lng:
                            tick * tick * tick * this.start.latLng.lng() +
                            3 * ((1 - tick) * tick * tick) * cp1.lng +
                            3 * ((1 - tick) * (1 - tick) * tick) * cp2.lng +
                            (1 - tick) *
                                (1 - tick) *
                                (1 - tick) *
                                this.end.latLng.lng()
                    };
                });
            }
        },
        mapStyles() {
            switch (this.mapStyle) {
                case "normal":
                    return [];
                case "red":
                    return [
                        {
                            stylers: [
                                {
                                    hue: "#890000"
                                },
                                {
                                    visibility: "simplified"
                                },
                                {
                                    gamma: 0.5
                                },
                                {
                                    weight: 0.5
                                }
                            ]
                        },
                        {
                            elementType: "labels",
                            stylers: [
                                {
                                    visibility: "off"
                                }
                            ]
                        },
                        {
                            featureType: "water",
                            stylers: [
                                {
                                    color: "#890000"
                                }
                            ]
                        }
                    ];
                default:
                    return [
                        {
                            stylers: [
                                {
                                    hue: "#899999"
                                },
                                {
                                    visibility: "on"
                                },
                                {
                                    gamma: 0.5
                                },
                                {
                                    weight: 0.5
                                }
                            ]
                        },
                        {
                            featureType: "road",
                            stylers: [
                                {
                                    visibility: "off"
                                }
                            ]
                        },
                        {
                            featureType: "transit.line",
                            stylers: [
                                {
                                    color: "#FF0000"
                                }
                            ]
                        },
                        {
                            featureType: "poi",
                            elementType: "labels.icon",
                            stylers: [
                                {
                                    visibility: "on"
                                },
                                {
                                    weight: 10
                                }
                            ]
                        },
                        {
                            featureType: "water",
                            stylers: [
                                {
                                    color: "#8900FF"
                                },
                                {
                                    weight: 9999900000
                                }
                            ]
                        }
                    ];
            }
        }
    },
    methods: {
        updateMapCenter(which, value) {
            // eslint-disable-line no-unused-vars
            this.center = _.clone(this.reportedCenter);
        },
        clicked(e) {
            if (!this.start && !this.end) {
                this.start = {
                    latLng: e.latLng
                };
            } else if (this.start && !this.end) {
                this.end = {
                    latLng: e.latLng
                };
            } else {
                this.start = {
                    latLng: e.latLng
                };
                this.end = null;
            }
        },
        update(field, event) {
            if (field === "reportedCenter") {
                // N.B. It is dangerous to update this.center
                // Because the center reported by Google Maps is not exactly
                // the same as the center you pass it.
                // Instead we update this.center only when the input field is changed.

                this.reportedCenter = {
                    lat: event.lat(),
                    lng: event.lng()
                };
                console.log("--------->", event);
                // If you wish to test the problem out for yourself, uncomment the following
                // and see how your browser begins to hang:
                // this.center = _.clone(this.reportedCenter)
            } else if (field === "bounds") {
                this.mapBounds = event;
            } else {
                this.$set(this, field, event);
            }
        },
        updateCircle(prop, value) {
            console.log("5555555555555");
            if (prop === "radius") {
                this.radius = value;
            } else if (prop === "bounds") {
                this.circleBounds = value;
            }
        }
    }
};
</script>
