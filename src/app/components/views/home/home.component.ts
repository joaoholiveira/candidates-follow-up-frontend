import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FollowUp } from 'src/app/model/follow-up';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../templates/dialog/dialog.component';
import { FollowUpService } from 'src/app/services/follow-up.service';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['nomeCandidato', 'dataRetorno', 'tipoRetorno'];
  data: string = new Date().toLocaleDateString("en");
  followUps: FollowUp[] = [];
  clickedRows = new Set<FollowUp>();
  textoBoasVindas: string = "";
  dataSource = new MatTableDataSource<FollowUp>();
  formFiltro: FormGroup;
  isLoading: boolean = true;


  constructor(public dialog: MatDialog, private followUpService: FollowUpService) {
    this.formFiltro = new FormGroup({
      nomeCandidatoFiltro: new FormControl(''),
      dataRetornoFiltro: new FormControl('')
    })
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

  listarFollowUps() {
    this.followUpService.listarFollowUpsPelaDataAtual()
      .subscribe((data: FollowUp[]) => {
        this.dataSource.data = data;

        this.textoBoasVindas = "Olá! Você tem " + this.dataSource.data.length + " Follow";

        if (this.dataSource.data.length > 1) this.textoBoasVindas += " Ups";
        else if (this.dataSource.data.length == 1) this.textoBoasVindas += " Up";
        else this.textoBoasVindas = "Olá! Você não possui nenhum Follow Up";
        this.textoBoasVindas += " para hoje " + this.data.toString();
        setTimeout(() => {
          this.isLoading = false;
        }, 1500);
      })
  }

  filtrarFollowUp() {
    let nomeCandidato = this.formFiltro.controls['nomeCandidatoFiltro'].value;
    let dataRetorno = this.formFiltro.controls['dataRetornoFiltro'].value;

    if (dataRetorno !== '' && dataRetorno !== null) dataRetorno = new Date(dataRetorno).toLocaleDateString();

    this.followUpService.listarFollowUpsPelaDescricaoEDataDeRetorno(nomeCandidato, dataRetorno)
      .subscribe((data: FollowUp[]) => {
        console.log(data);

        this.dataSource.data = [];
        this.dataSource.data = data;
      })
  }

  add(row: FollowUp) {
    console.log(row);

    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: "Marcar " + row['nomeCandidato'] + " como contatado?", id: row['id'] },
    });

    dialogRef.afterClosed().subscribe(result => {
      let id = result;
    });
  }

}