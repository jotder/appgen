import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PageConfig} from '../models/models';
import {WidgetHost} from "../../shared/components/widget-host/widget-host";

@Component({
    selector: 'app-page-generator',
    standalone: true,
    imports: [CommonModule, WidgetHost],
    templateUrl: './page-generator.html',
    styleUrls: ['./page-generator.scss']
})
export class PageGenerator {
    @Input() pageConfig: PageConfig | null = null;
}
