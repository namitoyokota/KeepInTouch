export class Friend {
    /** Identifier for the object */
    id?: string;

    /** Name of the friend */
    name?: string;

    /** Is one of favorite friends */
    favorite?: boolean;

    constructor(id?: string, name?: string, favorite?: boolean) {
        this.id = id ? id : Date.now().toString();
        this.name = name ? name : '';
        this.favorite = favorite ? favorite : false;
    }
}