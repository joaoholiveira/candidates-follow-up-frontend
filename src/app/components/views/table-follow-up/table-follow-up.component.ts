import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FollowUp } from 'src/app/model/follow-up.model';
import { FollowUpService } from 'src/app/services/follow-up.service';
import { EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table-follow-up',
  templateUrl: './table-follow-up.component.html',
  styleUrls: ['./table-follow-up.component.css']
})
export class TableFollowUpComponent implements OnInit {

  displayedColumns: string[] = ['nomeCandidato', 'dataRetorno', 'tipoRetorno'];

  followUps = new MatTableDataSource<FollowUp>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  @Output() followUpEventEmitter = new EventEmitter();

  constructor(private followUpService: FollowUpService) {}

  ngOnInit(): void {
    this.listarFollowUps();
  }

  ngAfterViewInit() {
    this.followUps.paginator = this.paginator;
    this.followUps.sort = this.sort;
  }

  listarFollowUps() {
    this.followUpService.listarFollowUpsHabilitados()
      .subscribe((followUpResponse: FollowUp[]) => {
        this.followUps.data = followUpResponse;        
      })
  }

  visualizarFollowUp(followUp: string) {
    this.followUpEventEmitter.emit(followUp);
  }

  filtrarFollowUp(event: any) {
    let filtro = event.target.value;    
    this.followUps.filter = filtro.toLowerCase();
    console.log(this.followUps.data);
    
  }

  filtrarFollowUpPorData(event: any) {
    if (event.target.value) {
      var dia = new Date(event.target.value).getDate();
      var mes = new Date(event.target.value).getMonth() + 1;
      var ano = new Date(event.target.value).getUTCFullYear();

      let data = "";
      mes < 10 ? data = "0" + mes : data = mes.toString();
      dia < 10 ? data += "/0" + dia : data += "/" + dia;
      data += "/" + ano;

      this.followUps.filter = data;
    } else this.followUps.filter = "";
  }

}
