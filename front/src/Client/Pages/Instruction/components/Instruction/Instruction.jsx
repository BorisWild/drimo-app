import { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import HideElementsParts from "./HideElementsParts/HideElementsParts";
import ProgressBar from "./ProgressBar/ProgressBar";

import Images from "../ui/Images/Images";

import profile_image from '../../assets/images/materials/profile.png';
import panel_image from '../../assets/images/materials/panel.png';
import connector_image from '../../assets/images/materials/connector.png';

const Instruction = ( props ) => {

	const [ currentTitle, setCurrentTitle ] = useState( '' );
	const [ currentNodes, setCurrentNodes ] = useState( [] );
	const [ currentParts, setCurrentParts ] = useState( [] );
	const [ steps, setSteps ] = useState( [] );
	const [ lengthSteps, setLengthSteps ] = useState( 0 );

	const [activeSelect, setActiveSelect] = useState( false );
	const [currentSlide, setCurrentSlide] = useState( 0 );
	const [isActiveBar, setIsActiveBar] = useState( false );
	const [isCompletedAnimation, setIsCompletedAnimation] = useState(false);

	const [currentShowSlides, setCurrentShowSlides] = useState([]);

	useEffect(() => {
		if (props.playInstruction) {
			setIsActiveBar(true);
		}
	}, [props.playInstruction])

	useEffect( () => {

		console.log( props.steps );
		console.log( props.elements );
		console.log( props.elementsState )

		if ( props.steps.length > 0 ){

			let _steps = [];

			props.steps.forEach( ( item ) => {

				item.steps.forEach( ( step ) => {

					let parts = step.parts.map( (part) => {

						let elementObj = props.elements.find( ( element ) =>
							element.element_id === part.element_id && element.texture_id === part.texture_id
						)
						if ( elementObj !== undefined ) {

							return {
								...elementObj,
								quantity : part.amount,
							}

						}

					} );

					parts = parts.filter(Boolean);

					_steps.push( {
						images : step.images,
						nodes :  step.nodes,
						title : item.title,
						parts : parts,
					} );

				} );

				_steps.push( {
					images : [ item.endStep.image ],
					nodes :  [],
					title : item.endStep.title,
					parts : [],
				} );

			} ) ;

			_steps = _steps.map( (step) => {

				const _parts = step.parts.map( (part) => {

					const obj = props.elementsState.find( (element) => element.id === part.element_id );

					let preview = '';

					if ( obj !== undefined ){

						if ( obj.type === "Коннектор" ){
							preview = connector_image;
						} else if ( obj.type === "Профиль" || obj.type === "Ножки" ) {
							preview = profile_image;
						} else {
							preview = panel_image;
						}

					}

					return { ...part, preview : preview }

				} )

				return { ...step, parts : _parts  }

			} )

			setSteps( _steps ); 

			console.log( _steps ) ;

			setLengthSteps( _steps.length ); 

		}

	}, [ props.steps ] )

	useEffect( () => {

		if ( steps.length > 0 ){

			// console.log( 'Init steps' );

			setCurrentSlide( 0 );

			//Задаем первый слайд
			setCurrentShowSlides( steps[0].images );

			//Задаем начальный заголовок
			setCurrentTitle( steps[0].title );

			//Задаем неачальные узлы
			setCurrentNodes( steps[0].nodes );

			//Задаем детали
			setCurrentParts( steps[0].parts );

		}

	}, [ steps ] );

	const setDataStep = ( index  ) => {

		//Задаем слайд
		setCurrentShowSlides( steps[index].images );

		//Задаем заголовок
		setCurrentTitle( steps[index].title );

		//Задаем узлы
		setCurrentNodes( steps[index].nodes );

		//Задаем детали
		setCurrentParts( steps[index].parts );

	}

	
	const showImages = () => {

		setDataStep( currentSlide + 1 );

		if ( currentSlide === (lengthSteps-1) && isActiveBar ){

			setIsCompletedAnimation(true);

		}

	}

	const showPrevImages = () => {

		if ( currentSlide !== 0 ){
			setDataStep( currentSlide - 1 );
		}

	}
	const changeCurrentNumber = () => {
		if (currentSlide < lengthSteps-1) setCurrentSlide(prev => prev + 1);
		showImages();
	}
	const changeActionBar = (status) => {
		setIsActiveBar(status);
	}
	const showPrevSlideHandler = () => {
		setIsActiveBar(false);
		if (currentSlide === 0 ) {
			setCurrentSlide( 0 );
			showPrevImages();
		}
		else {
			setCurrentSlide(prev => prev - 1);
			showPrevImages();
		}
	}
	const changeBarHandler = () => {
		if (!isCompletedAnimation) {
			setActiveSelect(false);
			setIsActiveBar(prev => !prev);
		}
		else {
			setIsCompletedAnimation(false);
			setDataStep( 0 );
			setIsActiveBar(prev => !prev);
			setCurrentSlide( 0 );
		}
	}
	const showNextSlideHandler = () => {
		setIsActiveBar(false);
		if (isCompletedAnimation || currentSlide === lengthSteps-1) return;
		else {
			setCurrentSlide(prev => prev + 1);
			showImages();
		}
	}
	const changeStateSelect = () => {
		setActiveSelect(prev => !prev);
		if (!activeSelect) setIsActiveBar(false);
	};

	return (
		<section className='instruction'>
			<div className="instruction__body">
				<div className="instruction__header">
					<h2>инструкция</h2>
					
				</div>
				<div className="instruction__content content-instruction">
					<ProgressBar setSlide={changeCurrentNumber} lengthSteps={lengthSteps} currentSlide={currentSlide} isActiveBar={isActiveBar} changeActionBar={changeActionBar} />
					<div className="content-instruction__body">
						<div className="content-instruction__numbers">
							<div className="content-instruction__list-numbers">
								<div className="content-instruction__number content-instruction__number_current">{ currentSlide + 1 }</div>
								<span>/</span>
								<div className="content-instruction__number content-instruction__number_all">{ lengthSteps }</div>
							</div>
							<div className="content-instruction__title-box">
								<h3 className="content-instruction__title">{ currentTitle }</h3>
							</div>
						</div>
						<div className="content-instruction__images-box">
							<div className="instruction__controls controls-instruction">
								<div className="controls-instruction__body">
									<div className="controls-instruction__icon controls-instruction__icon_left" onClick={showPrevSlideHandler}>
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M6 10L16 17L16 3L6 10Z" fill="#C4C4C4" />
											<rect width="2" height="14" transform="matrix(-1 0 0 1 6 3)" fill="#C4C4C4" />
										</svg>
									</div>
									<div className="controls-instruction__icon controls-instruction__icon_action-box" onClick={changeBarHandler}>
										<div className="controls-instruction__icon-action">
											<CSSTransition in={isActiveBar} timeout={250} classNames="controls-instruction__icon-action-1" unmountOnExit	>
												<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
													<rect width="3" height="18" transform="matrix(1 0 0 -1 4 19)" fill="white" />
													<rect width="3" height="18" transform="matrix(1 0 0 -1 13 19)" fill="white" />
												</svg>
											</CSSTransition>
											<CSSTransition in={!isActiveBar} timeout={250} classNames="controls-instruction__icon-action-2" unmountOnExit	>
												<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M3 0.971594L3 19.0284C3 19.4351 3.45968 19.6717 3.79062 19.4353L16.4304 10.4069C16.7096 10.2075 16.7096 9.79254 16.4304 9.59313L3.79062 0.564728C3.45968 0.328346 3 0.564909 3 0.971594Z" fill="white" />
												</svg>
											</CSSTransition>
										</div>
									</div>
									<div className="controls-instruction__icon controls-instruction__icon_right" onClick={showNextSlideHandler}>
										<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M14 10L4 17L4 3L14 10Z" fill="#C4C4C4" />
											<rect x="14" y="3" width="2" height="14" fill="#C4C4C4" />
										</svg>
									</div>
								</div>
							</div>
							<Images sources={
								currentShowSlides
							}
							/>
						</div>
						<div className="content-instruction__btn-show-elements-box">
							<div className="content-instruction__btn-show-elements" onClick={changeStateSelect}>
								<p>{activeSelect ? 'скрыть' : "ПОКАЗАТЬ"} ЭЛЕМЕНТЫ И УЗЛЫ</p>
								<div className={activeSelect ? `content-instruction__icon-arrow _active` : `content-instruction__icon-arrow`}>
									<img src='assets/images/icons/icon-arrow.svg' alt="" />
								</div>
							</div>
						</div>
						<TransitionGroup className='content-instruction__elements-box'>
							{activeSelect && (
								<CSSTransition
									timeout={500}
									classNames="content-instruction__elements"
									unmountOnExit
								>
									<HideElementsParts nodes={ currentNodes } parts={ currentParts } />
								</CSSTransition>
							)}
						</TransitionGroup>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Instruction;