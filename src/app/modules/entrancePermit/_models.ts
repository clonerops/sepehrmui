export interface IEntrancePermit {
    id?: string,
    transferRemittanceId: any,
    attachments: {
        fileData: string;
    }[],
}

export interface IEntrancePermitFilter {
    id?: number, 
    OriginWarehouseId?: number, 
    TransferEntransePermitNo?: number, 
    PageNumber?: number,
    PageSize?: number,
  
  }