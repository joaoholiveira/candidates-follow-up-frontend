import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FollowUp } from 'src/app/model/follow-up.model';
import { FollowUpService } from 'src/app/services/follow-up.service';

@Component({
  selector: 'app-table-follow-up',
  templateUrl: './table-follow-up.component.html',
  styleUrls: ['./table-follow-up.component.css']
})
export class TableFollowUpComponent implements OnInit {
  displayedColumns: string[] = ['nomeCandidato', 'dataRetorno', 'tipoRetorno', 'excluir'];

  followUps = new MatTableDataSource<FollowUp>();

  constructor(private followUpService: FollowUpService) { }

  ngOnInit(): void {
    this.listarFollowUps();
  }

  listarFollowUps(){
    this.followUpService.listarFollowUpsHabilitados()
      .subscribe((followUpResponse: FollowUp[]) =>{
        this.followUps.data = followUpResponse; 
        
      })
  }

  

}
