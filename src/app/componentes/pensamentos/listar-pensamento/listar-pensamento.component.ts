import { Component, Input, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Array<Pensamento> = [] ;
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';

  constructor(private pensamentoService: PensamentoService) { }

  ngOnInit(): void {
    this.pensamentoService.listar(this.paginaAtual, this.filtro).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    });
  }

  carregarMaisPensamentos(){

    this.paginaAtual = ++this.paginaAtual;
   // console.log(this.paginaAtual);
    this.pensamentoService.listar(this.paginaAtual, this.filtro)
        .subscribe( listaPensamentos => {
          this.listaPensamentos.push(...listaPensamentos);
          if(!listaPensamentos.length){
            this.haMaisPensamentos = false;
          }
        })
  }

  pesquisarPensamentos(event: any){
   //console.log(event.target.value);
    this.haMaisPensamentos = true; //sempre ser rendenizado ao fazer uma busca
    this.paginaAtual = 1;
    this.pensamentoService.listar(this.paginaAtual, this.filtro)
      .subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos
      })
  }

}
