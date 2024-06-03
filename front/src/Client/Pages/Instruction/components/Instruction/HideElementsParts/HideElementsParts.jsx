import SingleMaterialElement from "../../SingleMaterialElement/SingleMaterialElement";
import VideoBlock from "./VideoBlock/VideoBlock";
import { useState, useEffect } from "react";

import imageElement from '../../Elements/assets/images/materials/profile.png';

import preview_1 from './patterns/1/0.jpg';
import video_1 from './patterns/1/1.jpg';

import preview_2 from './patterns/2/0.jpg';
import video_2 from './patterns/2/1.jpg';

import preview_3 from './patterns/3/0.jpg';
import video_3 from './patterns/3/1.gif';

import preview_4 from './patterns/4/0.jpg';
import video_4 from './patterns/4/1.gif';

import preview_5 from './patterns/5/0.jpg';
import video_5 from './patterns/5/1.gif';

import preview_6 from './patterns/6/0.jpg';
import video_6 from './patterns/6/1.gif';

import preview_7 from './patterns/7/0.jpg';
import video_7 from './patterns/7/1.gif';

import preview_8 from './patterns/8/0.jpg';
import video_8 from './patterns/8/1.gif';

import preview_9 from './patterns/9/0.jpg';
import video_9 from './patterns/9/1.gif';

import preview_10 from './patterns/10/1/0.jpg';
import video_10 from './patterns/10/1/1.gif';

import preview_11 from './patterns/10/2/0.jpg';
import video_11 from './patterns/10/2/1.gif';

import preview_12 from './patterns/11/0.jpg';
import video_12 from './patterns/11/1.gif';

const getURL = () => {

	if (process.env.NODE_ENV === 'development') {
 		return 'https://drimo.dev-2-tech.ru';
   	} else if (process.env.NODE_ENV === 'production') {
   		return 'https://drimo-design.com'
   	}

}

const HideElementsParts = ( { nodes, parts } ) => {

	// useEffect( () => {

	// 	console.log( 'Nodes is changes!' );
	// 	console.log( nodes );

	// }, [ nodes ] );

	console.log( parts );

	const nodesBounds = [

		{ //1.Коннектор
			preview : preview_1,
			video : video_1,
			title : 'Сборка коннекторов',
		},
		{ //2.Коннектор + Профиль
			preview : preview_2,
			video : video_2,
			title : 'Сборка коннекторов с профилями',
		},
		{ //3.Панель в каркасе
			preview : preview_3,
			video : video_3,
			title : 'Сборка панели в каркас из профилей',
		},
		{ //4.Две панели в каркасе
			preview : preview_4,
			video : video_4,
			title : 'Сборка нескольких панелей в каркас из профилей',
		},
		{ //5.Дверь в каркасе
			preview : preview_5,
			video : video_5,
			title : 'Сборка двери в каркас из профилей',
		},
		{ //6.Дверь + Панель в каркасе
			preview : preview_6,
			video : video_6,
			title : 'Сборка двери и панели в каркас из профилей',
		},
		{ //7.Заглушки
			preview : preview_7,
			video : video_7,
			title : 'Сборка заглушек для коннекторов',
		},
		{ //8.Штифты
			preview : preview_8,
			video : video_8,
			title : 'Сборка штифтов для профилей',
		},
		{ //9.Ножки
			preview : preview_9,
			video : video_9,
			title : 'Сборка ножек',
		},
		{ //10.Толкатель 1 
			preview : preview_10,
			video : video_10,
			title : 'Сборка толкателя для двери',
		},
		{ //11.Толкатель 2 
			preview : preview_11,
			video : video_11,
			title : 'Сборка толкателя для двери',
		},
		{ //12.Направляющие
			preview : preview_12,
			video : video_12,
			title : 'Сборка направляющего для ящика',
		},

	];

	return (
		<div className="hide-elements-parts">
			<div className="hide-elements-parts__body">

				{
					parts.length > 0 ? (
						<div className="hide-elements-parts__elements">
							<h3 className="hide-elements-parts__title">Элементы</h3>
							<div className="hide-elements-parts__single-material single-material-hide">
								<div className="single-material-hide__body">

									{
										parts && parts.map( ( part ) => (

											<SingleMaterialElement
												key={ `${part.element_id}-${part.texture_id}` }
												img={part.preview}
												material={{ img: getURL()+'/'+JSON.parse(part.texture_image).src, title: part.texture_name, fontSize: true }}
												title={ part.element_title }
												number=''
												quantity={ part.quantity } 
											/>

										) )
									}
								</div>
							</div>
						</div>
					) : ''
				}
				{

					nodes.length > 0 ? (
						<div className="hide-elements-parts__parts">
							<h3 className="hide-elements-parts__title">Узлы</h3>
							<div className="hide-elements-parts__video-instructions video-instructions-hide">
								<div className="video-instructions-hide__body">

									{

										nodes.map( ( node ) => (

											<VideoBlock
												img={ nodesBounds[node-1].preview }
												link={ nodesBounds[node-1].video }
												text={ nodesBounds[node-1].title }
											/>

										) )

									}
								
								</div>
							</div>
						</div>
					) : ''

				}
				
				
			</div>
		</div>
	)
}

export default HideElementsParts;