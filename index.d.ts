type Access = {
  [id: string]: boolean;
}

type Checklist = {
  [id: string]: {
    body: string;
    is_completed: boolean;
  }
}

interface Task {
  id: string;
  createdDate: string; 
  createdBy: string; // is the owner
  lastModifiedDate: string;
  lastModifiedBy: string;
  access: Access;
  body: string;
  note: string;
  checklist: Checklist;
  dueDate: string;
  startTime: string;
  duration: number // milliseconds maybe?
  
}