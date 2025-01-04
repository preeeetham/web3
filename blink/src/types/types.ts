export interface ActionFormInput {
    title: string;
    imageUrl: string;
    description: string;    
    label: string;
    amounts: number[];
    customAmount: boolean;
}


export interface GeneratedLink {
    id: string;
    data: {
        title: string;
        icon: string;
        description: string;
        label: string;
        links: {
            actions: Array<{
                lable: string;
                href: string;
                parameters: Array<{
                    name: string;
                    label: string;
                    required: boolean;
                }>;
            }>
        }
    }
}