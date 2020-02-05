
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import {map} from "rxjs/internal/operators";
import {Page} from "../../common/page";
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class IssueHistoryService {

    private ISSUE_HISTORY_PATH="/issue/history";

    constructor(private apiService: ApiService){

        
    }

    getAll(page) : Observable<any>{
        return this.apiService.get(this.ISSUE_HISTORY_PATH+'/pagination',page).pipe(map(
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

    getById(id) : Observable<any>{
        return this.apiService.get(this.ISSUE_HISTORY_PATH,id).pipe(map(
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

    createIssueHistory(issuehistory) : Observable<any>{
        return this.apiService.post(this.ISSUE_HISTORY_PATH,issuehistory).pipe(map(
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
     
    delete(id) : Observable<any>{
        return this.apiService.delete(this.ISSUE_HISTORY_PATH +'/'+id).pipe(map(
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