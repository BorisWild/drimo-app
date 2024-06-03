import Material from '../ui/Material/Material';

interface SingleMaterialProps {
	img: string
	material?: {
		img: string
		title: string
		fontSize?: boolean
	}
	title: string
	subtitle?: string
	number?: string
	quantity?: number
	variant?: boolean
	topBorder?: boolean
}

const SingleMaterialElement: React.FC<SingleMaterialProps> = ({ img, material, title, subtitle, number, quantity, variant, topBorder }) => {

	const topBorderShow = topBorder ? '_border' : '';

	if (variant) {
		return (
			<div className="single-material-hide__item item-single-material-hide">
				<div className={`item-single-material-hide__body item-single-material-hide__body_variant ${topBorderShow}`}>
					<div className="item-single-material-hide__image">
						<img src={img} alt="" />
					</div>
					<div className="item-single-material-hide__info">
						<h3 className="item-single-material-hide__title">{title}</h3>
						<h3 className="item-single-material-hide__sub-title">{subtitle}</h3>
					</div>
				</div>
			</div>
		)
	}
	return (
		<div className="single-material-hide__item item-single-material-hide">
			<div className="item-single-material-hide__body">
				<div className="item-single-material-hide__image">
					<img src={img} alt="" />
				</div>
				<div className="item-single-material-hide__info">
					<h3 className="item-single-material-hide__title">{title}</h3>
					{material && <Material img={material.img} title={material.title} fontSize />}
				</div>
				<div className="item-single-material-hide__text">
					<p>{number}</p>
				</div>
				<div className="item-single-material-hide__qty">
					<p>X{quantity}</p>
				</div>
			</div>
		</div>
	)
}

export default SingleMaterialElement;