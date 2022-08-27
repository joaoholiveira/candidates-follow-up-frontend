import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CanalRetorno } from 'src/app/model/canal-retorno.model';
import { FollowUp } from 'src/app/model/follow-up.model';
import { CanalRetornoService } from 'src/app/services/canal-retorno.service';
import { FollowUpService } from 'src/app/services/follow-up.service';
import { MENSAGEM } from 'src/app/services/utils/mensagens.service';

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

  constructor(private canalRetornoService: CanalRetornoService, private followUpService: FollowUpService) {
    this.followUpForm = new FormGroup({
      id: new FormControl(""),
      nomeCandidato: new FormControl("João Henrique", [Validators.required, Validators.minLength(2), Validators.maxLength(80)]),
      dataRetorno: new FormControl("", [Validators.required]), 
      canalDeRetorno: new FormControl(null, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.listarCanaisDeRetorno();
  }

  listarCanaisDeRetorno(){
    this.canalRetornoService.listarTodosCanaisDeRetornoHabilitados()
      .subscribe((canaisDeRetornoResponse: CanalRetorno[]) =>{
        this.canaisDeRetorno = canaisDeRetornoResponse; 
      })
  }


  validarInputNomeCandidato(){
    let nomeCandidato = this.followUpForm.controls["nomeCandidato"];

    if (nomeCandidato.hasError('required')) return MENSAGEM.campoObrigatorio;
    if (nomeCandidato.hasError('minlength') || nomeCandidato.hasError('maxlength')) return MENSAGEM.tamanhoNomeCandidato;
    return ""; 
  }

  validarInputDataRetorno(){
    let dataDeRetorno = this.followUpForm.controls["dataRetorno"];

    if (dataDeRetorno.hasError('required')) return MENSAGEM.campoObrigatorio;
    return ""; 
  }

  validarSelectCanalDeRetorno(){
    let canalDeRetorno = this.followUpForm.controls["canalDeRetorno"];

    if (canalDeRetorno.hasError('required')) return MENSAGEM.campoObrigatorio;
    return ""; 
  }

  salvarFollowUp(){
    this.followUp = this.followUpForm.value; 
    this.followUp.dataRetorno = new Date(this.followUpForm.controls["dataRetorno"].value).toISOString().slice(0, 10); 
    this.inserirFollowUp(this.followUp); 
  }

  inserirFollowUp(followUp: FollowUp){
    console.log(followUp);
    this.followUpService.inserirFollowUp(followUp)
      .subscribe(response =>{
        console.log(response);
      })
  }

}
