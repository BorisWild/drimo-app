interface ModalVideoProps {
	active: boolean;
	setActive: (value: boolean) => void;
	link: string;
	text: string;
}

const ModalVideo: React.FC<ModalVideoProps> = ({ active, setActive, link, text }) => {

	// blocked scrolling when popup active
	if (active) document.body.style.overflow = 'hidden';
	else document.body.style.overflow = 'auto';

	return (
		<div className={active ? "popup-video _active" : "popup-video"} onClick={() => setActive(false)}>
			<div className={active ? "popup-video__body _active" : "popup-video__body"} onClick={e => e.stopPropagation()}>
				{active && <img src={ link } className="popup-video__item" /> }
				{active && <div className="popup-video__text">{text}</div>}
			</div>
			<div className="popup-video__icon" onClick={() => setActive(false)}>
				<img src="assets/images/icons/icon-close.svg" alt="" />
			</div>
		</div> 
	)
}

export default ModalVideo;