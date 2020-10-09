import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../data.service';

@Component({
  selector: 'app-passive-voice-fix',
  templateUrl: './passive-voice-fix.component.html',
  styleUrls: ['./passive-voice-fix.component.css']
})
export class PassiveVoiceFixComponent implements OnInit {

  message: string;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

}
