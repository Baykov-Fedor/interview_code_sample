export interface IInvoicePartDto {
  name: string;
  description: string;
  quantity: number;
  cost: number;
  totalCost: number;
}

export interface IInvoiceServiceDto {
  name: string;
  description: string;
  minimumHours: number;
  cost: number;
  totalCost: number;
}

export interface IInvoiceCommentDto {
  createdAt: string;
  text: string;
}

export interface IInvoiceVehicleDto {
  driver: string | null;
  referenceNumber: number | null;
  vehicle: string;
  vehicleSerialNumber: string;
  vehicleUnitNumber: string;
  vehicleType: string;
  vehicleLocation: string;
}
