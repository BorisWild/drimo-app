import React from 'react';

import SingleMaterialElement from "../SingleMaterialElement/SingleMaterialElement";
import ItemElements from "./ItemElements/ItemElements";

import profile_image from './assets/images/materials/profile.png';
import panel_image from './assets/images/materials/panel.png';
import connector_image from './assets/images/materials/connector.png';
import kit1 from './assets/images/materials/wrench.png';
import kit2 from './assets/images/materials/hex-key.png';
import kit3 from './assets/images/materials/mallet.png';

const Elements = ( props ) => {

	React.useEffect( () => {

		console.log( props )

	}, [ props ] )

	const getPreview = ( preview, title ) => {


		if ( typeof preview === 'object' ){

			if ( title.includes('без') ){
				return preview.without;
			}else{
				return preview.with;
			}

		}else{
			return preview;
		}


	}

	return (
		<div className="elements-instruction">
			<div className="elements-instruction__body">
				<div className="elements-instruction__header">
					<h2 className="elements-instruction__title">элементы</h2>
				</div>
				<div className="elements-instruction__content">

					{
						props.elements && props.elements.length > 0 && props.elements.map( (item: any) => (
							
								item && item.parts.length > 0 ? (
									<div className="elements-instruction__content-block">
										<h3 className="elements-instruction__sub-title">{ item.type }</h3>
										<div className="elements-instruction__items">
											<ItemElements>

												{
													item && item.parts && item.parts.map( (part: any) => 
														<SingleMaterialElement
															key={ `${part.element_id}-${part.texture_id}` }
															img={ getPreview( item.preview, part.element_title ) }
															material={{ img: 'https://drimo.dev-2-tech.ru/'+JSON.parse(part.texture_image).src, title: part.texture_name, fontSize: true }}
															title={ part.element_title }
															number=''
															quantity={ part.quantity }
														/>
													)
												}

											</ItemElements>
										</div>
									</div>
								) : ''
							
							

						) )
					}

					<div className="elements-instruction__content-block">
						<h3 className="elements-instruction__sub-title">Инструменты</h3>
						<div className="elements-instruction__items">
							<ItemElements>
								<SingleMaterialElement
									img={ kit1 }
									title='Рожковый ключ 6х7мм Stanley STMT72837-8'
									subtitle="Для сборки панелей и профилей"
									variant
								/>
								<SingleMaterialElement
									img={ kit2 }
									title='Шестигранный ключ 6мм, покрытие хром GRIFF 031115'
									subtitle="Понадобиться для вкручивания штифтов"
									variant
								/>
								<SingleMaterialElement
									img={ kit3 }
									title='Чёрная резиновая киянка STAYER 450 г 2054-65'
									subtitle="Понадобится для соединение панелей"
									variant
								/>
							</ItemElements>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Elements;