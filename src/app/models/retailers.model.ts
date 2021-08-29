import { SafeResourceUrl } from "@angular/platform-browser";

export class RetailersModel {
    id: number;
    iframeUrl: SafeResourceUrl;
    title: string;
    telephone: string;
    emailAddresses?: string;
    address?: string;
    map_link: string;
    region_id: string;
    showRetailers: string;
}