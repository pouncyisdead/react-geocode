// Type definitions for react-geocode 0.2.1
// Project: https://github.com/shukerullah/react-geocode/
// Definitions by: Mike Pouncy <https://github.com/pouncyisdead>

declare module 'react-geocode' {
    const reactGeocode: {
        setApiKey(apiKey: string): void;
        setLanguage(language: string): void;
        setRegion(region: string): void;
        enableDebug(flag?: boolean): void;
        fromLatLng(lat: string, lng: string, apiKey?: string, language?: string, region?: string): Promise<any>;
        fromAddress(address: string, apiKey?: string, language?: string, region?: string): Promise<any>;
    };

    export = reactGeocode;
}