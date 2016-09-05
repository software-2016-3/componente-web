(function () {
    'use static';

    angular.module('proyecto', [])
        .controller('Principal', PrincipalCtrl);

        function PrincipalCtrl() {

            var vm = this;
            vm.showDiv = false;
            vm.user = {
                    
                    "nombre": "Cristiano",
                    
                    
                    "rutas": [
                        {
                            "origen": {
                                "lat": 7.394999,
                                "lng": -73.502622
								 
                            },
							"destino": {
                                "lat": 7.084883,
                                "lng": -73.169890
								 
                            },
                            "distancia": {
                                "text": "84.75 km",
                                "value": 84.75
                            },
                            "tiempo": {
                                "text": "6 hrs 20 mins",
                                "value": 6.2
                            },
                            
                            "fecha": "2016-09-04",
							"altmax":"867 m", 
							"altmin":"99m",
							"ascenso":"1273 m",
							"descenso":"1844m",
                            
                            
                            
                        },
                        {
                            "origen": {
                                "lat": 5.878994, 
                                "lng": -73.675060
								 
                            },
							"destino": {
                                "lat": 6.035167, 
                                "lng": -73.568237
								 
                            },
                            "distancia": {
                                "text": "72.21 km",
                                "value": 72.21
                            },
                            "tiempo": {
                                "text": "	12 hr  18 mins",
                                "value": 12.2
							},
                            
                            "fecha": "2016-09-05",
							"altmax":"1732m", 
							"altmin":"1028m",
							"ascenso":"1333 m",
							"descenso":"1522m"
                            
                            
                        
						},
                        {
                            "origen": {
                                "lat": 5.878994, 
                                "lng": -73.675060
								 
                            },
							"destino": {
                                "lat": 5.952537, 
                                "lng": -73.609390
								 
                            },
                            "distancia": {
                                "text": "38.35 km",
                                "value": 38.35
                            },
                            "tiempo": {
                                "text": "	4hr  54 mins",
                                "value": 4.9
							},
                            
                            "fecha": "2016-09-07",
							"altmax":"2019m", 
							"altmin":"1612m",
							"ascenso":"1052 m",
							"descenso":"1016m"
                            
                            
                        
						},
                        {
                            "origen": {
                                "lat":  7.071595, 
                                "lng": -73.169890 
								 
                            },
							"destino": {
                                "lat": 7.281026, 
                                "lng": -72.967052
								 
                            },
                            "distancia": {
                                "text": "50.38.35 km",
                                "value": 50.38
                            },
                            "tiempo": {
                                "text": "	4hr  13 mins",
                                "value": 4.2
							},
                            
                            "fecha": "2016-09-08",
							"altmax":"2005m", 
							"altmin":"672m",
							"ascenso":"2550 m",
							"descenso":"1242m"
                            
                            
                        
						},
						{
                            "origen": {
                                "lat":  5.879976,
                                "lng":  -73.677720
								 
                            },
							"destino": {
                                "lat": 5.631914,
                                "lng":  -73.529213
								 
                            },
                            "distancia": {
                                "text": "53.57 km",
                                "value": 53.5
                            },
                            "tiempo": {
                                "text": "	3hr  25 mins",
                                "value": 3.3
							},
                            
                            "fecha": "2016-09-09",
							"altmax":"2448m", 
							"altmin":"1593m",
							"ascenso":"1340 m",
							"descenso":"1810m"
                            
                            
                        
						},
                    
                    ],
                    
                    
                    "firstLastName": "Ronaldo",
                    
                };
            vm.routes = vm.user.rutas;

            vm.routes.sort(function(a,b){
                return new Date(a.fecha) - new Date(b.fecha);
            });

            vm.showRoute = function (route) {
                vm.showDiv = true;
                vm.route = route;
                var mapElement = document.getElementById('map');
                var map = new google.maps.Map(mapElement, {
                    center : route.origen,
                    zoom : 16
                });

                var directionsDisplay = new google.maps.DirectionsRenderer();
                directionsDisplay.setMap(map);
                /*var directions = */new google.maps.DirectionsService().route({
                    origin : route.origen,
                    destination : route.destino,
					
                    travelMode : google.maps.TravelMode.DRIVING
                }, function (result) {
                    directionsDisplay.setDirections(result);

                    var elevations = new google.maps.ElevationService;
                    elevations.getElevationAlongPath({
                        'path' : result.routes[0].overview_path,
                        'samples' : 100
                    }, function (elevations) {
                        var elevations_x = [];
                        var elevations_y = [];
                        elevations.forEach(function (a) {
                            elevations_x.push(Math.round(a.elevation*100)/100);
                            elevations_y.push("");
                        });

                        var chart = document.getElementById('topografico');
                        var _chart = new Chart(chart, {
                            type: 'line',
                            data: {
                                labels: elevations_y,
                                datasets: [{
                                    data: elevations_x,
                                    linetension: 0,
                                    backgroundColor: '#9ee732',
                                    borderCapStyle: 'butt',
                                    pointBackgroundColor: "#fff",
                                    pointBorderWidth: 1,
                                    pointHoverRadius: 5,
                                    borderDashOffset: 0.0,
                                    pointRadius: 0,
                                    pointHitRadius: 10,
                                }]
                            },
                            options: {
                                responsive: true,
                                legend: {
                                    display: false
                                },
                                title: {
                                    display: true,
                                    text: "Diagrama topografico recorrido"
                                },
                                scales: {
                                    xAxes: [{
                                        display: false
                                    }],
                                    yAxes: [{
                                        beginAtZero: false
                                    }]
                                }
                            }
                        })
                    })

                });
            };

            vm.close = function () {
                vm.showDiv = false;
            };

        }
})();

