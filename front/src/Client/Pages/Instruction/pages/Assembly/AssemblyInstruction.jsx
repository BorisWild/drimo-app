import { useEffect, useRef, useState } from 'react';

import MainBlock from '../../components/MainBlock/MainBlock';
import Instruction from '../../components/Instruction/Instruction';
import Elements from '../../components/Elements/Elements';

import { getInstructionJSON } from '../../model/model3.js';

import { getImageFromJSON } from '../../../../../Helpers/getImageFromJSON'
import axios from 'axios';

import profile_image from '../../assets/images/materials/profile.png';
import panel_image from '../../assets/images/materials/panel.png';
import connector_image from '../../assets/images/materials/connector.png';
import shtift_image_1 from '../../assets/images/materials/pin-without-hat.png';
import shtift_image_2 from '../../assets/images/materials/pin.png';


const getURL = () => {

	if (process.env.NODE_ENV === 'development') {
 		return 'https://drimo.dev-2-tech.ru';
   	} else if (process.env.NODE_ENV === 'production') {
   		return 'https://drimo-design.com'
   	}

}

const Assembly = ( props ) => {

	const windowHeight = window.innerHeight;
	const [ isShow, setIsShow ] = useState(false);
	const [ solutionData, setSolutionData ] = useState( { id : 0 } )
	const [ elements, setElements ] = useState(); 
	const [ parts, setParts ] = useState();
	const [ textures, setTextures ] = useState();
	const [ elementsIsLoaded, setElementsIsLoaded ] = useState(false);
	const [ solutionDataIsLoaded, setSolutionDataIsLoaded ] = useState(false);

	const [ stepsInstruction, setStepsInstruction ] = useState( [] );

	const blockInstrRef = useRef(null);

	useEffect(() => {
		
		if ( props.solution_id !== 0 && props.solution_id !== '' ){

			axios.get( getURL()+'/api/element/elements').then( (resp) => {

				console.log( resp );

				setElements( resp.data );

				setElementsIsLoaded(true);

			} );

			axios.get( getURL()+'/api/solution/'+props.solution_id ).then( (resp) => {

				console.log( resp );

				setSolutionDataIsLoaded(true);

				getInstructionJSON( {
					src : getURL()+'/' + JSON.parse(resp.data.ar_file).src,
					callback : setStepsInstruction,
				} );

				setSolutionData( resp.data );

			} );

		}

	}, [ props.solution_id ])

	useEffect(() => {

		if ( elementsIsLoaded && solutionDataIsLoaded ){

			console.log( elements );

			let textureParts = {
				profiles : [], panels : []
			};
		
			let globalParts = [
				{
					type : 'Ножки',
					title : 'Ножки',
					preview : profile_image,
					parts : [],
				},
				{
					type : 'Профиль',
					title : 'Профили',
					preview : profile_image,
					parts : [],
				},
				{
					type : 'Панель',
					title : 'Панели',
					preview : panel_image,
					parts : [],
				},
				{
					type : 'Коннектор',
					title : 'Коннекторы',
					preview : connector_image,
					parts : [],
				},
				{
					type : 'Дверная панель',
					title : 'Дверные панели',
					preview : panel_image,
					parts : [],
				},
				{
					type : 'Ящик',
					title : 'Ящики',
					preview : panel_image,
					parts : [],
				},
				{
					type : 'Штифт',
					title : 'Штифты',
					preview : {
						without: shtift_image_1,
						with : shtift_image_2,
					},
					parts : [],
				},
				{
					type : 'Штанга платяная',
					title : 'Штанги',
					preview : profile_image,
					parts : [],
				},
			];

			console.log(solutionData.parts);

			solutionData.parts.forEach( (part) => {

				const element_id = part.element_id;

				const element = elements.find( (element) => element.id === element_id );

				if ( element != undefined ){

					if ( element.type === 'Ножки' || element.type === 'Профиль'  || element.type === 'Коннектор' || element.type === 'Штанга' ){ // Для профилей

						if ( textureParts.profiles.find( (texture) => texture.id === part.texture_id ) === undefined ){

							console.log( part )

							console.log({
								id : part.texture_id,
								image : getImageFromJSON(part.texture_image),
								title : part.texture_name,
							})

							textureParts.profiles.push( {
								id : part.texture_id,
								image : getImageFromJSON(part.texture_image),
								title : part.texture_name,
							} )

						}

					} else { //Для всего остального

						if ( element.type.indexOf('Штифт') === -1){
							if ( textureParts.panels.find( (texture) => texture.id === part.texture_id ) === undefined ){

								console.log( part )

								console.log({
									id : part.texture_id,
									image : getImageFromJSON(part.texture_image),
									title : part.texture_name,
								})

								textureParts.panels.push( {
									id : part.texture_id,
									image : getImageFromJSON(part.texture_image),
									title : part.texture_name,
								} )

							}
						}



					}

					const index = globalParts.findIndex( (globalPart) => globalPart.type === element.type );

					if ( index !== -1 ){
						globalParts[index].parts.push( part );
					}

				}
		
			} )

			setTextures( textureParts );

			console.log( globalParts );

			setParts( globalParts ); 

		}
		
	}, [ elementsIsLoaded, solutionDataIsLoaded ])

	useEffect(() => {

		const scrollHandler = () => {
			if (blockInstrRef.current && !isShow && blockInstrRef.current.getBoundingClientRect().top - windowHeight / 2 <= 0) {
				setIsShow(true);
			}
		}
		document.addEventListener('scroll', scrollHandler);
		return function () { document.removeEventListener('scroll', scrollHandler) };


	}, [windowHeight, isShow])

	return (
		<div className='wrapper-instruction'>
			<MainBlock data={ solutionData } textures={ textures } order_id={ props.order_id } />
			<Elements elements={ parts } /> 
			<div ref={blockInstrRef}>
				<Instruction playInstruction={isShow} steps={ stepsInstruction } elementsState={ elements } elements={ solutionData.parts } />
			</div>
		</div>
	)
}

export default Assembly;