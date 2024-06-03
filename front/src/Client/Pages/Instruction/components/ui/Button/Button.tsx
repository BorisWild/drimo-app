
interface ButtonProps {
	title: string
	href: string
	bg?: boolean
	img?: string
}

const Button: React.FC<ButtonProps> = ({ title, href, bg = false, img = '' }) => {

	const clName = bg ? 'button button_secondary button_orange' : 'button button_primary';

	return (
		<a href={href} className={clName} >
			{img && <img src={img} alt="" />}
			<p>{title}</p>
		</a>
	)
}

export default Button