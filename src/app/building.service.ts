import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Building } from '../model/building';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BuildingService {

	private buildingsUrl : string = 'https://api.lookupbelfastcity.com/buildings';

	constructor(private http: Http) { }
	 
	getBuildings(): Promise<Building[]> {
		//http.get returns an RxJS Observable - Observables are a powerful way to manage asynchronous data flows
		//convert the Observable to a Promise
	  	return this.http.get(this.buildingsUrl)
			.toPromise()
			//.then(response => console.log(response.json().Items))
			.then(response => response.json().Items as Building[])
			.catch(this.handleError)
	}

	getBuilding(id: number) : Promise<Building>{
		const url = '${this.buildingsUrl}/${id}';
	  	return this.http.get(url)
			.toPromise()
			.then(response => response.json().data as Building)
			.catch(this.handleError);
	}
	 
	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error);
	  return Promise.reject(error.message || error);
	}

}

