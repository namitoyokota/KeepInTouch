export class Friend {
  /** Identifier for the object */
  id?: string;

  /** Name of the friend */
  name?: string;

  /** Is one of favorite friends */
  favorite?: boolean;

  /** Number of days set as a goal */
  goalDays?: number;

  /** Date you last caught up */
  lastCaughtUp?: Date;

  /** Need to catch up */
  needsAttention?: boolean;

  constructor(
    id?: string,
    name?: string,
    favorite?: boolean,
    goalDays?: number,
    lastCaughtUp?: Date,
    needsAttention?: boolean
  ) {
    this.id = id ? id : Date.now().toString();
    this.name = name ? name : '';
    this.favorite = favorite ? favorite : false;
    this.goalDays = goalDays ? goalDays : 30;
    this.lastCaughtUp = lastCaughtUp ? lastCaughtUp : new Date();

    const today = new Date();
    const daysApart = today?.valueOf() - lastCaughtUp?.valueOf();
    if (daysApart > goalDays) {
      this.needsAttention = needsAttention ? needsAttention : false;
    }
  }
}
