import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { flyInOutTrigger } from '../animations/flyInOutTrigger-animation';
import { hostConfig } from '../animations/flyInOutTrigger-animation';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from '../abstract-demo.component';
import { AppService } from '../app-service';

@Component({
  selector: 'search-qests',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'search-quest.component.html',
  styles: [
    `
    .demo-tab-container{
       display: inline-block;
    }
    mdl-icon {
       vertical-align: middle;
    }
    .mdl-tabs__tab {
        cursor: pointer;
    }
    .demo-toggle-disabled-container mdl-switch {
        margin: 5px 0;
    }
    .search-quest {
      background: #f5f2f0;
      padding: 0 0.5em;
    }
    `
  ],
  encapsulation: ViewEncapsulation.None
})
export class SearchQuest extends AbstractDemoComponent implements OnInit {

  public activeIndex = 0;
  public disableTargaryens = true;
  public myArray: string[] = null;
  public quests = [];
  public errorMessage = '';

  constructor(router: Router, route: ActivatedRoute, titleService: Title, private appService: AppService) {
    super(router, route, titleService);
  }

  public tabChanged({index}) {
    this.activeIndex = index;
  }

  ngOnInit() {
    // Simulates a later change of tabs
    setTimeout(() => {
      this.myArray = ['a', 'b', 'c'];
    }, 1000);
    super.ngOnInit();
    this.getQuests();
  }

  getQuests() {
    this.appService.getQuests().subscribe(
      quests => this.quests = quests,
      error =>  this.errorMessage = <any>error);
  }

}
