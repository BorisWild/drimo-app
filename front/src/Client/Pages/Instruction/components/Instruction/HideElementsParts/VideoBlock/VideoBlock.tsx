import { useState } from 'react';
import ModalVideo from './ModalVideo/ModalVideo';

import playButton from '../../../Elements/assets/images/icons/icon-play.svg';


interface VideoBlockProps {
	img: string;
	link: string;
	text: string;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ img, link, text }) => {

	const [modalActive, setModalActive] = useState<boolean>(false);

	return (
		<div className="video-instructions-hide__item item-video-instructions-hide" >
			<div className="item-video-instructions-hide__body">
				<div className="item-video-instructions-hide__inner">
					<div className="item-video-instructions-hide__image">
						<img src={img} alt="" />
					</div>
					<div className="item-video-instructions-hide__icon-play" onClick={() => setModalActive(true)}>
						<img src={ playButton } alt="" />
					</div>
				</div>
			</div>

			<ModalVideo active={modalActive} setActive={setModalActive} link={link} text={text} />
		</div>
	)
}

export default VideoBlock;