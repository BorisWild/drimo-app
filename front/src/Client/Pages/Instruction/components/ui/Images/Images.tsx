interface ButtonProps {
	sources: string[]
}

const Images: React.FC<ButtonProps> = (sources) => {

	const images = sources.sources;

	return (
		<div className="content-instruction__images">
			{images.map((image: string, idx: number) =>
				<img src={image} key={idx} alt="" />
			)}
		</div>
	)
}

export default Images;