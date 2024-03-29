import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CanalRetorno } from 'src/app/model/canal-retorno.model';
import { FollowUp } from 'src/app/model/follow-up.model';
import { CanalRetornoService } from 'src/app/services/canal-retorno.service';
import { FollowUpService } from 'src/app/services/follow-up.service';
import { MENSAGEM } from 'src/app/services/utils/mensagens.service';
import { SnackbarService } from 'src/app/services/utils/snackbar.service';
import { DialogComponent } from '../../templates/dialog/dialog.component';

@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.css']
})
export class FollowupComponent implements OnInit {

  followUpForm: FormGroup;
  canaisDeRetorno: CanalRetorno[] = [];
  textoBotaoSalvar: string = "Criar Follow Up";
  followUp: FollowUp;
  descricaoCanalDeRetornoSelecionado: string = "";
  isEditing: boolean = false;

  constructor(private canalRetornoService: CanalRetornoService, private followUpService: FollowUpService, private snackbarService: SnackbarService, public dialog: MatDialog) {
    this.followUpForm = new FormGroup({
      id: new FormControl(""),
      nomeCandidato: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(80)]),
      dataRetorno: new FormControl("", [Validators.required]),
      canalDeRetorno: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.listarCanaisDeRetorno();
  }

  listarCanaisDeRetorno() {
    this.canalRetornoService.listarTodosCanaisDeRetornoHabilitados()
      .subscribe((canaisDeRetornoResponse: CanalRetorno[]) => {
        this.canaisDeRetorno = canaisDeRetornoResponse;
      })
  }

  inserirFollowUp(followUp: FollowUp) {
    this.followUpService.inserirFollowUp(followUp)
      .subscribe(response => {
        if (response.status === 201) {
          this.snackbarService.showSnackBar("Follow Up criado com sucesso!", 4000, "success-snackbar");
          window.location.reload();
        }
      }, () => {
        this.snackbarService.showSnackBar("Erro ao inserir Follow Up! Tente novamente.", 6000, "error-snackbar");
      })
  }

  atualizarFollowUp(followUp: FollowUp) {
    this.followUpService.atualizarFollowUp(followUp)
      .subscribe(response => {
        if (response.status === 204) {
          this.snackbarService.showSnackBar("Follow Up atualizado com sucesso!", 4000, "success-snackbar");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }, () => {
        this.snackbarService.showSnackBar("Erro ao atualizar Follow Up! Tente novamente.", 6000, "error-snackbar");
      })
  }

  disableFollowUp(id: number) {
    this.followUpService.disableFollowUp(id)
      .subscribe((response) => {
        if (response.status === 204) {
          this.snackbarService.showSnackBar("Follow Up excluído com sucesso! Aguarde...", 6000, "success-snackbar");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      }, error => {
        this.snackbarService.showSnackBar("Erro ao excluir Follow Up! Tente novamente.", 6000, "error-snackbar");
      })
  }

  preencherForm(fupSelecionado: FollowUp) {
    this.followUpForm.reset();

    this.descricaoCanalDeRetornoSelecionado = "" + fupSelecionado.tipoRetorno.descricao;

    this.followUpForm.setValue({
      id: fupSelecionado.id,
      nomeCandidato: fupSelecionado.nomeCandidato,
      dataRetorno: new Date(fupSelecionado.dataRetorno),
      canalDeRetorno: fupSelecionado.tipoRetorno
    })

    this.isEditing = true;
    this.textoBotaoSalvar = "Salvar Alterações";
  }

  novo() {
    this.textoBotaoSalvar = "Criar Follow Up";
    this.isEditing = false;
    this.followUpForm.reset();
  }

  salvarFollowUp() {
    this.followUp = this.followUpForm.value;
    this.followUp.dataRetorno = new Date(this.followUpForm.controls["dataRetorno"].value).toISOString().slice(0, 10);

    if (!this.followUp.id) this.inserirFollowUp(this.followUp);
    else this.atualizarFollowUp(this.followUp);
  }

  desabilitarFollowUp() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { title: "Excluir Follow Up do candidato " + this.followUpForm.controls["nomeCandidato"].value, id: this.followUpForm.controls["id"].value },
    });

    dialogRef.afterClosed().subscribe(result => {
      let id = result;
      if (result) this.disableFollowUp(id);
    });
  }

  validarInputNomeCandidato() {
    let nomeCandidato = this.followUpForm.controls["nomeCandidato"];

    if (nomeCandidato.hasError('required')) return MENSAGEM.campoObrigatorio;
    if (nomeCandidato.hasError('minlength') || nomeCandidato.hasError('maxlength')) return MENSAGEM.tamanhoNomeCandidato;
    return "";
  }

  validarInputDataRetorno() {
    let dataDeRetorno = this.followUpForm.controls["dataRetorno"];

    if (dataDeRetorno.hasError('required')) return MENSAGEM.campoObrigatorio;
    return "";
  }

  validarSelectCanalDeRetorno() {
    let canalDeRetorno = this.followUpForm.controls["canalDeRetorno"];

    if (canalDeRetorno.hasError('required')) return MENSAGEM.campoObrigatorio;
    return "";
  }

}
