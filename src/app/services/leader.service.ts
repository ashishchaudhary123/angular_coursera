import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve => {
      // simulate server latency with 2 second delay

      setTimeout(() => resolve(LEADERS), 2000);
    });
  }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve => {
      // simulate server latency with 2 second delay

      setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    });
  }


}

