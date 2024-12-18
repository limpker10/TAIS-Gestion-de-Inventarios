import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  ApiResponse,
  CreateRecordRequest,
  InventoryItem,
} from '../../../inventory/interfaces/IInventory';
import { Movimiento } from '../../../inventory/output-inventory/output-inventory.component';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl =
    'https://crnyybily9.execute-api.us-east-2.amazonaws.com/api-rest-v1/inventario';

  constructor(private http: HttpClient) {}

  // Método para obtener datos del inventario
  getInventoryData(): Observable<InventoryItem[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map((response) => response.data) // Extraer solo el campo `data`
    );
  }

  createRecord(movimiento: Movimiento): Observable<any> {
    // Adaptar el movimiento antes de enviarlo
    const adaptadoMovimiento = this.adaptarMovimiento(movimiento);

    console.log(adaptadoMovimiento);
    return this.http.post<any>(this.apiUrl, adaptadoMovimiento);
  }

  // Función para adaptar el movimiento
  private adaptarMovimiento(movimiento: Movimiento): any {
    // Crear un nuevo objeto con los datos adaptados
    const { cliente_provedor, ...resto } = movimiento;

    const movimientoAdaptado = {
      ...resto,
      cliente_proveedor: {
        tipo_usuario: cliente_provedor.tipo_usuario,
        usuario_id: cliente_provedor.usuario_id,
      },
    };

    return movimientoAdaptado;
  }
}
