import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '../list.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  lists: any[] = [];
  newListName: string = '';
  message: string | null = null;
  shareEmail: string = ''; // Propiedad para almacenar el correo electrónico
  selectedListId: string | null = null; // Propiedad para almacenar el ID de la lista seleccionada
  sharedLists: any[] = [];

  constructor(private listService: ListService, private router: Router) {}


  ngOnInit(): void {
    this.loadLists();
    this.loadSharedLists(); // Cargar listas compartidas al iniciar el componente
  }

  loadLists(): void {
    this.listService.getLists().subscribe(
      (data) => {
        this.lists = data;
      },
      (error) => {
        console.error('Error al cargar listas:', error);
        this.message = 'Error al cargar las listas.';
      }
    );
  }
  loadSharedLists(): void {
    this.listService.getSharedLists().subscribe(
      (data) => {
        this.sharedLists = data; // Asignar las listas compartidas
      },
      (error) => {
        console.error('Error al cargar listas compartidas:', error);
      }
    );
  }
  

  createList(): void {
    if (!this.newListName.trim()) {
      this.message = 'El nombre de la lista no puede estar vacío.';
      return;
    }
    this.listService.createList(this.newListName).subscribe(
      (newList) => {
        this.lists.push(newList);
        this.newListName = '';
      },
      (error) => {
        console.error('Error al crear la lista:', error);
        this.message = 'Error al crear la lista.';
      }
    );
  }

  deleteList(listId: string): void {
    this.listService.deleteList(listId).subscribe(
      () => {
        this.lists = this.lists.filter((list) => list.id !== listId);
      },
      (error) => {
        console.error('Error al eliminar la lista:', error);
        this.message = 'Error al eliminar la lista.';
      }
    );
  }

  navigateToProducts(listId: string): void {
    this.router.navigate([`/lists/${listId}/products`]);
  }

  openShareModal(listId: string): void {
    this.selectedListId = listId; // Almacena el ID de la lista seleccionada
    this.shareEmail = ''; // Limpia el correo en cada apertura del modal
    const modalElement = document.getElementById('shareModal');
    if (modalElement) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modalElement);
      bootstrapModal.show();
    }
  }

  shareList(): void {
    if (!this.selectedListId || !this.shareEmail.trim()) {
      this.message = 'Debe seleccionar una lista e ingresar un correo electrónico válido.';
      return;
    }
  
    this.listService.shareList(this.selectedListId, this.shareEmail).subscribe({
      next: () => {
        this.message = `Invitación enviada a ${this.shareEmail}`;
      },
      error: (error) => {
        console.error('Error al compartir la lista:', error);
        this.message = 'Error al enviar la invitación. Inténtelo de nuevo.';
      },
    });
  }
  
  
}
