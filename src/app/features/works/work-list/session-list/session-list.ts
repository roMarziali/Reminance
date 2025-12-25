import { Component, input } from '@angular/core';
import { SessionMedia } from '../../../../core/models/session-media.model';
import { PartialDatePipe } from '../../../../shared/pipes/partial-date.pipe';

@Component({
  selector: 'app-session-list',
  imports: [PartialDatePipe],
  templateUrl: './session-list.html',
  styleUrl: './session-list.scss',
})
export class SessionList {

  session = input.required<SessionMedia>();

  get endMessage(): string {
    if (this.session().ended == "Y") return "Terminé";
    if (this.session().ended == "N") return "Non";
    if (this.session().ended == "Ongoing") return "En cours";
    return "";
  }

}
