import $ from "jquery";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { getDataPanel, getDataProfile, getDataBox, getDataBarbell,  getShtiftByProfile, checkOnBelongsToPanel } from './helper.js';

import axios from 'axios';

import arrow_model from '../assets/glb/arrow.glb';

import number_1 from '../assets/glb/1.glb';

import number_2 from '../assets/glb/2.glb';

export const getInstructionJSON = ( data ) => {

	const window_width = 1440*2;
	const window_height = 1100*2;

	const modelFile = data.src;

	const loaderGLTF = new GLTFLoader();
	const textureLoader = new THREE.TextureLoader();

	const scene = new THREE.Scene();
	const camera = new THREE.OrthographicCamera( (window_width/2) / - 2, (window_width/2) / 2, (window_height/2) / 2, (window_height/2) / - 2, 1, 1000 );
	camera.position.z = 15;
	camera.position.x = -8;
	camera.position.y = 8;
	camera.zoom = 36;
	camera.updateProjectionMatrix();

	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha : true });

	renderer.outputEncoding = THREE.sRGBEncoding;

	renderer.setSize( window_width/2, window_height/2 );
	renderer.setClearColor( 0xffffff, 1 );

	renderer.render( scene, camera );

	// $('#three-root').html( renderer.domElement );

	const controls = new OrbitControls( camera, renderer.domElement );

	const light = new THREE.AmbientLight( 0xffffff, 1);
	scene.add( light );

	var details = [], LAST_STEP = false, LEGS_STATUS = false, CURRENT_STEP = 0, STEP = 72.5, MAX_POSITION_Y = 0, MAXIMAL_POSITION = 0, LAYER_COUNTER = 0, LAYER_STAGE = 0, RATION = 1.25, HTML_LAYER = '', HTML_LAYER_STEP = 0, END_GENERATION = false, DEFAULT_CURRENT_STEP = 0, INDEX = 0, current_fingersnodes = [], shtift_state = [], shtift_counter = 0, shtift_steps = [], arrow, number = { first : null, second : null };

	var _LEVELS = [];

	var stepsArray = [], parts = [];

	const getDataElement = ( object ) => {

		if ( object.userData.type === 'panel' || object.userData.type === 'door' ){
			return getDataPanel( object );
		}
		if ( object.userData.type === 'profile' || object.userData.type === 'leg' ){
			return getDataProfile( object ); 
		}
		if ( object.userData.type === 'box' ){
			return getDataBox( object ); 
		}

		if ( object.userData.type === 'barbell' ){
			return getDataBarbell( object );
		}
		return null;

	}

	const setupInitData = ( from, to, index = 0 ) => {

		CURRENT_STEP = from; 
		MAXIMAL_POSITION = to;
		STEP = 72.5;
		LAYER_COUNTER = 0;
		LAYER_STAGE = 0;
		RATION = 1.1;
		HTML_LAYER = '';
		HTML_LAYER_STEP = 0;
		END_GENERATION = false;
		INDEX = index;

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

	const isBarbell = ( object3D ) => {

		if ( object3D.userData.type === 'barbell' ){
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

	const isPanelGorizontal = ( object3D ) => {

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

	const isProfileHasGorizontalZOrientation = ( object3D ) => {

		if ( object3D.rotation.x === 0 && object3D.rotation.y === 0 ){
			return true;
		}
		return false;

	}

	const isProfileHasGorizontalXOrientation = ( object3D ) => {

		if ( object3D.rotation.y !== 0){
			return true;
		}
		return false;

	}

	const getParamsCap = ( type, direction ) => {

		let params = {
			rotation : {  },
			position : {
				x : 0,
				y : 0,
				z : 0,
			}
		}

		if ( direction === 'GORIZONTAL' ){
			params.rotation.z = Math.PI/2;
			if ( type === 'OPEN' ){
				params.position.x = -0.2;
			} else if ( type === 'CLOSE' ){
				params.position.x = 0.2;
			}
		}
		if ( direction === 'SIDE' ){
			params.rotation.x = Math.PI/2;
			if ( type === 'OPEN' ){
				params.position.z = -0.2;
			} else if ( type === 'CLOSE' ){
				params.position.z = 0.2;
			}
		}
		if ( direction === 'FACIAL' ){
			if ( type === 'OPEN' ){
				params.position.y = -0.2;
			} else if ( type === 'CLOSE' ){
				params.position.y = 0.2;
			}
		}

		return params;

	}

	const addShtiftIntoScene = ( shtift, direction ) => {

		//Добавляем основную часть
		scene.add( shtift );

		const params = shtift.userData;

		//Вычисляем шапку
		if ( params.cap ){ //Есть шапка

			const paramsCap = getParamsCap( params.cap, direction ); 

			const geometryCap = new THREE.CylinderGeometry( 0.15, 0.15, 0.05, 32 ); 
			// const materialCap = new THREE.MeshBasicMaterial( { color: params.color } ); 
			const materialCap = shtift.material;
			const cylinderCap = new THREE.Mesh( geometryCap, materialCap );

			cylinderCap.position.x = params.position.x/100 + paramsCap.position.x;
			cylinderCap.position.y = params.position.y/100 + paramsCap.position.y;
			cylinderCap.position.z = params.position.z/100 + paramsCap.position.z;

			cylinderCap.userData.type = 'cap';

			if ( paramsCap.rotation ){
				if ( paramsCap.rotation.x ){
					cylinderCap.rotation.x = paramsCap.rotation.x;
				}
				if ( paramsCap.rotation.y ){
					cylinderCap.rotation.y = paramsCap.rotation.y;
				}
				if ( paramsCap.rotation.z ){
					cylinderCap.rotation.z = paramsCap.rotation.z;
				}
			}

			scene.add( cylinderCap );

		}


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

					if ( object3D.userData.type === 'leg' ){
						LEGS_STATUS = true;
					}

					if ( object3D.userData.type === 'shtift' ){
						shtift_state.push( object3D );
						// console.log(object3D.position);
					}

					//Нужно оприделить ярусы по горизонтальныем панелям

					//Если это горизонтальная панель
					if ( isPanel( object3D ) && isPanelGorizontal( object3D ) ){

						if ( _LEVELS.find( ( level ) => level === object3D.position.y ) === undefined ){
							_LEVELS.push( Number((object3D.position.y).toFixed(3)) );
						}

					}	

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

					object3D.userData.state = 'IS_HIDDEN';

					//На этом этапе счиатем объем элементов
					const data = getDataElement( object3D );

					if ( data ){
						details[index].userData.volume = data.volume;
						details[index].userData.orientation = data.orientation;
					}

				} )
				_LEVELS = _LEVELS.sort( (a, b) => { return a - b });
				CURRENT_STEP = dimensions.min.y*100;
				DEFAULT_CURRENT_STEP = Number(CURRENT_STEP.toFixed(3));
				MAX_POSITION_Y = Math.trunc(dimensions.max.y*100);
				// console.log( 'MIN_POSITION_Y: ' + dimensions.min.y*100 )
				MAXIMAL_POSITION = MAX_POSITION_Y;

				const sizesLines = {
					x : (dimensions.max.x - dimensions.min.x) + 10,
					y : (dimensions.max.y - dimensions.min.y) + 10,
					z : (dimensions.max.z - dimensions.min.z) + 10,
				}  

				const centerModel = { x : 0, y : 5, z : 0 }  


				//Горизонтальная сетка
				const sizeGrid = dimensions.max.x - dimensions.min.x;
				const divisions = (dimensions.max.x - dimensions.min.x)/1.45;
				const gridHelper = new THREE.GridHelper( sizeGrid, divisions );
				gridHelper.position.y = dimensions.min.y - 0.725;
				gridHelper.position.x = dimensions.min.x + sizeGrid/2;

				scene.add( gridHelper );


				//Вертикальная сетка
				const sizeGridY = dimensions.max.y - dimensions.min.y + 0.725;
				const divisionsY = sizeGridY/1.45;

				const gridHelperY = new THREE.GridHelper( sizeGrid, divisions );

				// gridHelperY.position.y = dimensions.min.y + sizeGridY/2 - 0.725;
				// gridHelperY.position.x = dimensions.min.x + sizeGrid/2;

				gridHelperY.position.y = dimensions.min.y + sizeGrid/2 - 0.725;

				gridHelperY.position.z = dimensions.min.z - 0.1;

				gridHelperY.position.x = dimensions.min.x + sizeGrid/2;

				gridHelperY.rotation.x = Math.PI/2;

				scene.add( gridHelperY );

				console.log(dimensions)

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

				// console.log( details );

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

		loaderGLTF.load( 
			arrow_model,

			function ( gltf ) {

				console.log( gltf ); 

				// gltf.scene.material.color.setHex( 0xff00ff );

				arrow = gltf.scene;

				arrow.userData.type = 'arrow';

				arrow.rotation.x = Math.PI;

				const material = new THREE.MeshStandardMaterial( { color: '0xff00ff', transparent : true } );

				arrow.material = material;

				arrow.traverse( (obj) => {

	              obj.material.color.setHex('0xff00ff');

	            });	

	            arrow.visible = false;

				scene.add( arrow );

			},
			function ( xhr ) {},
			function ( error ) {}

		)

		loaderGLTF.load( 
			number_1,

			function ( gltf ) {

				console.log( gltf ); 

				number.first = gltf.scene;

				number.first.userData.type = 'number';

				// arrow.rotation.x = Math.PI;
				number.first.rotation.y = -Math.PI/6;

				const material = new THREE.MeshStandardMaterial( { color: '0xff00ff', transparent : true } );

				number.first.material = material;

				number.first.traverse( (obj) => {

	              obj.material.color.setHex('0xff00ff');

	            });	

	            number.first.visible = false;

	            scene.add( number.first );

				

			},
			function ( xhr ) {},
			function ( error ) {}

		)

		loaderGLTF.load( 
			number_2,

			function ( gltf ) {

				console.log( gltf ); 

				number.second = gltf.scene;

				number.second.userData.type = 'number';

				number.second.rotation.y = -Math.PI/6;

				const material = new THREE.MeshStandardMaterial( { color: '0xff00ff', transparent : true } );

				number.second.material = material;

				number.second.traverse( (obj) => {

	              obj.material.color.setHex('0xff00ff');

	            });	

	            number.second.visible = false;

	            scene.add( number.second );

				

			},
			function ( xhr ) {},
			function ( error ) {}

		)

	}

	const hideShtifts = () => {

		scene.children.forEach( ( detail ) => {

			if ( detail.userData.type === 'shtift' || detail.userData.type === 'cap' ){


				detail.material.visible = false;

				scene.remove( detail );				

			}

		});

	}

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

	const getStepsOrder = () => {

		console.log( 'MAX_POSITION_Y: ' + MAX_POSITION_Y );
		console.log( 'DEFAULT_CURRENT_STEP: ' + DEFAULT_CURRENT_STEP );

		let all_steps_counter = (MAX_POSITION_Y - DEFAULT_CURRENT_STEP)/72.5;

		console.log( 'all_steps_counter: ' + all_steps_counter );

		let _steps = [];

		let i = 0;

		if ( LEGS_STATUS ){
			_steps.push({
				step : 0,
				from : DEFAULT_CURRENT_STEP,
				to: DEFAULT_CURRENT_STEP + 72.5,
			})
			i = 1;
		}

		console.log('LEGS_STATUS: ' + LEGS_STATUS ) ;

		while ( i <= Math.ceil(all_steps_counter/8) ){

			if( i === Math.ceil(all_steps_counter) ){
				_steps.push({
					step : i,
					from : DEFAULT_CURRENT_STEP + 72.5  * ((( (i-1) * 8)+1) +1),
					to: DEFAULT_CURRENT_STEP + 72.5 * all_steps_counter,
				})
			}else{
				_steps.push({
					step : i,
					from : DEFAULT_CURRENT_STEP + 72.5  * ((( (i-1) * 8)+1) +1),
					to: DEFAULT_CURRENT_STEP + 72.5 * ((i * 8)+1),
				})
			}

			i++;

		}

		return _steps;

	}

	const getLevelsOrder = () => {

		console.log( _LEVELS );
		console.log( 'MAX_POSITION_Y: ' + MAX_POSITION_Y );
		console.log( 'DEFAULT_CURRENT_STEP: ' + DEFAULT_CURRENT_STEP );

		return _LEVELS.map( ( level, index ) => {

			let from = DEFAULT_CURRENT_STEP;

			if ( index > 0 ){
				from = _LEVELS[ index-1 ] * 10 * 10 + 72.5; 
			}

			return {
				index : index,
				from : Number(from.toFixed(3)),
				to :  Number( (level * 10 * 10).toFixed(3)),
				elements : {
					profiles : [],
					panels : {
						side : [],
						face : [],
					},
				}
			}

		} )   

	}

	var levelsOrder;

	const autoGenerationSteps = () => {

		//Получаем порядок уровней
		levelsOrder = getLevelsOrder();
		console.log( levelsOrder );
		console.log('LEGS_STATUS: ' + LEGS_STATUS ) ;

		levelsOrder.forEach( (level, index) => {

			//Скрываем штифты
			hideShtifts();

			newSteps( 'Сборка каркаса', 'Каркас собран' );

			setupInitData( level.from, level.to, level.index );

			while ( stepAction('PROFILE' ) ) { };


			newSteps( 'Сборка горизонтальных панелей', 'Горизонтальные панели собраны' );

			setupInitData( level.from, level.to, level.index );

			while ( stepAction('PANEL 1' ) ) { };


			setupInitData( level.from, level.to, level.index );

			newSteps( 'Сборка боковых панелей', 'Боковые панели собраны' );

			while ( stepAction('PANEL 2' ) ) { };


			newSteps( 'Сборка лицевых панелей', 'Лицевые панели собраны' );

			setupInitData( level.from, level.to, level.index );

			while ( stepAction('PANEL 3' ) ) { };


			newSteps( 'Сборка штанг', 'Штанги собраны' );

			setupInitData( level.from, level.to, level.index );

			while ( stepAction('BARBELL' ) ) { };


			newSteps( 'Сборка ящиков', 'Ящики собраны' );

			setupInitData( level.from, level.to, level.index );

			if ( index === levelsOrder.length-1 ){
				LAST_STEP = true;
			}

			while ( stepAction('BOX' ) ) { };

			//Скрываем штифты
			hideShtifts();

		} )

		//Отфильтруем результат от пустых пунктов
		stepsArray = stepsArray.map( (level) => {

			if ( level.steps.length ){
				return level;
			}
			return false;

		} ).filter(Boolean);

		//И удалим первый шаг с ножками
		// delete stepsArray[0];

		delete stepsArray[0].steps[0];

		stepsArray[0].steps = stepsArray[0].steps.filter(Boolean);

		hideShtifts();

		takeLastStapshot();

		console.log( stepsArray );

		console.log( 'shtift_counter: ' + shtift_counter  );
		console.log( 'shtift_state: ' + shtift_state.length  );

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

	const elementInTheCurrentStepBack = ( object3D, step ) => {

		if ( 
			object3D.userData.volume.p2.y + 10 - 72.5 === step ||
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

	const takeLastStapshot = () => {

		renderer.render( scene, camera );

		const dataURL = renderer.domElement.toDataURL( 'image/png' );

		stepsArray.push({
			title : 'Конструкция собрана',
			steps : [],
			endStep : {
				title : 'Конструкция собрана',
				image : dataURL,
			}, 
		})

	}

	const takeSnapshotStep = () => {
		
		if ( !END_GENERATION ){

			END_GENERATION = true;

			HTML_LAYER_STEP++;

			renderer.render( scene, camera );

			const dataURL = renderer.domElement.toDataURL( 'image/png' );

			stepsArray[ stepsArray.length-1 ].endStep.image = dataURL;

		}	

	}

	const backs_items = {

		profiles : [],
		panels : {
			side : [],
			face : [],
		},
		boxes : [],
		barbell : []

	}

	const stepAction = ( type ) => {

		if ( MAXIMAL_POSITION >= CURRENT_STEP ){

			// console.log( 'LAYER_COUNTER: ' + LAYER_COUNTER );

			if ( LAYER_COUNTER !== 0 && LAYER_COUNTER % 2 === 0 ){

				CURRENT_STEP = Number( (CURRENT_STEP + STEP).toFixed(3) );

			}

			LAYER_COUNTER++;

			let layer_details = [];

			//Так как у нас есть элементы, которые могут тянуться с прошлых шагов, то
			if ( type === 'PROFILE' ){

				backs_items.profiles.forEach( (detail) => {

					if ( elementInTheCurrentStepBack(detail, CURRENT_STEP) ){
						// console.log( 'BACK PROFILE' )
						layer_details.push( detail );
					}
				} );

			}

			if ( type === 'PANEL 2' ){

				backs_items.panels.side.forEach( (detail) => {
					if ( elementInTheCurrentStepBack(detail, CURRENT_STEP) ){
						layer_details.push( detail );
					}
				} );

			}

			if ( type === 'PANEL 3' ){

				backs_items.panels.face.forEach( (detail) => {
					if ( elementInTheCurrentStepBack(detail, CURRENT_STEP) ){
						layer_details.push( detail );
					}
				} );

			}

			if ( type === 'BOX' ){
				backs_items.boxes.forEach( (detail) => {
					if ( elementInTheCurrentStepBack(detail, CURRENT_STEP) ){
						layer_details.push( detail );
					}
				} );
			}

			if ( type === 'BARBELL' ){
				backs_items.barbell.forEach( (detail) => {
					if ( elementInTheCurrentStepBack(detail, CURRENT_STEP) ){
						layer_details.push( detail );
					}
				} );
			}

			//Здесь мы находим все элементы, которые попадают на текущий шаг, записываем резульат в layer_details.
			details.forEach( (detail) => {

				if ( type === 'PROFILE' ){

					if ( elementInTheCurrentStep( detail, CURRENT_STEP ) && ( isProfile( detail ) || isFinger(detail) || isLeg( detail ) ) ){

						if ( isProfileHasVerticalOrientation( detail ) && detail.userData.volume.p2.y >= levelsOrder[INDEX].to
							){

							if ( LAYER_COUNTER % 2 === 0 ){
								backs_items.profiles.push( detail );
							}

						} else {
							layer_details.push( detail );
						}						

					}	

				} else if ( type === 'PANEL 1' ){

					if ( elementInTheCurrentStep( detail, CURRENT_STEP ) && isPanel( detail ) && isPanelGorizontal( detail ) ){
						layer_details.push( detail );
					}	

				} else if ( type === 'PANEL 2' ){

					if ( elementInTheCurrentStep( detail, CURRENT_STEP ) && isPanel( detail ) && !isPanelGorizontal( detail ) && !isPanelVerticalZ( detail ) ){

						if ( detail.userData.volume.p2.y >= levelsOrder[INDEX].to ){
							if ( LAYER_COUNTER % 2 === 0 ){
								backs_items.panels.side.push( detail );
							}
						}else{
							layer_details.push( detail );
						}

					}	

				} else if ( type === 'PANEL 3' ){

					if ( elementInTheCurrentStep( detail, CURRENT_STEP ) && ( ( isPanel( detail ) && !isPanelGorizontal( detail ) && isPanelVerticalZ( detail ) ) || isDoor( detail ) ) ){

						if ( detail.userData.volume.p2.y >= levelsOrder[INDEX].to ){
							if ( LAYER_COUNTER % 2 === 0 ){
								backs_items.panels.face.push( detail );
							}
						}else{
							layer_details.push( detail );
						}

					}	

				} else if ( type === 'OTHER' ){

					if ( elementInTheCurrentStep( detail, CURRENT_STEP ) && isOther( detail ) ){

						layer_details.push( detail );

					}	

				} else if ( type === 'BOX' ){

					if ( elementInTheCurrentStep( detail, CURRENT_STEP ) && isBox( detail ) ){

						if ( detail.userData.volume.p2.y >= levelsOrder[INDEX].to ){
							if ( LAYER_COUNTER % 2 === 0 ){
								backs_items.boxes.push( detail );
							}
						}else{
							layer_details.push( detail );
						}

					}

				} else if ( type === 'BARBELL' ){

					if ( elementInTheCurrentStep( detail, CURRENT_STEP ) && isBarbell( detail ) ){

						if ( detail.userData.volume.p2.y >= levelsOrder[INDEX].to ){
							if ( LAYER_COUNTER % 2 === 0 ){
								backs_items.barbell.push( detail );
							}
						}else{
							layer_details.push( detail );
						}

					}

				}

			} );

			if ( layer_details.length === 0 || LAYER_COUNTER === 0 ){

				stepAction( type );

				return true;

			} else if ( layer_details.length > 0 && CURRENT_STEP <= MAXIMAL_POSITION ) {

				let step = { images : [], nodes : [] };

				if ( type === 'PANEL 1' || type === 'PANEL 2' || type === 'PANEL 3' ){

					let direction = 'GORIZONTAL'; 

					if ( type === 'PANEL 2' ){
						direction = 'SIDE';
					}else if ( type === 'PANEL 3' ){
						direction = 'FACIAL';
					}


					layer_details = layer_details.sort( (a, b) => 
						a.position.x >= b.position.x && 
						a.position.y >= b.position.y &&
						a.position.z >= b.position.z 
						? 1 : -1
					)

					if ( LAYER_COUNTER % 2 === 1 ){ //Стадия раздвижения.

						layer_details.forEach( ( detail ) => {

							let nodes = [], _part = [];

							//Сначала стадия раздвижения
							scene.children.forEach( ( detail ) => {

								if ( detail.userData.type === 'profile' || detail.userData.type === 'panel' || detail.userData.type === 'leg' || detail.userData.type === 'barbell' ){
									detail.material.opacity = 0.2;
								} else {
									if ( detail.children[0] ){
										detail.children[0].material.opacity = 0.2;
									}
								}

							} );

							try{
								detail.children[0].material.color.setHex( '0xff0000' );
							}catch(err){
								detail.material.color.setHex( '0xff0000' );
							}
							

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

							detail.userData.position = { 
								x : detail.position.x,
								y : detail.position.y,
								z : detail.position.z,
							};

							detail.userData.rotation = {
								x : detail.rotation.x,
								y : detail.rotation.y,
								z : detail.rotation.z,
							}

							if ( type !== 'PANEL 2' && type !== 'PANEL 3' ){
								detail.position.y = detail.position.y + 1;
							}

							
							
							if ( isPanel( detail ) && isPanelGorizontal( detail ) ){

								shtift_steps.forEach( ( item ) => {

									if ( item.step <= CURRENT_STEP ){

										item.shtifts.forEach( (shtift) => {

											if ( shtift ){

												const isBelongs = checkOnBelongsToPanel( shtift, detail );

												if ( !shtift.userData.isShow && shtift.userData.orientationProfile !== 2 && shtift.userData.direction === 'GORIZONTAL' && isBelongs ){
													// shtift.x *= RATION;
													// shtift.z *= RATION;
													shtift.userData.isShow = true;
													
													addShtiftIntoScene( shtift, direction );
												}
											}

										} )

									}

								} );

							}
							if ( isPanel( detail ) && !isPanelGorizontal( detail ) && !isPanelVerticalZ( detail )  ){

								shtift_steps.forEach( ( item ) => {

									if ( item.step <= CURRENT_STEP ){

										item.shtifts.forEach( (shtift) => {


											if ( shtift ){

												const isBelongs = checkOnBelongsToPanel( shtift, detail );

												if ( !shtift.userData.isShow && shtift.userData.orientationProfile === 2 && shtift.userData.direction === 'SIDE' && isBelongs ){
													// shtift.x *= RATION;
													// shtift.z *= RATION;
													shtift.userData.isShow = true;
													addShtiftIntoScene( shtift, direction );
												}
											}

										} )

									}

								} );

							}
							if ( isPanel( detail ) && !isPanelGorizontal( detail ) && isPanelVerticalZ( detail )  ){

								shtift_steps.forEach( ( item ) => {

									if ( item.step <= CURRENT_STEP ){

										item.shtifts.forEach( (shtift) => {

											if ( shtift ){

												const isBelongs = checkOnBelongsToPanel( shtift, detail );

												if ( !shtift.userData.isShow && shtift.userData.orientationProfile !== 2 && shtift.userData.direction === 'FACIAL' && isBelongs ){
													// shtift.x *= RATION;
													// shtift.z *= RATION;
													shtift.userData.isShow = true;
													addShtiftIntoScene( shtift, direction );
												}
											}

										} )

									}

								} );

							}

							if ( ( type === 'PANEL 1' || type === 'PANEL 2' || type === 'PANEL 3' ) ){

								if ( detail.userData.type !== 'door'  ){

									if ( type === 'PANEL 1' ){

										//Работаем с стрелой
										arrow.visible = true;
										arrow.position.x = detail.position.x;
										arrow.position.y = detail.position.y + 3;
										arrow.position.z = detail.position.z;

										arrow.rotation.x = Math.PI;
										arrow.rotation.y = 0;
										arrow.rotation.z = Math.PI/2.7;

										number.second.visible = false;

										number.first.visible = true;
										number.first.position.x = arrow.position.x;
										number.first.position.y = arrow.position.y + 1.5;
										number.first.position.z = arrow.position.z;

										detail.rotation.y = Math.PI/10;

									} 
									else if ( type === 'PANEL 2' ){

										arrow.visible = true;
										arrow.position.x = detail.position.x - 3.5;
										arrow.position.y = detail.position.y;
										arrow.position.z = detail.position.z;

										arrow.rotation.x = -Math.PI/2;
										arrow.rotation.y = 0;
										arrow.rotation.z = -Math.PI/6;

										number.second.visible = false;

										number.first.visible = true;
										number.first.position.x = arrow.position.x;
										number.first.position.y = arrow.position.y + 1.5;
										number.first.position.z = arrow.position.z;

										// detail.rotation.x = Math.PI/2;	

										detail.rotation.y = Math.PI/2;	

										detail.position.x -= 1.5;	

										// console.log( detail );

										if ( detail.rotation.x !== 0 ){ //вертикальная панель

											detail.rotation.x = 0;

											detail.rotation.z = Math.PI/2;

											detail.rotation.y -= Math.PI/8;

										} else { //Горизонтальная панель

											detail.rotation.y -= Math.PI/8

										}

									}

									else if ( type === 'PANEL 3' ){

										let length = (detail.userData.chars.height/2)/10/10;

										if ( detail.userData.chars.height < detail.userData.chars.width ){
											length = (detail.userData.chars.width/2)/10/10;
										}

										//Работаем с стрелой
										arrow.visible = true;
										arrow.position.x = detail.position.x;
										arrow.position.y = detail.position.y + length + 1.75;
										arrow.position.z = detail.position.z - 2;

										arrow.rotation.x = Math.PI/1.25;
										arrow.rotation.z = 0;

										number.second.visible = false;

										number.first.visible = true;
										number.first.position.x = arrow.position.x;
										number.first.position.y = arrow.position.y + 1.5;
										number.first.position.z = arrow.position.z;


										detail.rotation.x = -Math.PI/6;
										detail.position.z -= 1.5;

									}


								}

								
							} else {
								detail.position.x = detail.position.x * RATION;
								detail.position.z = detail.position.z * RATION;
							}

							//Пишем, что этот элемент на сцене, но не на своем месте

							detail.userData.state = 'EXTENSION';

							scene.add( detail );

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

							//Фиксируем результат
							let step = {
								images : [ startGenerationHtmlLayer( type ) ],
								nodes : nodes,
								parts : _part,
							};

							stepsArray[stepsArray.length-1].steps.push( step );

							//После стадия слияния
							nodes = []; _part = [];

							// console.log( 'СЛИЯНИЕ' )

							if ( type !== 'PANEL 2' && type !== 'PANEL 3' ){
								detail.position.y = detail.position.y - 1;
							}

							if ( type === 'PANEL 1' || type === 'PANEL 2' | type === 'PANEL 3' ){

								if ( detail.userData.type !== 'door'  ){

									if ( type === 'PANEL 1' ){

										arrow.visible = true;

										arrow.position.x += (detail.userData.chars.width/2 - 20)/10/10;
										arrow.position.y = detail.position.y + 2;

										arrow.rotation.y = 0;
										arrow.rotation.z = 0;
										arrow.rotation.x = Math.PI;


										number.first.visible = false;

										number.second.visible = true;
										number.second.position.x = arrow.position.x;
										number.second.position.y = arrow.position.y + 1.5;
										number.second.position.z = arrow.position.z;

										detail.rotation.y = detail.userData.rotation.y;

									} 

									else if ( type === 'PANEL 2' ){

										arrow.visible = true;

										arrow.position.z += (detail.userData.chars.width/2 - 20)/10/10;
										arrow.position.x = detail.position.x - 3;
										arrow.position.y = detail.position.y;

										arrow.rotation.y = 0;
										arrow.rotation.z = -Math.PI/2;
										arrow.rotation.x = Math.PI;


										number.first.visible = false;

										number.second.visible = true;
										number.second.position.x = arrow.position.x;
										number.second.position.y = arrow.position.y + 1.5;
										number.second.position.z = arrow.position.z;

										detail.position.x = detail.userData.position.x;
										
										detail.rotation.x = detail.userData.rotation.x;
										detail.rotation.y = detail.userData.rotation.y;
										detail.rotation.z = detail.userData.rotation.z;

									}		


									else if ( type === 'PANEL 3' ){

										arrow.visible = true;
										arrow.rotation.x = Math.PI/2;
										arrow.position.y -= 1.5;
										arrow.rotation.z = 0;

										number.first.visible = false;

										number.second.visible = true;
										number.second.position.x = arrow.position.x;
										number.second.position.y = arrow.position.y + 1.5;
										number.second.position.z = arrow.position.z;

										detail.rotation.y = detail.userData.rotation.y;


										detail.rotation.x = detail.userData.rotation.x;
										detail.position.z = detail.userData.position.z;
									}


								}

								
								
							} else {
								detail.position.x = detail.position.x / RATION;
								detail.position.z = detail.position.z / RATION;
							}

							try{
								detail.children[0].material.color.setHex( '0xffffff' );
							}catch(err){
								detail.material.color.setHex( '0xffffff' );
							}

							//Пишем, что этот элемент на своем месте
							detail.userData.state = 'ON_POINT';

							//Фиксируем результат
							let step2 = stepsArray[stepsArray.length-1].steps[  stepsArray[stepsArray.length-1].steps.length-1 ];
							step2.images.push( endGenerationHtmlLayer() );

							arrow.visible = false;
							number.first.visible = false;
							number.second.visible = false;

						} );

					} 

				}

				if ( type === 'PROFILE' || type === 'BOX' || type === 'BARBELL' ){

					if ( LAYER_COUNTER % 2 === 1 ){ //Стадия раздвижения.

						// console.log( 'РАЗДВИЖЕНИЕ' );

						//нужно сделать проверку на вертикальные профили, которые целиком не попали в уровень

						scene.children.forEach( ( detail ) => {
							if ( detail.userData.type === 'profile' || detail.userData.type === 'panel' || detail.userData.type === 'leg' ){
								detail.material.opacity = 0.2;
							} else {
								if ( detail.children[0] ){
									try{
										detail.children[0].material.opacity = 0.2;
									}catch(err){

									}

								}
							}
						} );

						let nodes = [], _part = [];

						layer_details.forEach( ( detail ) => {

							shtift_steps.push( {
								step : CURRENT_STEP,
								shtifts : [],
							} )

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

							detail.userData.position = { 
								x : detail.position.x,
								y : detail.position.y,
								z : detail.position.z,
							};

							// if ( type === 'PANEL 1' ){
							// 	detail.rotation.z += Math.PI/2;
							// }

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

							let direction; 

							if ( isProfile( detail ) && isProfileHasVerticalOrientation( detail ) ){
								direction = 'SIDE'; 
							} else if (  isProfile( detail ) && isProfileHasGorizontalZOrientation( detail ) ){
								direction = 'GORIZONTAL';
							} else if ( isProfile( detail ) && isProfileHasGorizontalXOrientation( detail )  ){
								direction = 'FACIAL';
							}

							//Если это профиль, то нужно отобразить штифты, которые крепят его и коннектор.
							//Если профиль горизонтальный, то нужно показать все штифты, которые крепят его только с коннекторами

							//Если это профиль вертикальный, то нужно показать только те штифты, которые крепят его с нижним коннектором

							try{
								const shtiftProfile = getShtiftByProfile( detail, shtift_state );

								if ( shtiftProfile.first ){

									shtift_counter++;

									if ( shtiftProfile.first.userData.cap && ( shtiftProfile.first.userData.length === 'SMALL' ) ){
										shtiftProfile.first.x *= RATION;
										shtiftProfile.first.z *= RATION;
										shtiftProfile.first.userData.isShow = true;
										// scene.add( shtiftProfile.first );
										addShtiftIntoScene( shtiftProfile.first, direction );
									}else{
										shtift_steps[shtift_steps.length-1].shtifts.push( shtiftProfile.first );
									}

								}
								if ( shtiftProfile.second ){

									shtift_counter++;

									if ( shtiftProfile.second.userData.cap && ( shtiftProfile.second.userData.length === 'SMALL' ) ){
										shtiftProfile.second.x *= RATION;
										shtiftProfile.second.z *= RATION;
										shtiftProfile.second.userData.isShow = true;
										// scene.add( shtiftProfile.second );
										addShtiftIntoScene( shtiftProfile.second, direction );
									} else {
										shtift_steps[shtift_steps.length-1].shtifts.push( shtiftProfile.second );
									}

								}
							}
							catch(err){

							}



							// detail.children[0].material.color.setHex( '0xff0000' );

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

							//Пишем, что этот элемент на сцене, но не на своем месте
							detail.userData.state = 'EXTENSION';

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


						let step = {
							images : [ startGenerationHtmlLayer( type ) ],
							nodes : nodes,
							parts : _part,
						};

						stepsArray[stepsArray.length-1].steps.push( step );

					} else if ( LAYER_COUNTER % 2 === 0 ){ // Стадия слияния.

						// console.log( 'СЛИЯНИЕ' )

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

							try{
								detail.children[0].material.color.setHex( '0xffffff' );
							}catch(err){
								try{
									detail.material.color.setHex( '0xffffff' );
								}catch(err){

								}

							}

							//Пишем, что этот элемент на своем месте
							detail.userData.state = 'ON_POINT';

						} );

						current_fingersnodes.forEach( ( item ) => {

							item.position.y = item.position.y - 1;
							item.position.x = item.position.x / RATION;
							item.position.z = item.position.z / RATION;

							item.material.color.setHex( '0x2c2d2f' )

							// scene.remove( item ); 

						} )

						current_fingersnodes = [];

						let step = stepsArray[stepsArray.length-1].steps[  stepsArray[stepsArray.length-1].steps.length-1 ];
						step.images.push( endGenerationHtmlLayer() );

					}

				}

			}

			return true;

		} else { // Конец всех циклов

			scene.children.forEach( ( detail ) => {

				if ( detail.userData.type !== 'arrow' && detail.userData.type !== 'number' ){
					if ( detail.userData.type === 'profile' || detail.userData.type === 'panel' || detail.userData.type === 'leg' ){
						detail.material.opacity = 1;
						detail.material.color.setHex( '0xffffff' );
					} else {
						if ( detail.children[0] ){
							try{
								detail.children[0].material.opacity = 1;
								detail.children[0].material.color.setHex( '0xffffff' );
							}catch(err){

							}

						}
					}
				}

			} );

			takeSnapshotStep( );

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