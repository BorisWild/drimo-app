import $ from "jquery";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { getDataPanel, getDataProfile } from './helper.js';

import axios from 'axios';

export const getInstructionJSON = ( data ) => {

	const window_width = 1440;
	const window_height = 1100;

	// console.log(window_width, window_height);


	const modelFile = data.src;

	const loaderGLTF = new GLTFLoader();
	const textureLoader = new THREE.TextureLoader();

	const scene = new THREE.Scene();
	const camera = new THREE.OrthographicCamera( (window_width/2) / - 2, (window_width/2) / 2, (window_height/2) / 2, (window_height/2) / - 2, 1, 1000 );
	camera.position.z = 15;
	camera.position.x = -8;
	camera.position.y = 8;
	camera.zoom = 18;
	camera.updateProjectionMatrix();

	const renderer = new THREE.WebGLRenderer({
		antialias: true, 
	});

	renderer.outputEncoding = THREE.sRGBEncoding;

	renderer.setSize( window_width/2, window_height/2 );
	renderer.setClearColor( 0xffffff, 1 );

	renderer.render( scene, camera );

	$('#three-root').html( renderer.domElement );

	const controls = new OrbitControls( camera, renderer.domElement );

	const light = new THREE.AmbientLight( 0xffffff, 1); // soft white light
	scene.add( light );

	var details = [], CURRENT_STEP = 0, STEP = 72.5, MAX_POSITION_Y = 0, LAYER_COUNTER = 0, LAYER_STAGE = 0, RATION = 1.25, HTML_LAYER = '', HTML_LAYER_STEP = 0, END_GENERATION = false, DEFAULT_CURRENT_STEP = 0, current_fingersnodes = [];

	var stepsArray = [], parts = [];

	const getDataElement = ( object ) => {

		if ( object.userData.type === 'panel' || object.userData.type === 'door' ){
			return getDataPanel( object );
		}
		if ( object.userData.type === 'profile' || object.userData.type === 'leg' ){
			return getDataProfile( object ); 
		}
		return null;

	}

	const setupInitData = () => {

		CURRENT_STEP = DEFAULT_CURRENT_STEP;
		STEP = 72.5;
		LAYER_COUNTER = 0;
		LAYER_STAGE = 0;
		RATION = 1.1;
		HTML_LAYER = '';
		HTML_LAYER_STEP = 0;
		END_GENERATION = false;

	}

	const isFinger = ( object3D ) => {

		if ( object3D.userData.type === 'finger' ){
			return true;
		}
		return false;

	}

	const isLeg = ( object3D ) => {

		if ( object3D.userData.type === 'leg' ){
			return true;
		}
		return false;

	}

	const isOther = ( object3D ) => {

		if ( object3D.userData.type === 'box' ||  object3D.userData.type === 'door' ){
			return true;
		}
		return false;

	}

	const isDoor = ( object3D ) => {

		if ( object3D.userData.type === 'door' ){
			return true;
		}
		return false;

	}

	const isBox = ( object3D ) => {

		if ( object3D.userData.type === 'box' ){
			return true;
		}
		return false;

	}

	const isPanel = ( object3D ) => {

		if ( object3D.userData.type === 'panel' ){
			return true;
		}
		return false;

	}

	const isPanelVertical = ( object3D ) => {

		if ( 
			object3D.rotation.x === 0 &&
			object3D.rotation.y === 0 &&
			object3D.rotation.z === 0 
		){
			return false;
		} else if ( 
			object3D.rotation.x !== 0 &&
			object3D.rotation.y === 0 &&
			object3D.rotation.z === 0 
		){
			return true;
		} else if (
			object3D.rotation.x === 0 &&
			object3D.rotation.y !== 0 &&
			object3D.rotation.z === 0
		){
			return false;
		} else if (
			object3D.rotation.x === 0 &&
			object3D.rotation.y === 0 &&
			object3D.rotation.z !== 0
		){
			return false;
		} else if (
			object3D.rotation.x !== 0 &&
			object3D.rotation.y === 0 &&
			object3D.rotation.z !== 0
		){
			return true;
		}else if (
			object3D.rotation.x === 0 &&
			object3D.rotation.y !== 0 &&
			object3D.rotation.z !== 0
		){
			return false;
		}

	}

	const isPanelVerticalZ = ( object3D ) => {

		if (
			object3D.rotation.x === 0 &&
			object3D.rotation.y === 0 &&
			object3D.rotation.z === 0
		){
			return true;
		} else if (
			object3D.rotation.x === 0 &&
			object3D.rotation.y === 0 &&
			object3D.rotation.z !== 0
		){
			return true;
		}
		return false;

	}

	const isProfile = ( object3D ) => {

		if ( object3D.userData.type === 'profile' ){
			return true;
		}
		return false;

	}

	const isProfileHasVerticalOrientation = ( object3D ) => {

		if ( object3D.rotation.x !== 0 ){
			return true;
		}
		return false;

	}

	const newSteps = ( title, endTitle )  => {

		stepsArray.push({
			title : title,
			steps : [],
			endStep : {
				title : endTitle,
				image : '',
			}, 
		})

	}

	if ( modelFile !== '' ){

		loaderGLTF.load(

			modelFile,

			function ( gltf ) {

				console.log( gltf ); 

				let bbox = new THREE.Box3().setFromObject(gltf.scene);
				let helper = new THREE.Box3Helper(bbox, new THREE.Color(0, 255, 0));
				let size = bbox.getSize(new THREE.Vector3());
				let center = new THREE.Vector3();
				bbox.getCenter( center )
 
				controls.target.z = center.z;
				controls.target.x = center.x;
				controls.target.y = center.y;

				camera.position.z = 15 + center.z;
				camera.position.x = -8 + center.x;
				camera.position.y = 8 + center.y;

				let dimensions = {
					min : { x : 1000000, y : 1000000, z : 1000000 },
					max : { x : -1000000, y : -1000000, z : -1000000 },
				}

				details = [ ...gltf.scenes[0].children ];

				//Находим самый нижний элемент.
				details.forEach( ( object3D, index ) => {

					if ( Number(object3D.position.x.toFixed(3)) < dimensions.min.x ){
						dimensions.min.x = Number( object3D.position.x.toFixed(3) );
					}
					if ( Number(object3D.position.x.toFixed(3)) > dimensions.max.x ){
						dimensions.max.x = Number( object3D.position.x.toFixed(3) );
					}
					if ( Number(object3D.position.y.toFixed(3)) < dimensions.min.y ){
						dimensions.min.y = Number( object3D.position.y.toFixed(3) );
					}
					if ( Number(object3D.position.y.toFixed(3)) > dimensions.max.y ){
						dimensions.max.y = Number( object3D.position.y.toFixed(3) );
					}
					if ( Number(object3D.position.z.toFixed(3)) < dimensions.min.z ){
						dimensions.min.z = Number( object3D.position.z.toFixed(3) );
					}
					if ( Number(object3D.position.z.toFixed(3)) > dimensions.max.z ){
						dimensions.max.z = Number( object3D.position.z.toFixed(3) );
					}

					//На этом этапе счиатем объем элементов
					const data = getDataElement( object3D );

					if ( data ){
						details[index].userData.volume = data.volume;
						details[index].userData.orientation = data.orientation;
					}

				} )
				console.log(details);

				CURRENT_STEP = dimensions.min.y*100;
				DEFAULT_CURRENT_STEP = CURRENT_STEP;
				MAX_POSITION_Y = dimensions.max.y*100;

				const sizesLines = {
					x : (dimensions.max.x - dimensions.min.x) + 10,
					y : (dimensions.max.y - dimensions.min.y) + 10,
					z : (dimensions.max.z - dimensions.min.z) + 10,
				}  

				const centerModel = { x : 0, y : 5, z : 0 }  

				const sizeGrid = dimensions.max.x - dimensions.min.x;
				const divisions = (dimensions.max.x - dimensions.min.x)/1.45;

				const gridHelper = new THREE.GridHelper( sizeGrid, divisions );
				gridHelper.position.y = dimensions.min.y - 0.725;

				scene.add( gridHelper );

				// const axesHelper = new THREE.AxesHelper( 5 );
				// axesHelper.position.x = - ( dimensions.max.x - dimensions.min.x )/2 - 1;
				// axesHelper.position.z = - ( dimensions.max.x - dimensions.min.x )/2 - 1;
				// axesHelper.position.y = dimensions.min.y - 0.725
				// scene.add( axesHelper );

				const lines = { x : [], y : [], z : [] };

				details.forEach( ( object3D ) => {
					if ( object3D.userData.type === 'finger' ){

						//Чтобы не создавать несколько одинаковых лучей
						//Для горизонтальных по оси X
						if (
							lines.x.findIndex( (line) => 
								line.x === centerModel.x &&
								line.y === object3D.position.y &&
								line.z === object3D.position.z
							) === -1
						){

							//В зависимости от связей у коннекторов, нужно создать вспомогательные лучи
							//Так как рассматриваются лучи по ось X, то связи по z мы игнорируем.
							Object.keys(object3D.userData.nodes).forEach( (key) => {

								if ( key !== 'xn' && key !== 'xp' ){

									if ( object3D.userData.nodes[key] === 1 ){

										let offset = {
											x : 0, y : 0, z : 0
										}
										//Здесь считаем смещение
										if ( key === 'zn' ){
											offset.z = 0.525;
										}
										if ( key === 'zp' ){
											offset.z = -0.525;
										}
										if ( key === 'yn' ){
											offset.y = 0.525;
										}
										if ( key === 'yp' ){
											offset.y = -0.525;
										}

										if ( offset.x !== 0 || offset.y !== 0 || offset.z !== 0 ){

											//Генерируем луч
											let line = new THREE.Box3();
											line.setFromCenterAndSize( 
												new THREE.Vector3( centerModel.x + offset.x, object3D.position.y + offset.y, object3D.position.z + offset.z ), 
												new THREE.Vector3( sizesLines.x, 0, 0 )
											);
											let helperLine = new THREE.Box3Helper( line, 0xff0000 );
											lines.x.push( {
												object : helperLine,
												x : centerModel.x + offset.x,
												y : object3D.position.y + offset.y,
												z : object3D.position.z + offset.z 
											} );
											// scene.add( helperLine );

										}

									}

								}

							} )

						}

						//Для горизонтальных по оси Z
						if (
							lines.z.findIndex( (line) => 
								line.x === object3D.position.x &&
								line.y === object3D.position.y &&
								line.z === centerModel.z
							) === -1
						){

							Object.keys(object3D.userData.nodes).forEach( (key) => {

								if ( key !== 'zn' && key !== 'zp' ){

									if ( object3D.userData.nodes[key] === 1 ){

										let offset = {
											x : 0, y : 0, z : 0
										}
										//Здесь считаем смещение
										if ( key === 'xn' ){
											offset.x = 0.525;
										}
										if ( key === 'xp' ){
											offset.x = -0.525;
										}
										if ( key === 'yn' ){
											offset.y = 0.525;
										}
										if ( key === 'yp' ){
											offset.y = -0.525;
										}

										if ( offset.x !== 0 || offset.y !== 0 || offset.z !== 0 ){

											let line = new THREE.Box3();
											line.setFromCenterAndSize( 
												new THREE.Vector3( object3D.position.x + offset.x, object3D.position.y + offset.y, centerModel.z + offset.z ), 
												new THREE.Vector3( 0, 0, sizesLines.z )
											);
											let helperLine = new THREE.Box3Helper( line, 0x0000ff );
											lines.z.push( {
												object : helperLine,
												x : object3D.position.x + offset.x,
												y : object3D.position.y + offset.y,
												z : centerModel.z  + offset.z 
											} );
											// scene.add( helperLine );

										}

									}

								}

							} )

						}

						//Для горизонтальных по оси Y
						if (
							lines.y.findIndex( (line) => 
								line.x === object3D.position.x &&
								line.y === centerModel.y &&
								line.z === object3D.position.z
							) === -1
						){

							Object.keys(object3D.userData.nodes).forEach( (key) => {

								if ( key !== 'yn' && key !== 'yp' ){

									if ( object3D.userData.nodes[key] === 1 ){

										let offset = {
											x : 0, y : 0, z : 0
										}
										//Здесь считаем смещение
										if ( key === 'xn' ){
											offset.x = 0.525;
										}
										if ( key === 'xp' ){
											offset.x = -0.525;
										}
										if ( key === 'zn' ){
											offset.z = 0.525;
										}
										if ( key === 'zp' ){
											offset.z = -0.525;
										}

										if ( offset.x !== 0 || offset.y !== 0 || offset.z !== 0 ){
			
											let line = new THREE.Box3();
											line.setFromCenterAndSize( 
												new THREE.Vector3( object3D.position.x + offset.x, centerModel.y + offset.y, object3D.position.z + offset.z ), 
												new THREE.Vector3( 0, sizesLines.y, 0 )
											);
											let helperLine = new THREE.Box3Helper( line, 0x00ff00 );
											lines.y.push( {
												object : helperLine,
												type : 'y',
												x : object3D.position.x + offset.x,
												y : centerModel.y + offset.y,
												z : object3D.position.z + offset.z
											} );
											// scene.add( helperLine );

										}

									}

								}

							} )

							

						}

					}
				});

				console.log( lines );

				//Задача: 
				//Для каждой линии сгенерировать унарный массив, который будет символизировать то, как и что луч пронизывает
				//Пример унарного массива: 2 1 1 1 2 0 0 0 2
				//Идем слева на право: сначала идет профил, панель, пустота и последнее профиль.

				//Особенность: линии существуют трех типов и они могут пронизывать ненужные элементы
				//Поэтому в унарный массив нужно пушить только соответствующие элементы, которые могут иметь штифты на рассматриваемом луче
				//Также так как луч пронизывает не центры элементов, то для каждого элемента нужно сгенерировать его объем, то бишь две точки, которые задают его объем в пространстве
				
				//1. Нужно пройтись по всем лучам (пока только горизонтальным по X ) 

				setTimeout( () => {

					autoGenerationSteps();

				}, 100 );

			},
			function ( xhr ) { },
			function ( error ) { }
		);

	}

	// $('#btn-step').click( function(){ stepAction() } );

	// $('#btn-generation').click( function(){ autoGenerationSteps() } );

	const generationHTML = ( stepsArray ) => {

		stepsArray.forEach( (item, indexItem) => {

			item.steps.forEach( ( step, indexStep ) => {

				const idStep = indexStep + 1;

				let htmlImg = '<div class="container_step"><div class="header_step">Шаг '+ idStep +' <span>'+item.title+'</span></div><div class="block_step"><div class="step_image"><img src='+step.images[0]+' /></div>';

				htmlImg = htmlImg + '<div class="step_image"><img src='+step.images[1]+' /></div></div></div></div>';

				// $( '#images-steps' ).append( htmlImg );

			} )

			let htmlImg = '<div class="container_step"><div class="header_step">Шаг '+ (item.steps.length+1) +' - '+item.endStep.title+'</div><div class="block_step"><div class="step_image"><img src='+item.endStep.image+' /></div></div></div>';

			// $( '#images-steps' ).append( htmlImg );

		} );

	}

	const autoGenerationSteps = () => {

		newSteps( 'Сборка каркаса', 'Каркас собран' );

		while ( stepAction('PROFILE') ) {

			// console.log( 'LAYER_COUNTER: ' + LAYER_COUNTER );

		}

		setupInitData();

		newSteps( 'Сборка горизонтальных панелей', 'Горизонтальные панели собраны' );

		//Горизонтальные панели
		while ( stepAction('PANEL 1') ) {

			// console.log( 'LAYER_COUNTER: ' + LAYER_COUNTER );

		}

		setupInitData();

		newSteps( 'Сборка вертикальных панелей', 'Вертикальные панели собраны' );

		//Вертикальные панели
		while ( stepAction('PANEL 2') ) {

			// console.log( 'LAYER_COUNTER: ' + LAYER_COUNTER );

		}

		setupInitData();

		newSteps( 'Сборка задних вертикальных панелей', 'Задние вертикальные панели собраны' );

		//Вертикальные панели в глубину
		while ( stepAction('PANEL 3') ) {

			// console.log( 'LAYER_COUNTER: ' + LAYER_COUNTER );

		}

		setupInitData();

		newSteps( 'Сборка дверей и ящиков', 'Двери и ящики собраны' );

		//Вертикальные панели
		while ( stepAction('OTHER') ) {

			// console.log( 'LAYER_COUNTER: ' + LAYER_COUNTER );

		}

		// console.log( stepsArray );

		// $('#three-root').removeClass('disabled');
		// $('#btn-generation').addClass('disabled');

		// generationHTML( stepsArray );

		data.callback( stepsArray );

	}

	const elementInTheCurrentStep = ( object3D, step ) => {

		// console.log( Number( object3D.position.y.toFixed(3) ), step/100 )

		if ( 
			Number( object3D.position.y.toFixed(3) ) === step/100 ||
			object3D.userData.position && Number( object3D.userData.position.y.toFixed(3) ) === step/100
		){
			return true;
		}
		return false;

	}

	const startGenerationHtmlLayer = ( type ) => {

		HTML_LAYER_STEP++;

		renderer.render( scene, camera );

		const dataURL = renderer.domElement.toDataURL( 'image/png' );

		return dataURL;

	}

	const endGenerationHtmlLayer = () => {

		renderer.render( scene, camera );

		const dataURL = renderer.domElement.toDataURL( 'image/png' );

		return dataURL;

	}

	const takeSnapshotStep = ( type ) => {
		
		if ( !END_GENERATION ){
			END_GENERATION = true;

			HTML_LAYER_STEP++;

			renderer.render( scene, camera );

			const dataURL = renderer.domElement.toDataURL( 'image/png' );

			stepsArray[ stepsArray.length-1 ].endStep.image = dataURL;

		}	

	}

	const stepAction = ( type ) => {

		if ( MAX_POSITION_Y+0.1 >= CURRENT_STEP ){

			if ( LAYER_COUNTER !== 0 && LAYER_COUNTER % 2 === 0 ){

				CURRENT_STEP = Number( (CURRENT_STEP + STEP).toFixed(3) );

			}

			LAYER_COUNTER++;

			let layer_details = [];

			details.forEach( (detail) => {

				if ( type === 'PROFILE' ){

					if ( elementInTheCurrentStep( detail, CURRENT_STEP ) && ( isProfile( detail ) || isFinger(detail) || isLeg( detail ) ) ){

						layer_details.push( detail );

					}	

				} else if ( type === 'PANEL 1' ){

					if ( elementInTheCurrentStep( detail, CURRENT_STEP ) && isPanel( detail ) && isPanelVertical( detail ) ){

						layer_details.push( detail );

					}	

				} else if ( type === 'PANEL 2' ){

					if ( elementInTheCurrentStep( detail, CURRENT_STEP ) && isPanel( detail ) && !isPanelVertical( detail ) && !isPanelVerticalZ( detail ) ){

						layer_details.push( detail );

					}	

				} else if ( type === 'PANEL 3' ){

					if ( elementInTheCurrentStep( detail, CURRENT_STEP ) && isPanel( detail ) && !isPanelVertical( detail ) && isPanelVerticalZ( detail ) ){

						layer_details.push( detail );

					}	

				} else if ( type === 'OTHER' ){

					if ( elementInTheCurrentStep( detail, CURRENT_STEP ) && isOther( detail ) ){

						layer_details.push( detail );

					}	

				}			

			} )

			if ( layer_details.length === 0 || LAYER_COUNTER === 0 ){

				stepAction( type );

				return true;

			} else {

				let step = { images : [], nodes : [] };

				if ( LAYER_COUNTER % 2 === 1 ){ //Стадия развижения.

					scene.children.forEach( ( detail ) => {
						if( !detail.isLight && detail.isObject3D && detail.children[0] ){
							detail.children[0].material.opacity = 0.3;
						}
					} );

					let nodes = [], _part = [];

					layer_details.forEach( ( detail ) => {

						let index = _part.findIndex( (item) => item.element_id === detail.userData.element_id && item.texture_id === detail.userData.textureId);

						if ( index !== -1 ){

							_part[ index ].amount = _part[ index ].amount + 1;

						} else {

							_part.push( {
								amount : 1,
								element_id : detail.userData.element_id,
								texture_id : detail.userData.textureId,
							} ); 

						}

						// if ( isFinger( detail ) ){
						// 	console.log( detail.userData );
						// }

						detail.userData.position = { ...detail.position };

						if( !isOther( detail ) ){
							detail.position.y = detail.position.y + 1;
						}

						if ( isOther( detail ) ){
							detail.position.z = detail.position.z + 2;
						} else if ( isProfile( detail ) && isProfileHasVerticalOrientation( detail ) ){
							// detail.userData.position = { ...detail.position };
							// detail.position.y = detail.position.y + 1;
						} else {
							detail.position.x = detail.position.x * RATION;
							detail.position.z = detail.position.z * RATION;
						}

						detail.children[0].material.color.setHex( '0xff0000' );

						if ( detail.userData.type === 'finger' ){

							const stepFingerNode = 0.35;
							const colorFinger = 0xff0000;

							const fingerSize = {
								large : 0.40,
								standart : 0.15,
							}

							if ( detail.userData.nodes.xp === 1 ){

								const geometry = new THREE.BoxGeometry( fingerSize.large, fingerSize.standart, fingerSize.standart );
								const material = new THREE.MeshBasicMaterial( { color: colorFinger } );
								const cube = new THREE.Mesh( geometry, material );

								cube.position.x = detail.position.x - stepFingerNode;
								cube.position.y = detail.position.y;
								cube.position.z = detail.position.z;

								cube.userData.type = 'fingerNode';

								scene.add( cube );

								current_fingersnodes.push( cube );

							}
							if ( detail.userData.nodes.xn === 1 ){

								const geometry = new THREE.BoxGeometry( fingerSize.large, fingerSize.standart, fingerSize.standart );
								const material = new THREE.MeshBasicMaterial( { color: colorFinger } );
								const cube = new THREE.Mesh( geometry, material );

								cube.position.x = detail.position.x + stepFingerNode ;
								cube.position.y = detail.position.y;
								cube.position.z = detail.position.z;

								cube.userData.type = 'fingerNode';

								scene.add( cube );

								current_fingersnodes.push( cube );

							}
							if ( detail.userData.nodes.yp === 1 ){

								const geometry = new THREE.BoxGeometry( fingerSize.standart, fingerSize.large, fingerSize.standart );
								const material = new THREE.MeshBasicMaterial( { color: colorFinger } );
								const cube = new THREE.Mesh( geometry, material );

								cube.position.x = detail.position.x;
								cube.position.y = detail.position.y - stepFingerNode ;
								cube.position.z = detail.position.z;

								cube.userData.type = 'fingerNode';

								scene.add( cube );

								current_fingersnodes.push( cube );

							}
							if ( detail.userData.nodes.yn === 1 ){

								const geometry = new THREE.BoxGeometry( fingerSize.standart, fingerSize.large, fingerSize.standart );
								const material = new THREE.MeshBasicMaterial( { color: colorFinger } );
								const cube = new THREE.Mesh( geometry, material );

								cube.position.x = detail.position.x;
								cube.position.y = detail.position.y + stepFingerNode ;
								cube.position.z = detail.position.z;

								cube.userData.type = 'fingerNode';

								scene.add( cube );

								current_fingersnodes.push( cube );

							}
							if ( detail.userData.nodes.zp === 1 ){

								const geometry = new THREE.BoxGeometry( fingerSize.standart, fingerSize.standart, fingerSize.large );
								const material = new THREE.MeshBasicMaterial( { color: colorFinger } );
								const cube = new THREE.Mesh( geometry, material );

								cube.position.x = detail.position.x;
								cube.position.y = detail.position.y;
								cube.position.z = detail.position.z - stepFingerNode ;

								cube.userData.type = 'fingerNode';

								scene.add( cube );

								current_fingersnodes.push( cube );

							}
							if ( detail.userData.nodes.zn === 1 ){

								const geometry = new THREE.BoxGeometry( fingerSize.standart, fingerSize.standart, fingerSize.large );
								const material = new THREE.MeshBasicMaterial( { color: colorFinger } );
								const cube = new THREE.Mesh( geometry, material );

								cube.position.x = detail.position.x;
								cube.position.y = detail.position.y;
								cube.position.z = detail.position.z + stepFingerNode ;

								cube.userData.type = 'fingerNode';

								scene.add( cube );

								current_fingersnodes.push( cube );

							}

						}

						scene.add( detail );

						if ( isFinger( detail ) ){

							if ( nodes.findIndex( (node) => node === 1 ) === -1 ){
								nodes.push( 1 );
							}
							if ( nodes.findIndex( (node) => node === 7 ) === -1 ){
								nodes.push( 7 );
							}

						}

						if ( isProfile( detail ) ){

							if ( nodes.findIndex( (node) => node === 2 ) === -1 ){
								nodes.push( 2 );
							}
							if ( nodes.findIndex( (node) => node === 8 ) === -1 ){
								nodes.push( 8 );
							}

						}

						if ( isPanel( detail ) ){

							if ( nodes.findIndex( (node) => node === 3 ) === -1 ){
								nodes.push( 3 );
							}
							if ( nodes.findIndex( (node) => node === 4 ) === -1 ){
								nodes.push( 4 );
							}

						}

						if ( isDoor( detail ) ){

							if ( nodes.findIndex( (node) => node === 5 ) === -1 ){
								nodes.push( 5 );
							}
							if ( nodes.findIndex( (node) => node === 6 ) === -1 ){
								nodes.push( 6 );
							}
							if ( nodes.findIndex( (node) => node === 10 ) === -1 ){
								nodes.push( 10 );
							}
							if ( nodes.findIndex( (node) => node === 11 ) === -1 ){
								nodes.push( 11 );
							}

						}

						if ( isBox( detail ) ){

							if ( nodes.findIndex( (node) => node === 12 ) === -1 ){
								nodes.push( 12 );
							}

						}

						if ( isLeg( detail ) ){

							if ( nodes.findIndex( (node) => node === 9 ) === -1 ){
								nodes.push( 9 );
							}

						}

					} );

					// console.log( _part );

					let step = {
						images : [ startGenerationHtmlLayer( type ) ],
						nodes : nodes,
						parts : _part,
					};

					stepsArray[stepsArray.length-1].steps.push( step );

				} else if ( LAYER_COUNTER % 2 === 0 ){ // Стадия слияния.

					layer_details.forEach( ( detail ) => {

						if( !isOther( detail ) ){
							detail.position.y = detail.position.y - 1;
						}

						if ( isOther( detail ) ){
							detail.position.z = detail.position.z - 2;
						} else if ( isProfile( detail ) && isProfileHasVerticalOrientation( detail ) ){
							
						} else {
							// detail.position.y = detail.position.y - 1;
							detail.position.x = detail.position.x / RATION;
							detail.position.z = detail.position.z / RATION;
						}	

						detail.children[0].material.color.setHex( '0xffffff' );

					} );

					current_fingersnodes.forEach( ( item ) => {

						scene.remove( item); 

					} )

					current_fingersnodes = [];

					let step = stepsArray[stepsArray.length-1].steps[  stepsArray[stepsArray.length-1].steps.length-1 ];
					step.images.push( endGenerationHtmlLayer() );

				}

			}

			return true;

		} else { // Конец всех циклов

			scene.children.forEach( ( detail ) => {
				if( !detail.isLight && detail.isObject3D && detail.children[0] ){
					detail.children[0].material.opacity = 1;
					detail.children[0].material.color.setHex( '0xffffff' );
				}
			} );

			takeSnapshotStep( type );

			return false;

		}

	}

	function animate() {

		controls.update();

		requestAnimationFrame( animate );
		renderer.render( scene, camera );

	};

	animate();

}