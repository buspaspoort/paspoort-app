import { Component, OnInit } from '@angular/core';
import {CommunicationService} from "../../shared/services/communication.service";

@Component({
  selector: 'app-none',
  templateUrl: 'none.component.html',
  styleUrls: ['none.component.scss']
})
export class NoneComponent implements OnInit {

  constructor(private comms: CommunicationService) { }

  ngOnInit() {
      this.comms.changeBusDetail(-1);
  }

}
