import { Component, OnInit } from '@angular/core';
import {CommunicationService} from "../shared/services/communication.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private comms: CommunicationService) { }

  ngOnInit() {
      this.comms.changeActiveComponent("settings");
  }

}
