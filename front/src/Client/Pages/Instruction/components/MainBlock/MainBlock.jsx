import BlockMaterial from './BlockMaterial/BlockMaterial';
import Button from '../ui/Button/Button';
import { useNavigate } from 'react-router-dom'

import texture1 from '../Elements/assets/images/icons/icon-material-1.png';
import texture2 from '../Elements/assets/images/icons/icon-material-2.png';
import texture3 from '../Elements/assets/images/icons/icon-material-3.png';
import {useEffect} from "react";

const getURL = () => {

	if (process.env.NODE_ENV === 'development') {
 		return 'https://drimo.dev-2-tech.ru';
   	} else if (process.env.NODE_ENV === 'production') {
   		return 'https://drimo-design.com'
   	}

}

const MainBlock = ( props ) => {

	useEffect(() => {
		console.log(props.data)
	}, [props.data]);
	useEffect(() => {
		console.log(props.textures)
	}, [props.textures]);

	const navigate = useNavigate();

	const order = '№ '+props.order_id;

	console.log( props );

	return (
		<section className='instruction-main'>

			{
				props.data.id > 0 ? (

					<div className='instruction-main__container'>
						<div className='instruction-main__content'>
							<div className='instruction-main__wrapper'>
								<a style={ {'cursor' : 'pointer'} } onClick={() => { navigate(-1) }}  className='instruction-main__arrow-order'>
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M5 10H16" stroke="#E92627" strokeWidth="2" strokeLinecap="square" />
										<path d="M9 5L4 10L9 15" stroke="#E92627" strokeWidth="2" strokeLinecap="square" />
									</svg>
									<p> к заказу</p>
									<span>/</span>
									<span>{order}</span>
								</a>
								<h1>Инструкция по сборке</h1>
								<h2 className='instruction-main__sub-title'>{props.data.name}</h2>
								<div className='instruction-main__sizes-box'>
									<span>{ props.data.height } x { props.data.width } x { props.data.length } мм • { props.data.weight } г </span>
								</div>
								<div className='instruction-main__material-box'>
									{
										props.textures && props.textures.panels && props.textures.panels.length > 0 ? (

											<div className="instruction-main__panels">
												<p>Панели:</p>
												{
													props.textures.panels.map( (texture) => <BlockMaterial title={texture.title} img={texture.image} /> )
												}
											</div>

										) : ''
									}
									{
										props.textures && props.textures.profiles && props.textures.profiles.length > 0 ? (

											<div className="instruction-main__profiles">
												<p>Профили:</p>
												{
													props.textures.profiles.map( (texture) => <BlockMaterial title={texture.title} img={texture.image} /> )
												}
											</div>

										) : ''
									}
								</div>
								<div className='instruction-main__buttons-box'>
									<Button title='В КОНСТРУКТОР' href={ getURL()+'/constructor?id='+props.data.id } />
									<Button title='AR РЕШЕНИЕ ' href={'https://ardrimo.dev-2-tech.ru/?f=https://drimo.dev-2-tech.ru/'+JSON.parse( props.data.ar_file ).src } bg img="assets/images/icons/icon-ar.svg" />
								</div>
							</div>
						</div>
						<div className='instruction-main__image-box'>
							<div className='instruction-main__image'>
								<img src={ getURL()+'/'+JSON.parse( props.data.image ).src } alt="" />
							</div>
						</div>
					</div>

				) : ''
			}

			
		</section>
	)
}

export default MainBlock;