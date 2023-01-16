import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/components/product/product.service';
import { Product } from 'src/app/components/product/product.model';

class Produto{
  id : number = 0
  nome : string = ""
  valor : number = 0
  isSelecionado : boolean = false
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  produtos : Produto[] = []
  loading : boolean = false

  constructor(private productService: ProductService) { }


  async ngOnInit() {
    this.loading = true
    let produtosApi : Product[] = await this.productService.read()
    this.produtos = produtosApi.map( productMap => {
      return {
        id : productMap.id,
        nome: productMap.name,
        valor: productMap.price,
        isSelecionado : false
      }
    })
    this.loading = false
  }

  selecionarProduto(produto : Produto) : void {
    this.produtos = this.produtos.map(produtoMap => {
      if(produtoMap.id == produto.id){
        produtoMap.isSelecionado = true
      }else{
        produtoMap.isSelecionado = false
      }

      return produtoMap;
    })
  }

  getCssClassProduto(produto : Produto) : string[] {
    let listaClasses : string[] = ["produto"]

    if(produto.isSelecionado){
      listaClasses.push("produto-selecionado")
    }

    return listaClasses
  }
}
