/** Interface for menu items */
export interface MenuItem {
    name: string,
    icon: IconType,
    label: string,
    routerLink: string,
    auth?: boolean
}

export interface SpaceInfo {
    id?: string|null,
    title?: string|null,
    desc?: string|null,
    images?: string[]|null,
    alt?: string|null
}

export interface CarouselSlides {
    id: string,
    src: string,
    title: string,
    subtitle: string,
    routerLink: string
}

export enum IconTypeEnum {
    ANGULAR_MAT = 'ANGULAR_MAT',
    GOOGLE_ICON = 'GOOGLE_ICON'
}

export interface IconType {
    value: string,
    type: IconTypeEnum
}