import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AppService {

    constructor(private httpClient: HttpClient) {
    }

    private apiUrl = 'https://app-azure-manaprayanam-cin.azurewebsites.net/api'

    getTripInfoBySearchString(searchQuery: string): Observable<any[]> {
        return this.httpClient.get<any>(`${this.apiUrl}/trips/search/${searchQuery}`);
    }

    getTripDetailsByFromAndTwo(from: string, to: string) {
        return this.httpClient.get<any>(`${this.apiUrl}/trips/all?from=${from}&to=${to}`);
    }

    getTripDetails(tripId: string) {
        return this.httpClient.get<any>(`${this.apiUrl}/trips/${tripId}`);
    }

    getAllStops() {
        return this.httpClient.get<any[]>(`${this.apiUrl}/stops/all`);
    }

    getTripsByLocation(lat: string, long: string) {
        return this.httpClient.post<any[]>(`${this.apiUrl}/trips/search/location`,{lat,long});
    }

}