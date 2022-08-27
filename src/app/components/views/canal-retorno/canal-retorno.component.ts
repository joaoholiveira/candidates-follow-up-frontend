import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CanalRetorno } from 'src/app/model/canal-retorno.model';
import { CanalRetornoService } from 'src/app/services/canal-retorno.service';
import { FollowUpService } from 'src/app/services/follow-up.service';
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

  formFiltro: FormGroup;

  dataSource = new MatTableDataSource<CanalRetorno>();
  clickedRows = new Set<CanalRetorno>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(private canalRetornoService: CanalRetornoService, public dialog: MatDialog, private snackbarService: SnackbarService,
    private followUpService: FollowUpService) {

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
    this.formFiltro.reset();
    this.dataSource.filter = "";

    this.canalRetornoService.listarTodosCanaisDeRetornoHabilitados()
      .subscribe((data: CanalRetorno[]) => {        
        this.dataSource.data = data;
        
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }, error => {
        this.isLoading = false;
        setTimeout(() => {
          this.snackbarService.exibirErro(error);
        }, 1000);
      })
  }

  selecionarCanalRetorno(canalRetorno?: CanalRetorno) {
    const dialogRef = this.dialog.open(EditCanalRetornoComponent, {
      width: '350px',
      data: { canalRetorno },
    });

    dialogRef.afterClosed()
      .subscribe(response =>{        
        if(response) this.listarCanaisDeRetorno();
      })

  }

  applyFilter(event: any) {
    let descricao = event.target.value;
    this.dataSource.filter = descricao.toLowerCase();    
  }

  excluirCanalDeRetorno(canalRetorno: CanalRetorno) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: "Quer excluir o canal de retorno " + canalRetorno.descricao + "?", id: canalRetorno.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      let id = result;
      if (id) this.verificarFollowUpCanalDeRetorno(id);
    });
  }

  verificarFollowUpCanalDeRetorno(id: number) {
    this.followUpService.listarFollowUpsPorTipoDeRetorno(id)
      .subscribe((response) => {
        if (response.length === 0) this.desabilitarCanalDeRetorno(id);
        else this.snackbarService.showSnackBar("Não é possível excluir canal de retorno com follow ups ativos!", 5000, "error-snackbar");
      }, error => {
        this.snackbarService.exibirErro(error);
      })
  }

  desabilitarCanalDeRetorno(id: number) {
    this.canalRetornoService.desabilitarCanalDeRetorno(id)
      .subscribe(response => {
        if (response.status === 204) {
          this.snackbarService.showSnackBar("Canal de retorno excluído com sucesso!", 5000, "success-snackbar");

          setTimeout(() => {
            this.listarCanaisDeRetorno();
          }, 800);
        }

      }, error => {
        this.snackbarService.exibirErro(error);
      })
  }
}
