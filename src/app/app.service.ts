import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AppService {

    constructor(private httpClient: HttpClient) {
    }

    private apiUrl = 'https://app-azure-manaprayanam-cin.azurewebsites.net/api/trips'

    getTripInfoBySearchString(searchQuery: string):Observable<any[]> {
        return this.httpClient.get<any>(`${this.apiUrl}/search/${searchQuery}`);
    }

    getTripDetails(tripId:string){
        return this.httpClient.get<any>(`${this.apiUrl}/${tripId}`);
    }

}