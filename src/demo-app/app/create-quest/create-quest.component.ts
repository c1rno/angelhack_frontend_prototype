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
  public questName = new FormControl('Quest Name');
  public stageName = new FormControl('Stage Name');
  public description = new FormControl('Description');
  public cost = new FormControl('Cost');

  constructor(router: Router, route: ActivatedRoute, titleService: Title, private fb: FormBuilder) {
    super(router, route, titleService);
  }

  public addStage() {
    return this.fb.group({
      'Stage Name':  this.stageName,
      'Description': this.description,
      'Cost': this.cost,
    })
  }

  public ngOnInit() {
    super.ngOnInit();
    this.form = this.fb.group({
      'questName':  this.questName,
      stages: this.fb.array([
                this.addStage(),
            ]),
    }); 
    this.createStage();
  }

  public onSubmit() {
    console.log(this.form);
  }

  public createStage() {
    console.log("CREATE_STAGE");
    this.form['stages'].push(this.addStage());
    // const control = < any > this.form.controls['stages'];
    // control.push(this.addStage());
    // this.form = control;
  }
}
