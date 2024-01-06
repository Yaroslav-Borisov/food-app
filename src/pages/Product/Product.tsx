import { Await, useLoaderData, useParams } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import style from './Product.module.css';
import { useDispatch } from 'react-redux';
import { AppDispath } from '../../store/store';
import { cartActions } from '../../store/cart.slice';

export function Product() {
	const dispatch = useDispatch<AppDispath>();
	const data = useLoaderData() as { data: Product };
	const {id} = useParams();

	const add = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		dispatch(cartActions.add(Number(id)));
	};

	return <>
		<Suspense fallback={'Загружаю...'}>
			<Await
				resolve={data.data}
			>
				{({ data }: { data: Product }) => (
					<div className={style['wrapper']}>
						<h1 className={style['title']}>«{data.name}»</h1>
						<img className={style['image']} src={data.image}/>
						<div className={style['price']}>Стоимость: {data.price} рублей</div>
						<ul className={style['list']}>
							{data.ingredients.map((ingridient, index) => <li className={style['item']} key={index}>{ingridient}</li>)}
						</ul>
						<button className={style['button']} onClick={add}>Добавить в корзину</button>
					</div>
				)}
			</Await>
		</Suspense>
	</>;
}