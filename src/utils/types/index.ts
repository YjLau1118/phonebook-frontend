interface IContactList {
  _id: string;
  name: string;
  phone: string;
}

interface IActionModal {
  _id: string; 
  name: string;
  phone: string;
  onSubmit: () => void;
}
export type {IContactList, IActionModal}