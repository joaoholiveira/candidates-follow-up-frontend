import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CanalRetorno } from 'src/app/model/canal-retorno.model';
import { CanalRetornoService } from 'src/app/services/canal-retorno.service';
import { SnackbarService } from 'src/app/services/utils/snackbar.service';
import { DialogComponent } from '../../templates/dialog/dialog.component';
import { EditCanalRetornoComponent } from '../edit-canal-retorno/edit-canal-retorno.component';

@Component({
  selector: 'app-canal-retorno',
  templateUrl: './canal-retorno.component.html',
  styleUrls: ['./canal-retorno.component.css']
})
export class CanalRetornoComponent implements OnInit {

  displayedColumns: string[] = ['descricao', 'excluir'];
  isLoading: boolean = true;
  hasCanaisRetorno: boolean = true;

  formFiltro: FormGroup;

  dataSource = new MatTableDataSource<CanalRetorno>();
  clickedRows = new Set<CanalRetorno>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(private canalRetornoService: CanalRetornoService, public dialog: MatDialog, private snackbarService: SnackbarService) {

    this.formFiltro = new FormGroup({
      descricaoFiltro: new FormControl("")
    })

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.listarCanaisDeRetorno();
  }

  listarCanaisDeRetorno() {
    this.isLoading = true;
    this.hasCanaisRetorno = true;
    this.formFiltro.reset();

    this.canalRetornoService.listarTodosCanaisDeRetornoHabilitados()
      .subscribe((data: CanalRetorno[]) => {
        this.dataSource.data = data;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }, error => {
        setTimeout(() => {
          this.isLoading = false;
          this.hasCanaisRetorno = false;
          this.snackbarService.showSnackBar("Erro a listar Canais de Retorno! Tente novamente!", 5000, "error-snackbar");
        }, 1000);
      })
  }

  selecionarCanalRetorno(canalRetorno?: CanalRetorno) {
    const dialogRef = this.dialog.open(EditCanalRetornoComponent, {
      width: '350px',
      data: { canalRetorno },
    });
  }

  applyFilter() {
    this.hasCanaisRetorno = true;
    let descricao = this.formFiltro.controls["descricaoFiltro"].value.trim();
    let filterValueLower = descricao.toLowerCase();

    if (descricao === '') this.listarCanaisDeRetorno();
    else {
      this.dataSource.data = this.dataSource.data.filter((canalRetorno) => canalRetorno.descricao.toLocaleLowerCase().includes(filterValueLower));
      if (this.dataSource.data.length === 0) {
        this.hasCanaisRetorno = false;
      }
    }
  }

  excluirCanalDeRetorno(canalRetorno: CanalRetorno) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: "Quer excluir o canal de retorno " + canalRetorno.descricao + "?", id: canalRetorno.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      let id = result;
      if (id) this.desabilitarCanalDeRetorno(id);
    });
  }

  desabilitarCanalDeRetorno(id: number) {
    this.canalRetornoService.desabilitarCanalDeRetorno(id)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.log(error);
      })
  }

  // listarCanaisRetornoPorDescricao(descricao: string) {
  //   this.canalRetornoService.listarCanalDeRetornoPorDescricao(descricao)
  //     .subscribe((data: CanalRetorno[]) =>{ 
  //       this.dataSource.data = data; 
  //     }, error =>{

  //     })
  // }

}
