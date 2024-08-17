import { InputsData, SliceData } from '../../model/Model';

export class Encoder {
  private data: InputsData;

  constructor(data: InputsData) {
    this.data = data;
  }

  public async encode(): Promise<SliceData> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.readAsDataURL(this.data.image[0]);

      reader.onload = () => {
        const copy: SliceData = {
          name: this.data.name,
          age: this.data.age,
          email: this.data.email,
          password: this.data.password,
          confirmed_password: this.data.confirmed_password,
          gender: this.data.gender,
          terms: this.data.terms,
          country: this.data.country,
          encodedImage: '',
        };

        if (typeof reader.result === 'string') {
          copy.encodedImage = reader.result;
        }

        resolve(copy);
        reader.onerror = reject;
      };
    });
  }
}
