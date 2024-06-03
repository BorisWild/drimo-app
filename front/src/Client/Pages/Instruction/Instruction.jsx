import React from 'react';
import Assembly from "./pages/Assembly/AssemblyInstruction.jsx";
import { useParams } from 'react-router-dom'

import { getInstructionJSON } from './model/model.js';

import './instruction.css';

const Instruction = () => {

    const { inst_id } = useParams()
    const { id } = useParams()

	return (
		<div>
			<div id="three-root"></div>
			<Assembly solution_id={ inst_id } order_id={id} />
		</div>
	)
}

export default Instruction;