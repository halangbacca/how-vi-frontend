import { Component } from '@angular/core';
import { ListarMatricula } from 'src/app/shared/models/ListarMatricula';
import { MatriculaService } from 'src/app/shared/services/matricula/matricula.service';

@Component({
  selector: 'app-list-matricula',
  templateUrl: './list-matricula.component.html',
  styleUrls: ['./list-matricula.component.scss'],
})
export class ListMatriculaComponent {
  matriculas = [] as ListarMatricula[];

  displayedColumns: string[] = ['nomeDisciplina', 'cargaHoraria', 'nomeAluno'];

  constructor(private matriculaService: MatriculaService) {}

  ngOnInit(): void {
    this.matriculaService.getMatricula().subscribe((ret) => {
      this.matriculas = ret;
      console.log(this.matriculas);
    });
  }
}
