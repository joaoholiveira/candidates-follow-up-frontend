import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CanalRetorno } from 'src/app/model/canal-retorno.model';
import { CanalRetornoService } from 'src/app/services/canal-retorno.service';
import { MENSAGEM } from 'src/app/services/utils/mensagens.service';
import { SnackbarService } from 'src/app/services/utils/snackbar.service';
import { EditCanalRetornoComponent } from '../edit-canal-retorno/edit-canal-retorno.component';

@Component({
  selector: 'app-canal-retorno-form',
  templateUrl: './canal-retorno-form.component.html',
  styleUrls: ['./canal-retorno-form.component.css']
})
export class CanalRetornoFormComponent implements OnInit {
  displayedColumns: string[] = ['descricao'];
  isLoading: boolean = true;
  hasCanaisRetorno: boolean = true; 

  dataSource = new MatTableDataSource<CanalRetorno>();
  clickedRows = new Set<CanalRetorno>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(private canalRetornoService: CanalRetornoService, public dialog: MatDialog, private snackbarService: SnackbarService) {
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

  selecionarCanalRetorno(canalRetorno?: CanalRetorno){
    const dialogRef = this.dialog.open(EditCanalRetornoComponent, {
      width: '250px',
      data: { canalRetorno },
    });
  }
}
