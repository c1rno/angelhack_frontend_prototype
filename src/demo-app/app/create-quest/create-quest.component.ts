import {
  Component,
  OnInit
} from '@angular/core';
import { flyInOutTrigger } from '../animations/flyInOutTrigger-animation';
import { hostConfig } from '../animations/flyInOutTrigger-animation';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder
} from '@angular/forms';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AbstractDemoComponent } from '../abstract-demo.component';

const emailValidator = Validators.pattern('^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$');

@Component({
  selector: 'create-quest',
  host: hostConfig,
  animations: [
    flyInOutTrigger
  ],
  templateUrl: 'create-quest.component.html',
  styles: [`
    .create-quest {
      background: #f5f2f0;
      padding: 0 0.5em;
    }
  `]
})
export class CreateQuest extends AbstractDemoComponent implements OnInit {

  public disableForm = false;
  public form: FormGroup;
  public questName; // = new FormControl('Quest Name');
  public stageName; // = new FormControl('Stage Name');
  public description; // = new FormControl('Description');
  public cost; // = new FormControl('Cost');
  public stages;

  constructor(
    router: Router,
    route: ActivatedRoute,
    titleService: Title) {
    super(router, route, titleService);
  }

  public ngOnInit() {
    super.ngOnInit();

    this.stages = new FormArray([
      new FormControl('Stage Name'),
      // this.makeStage()
    ]);

    this.form = new FormGroup({
      questName: new FormControl('Quest Name'),
      stages: this.stages
    });
  }

  public makeStage() {
    return new FormGroup({
      'Stage Name':  new FormControl('Stage Name'),
      'Description': new FormControl('Description'),
      'Cost': new FormControl('Cost'),
    })
  }

  // public onSubmit() {
  //   console.log(this.form);
  // }

  public addStage() {
    console.log("CREATE_STAGE");
    // this.stages.push(this.makeStage());
    this.stages.push(new FormControl('Stage Name'));
    // const control = < any > this.form.controls['stages'];
    // control.push(this.addStage());
    // this.form = control;
  }
}
