import { MenuItem } from "./interfaces";

/** Menu items */
export const menuItems: MenuItem[] = [
    {
    name: 'account',
    icon: 'account_circle',
    label: 'Account'
    },
    {
    name: 'saved_stories',
    icon: 'save',
    label: 'Saved Stories'
    },
    {
    name: 'about',
    icon: 'info',
    label: 'What Is This?'
    }
]

/** Test API response for... testing */
export const testApiResponse = {
    image: 'test_image',
    desc: 'New dog breed discovered in Kenya',
    title: 'Kenyorgi Dogs',
    alt: 'Photo of Kenyorgi dog'
}