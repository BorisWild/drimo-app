interface ItemElProps {
	children: React.ReactNode;
}

const ItemElements: React.FC<ItemElProps> = ({ children }) => {
	return (
		<div className="elements-instruction__item">
			{children}
		</div>
	)
}

export default ItemElements;