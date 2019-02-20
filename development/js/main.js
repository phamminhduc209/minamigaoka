(function($){
    "use strict";
    /*  [ Sticky Menu ] */
    // $('.stick-header').sticky({ topSpacing: 0 });
    
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
        
            ['<table><tr><td><strong><strong>北新地レジデンスDIVIO</strong><br />サービスアパートメントDIVIOの所在地です。</td></tr></table>', '', 34.697357, 135.496561, 'marker_divio', ''],
        ['<table><tr><td><strong>ハービス大阪　リムジンバス乗り場</strong><br />関西空港発着：バスの時刻表は<a href="http://www.kate.co.jp/pc/time_table/time.html" target="_blank">こちら</a>。<br />大阪（伊丹）空港・高速バス発着：バスの時刻表は<a href="https://www.osaka-airport.co.jp/access/bus" target="_blank">こちら</a></td></tr></table>', '', 34.699886, 135.4942, 'marker_bus', ''],
        ['<table><tr><td><strong>ヒルトン大阪　リムジンバス乗り場</strong><br />関西空港発着バスの時刻表は<a href="http://www.kate.co.jp/pc/time_table/time.html" target="_blank">こちら</a>。</td></tr></table>', '', 34.700056, 135.496512, 'marker_bus', ''],
        ['<table><tr><td><strong>新地モータープール</strong><br />〒530-0003<br />大阪市北区堂島１丁目3-11<br />【営業時間】　8:00-3:00</td></tr></table>', '', 34.696885, 135.498092, 'marker_p', ''],
        ['<table><tr><td><strong>国際モータープール</strong><br />〒530-0003<br />大阪市北区堂島1丁目3-5国際モータープール  1階<br />【営業時間】24ｈ</td></tr></table>', '', 34.696452, 135.497963, 'marker_p', ''],
        ['<table><tr><td><strong>北新地幸田ビル駐車場</strong><br />〒530-0002<br />大阪市北区曽根崎新地1丁目3番30号北新地幸田ビル<br />【営業時間】9:00-2:00</td></tr></table>', '', 34.697368, 135.496755, 'marker_p', ''],
        ['<table><tr><td><strong>ポプラ コンビニエンスストア</strong><br />〒530-0002<br />大阪市北区曽根崎新地1丁目3-26ぐらんぱれ 1階<br />【営業時間】年中無休24ｈ</td></tr></table>', '', 34.697692, 135.496598, 'marker_24', ''],
        ['<table><tr><td><strong>ファミリーマート コンビニエンスストア</strong><br />〒530-0002<br />大阪市北区曽根崎新地1丁目10-16永楽ビル 1階<br />【営業時間】24ｈ</td></tr></table>', '', 34.698108, 135.49663, 'marker_24', ''],
        ['<table><tr><td><strong>サンクス コンビニエンスストア</strong><br />〒530-0002<br />大阪市北区曽根崎新地1丁目3-16京富ビル 1階<br />【営業時間】24h</td></tr></table>', '', 34.697535, 135.495763, 'marker_24', ''],
        ['<table><tr><td><strong>ジュンク堂書店　堂島アバンザ店</strong><br />日本最大級の規模。洋書の取り揃え多し。<br />〒530-0003<br />大阪府大阪市北区堂島1-6-20<br />【営業時間】10:00-21:00</td></tr></table>', '', 34.69696, 135.496166, 'marker_shop', ''],
        ['<table><tr><td><strong>大丸　梅田店</strong><br />営業時間などの情報は<a href="http://www.daimaru.co.jp/umedamise/index.html" target="_blank">こちら</a><br />〒530-0001<br />大阪市北区梅田3-1-1</td></tr></table>', '', 34.701776, 135.496123, 'marker_shop', ''],
        ['<table><tr><td><strong>阪神百貨店　梅田本店</strong><br />営業時間などの情報は<a href="http://www.hanshin-dept.jp/dept/" target="_blank">こちら</a><br />〒530-0001<br />大阪市北区梅田1-13-13</td></tr></table>', '', 34.701123, 135.497979, 'marker_shop', ''],
        ['<table><tr><td><strong>大丸ピーコック　堂島クロスウォーク店</strong><br />営業時間などの情報は<a href="http://www.peacock.co.jp/peacock_shop_info/west_dojima/dojima.html" target="_blank">こちら</a><br />〒553-0003<br />大阪市福島区福島1-1-51　堂島クロスウォーク内1F</td></tr></table>', '', 34.69467, 135.489632, 'marker_shop', ''],
        
        ['<table><tr><td><strong>foodium堂島</strong><br />営業時間などの情報は<a href="http://shop.daiei.co.jp/shop/ShopPageTop.do?shopid=0752" target="_blank">こちら</a><br />〒530-0003 <br />大阪府大阪市北区堂島1-1-5</td></tr></table>', '', 34.695953, 135.500713, 'marker_shop', ''],
        
        
        ['<table><tr><td><strong>やまや　堂島プラザ店</strong><br />営業時間などの情報は<a href="http://www.yamaya.jp/pages/store/store/816doujimaplaza.html" target="_blank">こちら</a><br />大阪市北区堂島1-5-30 堂島プラザビル1階</td></tr></table>', '', 34.696104, 135.496363, 'marker_shop', ''],
        ['<table><tr><td><strong>阪急うめだ本店</strong><br />〒530-8350<br>大阪府大阪市北区角田町8番7号<br>営業時間などの情報は<a href="http://www.hanshin-dept.jp/" target="_blank">こちら</a></td></tr></table>', '', 34.702909, 135.49861, 'marker_shop', ''],
        ['<table><tr><td><strong>ルクア</strong><br />〒530-8350<br>大阪府大阪市北区梅田3-1-3<br>営業時間などの情報は<a href="http://www.lucua.jp/" target="_blank">こちら</a></td></tr></table>', '', 34.702939, 135.495524, 'marker_shop', ''],
        ['<table><tr><td><strong>グランフロント大阪</strong><br />営業時間などの情報は<a href="http://www.grandfront-osaka.jp/" target="_blank">こちら</a></td></tr></table>', '', 34.706051, 135.49433, 'marker_shop', ''],
        ['<table><tr><td><strong>スターバックス　桜橋プラザビル店</strong><br /><table><tr><td>【営業時間】</td><td>月 - 木</td><td>7:00 - 23:00</td></tr><tr><td></td><td>金</td><td>7:00 - 23:00</td></tr><tr><td></td><td>土</td><td>8:00 - 23:00</td></tr><tr><td></td><td>日</td><td>8:00 - 22:00</td></tr><tr><td></td><td>祝日</td><td>8:00 - 22:00</td></tr><tr><td></td><td>定休日</td><td>不定休</td></tr></table></td></tr></table>', '', 34.698133, 135.49579, 'marker_food', ''],
        ['<table><tr><td><strong>サンマルクカフェ</strong><br>大阪府大阪市北区曾根崎新地1丁目3-16</td></tr></table>', '', 34.697618, 135.495763, 'marker_food', ''],
        ['<table><tr><td><strong>ダイコクドラッグ</strong><br />〒530-0001<br />大阪市北区梅田１丁目3-1-100<br />【営業時間】10:00 - 20:00</td></tr></table>', '', 34.698706, 135.495908, 'marker_drug', ''],
        ['<table><tr><td><strong>東急スポーツオアシス梅田店</strong><br /><a href="http://www.sportsoasis.co.jp/sh07/" target="_blank">東急スポーツオアシス梅田店のHP</a><br />〒530-0001<br />大阪市北区梅田2-4-2<br />【営業時間】全日 7:00-24:00</td></tr></table>', '', 34.697873, 135.494159, 'marker_fitness', ''],
        ['<table><tr><td><strong>ドージマ地下センター</strong><br />〒530-0003<br />大阪市北区堂島1丁目堂島地下街<br /><table><tr><td>【営業時間】</td><td>月 - 金</td><td>10:00 - 20:00</td></tr><tr><td></td><td>土</td><td>10:00 - 18:00</td></tr><tr><td></td><td>定休日</td><td>第3日曜日</td></tr></table>※上記以外の営業時間は店舗により異なる</td></tr></table>', '', 34.697361, 135.495699, 'marker_other', ''],
        ['<table><tr><td><strong>堂島アバンザ郵便局</strong><br />詳細は<a href="http://www.jp-network.japanpost.jp/storesearch/detail/index.php?id=300101403330" target="_blank">こちら</a><br />〒530-0003<br />大阪府大阪市北区堂島1-6-20<br />【営業時間】 平日9:00-17:00</td></tr></table>', '', 34.697052, 135.4963, 'marker_post', ''],
        ['<table><tr><td><strong>大阪中央郵便局</strong><br />JR大阪駅前。桜橋口を西にすぐ。<br />〒530-0001<br />大阪府大阪市北区梅田１－３－１（大阪駅前第１ビル内）<br />駐車場なし<br />【営業時間】 平日・土日9:00-21:00<br />※併設の<a href="http://www.post.japanpost.jp/cgi-shiten_search/syousai.php?ID=200121410610" target="_blank">ゆうゆう窓口</a>は一部サービスを24時間受付。</td></tr></table>', '', 34.699109, 135.496838, 'marker_post', ''],
        ['<table><tr><td><strong>CityBANK</strong><br />詳細は<a href="http://www.citibank.co.jp/ja/bankingservice/branch_atm/kansai/br_osakaekimae.html" target="_blank">こちら</a><br />大阪府大阪市北区梅田１丁目８－１７</td></tr></table>', '', 34.700634, 135.496626, 'marker_bank', '']
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
            var marker_divioUrl = "images/icon_map.png";
        
            //Icon settings
            var marker_divioIcon = new google.maps.MarkerImage(marker_divioUrl, iconDivioSize, iconDivioPosition, iconDivioOffset);
        
            var customIcons =
            {
                marker_divio: {icon: marker_divioIcon, shadow: markerShadow}
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