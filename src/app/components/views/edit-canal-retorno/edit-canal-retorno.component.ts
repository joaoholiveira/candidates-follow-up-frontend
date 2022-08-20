import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CanalRetorno } from 'src/app/model/canal-retorno.model';
import { CanalRetornoService } from 'src/app/services/canal-retorno.service';
import { MENSAGEM } from 'src/app/services/utils/mensagens.service';
import { SnackbarService } from 'src/app/services/utils/snackbar.service';
import { DialogComponent, DialogData } from '../../templates/dialog/dialog.component';

@Component({
  selector: 'app-edit-canal-retorno',
  templateUrl: './edit-canal-retorno.component.html',
  styleUrls: ['./edit-canal-retorno.component.css']
})
export class EditCanalRetornoComponent implements OnInit {
  canalRetorno: CanalRetorno;
  formCanalRetorno: FormGroup;
  textoBotaoSalvar: string = "Inserir";
  editando: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private canalRetornoService: CanalRetornoService, private snackbarService: SnackbarService
  ) {
    this.canalRetorno = this.data["canalRetorno"];

    this.formCanalRetorno = new FormGroup({
      id: new FormControl(''),
      descricao: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(60)])
    });
    this.verificarCanalDeRetorno(this.canalRetorno);
  }


  ngOnInit(): void {
  }

  salvarCanalRetorno() {
    this.canalRetorno = this.formCanalRetorno.value;

    if (this.editando) this.editarCanalDeRetorno(this.canalRetorno)
    else this.inserirNovoCanalDeRetorno(this.canalRetorno);
  }

  editarCanalDeRetorno(canalRetorno: CanalRetorno) {
    this.canalRetornoService.editarCanalDeRetorno(canalRetorno)
      .subscribe(response => {
        if (response.status === 204) {
          this.snackbarService.showSnackBar(MENSAGEM.canalRetornoEditadoComSucesso, 2000, 'success-snackbar');
          this.formCanalRetorno.reset();
          this.fechar();
        }
      }, error => {
        this.snackbarService.showSnackBar(MENSAGEM.erroEditarCanalRetorno, 2000, 'error-snackbar');
      })
  }

  inserirNovoCanalDeRetorno(canalRetorno: CanalRetorno) {
    this.canalRetornoService.inserirNovoCanalDeRetorno(canalRetorno)
      .subscribe(response => {
        if (response.status === 201) {
          this.snackbarService.showSnackBar(MENSAGEM.canalRetornoInseridoComSucesso, 2000, 'success-snackbar');
          this.formCanalRetorno.reset();
          this.fechar();
        }
      }, error => {
        this.snackbarService.showSnackBar(MENSAGEM.erroInserirCanalRetorno, 2000, 'error-snackbar');
      })
  }

  getErrorMessage() {
    let descricaoCanalRetorno = this.formCanalRetorno.controls["descricao"];

    if (descricaoCanalRetorno.hasError('required')) return MENSAGEM.campoObrigatorio;
    if (descricaoCanalRetorno.hasError('minlength') || descricaoCanalRetorno.hasError('maxlength')) return MENSAGEM.tamanhoDescricaoCanalRetorno;
    return '';
  }

  fechar() {
    setTimeout(() => {
      this.dialogRef.close();
    }, 500);
  }

  verificarCanalDeRetorno(canalRetorno: CanalRetorno) {
    if (canalRetorno) {
      this.textoBotaoSalvar = "Salvar Alterações";
      this.editando = true;
      this.formCanalRetorno.setValue({
        id: canalRetorno.id,
        descricao: canalRetorno.descricao
      });
    }
  }
}


