import { useState, useEffect } from 'react';

interface ProgressBarProps {
	setSlide: () => void;
	currentSlide: number;
	isActiveBar: boolean;
	lengthSteps: number;
	changeActionBar: (value: boolean) => void;
}

const getSeconds = (second: number): number => {
	return second * 10;
}

// Для обнуления прогрессбара в случае клика по кнопке пред/след слайда
let slide = 1;

const ProgressBar: React.FC<ProgressBarProps> = ({ setSlide, currentSlide, isActiveBar, changeActionBar, lengthSteps }) => {

	const [filled, setFilled] = useState<number>(0);

	const delay = getSeconds(3);

	if (slide !== currentSlide) {
		slide = currentSlide;
		setFilled(0);
	}

	useEffect(() => {
		if (filled < 100 && isActiveBar) {
			setTimeout(() => {
				setFilled(prev => prev += 1);
			}, delay);
		}
		if (filled >= 100 && currentSlide <= lengthSteps-1) {
			setTimeout(() => {
				setSlide();
				setFilled(0);
				changeActionBar(false);

				setTimeout(() => {
					changeActionBar(true);
				}, 1000);
			}, 1000);
		}
		if (filled >= 100 && currentSlide === lengthSteps) {
			setTimeout(() => {
				setSlide();
				changeActionBar(false);
				setFilled(0);
			}, 1000);
		}
	}, [delay, filled, isActiveBar, setSlide, changeActionBar, currentSlide])

	return (
		<div className="progressbar" >
			<div className="progressbar__progress" style={{ width: `${filled}%` }}></div>
		</div>
	)
}

export default ProgressBar;