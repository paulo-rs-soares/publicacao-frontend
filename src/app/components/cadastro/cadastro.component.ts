import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core'
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  private service = inject(ProdutoService);
  private toaster = inject(ToastrService);
  private dialog = inject(MatDialog)

  public nome: string= '';
  public categoria: string = '';
  public isLoading: boolean = false;

  onSalvar() {
    if(this.nome == '' || this.categoria == '' ) {
      this.toaster.warning("Preencha todos os campos");
      return;
    }

    this.isLoading = true;

    this.service.save({id: '', nome: this.nome, categoria: this.categoria}).subscribe(
      (success) => {
        this.toaster.success("Produto salvo com sucesso!");
        this.dialog.closeAll();
      },
      (error) => this.toaster.error(error.message ?? 'Erro ao cadastrar produto, tente novamente.'),
      () => this.isLoading = false
    )
  }

}