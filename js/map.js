function main() {

    var polygon;

    var map_object = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        legends: false,
        layer_selector: false,
    }).setView([49.2127168, 9.3962733], 10);

    // Zoomfunktion komplett deaktivieren
    map_object.touchZoom.disable();
    map_object.doubleClickZoom.disable();
    map_object.scrollWheelZoom.disable();
    map_object.keyboard.disable();

    var sublayers = [];

    // Leeren TileLayer hinzufügen

    L.tileLayer('', {
        attribution: 'Recherche und Code: <a href="https://www.twitter.com/dahilzen">David Hilzendegen</a> | Daten: <a href="http://www.statistik-bw.de/">Statistisches Landesamt</a>'
    }).addTo(map_object);

    // cartodb createLayer
    cartodb.createLayer(map_object, 'https://dahilzen.carto.com/api/v2/viz/acee326d-57cb-4d82-a854-bc144b2ef8d6/viz.json', {
            legends: false,
            cartodb_logo: false,
            mobile_layout: true,
            force_mobile: $(window).width() < 620,
            loaderControl: false,
        })
        .addTo(map_object)
        .on('done', function(layer) {
            // set interaction of the CartoDB layer (allow you to click on it)
            layer.setInteraction(true);

            // add sublayers & change the query for the first layer  
            var subLayerOptions = {
                sql: "SELECT * FROM result_hn",
                cartocss: '#result_hn{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_hn [cdu_zweit<=40.6]{polygon-fill:#000;polygon-opacity:1}#result_hn [cdu_zweit<=36.8]{polygon-fill:#000;polygon-opacity:.8}#result_hn [cdu_zweit<=34.2]{polygon-fill:#000;polygon-opacity:.6}#result_hn [cdu_zweit<=32.9]{polygon-fill:#000;polygon-opacity:.4}#result_hn [cdu_zweit<=30.6]{polygon-fill:#000;polygon-opacity:.2}'
            }

            var sublayer = layer.getSubLayer(0);

            sublayer.infowindow.set('template', $('#infowindow_template').html());

            sublayer.set(subLayerOptions);

            sublayers.push(sublayer);

            //we define the queries that will be performed when we click on the buttons, by modifying the SQL of our layer
            var LayerActions = {
                cdu: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_hn",
                        cartocss: '#result_hn{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_hn [cdu_zweit<=40.6]{polygon-fill:#000;polygon-opacity:1}#result_hn [cdu_zweit<=36.8]{polygon-fill:#000;polygon-opacity:.8}#result_hn [cdu_zweit<=34.2]{polygon-fill:#000;polygon-opacity:.6}#result_hn [cdu_zweit<=32.9]{polygon-fill:#000;polygon-opacity:.4}#result_hn [cdu_zweit<=30.6]{polygon-fill:#000;polygon-opacity:.2}'
                    });
                    return true;
                },
                spd: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_hn",
                        cartocss: '#result_hn{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_hn [spd_zweit<=20.4]{polygon-fill:#eb0000;polygon-opacity:1}#result_hn [spd_zweit<=18.6]{polygon-fill:#eb0000;polygon-opacity:.8}#result_hn [spd_zweit<=17.8]{polygon-fill:#eb0000;polygon-opacity:.6}#result_hn [spd_zweit<=16.8]{polygon-fill:#eb0000;polygon-opacity:.4}#result_hn [spd_zweit<=15]{polygon-fill:#eb0000;polygon-opacity:.2}'
                    });
                    return true;
                },
                gruene: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_hn",
                        cartocss: '#result_hn{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_hn [grune_zweit<=13.1]{polygon-fill:#5cb813;polygon-opacity:1}#result_hn [grune_zweit<=11.85]{polygon-fill:#5cb813;polygon-opacity:.8}#result_hn [grune_zweit<=10.85]{polygon-fill:#5cb813;polygon-opacity:.6}#result_hn [grune_zweit<=9.55]{polygon-fill:#5cb813;polygon-opacity:.4}#result_hn [grune_zweit<=8.65]{polygon-fill:#5cb813;polygon-opacity:.2}'
                    });
                    return true;
                },
                linke: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_hn",
                        cartocss: '#result_hn{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_hn [linke_zweit<=6.9]{polygon-fill:#540fc6;polygon-opacity:1}#result_hn [linke_zweit<=5.8]{polygon-fill:#540fc6;polygon-opacity:.8}#result_hn [linke_zweit<=5.35]{polygon-fill:#540fc6;polygon-opacity:.6}#result_hn [linke_zweit<=4.85]{polygon-fill:#540fc6;polygon-opacity:.4}#result_hn [linke_zweit<=4.15]{polygon-fill:#540fc6;polygon-opacity:.2}'
                    });
                    return true;
                },
                fdp: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_hn",
                        cartocss: '#result_hn{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_hn [fdp_zweit<=17.7]{polygon-fill:#ecbd00;polygon-opacity:1}#result_hn [fdp_zweit<=14.1]{polygon-fill:#ecbd00;polygon-opacity:.8}#result_hn [fdp_zweit<=13.1]{polygon-fill:#ecbd00;polygon-opacity:.6}#result_hn [fdp_zweit<=12.3]{polygon-fill:#ecbd00;polygon-opacity:.4}#result_hn [fdp_zweit<=11.6]{polygon-fill:#ecbd00;polygon-opacity:.2}'
                    });
                    return true;
                },
                afd: function() {
                    sublayers[0].set({
                        sql: "SELECT * FROM result_hn",
                        cartocss: '#result_hn{polygon-fill:#FFFFB2;polygon-opacity:.8;line-color:#FFF;line-width:.5;line-opacity:1}#result_hn [afd_zweit<=21.2]{polygon-fill:#00baff;polygon-opacity:1}#result_hn [afd_zweit<=18]{polygon-fill:#00baff;polygon-opacity:.8}#result_hn [afd_zweit<=16.5]{polygon-fill:#00baff;polygon-opacity:.6}#result_hn [afd_zweit<=15.45]{polygon-fill:#00baff;polygon-opacity:.4}#result_hn [afd_zweit<=14.35]{polygon-fill:#00baff;polygon-opacity:.2}'
                    });
                    return true;
                },
            }

            $('.button').click(function() {
                $('.button').removeClass('selected');
                $(this).addClass('selected');
                //this gets the id of the different buttons and calls to LayerActions which responds according to the selected id
                LayerActions[$(this).attr('id')]();
            });

            $('#selector').change(function() {
                LayerActions[$(this).val()]();
            });

            // when the CartoDB layer is clicked...
            layer.on('featureClick', function(e, latlng, pos, data) {
                // data1 stores the cartodb_id value of the selected polygon
                data1 = data.cartodb_id;

                // if Leaflet polygon is added on the map, remove it
                if (map_object.hasLayer(polygon)) {
                    map_object.removeLayer(polygon)
                    console.log("removed")
                }

                // use SQL API to extract the attribute values from the selected polygons
                var sql = new cartodb.SQL({
                    user: 'dahilzen'
                });
                // select the attribute tables to extract from CartoDB table
                sql.execute("SELECT ST_asGeoJSON(the_geom) as geom FROM result_hn WHERE cartodb_id IN (" + data1 + ")")
                    .done(function(data) {

                        var geom = data.rows[0].geom;
                        polygon = L.geoJson(JSON.parse(geom), {
                            style: {
                                color: "#fff", // color of stroke line
                                weight: 5, // width of stroke line
                                //fillColor: "blue", // define color of polygon
                                fill: true // set polygon
                            }

                        });
                        // add leaflet polygon on the map
                        map_object.addLayer(polygon);

                    });

            });

        });

}

window.onload = main;