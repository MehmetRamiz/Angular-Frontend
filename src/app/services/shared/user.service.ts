
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import {map} from "rxjs/internal/operators";
import {Page} from "../../common/page";
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class UserService {

    private USER_PATH="/users";

    constructor(private apiService: ApiService){

        
    }

    getAll() : Observable<any>{
        return this.apiService.get(this.USER_PATH).pipe(map(
            res =>{
                if(res){
                return res;
            }else {
             console.log(res);
           
            }
        }
        ));
            
    }

    getById(id) : Observable<any>{
        return this.apiService.get(this.USER_PATH,id).pipe(map(
            res =>{
                if(res){
                return res;
            }else {
             console.log(res);
           
            }
        }
        ));
            
    }

    createUser(user) : Observable<any>{
        return this.apiService.post(this.USER_PATH,user).pipe(map(
            res =>{
                if(res){
                return res;
            }else {
             console.log(res);
               return{};
            }
        }
        ));
    
    }
     
    
    
            
    




}