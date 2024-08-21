export type InquiryFormSendData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  propertyAddress: string;
};

export type InquiryFormParameters = {
  title: string;
  buttonText: string;
  setFormSendData: React.Dispatch<React.SetStateAction<InquiryFormSendData>>;
  backgroundImageUrl?: string;
  style?: string;
};
