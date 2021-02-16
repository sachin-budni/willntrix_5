export interface Roles {
    isAdmin?: boolean;
    isEditor?: boolean;
    isStudent: boolean;
}

export class Users {
    userId: string | undefined;
    userName: string | undefined | null;
    userProfile: string | undefined | null;
    userPhoneNo: string | undefined | null;
    userEmail: string | undefined | null;
    roles: Roles | undefined | null;
    createDate: string | undefined;
    lastSeen: string | undefined;
}

export class Email {
    form: string | undefined;
    to: string | undefined;
    subject: string | undefined;
    html: string | undefined;
}

export class Course {
    key?: string;
    name: string | undefined;
    icon: string | undefined;
    route: string | undefined;
    hour: string | undefined;
    order: number | undefined;
  }
  export class Sylabus {
    key?: string;
    name?: string;
    description?: string;
    pdf?: string;
    children?: any;
  }

  export class Review {
    image: string | undefined;
    name: string | undefined;
    videoLink: string | undefined;
    desc: string | undefined;
    designation: string | undefined;
    company: string | undefined;
    show: boolean | undefined;
    skills: [] | undefined;
  }

  export class FormField {
    formName: string | undefined;
    placeHolder: string | undefined;
    className?: string;
  }