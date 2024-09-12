export interface IPostDraftOrder {
    attachments: any;
    description: string | undefined | null;
}

export interface IDraftOrderFilter {
    ProductId?: string | undefined | null
    Converted?: boolean | undefined | null
    CreatorId?: string | undefined | null
    PageNumber?: number | undefined | null
    PageSize?: number | undefined | null
}

export interface IDraftDetail {
    id?: number | undefined | null,
    creatorName?: string | undefined | null,
    createdDate?: string | undefined | null,
    converted?: boolean | undefined | null,
    description?: string | undefined | null,
    attachments?: any
}