import { Timestamp } from 'firebase/firestore/lite';

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
    lastCaughtUp?: Date | Timestamp,
    needsAttention?: boolean
  ) {
    this.id = getId(id);
    this.name = getName(name);
    this.favorite = getFavorite(favorite);
    this.goalDays = getGoal(goalDays);
    this.lastCaughtUp = getLastCaughtUp(lastCaughtUp);
    this.needsAttention = getAttention(this.goalDays, this.lastCaughtUp);
  }
}

/** Returns ID to set */
function getId(id: string): string {
  if (id) {
    return id;
  } else {
    return Date.now().toString();
  }
}

/** Returns Name to set */
function getName(name: string): string {
  if (name) {
    return name;
  } else {
    return '';
  }
}

/** Returns favorite flag to set */
function getFavorite(favorite: boolean): boolean {
  if (favorite) {
    return favorite;
  } else {
    return false;
  }
}

/** Returns goal days to set */
function getGoal(goal: number): number {
  if (!!goal) {
    return goal;
  } else {
    return 30;
  }
}

/** Returns last caught up date to set */
function getLastCaughtUp(date: Date | Timestamp): Date {
  if (date instanceof Timestamp) {
    return date.toDate();
  } else if (date instanceof Date) {
    return date;
  } else {
    return new Date();
  }
}

/** Returns attention needed flag */
function getAttention(goalDays: number, lastCaughtUp: Date): boolean {
  const today = new Date();
  const differentInTime = today.getTime() - lastCaughtUp.getTime();
  const differenceInDays = differentInTime / (1000 * 60 * 60 * 24);

  if (differenceInDays > goalDays) {
    return true;
  } else {
    return false;
  }
}
