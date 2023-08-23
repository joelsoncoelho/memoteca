import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pensamento } from '../pensamento';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from '../../uteis/minusculo-validator';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css']
})
export class CriarPensamentoComponent implements OnInit {

  public myForm!: FormGroup;

  constructor(
    private router: Router,
    private pensamentoService: PensamentoService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm =  this.formBuilder.group({
      conteudo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
        minusculoValidator
      ])],
      autoria: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        minusculoValidator
      ])],
      modelo: ['modelo1']
    })
  }

  criarPensamento(): void {
    console.log(this.myForm.get('autoria')?.errors)
    if(this.myForm.valid){
      this.pensamentoService.criar(this.myForm.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao(){
    if(this.myForm.valid){
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }

}
