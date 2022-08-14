import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { FollowUp } from 'src/app/model/follow-up';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../templates/dialog/dialog.component';
import { FollowUpService } from 'src/app/services/follow-up.service';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['nomeCandidato', 'dataRetorno', 'tipoRetorno'];
  data: string = new Date().toLocaleDateString(); 
  followupsize: number = 0;
  followUps: FollowUp[] = []; 
  clickedRows = new Set<FollowUp>();

  dataSource = new MatTableDataSource<FollowUp>();

  constructor(public dialog: MatDialog, private followUpService: FollowUpService ) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.listarFollowUps(); 
  }

  listarFollowUps(){
    this.followUpService.listarFollowUpsPelaDataAtual()
      .subscribe((data: FollowUp[]) =>{    
        this.dataSource.data = data; 
        this.followupsize = data.length;
      })
  }

  add(row: FollowUp){
    console.log(row);

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title: "Marcar "+row['nomeCandidato']+" como contatado?", id: row['id']},
    });

    dialogRef.afterClosed().subscribe(result => {
      let id = result;       
    });
  }

}