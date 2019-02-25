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
    var center = new google.maps.LatLng(34.7809029, 135.5182040);
    var zoom = 17;
    var mapTypeId = google.maps.MapTypeId.ROADMAP;
    var markers = [];
    var infoWindow = new google.maps.InfoWindow();

    function initialize() {
        var myOptions =
        {
            zoom: zoom,
            center: center,
            zoomControl : false,
            mapTypeControl: false,
            fullscreenControl: false,
            mapTypeId: mapTypeId,
            styles: [
                {
                    "featureType": "administrative.land_parcel",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.locality",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative.neighborhood",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "color": "#FFFFFF"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#2a4131"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#d5fedc"
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#90b297"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#8cd689"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "color": "#2a4131"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#8cd689"
                        }
                    ]
                }
            ]
        }
        var map = new google.maps.Map(document.getElementById("map"), myOptions);
        var markers = [
            ['<table><tr><td><strong><strong>Minamigaoka</strong><br />〒565-0837大阪府吹田市佐井寺南が丘3-5</td></tr></table>', '', 34.7809029, 135.5182040, 'marker_minamigaoka', ''],
        ];

        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i];
            var name = marker[0];
            var latlng = new google.maps.LatLng(marker[2], marker[3]);
            var category = marker[4];
            var html = '<div class="infowindow">' + name + '</div>';
            createMarker(latlng, html, map, category, name);
        }
    }

    function createMarker(latlng, html, map, category, name) {
        var iconOffset = new google.maps.Point(34, 34);
        var iconPosition = new google.maps.Point(0, 0);
        var iconShadowSize = new google.maps.Size(40, 53);
        var iconShadowUrl = "";
        var iconMinamigaokaOffset = new google.maps.Point(11, 83);
        var iconMinamigaokaPosition = new google.maps.Point(0, 0);
        var iconMinamigaokaSize = new google.maps.Size(51, 68);

        //Icon URL Settings
        var marker_minamigaokaUrl = "/images/icon/icon_map.png";

        //Icon settings
        var marker_minamigaokaIcon = new google.maps.MarkerImage(marker_minamigaokaUrl, iconMinamigaokaSize, iconMinamigaokaPosition, iconMinamigaokaOffset);
        var markerShadow = new google.maps.MarkerImage(iconShadowUrl, iconShadowSize, iconPosition, iconOffset);

        var customIcons =
        {
            marker_minamigaoka: { icon: marker_minamigaokaIcon, shadow: markerShadow },
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
            map.setZoom(17);
        });
    }
    function myclick(num) {
        google.maps.event.trigger(markers[num], "click");
    }
    window.onload = initialize;

})(jQuery); // End of use strict