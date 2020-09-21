import { ImageSourcePropType } from 'react-native';

export class Product {

  constructor(readonly id: number,
              readonly title: string,
              readonly subtitle: string,
              readonly image: ImageSourcePropType,
              readonly price: number,
              readonly amount: number) {
  }

  get formattedPrice(): string {
    return `$${this.price}`;
  }

  get totalPrice(): number {
    return this.price * this.amount;
  }

  static pinkChair(): Product {
    return new Product(
      0,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis magna id felis ornare sodales. Aenean vel euismod lectus, pellentesque suscipit ligula.  ',
      'Furniture',
      require('../assets/image-product-1.png'),
      130,
      1,
    );
  }

  static blackLamp(): Product {
    return new Product(
      1,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mattis magna id felis ornare sodales. Aenean vel euismod lectus, pellentesque suscipit ligula. ',
      'Lighting',
      require('../assets/image-product-1.png'),
      80,
      1,
    );
  }
}
