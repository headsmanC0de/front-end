/*
Необходимо сделать корзину (Cart) на сайте,
которая имееет список продуктов (Product), добавленных в корзину
и переметры доставки (Delivery). Для Cart реализовать методы:
- Добавить продукт в корзину
- Удалить продукт из корзины по ID
- Посчитать стоимость товаров в корзине
- Задать доставку
- Checkout - вернуть что всё ок, если есть продукты и параметры доставки
Product: id, название и цена
Delivery: может быть как до дома (дата и адрес) или до пункта выдачи (дата = Сегодня и Id магазина)
*/

class Product {
	constructor(
		public id: number,
		public title: string,
		public price: number
	) { }
}

class Delivery {
	constructor(
		public date: Date
	) { }
}

class HomeDelivery extends Delivery {
	constructor(date: Date, public address: string) {
		super(date);
	}
}

class ShopDelivery extends Delivery {
	constructor(public shopId: number) {
		super(new Date());
	}
}

type DeliveryOption = HomeDelivery | ShopDelivery

class Cart {
	private products: Product[] = [];
	private delivery: DeliveryOption;

	public addProduct(product: Product): void {
		this.products.push(product)
	}

	public deleteProduct(productId: number): void {
		this.products = this.products.filter((p: Product) => p.id !== productId)
	}

	public getSum(): number {
		return this.products
			.map((p: Product) => p.price)
			.reduce((p1: number, p2: number) => p1 + p2)
	}

	public setDelivery(delivery: DeliveryOption): void {
		this.delivery = delivery
	}

	public checkOut() {
		if (this.products.length === 0) {
			throw new Error('No products')
		}
		if (!this.delivery) {
			throw new Error('Невказаний спосіб доставки')
		}
		return { success: true }
	}
}

const card = new Cart();

card.addProduct(new Product(1, 'Печеньки', 10));
card.addProduct(new Product(2, 'Тортик', 20));
card.addProduct(new Product(3, 'Шоколадка', 30));

card.deleteProduct(1);

// card.setDelivery(new HomeDelivery(new Date(), '15 квітня'))

console.log(card.getSum())
console.log(card.checkOut())

