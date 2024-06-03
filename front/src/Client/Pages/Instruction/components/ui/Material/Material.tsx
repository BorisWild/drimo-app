interface MaterialProps {
	img: string
	title: string
	fontSize?: boolean
}

const Material: React.FC<MaterialProps> = ({ img, title, fontSize = false }) => {

	const className = fontSize ? 'material material_small' : 'material';

	return (
		<div className={className}>
			<img src={img} alt="" />
			<p>{title}</p>
		</div>
	)
}

export default Material;