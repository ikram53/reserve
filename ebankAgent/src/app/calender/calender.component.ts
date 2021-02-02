import { Component, OnInit, ChangeDetectionStrategy,ViewChild,TemplateRef, OnChanges, Input, SimpleChange, SimpleChanges} from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth,isSameDay,isSameMonth,addHours} from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView, DAYS_OF_WEEK, CalendarEventTitleFormatter} from 'angular-calendar';
import Swal from 'sweetalert2';
import { Subject, Observable } from 'rxjs';

import { CalendarService } from '../Service/calendar.service';
import { Meeting } from '../model/Meeting';
const colors: any = {
  blue: {
    primary: '#00008b',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
 /* providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatterService,
    }]*/
})

export class CalenderComponent implements OnInit{

 @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

/* from monday to saturday */
  weekStartsOn: number = 1;
  dayStartHour:number=8;
  dayEndHour:number=19;
  excludeDays : number[] = [0];


  /*Date de la colonne cliqué */
  clickedDate: Date;
  clickedColumn: number;

  meeting:Meeting=new Meeting();

 viewDate: Date = new Date();
  modalData : CalendarEvent;
  modifyEvent : CalendarEvent;


  refresh: Subject<any> = new Subject();
  events: CalendarEvent[]=[];
  activeDayIsOpen: boolean = true;


  constructor(private modalService: NgbModal,
    private calendarService: CalendarService) {}

  chargerEvent(meet){
   
    for(let i=0;i<meet.length;i++){
      console.log(meet[i].id)
      this.events = [
        ...this.events,
        {
          title:meet[i].title,
          start:new Date(meet[i].start),
          end: new Date(meet[i].end),
          color: colors.yellow,
          id:meet[i].id,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },},];}
    
  }
  ngOnInit() {
   console.log(this.viewDate.getMonth()+1);
   this.calendarService.getMeeting(this.viewDate.getMonth()+1).subscribe((data)=>{
     this.chargerEvent(data);
    })};


 dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;}
    }


 handleEvent(event: CalendarEvent): void {
    this.modalData =  event;
    this.modalService.open(this.modalContent, { size: 'lg' });
  }

  doubleClick(events): void {
    this.meeting.start=this.clickedDate;
    this.meeting.end=this.clickedDate;
    this.modalService.open(events, { size: 'lg' });
  }

addEvent(): void {
this.calendarService.addEvent(this.meeting);
this.calendarService.saveMeeting(this.meeting).subscribe(data => {
  this.events = [
    ...this.events,
    {
      title: this.meeting.title,
      start: this.meeting.start,
      end: this.meeting.end,
      color: colors.yellow,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
},
];

erreur => console.log(erreur)}
)
;
this.close();
  }


  setView(view: CalendarView) {
    this.view = view;
  }

  onNextPreviousTodayClick() {
 
    this.calendarService.getMeeting(this.viewDate.getMonth()+1).subscribe((data)=>{
      this.events=data;
      this.chargerEvent(data);
     })

  }

  /********/
  open(content) {
    console.log(content)
    this.modalService.open(content);
  }

  close(){
    this.modalService.dismissAll();
  }

/* fct appelle lorque on fait un drag and drop */
eventTimesChanged({
  event,
  newStart,
  newEnd,
}: CalendarEventTimesChangedEvent): void {
  event.start = newStart;
  event.end = newEnd;

  this.calendarService.updateMeeting(event)
  .subscribe(data => { this.refresh.next();console.log(data);});
}

toModifyModal(content){
  this.modalService.open(content, { size: 'lg' });
}

modifier(){
  console.log(this.modalData.id);
this.calendarService.updateMeeting(this.modalData)
  .subscribe(data => {console.log(data);this.close(); window.location.href = "dashboard/calender";});
}


delete() {
    console.log(this.modalData.id);
    Swal.fire({
      title: 'Vous etes sur?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'brown',
      cancelButtonColor: '#00003f',
      cancelButtonText: 'Non',
      confirmButtonText: 'Oui supprimé !',

    }).then((result) => {
      if (result.value) {  
        Swal.fire({            
          title:"Suppression avec succes",
          confirmButtonColor: '#00003f',
          confirmButtonText: "OK",
          width: 600

        })
        this.calendarService.deleteMeeting(Number(this.modalData.id))
       .subscribe(data => {
          window.location.href = "dashboard/calender";
        },
        err=>{ Swal.fire(
          'Erreur non supprime')})
      }
    })

    this.close();
}


}


