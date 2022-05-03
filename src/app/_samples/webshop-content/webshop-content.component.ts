import { Component, OnInit, Input } from '@angular/core';
import { ProgressSpinnerService } from "../../_messages/progress-spinner.service";
import { Subscription } from 'rxjs';
import { interval } from "rxjs/internal/observable/interval";


declare function loadMashup(targetDom, preLoadComponents);

@Component({
  selector: 'app-webshop-content',
  templateUrl: './webshop-content.component.html',
  styleUrls: ['./webshop-content.component.scss']
})
export class WebshopContentComponent implements OnInit {

  @Input() pConn$: any;

  showPega$: boolean = false;
  showResolution$: boolean = false;

  PCore$: any;
  resetPConnectSubscription: Subscription;

  constructor(private psservice: ProgressSpinnerService) { }

  ngOnInit(): void {

    if (!this.PCore$) {
      this.PCore$ = window.PCore;
    }

    this.createWork("Gold");

    this.PCore$.getPubSubUtils().subscribe(
      this.PCore$.getConstants().PUB_SUB_EVENTS.EVENT_CANCEL,
      () => { this.cancelAssignment() },
      "cancelAssignment"
    );

    this.PCore$.getPubSubUtils().subscribe(
      "assignmentFinished",
      () => { this.assignmentFinished() },
      "assignmentFinished"
    );
  }

  
  ngOnDestroy() {
    this.PCore$.getPubSubUtils().unsubscribe(
      this.PCore$.getConstants().PUB_SUB_EVENTS.EVENT_CANCEL,
      "cancelAssignment"
    );

    this.PCore$.getPubSubUtils().unsubscribe(
      "assignmentFinished",
      "assignmentFinished"
    );
  }

  cancelAssignment() {
    this.showPega$ = false;
  }

  assignmentFinished() {
    this.showResolution$ = true;
    this.showPega$ = false;

    this.psservice.sendMessage(false);

  }


  createWork(sLevel: string) {
    this.showPega$ = true;

    let actionsApi = this.pConn$.getActionsApi();
    let createWork = actionsApi.createWork.bind(actionsApi);
    let sFlowType = "pyStartCase";


    this.psservice.sendMessage(true);

    let actionInfo;
    const accessGroup = sessionStorage.getItem("userAccessGroup");

    let portalName = accessGroup;
    let pCore: any;
    if (window.PCore) {
      pCore = window.PCore;

      portalName = pCore.getEnvironmentInfo().getApplicationLabel();
    }
    
    if (portalName.toLowerCase().includes("cableco")) {
      actionInfo = {
        containerName: "primary",
        flowType: sFlowType ? sFlowType : "pyStartCase",
        caseInfo: {
          content : {
            "Package" : sLevel
          }
        }
      };

      createWork("CableC-CableCon-Work-Service", actionInfo);
    }
    else if (portalName.toLowerCase().includes("mediaco")) {
      actionInfo = {
        containerName: "primary",
        flowType: sFlowType ? sFlowType : "pyStartCase",
        caseInfo: {
          content : {
            "Package" : sLevel
          }
        }
      };
      
      createWork("DIXL-MediaCo-Work-NewService", actionInfo);
    }

 
  }
}