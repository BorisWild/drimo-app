import { useState } from 'react';

interface BlockMaterialProps {
	img: string;
	title: string;
}

const BlockMaterial: React.FC<BlockMaterialProps> = ({ img, title }) => {
	const [isActive, setIsActive] = useState(false);
	const currentClass = isActive ? 'instruction-main__material _active' : 'instruction-main__material';
	return (
		<div className={currentClass}>
			<img src={img} title={title} alt="" onClick={() => setIsActive(prev => !prev)} />
		</div>
	)
}

export default BlockMaterial;