import { ActivatedRoute, Router } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrls: ['./excluir-pensamento.component.css']
})
export class ExcluirPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  }

  constructor(
    private pensamentoService: PensamentoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //obtem o ID da rota
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.pensamentoService.buscarPorId(parseInt(id!)).subscribe((pensamento)=> {
      this.pensamento = pensamento;
    })
  }

  excluirPensamento(){
    if(this.pensamento.id){
      this.pensamentoService.excluir(this.pensamento.id).subscribe(()=> {
        this.router.navigate(['/listarPensamento']);
      })
    }
  }

  cancelarPensamento(){
    this.router.navigate(['/listarPensamento']);
  }



}
