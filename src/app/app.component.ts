import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core'
import { ProdutoService } from './services/produto.service';
import { Produto } from './types/produto';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CadastroComponent } from './components/cadastro/cadastro.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private service = inject(ProdutoService);
  private toaster = inject(ToastrService);
  private dialog = inject(MatDialog)

  public displayedColumns: string[] = ['id', 'nome', 'categoria'];
  public produtos: Produto[] = [];
  public isLoading: boolean = true;

  ngOnInit(): void {
    this.find();
  }

  find() {   
    this.isLoading = true; 
    this.service.list().subscribe(
      (produtos: Produto[]) => this.produtos = produtos,
      (error) => this.toaster.error(error.message??JSON.stringify(error), 'Ops! Erro ao carregar produtos.'),
      () => this.isLoading = false
    )
  }

  openCadastro() {
    this.dialog.open(CadastroComponent);
  }

}
