(function($){
    "use strict";
    /*  [ Sticky Menu ] */
    $('.stick-header').sticky({ topSpacing: 0 });
    
    // ===== Scroll to Top ==== 
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 200) {
            $('#return-to-top').addClass('td-scroll-up-visible');
        } else {
            $('#return-to-top').removeClass('td-scroll-up-visible');
        }
    });
    $('#return-to-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 'slow');
    });
    
    // Map
     var center = new google.maps.LatLng(34.699992, 135.496308);
    var zoom = 15;
    var mapTypeId = google.maps.MapTypeId.ROADMAP;

    var marker;
    var sidebarhtml = '';
    var defmarker;
    var markers = [];

    var infoWindow = new google.maps.InfoWindow();

    function initialize() {
        var myOptions =
        {
            zoom: zoom,
            center: center,
            mapTypeId: mapTypeId,
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#cdcdcd"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "administrative.country",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#cdcdcd"
                        }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#cdcdcd"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#cdcdcd"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#989898"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#cdcdcd"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#8b8b8b"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#cdcdcd"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#9f9f9f"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#9f9f9f"
                        }
                    ]
                },
                {
                    "featureType": "road.highway.controlled_access",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#9f9f9f"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#cdcdcd"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#cdcdcd"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#555555"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#cdcdcd"
                        }
                    ]
                }
            ]
        }
        var map = new google.maps.Map(document.getElementById("map"), myOptions);

        var markers = [
            ['<table><tr><td><strong><strong>Minamigaoka</strong><br />〒565-0837大阪府吹田市佐井寺南が丘3-5</td></tr></table>', '', 34.697357, 135.496561, 'marker_divio', ''],
        ];

        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i];
            var name = marker[0];
            var add = marker[1];
            var latlng = new google.maps.LatLng(marker[2], marker[3]);
            var category = marker[4];
            var url = marker[5];
            var html = '<div class="infowindow">' + name + '</div>';
            createMarker(latlng, html, map, category, name);
        }
    }

    function createMarker(latlng, html, map, category, name) {
        var iconOffset = new google.maps.Point(34, 34);
        var iconPosition = new google.maps.Point(0, 0);
        var iconSize = new google.maps.Size(40, 53);
        var iconShadowSize = new google.maps.Size(40, 53);
        var iconShadowUrl = "";
        var iconDivioOffset = new google.maps.Point(11, 83);
        var iconDivioPosition = new google.maps.Point(0, 0);
        var iconDivioSize = new google.maps.Size(51, 68);

        //Icon URL Settings
        var marker_divioUrl = "/images/icon/icon_map.png";
        // var marker_busUrl = "assets/images/location/location_icon8_s@2x.png";
        // var marker_pUrl = "assets/images/location/location_icon4_s@2x.png";
        // var marker_24Url = "assets/images/location/location_icon5_s@2x.png";
        // var marker_shopUrl = "assets/images/location/location_icon6_s@2x.png";
        // var marker_foodUrl = "assets/images/location/location_icon2_s@2x.png";
        // var marker_drugUrl = "assets/images/location/location_icon1_s@2x.png";
        // var marker_otherUrl = "assets/images/location/location_icon10_s@2x.png";
        // var marker_postUrl = "assets/images/location/location_icon7_s@2x.png";
        // var marker_bankUrl = "assets/images/location/location_icon9_s@2x.png";
        // var marker_fitnessUrl = "assets/images/location/location_icon11_s@2x.png";

        //Icon settings
        var marker_divioIcon = new google.maps.MarkerImage(marker_divioUrl, iconDivioSize, iconDivioPosition, iconDivioOffset);
        // var marker_busIcon = new google.maps.MarkerImage(marker_busUrl, iconSize, iconPosition, iconOffset);
        // var marker_pIcon = new google.maps.MarkerImage(marker_pUrl, iconSize, iconPosition, iconOffset);
        // var marker_24Icon = new google.maps.MarkerImage(marker_24Url, iconSize, iconPosition, iconOffset);
        // var marker_shopIcon = new google.maps.MarkerImage(marker_shopUrl, iconSize, iconPosition, iconOffset);
        // var marker_foodIcon = new google.maps.MarkerImage(marker_foodUrl, iconSize, iconPosition, iconOffset);
        // var marker_drugIcon = new google.maps.MarkerImage(marker_drugUrl, iconSize, iconPosition, iconOffset);
        // var marker_otherIcon = new google.maps.MarkerImage(marker_otherUrl, iconSize, iconPosition, iconOffset);
        // var marker_postIcon = new google.maps.MarkerImage(marker_postUrl, iconSize, iconPosition, iconOffset);
        // var marker_bankIcon = new google.maps.MarkerImage(marker_bankUrl, iconSize, iconPosition, iconOffset);
        // var marker_fitnessIcon = new google.maps.MarkerImage(marker_fitnessUrl, iconShadowSize, iconPosition, iconOffset);
        var markerShadow = new google.maps.MarkerImage(iconShadowUrl, iconShadowSize, iconPosition, iconOffset);

        var customIcons =
        {
            marker_divio: { icon: marker_divioIcon, shadow: markerShadow },
            // marker_bus: { icon: marker_busIcon, shadow: markerShadow },
            // marker_p: { icon: marker_pIcon, shadow: markerShadow },
            // marker_24: { icon: marker_24Icon, shadow: markerShadow },
            // marker_shop: { icon: marker_shopIcon, shadow: markerShadow },
            // marker_food: { icon: marker_foodIcon, shadow: markerShadow },
            // marker_drug: { icon: marker_drugIcon, shadow: markerShadow },
            // marker_other: { icon: marker_otherIcon, shadow: markerShadow },
            // marker_post: { icon: marker_postIcon, shadow: markerShadow },
            // marker_bank: { icon: marker_bankIcon, shadow: markerShadow },
            // marker_fitness: { icon: marker_fitnessIcon, shadow: markerShadow }
        };

        var icon = customIcons[category] || {};
        var marker = new google.maps.Marker(
            {
                map: map,
                position: latlng,
                icon: icon.icon,
                shadow: icon.shadow,
                title: name
            });
        markers.push(marker);
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
            map.setZoom(15);
        });
    }
    function myclick(num) {
        google.maps.event.trigger(markers[num], "click");
    }
    window.onload = initialize;

})(jQuery); // End of use strict