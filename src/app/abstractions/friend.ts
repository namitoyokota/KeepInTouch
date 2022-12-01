export class Friend {
    /** Name of the friend */
    name?: string;

    /** Is one of favorite friends */
    favorite?: boolean;

    constructor(name?: string, favorite?: boolean) {
        this.name = name ? name : '';
        this.favorite = favorite ? favorite : false;
    }
}