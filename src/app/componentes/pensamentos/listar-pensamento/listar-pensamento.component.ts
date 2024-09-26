import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { Router, RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];

  constructor(
    private service: PensamentoService,
    private router: Router
  ) { }

  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favorito: boolean = false;
  listaFavoritos: Pensamento[] = []
  titulo: string = 'Meu Mural'

  ngOnInit(): void {
    this.service.listar(this.paginaAtual,this.filtro,this.favorito).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    })
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro, this.favorito).subscribe( listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos)
      if(!listaPensamentos.length){
        this.haMaisPensamentos = false
      }
    })
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe(listaPensamentos => {
      this.listaPensamentos = listaPensamentos
    })
  }

  recarregarComponent() {
    this.favorito = false
    this.paginaAtual = 1

    this.router.navigate([this.router.url])
    this.router.onSameUrlNavigation = 'reload'
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }


  mostrarFavoritos() {
    this.titulo = 'Meus favorito'
    this.favorito = true
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro,this.favorito).subscribe(listaDeFavorito => {
      this.listaPensamentos = listaDeFavorito
      this.listaFavoritos = listaDeFavorito
    })
  }
}


