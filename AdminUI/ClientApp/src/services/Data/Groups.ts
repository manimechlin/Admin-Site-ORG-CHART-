export class Group 
{
    public id: number;
    public name: string;
    public isActive: boolean;
    public img?: string;
    public pid:number=1;
    public groupinfo:groupinfo;
}
export class groupinfo
{
    public group:boolean=true;
    public groupName:string;
    public groupState:number=0;
    public template:string="group_orange";
}
export const Groups: Group[] = [
    // {
    //     "id": 1,
    //     "name": "CEO",
    //     "isActive": true,
    //     "img":"https://source.unsplash.com/random/40x40",
    //     "groupinfo":
    //     {
    //      "group": true,
    //      "groupName": "CEO Team",
    //      "groupState": "OrgChart.EXPAND",
    //      "template": "group_orange"
    //     }
    // },
    // {
    //     "id": 2,
    //     "name": "Sales",
    //     "isActive": true,
    //     "img": "https://source.unsplash.com/random/40x40",
    //     "groupinfo":
    //     {
    //      "group": true,
    //      "groupName": "CEO Team",
    //      "groupState": "OrgChart.EXPAND",
    //      "template": "group_orange"
    //     }

    // },
    // {
    //     "id": 3,
    //     "name": "Marketing",
    //     "isActive": true,
    //     "img": "https://source.unsplash.com/random/40x40",
    //     "groupinfo":
    //     {
    //      "group": true,
    //      "groupName": "CEO Team",
    //      "groupState": "OrgChart.EXPAND",
    //      "template": "group_orange"
    //     }
    // },
    // {
    //     "id": 4,
    //     "name": "Financial",
    //     "isActive": false,
    //     "img": "https://source.unsplash.com/random/40x40",
    //     "groupinfo":
    //     {
    //      "group": true,
    //      "groupName": "CEO Team",
    //      "groupState": "OrgChart.EXPAND",
    //      "template": "group_orange"
    //     }

    // }
]
