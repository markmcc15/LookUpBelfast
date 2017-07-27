import { Component, OnInit } from '@angular/core';
import { BuildingService } from './building.service'
import { Building } from '../model/building'

declare var google: any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [BuildingService]
})

export class AppComponent implements OnInit{
	website_name = 'Look-Up Belfast';

	private buildingService : BuildingService;
	private buildings : Building[];
	private cityHall = {lat: 54.596577, lng: -5.930138};

	constructor(buildingService: BuildingService) {
		this.buildingService = buildingService
	}

	ngOnInit(): void {
		var map = this.createMap()

		this.buildingService.getBuildings().then(function(buildings : Building[]){
			this.createMapMarkers(map, buildings, 'red-dot.png')
		}.bind(this))
    }

	createMap() {
		//create map centered on the city hall
		return new google.maps.Map(document.getElementById('map'), {
			zoom: 15,
			center: this.cityHall
		})
	}

	createMapMarkers(map: any, data: Building[], icon: string) {
		data.forEach(function(location){
			var marker = new google.maps.Marker({
				position: {'lat': location.Latitude, 'lng': location.Longitude},
				map: map, 
				title: location.Classification,
				icon: 'http://maps.google.com/mapfiles/ms/icons/' + icon
			})

			var infowindow = new google.maps.InfoWindow({
				disableAutoPan: true,
				content: 
				'<div align=middle>' +
				'<h4>' + location.Classification + '</h4>' +
				'<img src="' + this.createIconURL(location.PhotoLocation) + '">' +
				'</div>'
			});

			marker.addListener('mouseover', function() {
				infowindow.open(map, marker)
			})

			marker.addListener('mouseout', function() {
				infowindow.close(map, marker)
			})

    	}.bind(this))      
  	}

  	createIconURL(photos) {
		if(Array.isArray(photos))
			return 'https://s3.amazonaws.com/www.lookupbelfastcity.com/images/' + photos[0].substr(0, photos[0].length - 4) + '_tn.jpg'
		else
			return 'https://s3.amazonaws.com/www.lookupbelfastcity.com/images/' + photos.substr(0, photos.length - 4) + '_tn.jpg'
	}

}
