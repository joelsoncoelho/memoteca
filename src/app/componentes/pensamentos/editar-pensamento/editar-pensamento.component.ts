import { Router, ActivatedRoute } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  public myForm!: FormGroup;

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

     //obtem o ID da rota
     const id = this.activatedRoute.snapshot.paramMap.get('id');

     this.pensamentoService.buscarPorId(parseInt(id!)).subscribe((pensamento)=> {

      this.myForm =  this.formBuilder.group({
        id: [pensamento.id],
        conteudo: [pensamento.conteudo, Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ])],
        autoria: [pensamento.autoria, Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        modelo: [pensamento.modelo]
      });

    })
  }

  editarPensamento(){
    this.pensamentoService.editar(this.myForm.value).subscribe(() => {
      this.router.navigate(['/listarPensamento']);
      })
  }

  cancelar(){
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao(){
    if(this.myForm.valid){
      return 'botao';
    } else {
      return 'botao__desabilitado';
    }
  }
}
