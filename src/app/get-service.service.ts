import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetServiceService {

  constructor(private http: HttpClient) { }
  url = "http://65.2.28.16/api/Boat"


  getboatByLoction(id) {
    debugger;
    console.log(id)
    var hhh = id
    return this
            .http
            .get(`${this.url}/GetBoatDetailsByLocation?Location_Id=${id=hhh}`);
    }

}
