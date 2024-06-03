import * as THREE from 'three';

const getOrientationPanel = ( obj ) => {

	if ( obj.userData.type === 'panel' ){
		if ( obj.userData.defaultParams.rotation.x === 0 && obj.userData.defaultParams.rotation.y === 0 && obj.userData.defaultParams.rotation.z === 0  ){ //вертикально ко мне 
	    return 1;
	  } else if ( obj.userData.defaultParams.rotation.x !== 0 && obj.userData.defaultParams.rotation.y === 0 && obj.userData.defaultParams.rotation.z === 0  ){
	    return 2;
	  } else if ( obj.userData.defaultParams.rotation.x === 0 && obj.userData.defaultParams.rotation.y !== 0 && obj.userData.defaultParams.rotation.z === 0 ){
	    return 3;
	  } else if ( obj.userData.defaultParams.rotation.x === 0 && obj.userData.defaultParams.rotation.y === 0 && obj.userData.defaultParams.rotation.z !== 0 ){
	    return 4;
	  } else if ( obj.userData.defaultParams.rotation.x !== 0 && obj.userData.defaultParams.rotation.y === 0 && obj.userData.defaultParams.rotation.z !== 0 ){
	    return 5;
	  } else if ( obj.userData.defaultParams.rotation.x === 0 && obj.userData.defaultParams.rotation.y !== 0 && obj.userData.defaultParams.rotation.z !== 0 ){
	    return 6;
	  }
	} else if ( obj.userData.type === 'door' ){
		if ( obj.rotation.z === 0 ){ //вертикально
	    return 1;
	  } else if ( obj.rotation.z !== 0 ){ // горизонтално
	    return 2;
	  } 
	}

} 

const getRealSizePanel = ( obj, orientation ) => {

	if ( obj.userData.type === 'door' ) {
		
		if ( orientation === 1 ){
			return {
				width : obj.userData.chars.height + 3,
				height : obj.userData.chars.width + 3,
				depth : obj.userData.chars.depth,
			}
		} else if ( orientation === 2 ){
			return {
				width : obj.userData.chars.width + 3,
				height : obj.userData.chars.height + 3,
				depth : obj.userData.chars.depth,
			}
		}

	} else if ( obj.userData.type === 'panel' ){

		if ( orientation === 1 ){
			return {
				width : obj.userData.chars.width,
				height : obj.userData.chars.height,
				depth : obj.userData.chars.depth,
			}
		} else if ( orientation === 2 ){
			return {
				width : obj.userData.chars.width,
				height : obj.userData.chars.depth,
				depth : obj.userData.chars.height,
			}
		} else if ( orientation === 3 ){
			return {
				width : obj.userData.chars.depth,
				height : obj.userData.chars.height,
				depth : obj.userData.chars.width,
			}
		} else if ( orientation === 4 ){
			return {
				width : obj.userData.chars.width,
				height : obj.userData.chars.height,
				depth : obj.userData.chars.depth,
			}
		} else if ( orientation === 5 ){
			return {
				width : obj.userData.chars.width,
				height : obj.userData.chars.depth,
				depth : obj.userData.chars.height,
			}
		} else if ( orientation === 6 ){
			return {
				width : obj.userData.chars.depth,
				height : obj.userData.chars.height,
				depth : obj.userData.chars.width,
			}
		} 

	}

}

const getPointsByRealSizePanel = ( obj, size ) => {

	const returnSize = ( size ) => {

		return size/2;

	}

	return {
		p1 : {
			x : Math.round( obj.userData.defaultParams.position.x*100 - returnSize( size.width ) ),
			y : Math.round( obj.userData.defaultParams.position.y*100 - returnSize( size.height ) ),
			z : Math.round( obj.userData.defaultParams.position.z*100 - returnSize( size.depth ) ),
		},
		p2 : {
			x : Math.round( obj.userData.defaultParams.position.x*100 + returnSize( size.width ) ),
			y : Math.round( obj.userData.defaultParams.position.y*100 + returnSize( size.height ) ),
			z : Math.round( obj.userData.defaultParams.position.z*100 + returnSize( size.depth ) ),
		} 
	}

}

export const getDataPanel = ( obj ) => {

	//1. Получаем ориентацию
	const orientationPanel = getOrientationPanel( obj ); 

	//2. По ориентации получаем габариты в правильном
	const realSizePanel = getRealSizePanel( obj, orientationPanel );

	// if ( obj.userData.type === 'door' ){
	// 	console.log( obj );
	// 	console.log( 'orientation door : ' + orientationPanel );
	// }

	//3. По реальным размерам получаем крайние точки
	const points = getPointsByRealSizePanel( obj, realSizePanel );

	return {
		orientation : orientationPanel,
		volume : points,
	};

} 

export const getDataBox = ( obj ) => {

	const returnSize = ( size ) => {

		return size/2;

	}

	const getPoints = ( obj, size ) => {

		return {
			p1 : {
				x : Math.round( obj.userData.defaultParams.position.x*100 - returnSize( size.width ) ),
				y : Math.round( obj.userData.defaultParams.position.y*100 - returnSize( size.height ) ),
				z : Math.round( obj.userData.defaultParams.position.z*100 - returnSize( size.depth ) ),
			},
			p2 : {
				x : Math.round( obj.userData.defaultParams.position.x*100 + returnSize( size.width ) ),
				y : Math.round( obj.userData.defaultParams.position.y*100 + returnSize( size.height ) ),
				z : Math.round( obj.userData.defaultParams.position.z*100 + returnSize( size.depth ) ),
			} 
		};

	}

	const size = {
		width : obj.userData.chars.width + 3,
		height : obj.userData.chars.height + 3,
		depth : obj.userData.chars.depth + 3,
	}

	const points = getPoints( obj, size );

	return {
		orientation : 1,
		volume : points,
	}

}

export const getDataBarbell = ( obj ) => {

	return {
		orientation : 1,
		volume : {
			p1 : {
				x : 0,
				y : 0,
				z : 0,
			},
			p2 : {
				x : 0,
				y : 0,
				z : 0,
			}
		}
	}

}


export const getOrientationProfile = ( obj ) => {

  if ( obj.userData.defaultParams.rotation.x === 0 && obj.userData.defaultParams.rotation.y === 0 && obj.userData.defaultParams.rotation.z === 0){ //Горизонтально стрелой к нам
    return 1;
  } else if( obj.userData.defaultParams.rotation.x !== 0 && obj.userData.defaultParams.rotation.y === 0 && obj.userData.defaultParams.rotation.z === 0) { //Вертикально
    return 2;
  } else if ( 
    ( obj.userData.defaultParams.rotation.x === 0 && obj.userData.defaultParams.rotation.y !== 0 && obj.userData.defaultParams.rotation.z === 0 ) ||
    ( obj.userData.defaultParams.rotation.x !== 0 && obj.userData.defaultParams.rotation.y !== 0 && obj.userData.defaultParams.rotation.z !== 0 )
  ){ //Горизонтально в стороны
    return 3;
  }
  return 0; //Неопределен
}

export const checkOnBelongsToPanel = ( shtift, panel ) => {

	if ( 
		panel.userData.volume.p1.x - 20 <= shtift.userData.position.x &&
		panel.userData.volume.p1.y - 20 <= shtift.userData.position.y &&
		panel.userData.volume.p1.z - 20 <= shtift.userData.position.z &&

		panel.userData.volume.p2.x + 20 >= shtift.userData.position.x &&
		panel.userData.volume.p2.y + 20 >= shtift.userData.position.y &&
		panel.userData.volume.p2.z + 20 >= shtift.userData.position.z
	){
		return true;
	}
	return false;
}

export const getShtiftByProfile = ( profile, state ) => {

	const getDimensionProfile = ( orientation, profile ) => {

		if ( orientation === 1 ){
			return { 
				x : 0,
				y : 0,
				z : profile.userData.chars.depth/2 - 42.5,
			}
		} else if ( orientation === 2 ){
			return { 
				x : 0,
				y : profile.userData.chars.depth/2 - 42.5,
				z : 0
			}
		} else{
			return { 
				x : profile.userData.chars.depth/2 - 42.5,
				y : 0,
				z : 0,
			}
		}

	}


	const getPoints = ( profile, dimension ) => {

		return {
			first : {
				x : Math.round( profile.userData.defaultParams.position.x*100 - dimension.x ), 
				y : Math.round( profile.userData.defaultParams.position.y*100 - dimension.y ),
				z : Math.round( profile.userData.defaultParams.position.z*100 - dimension.z ),
			}, 
			second : {
				x : Math.round( profile.userData.defaultParams.position.x*100 + dimension.x ), 
				y : Math.round( profile.userData.defaultParams.position.y*100 + dimension.y ),
				z : Math.round( profile.userData.defaultParams.position.z*100 + dimension.z ),
			}
		}

	}

	const getPointVolume = ( points ) => {

		return {
			first : {
				p1 : {
					x : points.first.x - 10,
					y : points.first.y - 10,
					z : points.first.z - 10,
				},
				p2 : {
					x : points.first.x + 10,
					y : points.first.y + 10,
					z : points.first.z + 10,
				},
			},
			second : {
				p1 : {
					x : points.second.x - 10,
					y : points.second.y - 10,
					z : points.second.z - 10,
				},
				p2 : {
					x : points.second.x + 10,
					y : points.second.y + 10,
					z : points.second.z + 10,
				},
			}
		}

	}

	const getColor = ( data ) => {

		if ( data.cap ){

				if ( data.length === 'SMALL' ){
					return 0x00ff00; 
				}
				if ( data.length === 'MIDDLE' ){
					return 0x0000ff; 
				}
				if ( data.length === 'LARGE' ){
					return 0x7a3ddc; 
				}

			} else {

				if ( data.length === 'SMALL' ){
					return 0xffd324;
				}
				if ( data.length === 'MIDDLE' ){
					return 0xd55822;
				}
				if ( data.length === 'LARGE' ){
					return 0xff0000;
				}

			}

	}

	const orientation = getOrientationProfile( profile );

	const dimension = getDimensionProfile( orientation, profile );

	const points = getPointVolume( getPoints( profile, dimension ) );

	const shtift_first = state.find( ( item ) => 
		Math.round( item.userData.position.x ) >= points.first.p1.x && Math.round( item.userData.position.x ) <= points.first.p2.x &&
		Math.round( item.userData.position.y ) >= points.first.p1.y && Math.round( item.userData.position.y ) <= points.first.p2.y &&
		Math.round( item.userData.position.z ) >= points.first.p1.z && Math.round( item.userData.position.z ) <= points.first.p2.z
	);

	const shtift_second = state.find( ( item ) => 
		Math.round( item.userData.position.x ) >= points.second.p1.x && Math.round( item.userData.position.x ) <= points.second.p2.x &&
		Math.round( item.userData.position.y ) >= points.second.p1.y && Math.round( item.userData.position.y ) <= points.second.p2.y &&
		Math.round( item.userData.position.z ) >= points.second.p1.z && Math.round( item.userData.position.z ) <= points.second.p2.z
	);

	if ( shtift_first ){
		shtift_first.visible = true;
		shtift_first.userData.orientationProfile = orientation;
		shtift_first.userData.isShow = false;

		shtift_first.material.color = new THREE.Color( getColor( shtift_first.userData ) );

	}
	if ( shtift_second ){
		shtift_second.visible = true;
		shtift_second.userData.orientationProfile = orientation;
		shtift_second.userData.isShow = false;
		shtift_second.material.color = new THREE.Color( getColor( shtift_second.userData ) );
	}

	return {
		first : shtift_first,
		second : shtift_second,

	}

}

export const getDataProfile = ( profile ) => {

	const getDimensionProfile = ( orientation, profile ) => {

		if ( orientation === 1 ){
			return { 
				x : profile.userData.chars.width/2,
				y : profile.userData.chars.width/2,
				z : profile.userData.chars.depth/2,
			}
		} else if ( orientation === 2 ){
			return { 
				x : profile.userData.chars.width/2,
				y : profile.userData.chars.depth/2,
				z : profile.userData.chars.width/2
			}
		} else{
			return { 
				x : profile.userData.chars.depth/2,
				y : profile.userData.chars.width/2,
				z : profile.userData.chars.width/2
			}
		}

	}

	const orientation = getOrientationProfile( profile );

	const dimension = getDimensionProfile( orientation, profile );

	return {
		orientation : orientation,
		volume : {
			p1 : {
				x : Math.round(profile.userData.defaultParams.position.x*100 - dimension.x ), 
				y : Math.round(profile.userData.defaultParams.position.y*100 - dimension.y ),
				z : Math.round(profile.userData.defaultParams.position.z*100 - dimension.z ),
			}, 
			p2 : {
				x : Math.round(profile.userData.defaultParams.position.x*100 + dimension.x ), 
				y : Math.round(profile.userData.defaultParams.position.y*100 + dimension.y ),
				z : Math.round( profile.userData.defaultParams.position.z*100 + dimension.z ),
			}
		},
	}

}