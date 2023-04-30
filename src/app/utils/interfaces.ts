/** Interface for menu items */
export interface MenuItem {
    name: string,
    icon: string,
    label: string
}

export interface SpaceInfo {
    id?: string|null,
    title?: string|null,
    desc?: string|null,
    images?: string[]|null,
    alt?: string|null
}